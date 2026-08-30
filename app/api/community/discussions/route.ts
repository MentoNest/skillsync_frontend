import { NextRequest, NextResponse } from "next/server";

export type CommunityDiscussion = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  replyCount: number;
  likeCount: number;
  postedAt: string;
  isLiked?: boolean;
};

type StoredDiscussion = CommunityDiscussion & {
  baseLikeCount: number;
  likedByUser: boolean;
};

const seededDiscussions: StoredDiscussion[] = [
  {
    id: "1",
    title: "How do you structure your first mentorship call?",
    excerpt: "Looking for tips on setting expectations and goals in the first session with a new mentee.",
    author: "Jane Smith",
    category: "Career Growth",
    replyCount: 12,
    likeCount: 5,
    postedAt: "2026-08-25T10:00:00.000Z",
    baseLikeCount: 5,
    likedByUser: false,
  },
  {
    id: "2",
    title: "Best resources for learning system design",
    excerpt: "Curious what articles, courses, or books have helped others prepare for system design interviews.",
    author: "John Doe",
    category: "Interview Prep",
    replyCount: 8,
    likeCount: 9,
    postedAt: "2026-08-24T08:30:00.000Z",
    baseLikeCount: 9,
    likedByUser: false,
  },
  {
    id: "3",
    title: "Balancing mentoring with a full-time job",
    excerpt: "Would love to hear how other mentors manage their time and avoid burnout.",
    author: "Sarah Wilson",
    category: "Work-Life Balance",
    replyCount: 5,
    likeCount: 2,
    postedAt: "2026-08-23T14:45:00.000Z",
    baseLikeCount: 2,
    likedByUser: false,
  },
];

export const discussionStore = new Map<string, StoredDiscussion>(
  seededDiscussions.map((discussion) => [discussion.id, { ...discussion }]),
);

function serializeDiscussion(discussion: StoredDiscussion): CommunityDiscussion {
  return {
    id: discussion.id,
    title: discussion.title,
    excerpt: discussion.excerpt,
    author: discussion.author,
    category: discussion.category,
    replyCount: discussion.replyCount,
    likeCount: discussion.baseLikeCount + (discussion.likedByUser ? 1 : 0),
    postedAt: discussion.postedAt,
    isLiked: discussion.likedByUser,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(20, Math.max(1, Number(searchParams.get("pageSize")) || 10));
  const category = searchParams.get("category") ?? "";

  const filtered = [...discussionStore.values()]
    .filter((discussion) => !category || discussion.category === category)
    .map(serializeDiscussion);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const discussions = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    discussions,
    hasMore: start + pageSize < total,
    total,
    page,
    pageSize,
  });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    title?: string;
    category?: string;
    content?: string;
    tags?: string[];
    author?: string;
    excerpt?: string;
  };

  const title = payload.title?.trim();
  const category = payload.category?.trim() || "Career Growth";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const nextDiscussion: StoredDiscussion = {
    id: `discussion-${Date.now()}`,
    title,
    excerpt: payload.excerpt?.trim() || payload.content?.trim().slice(0, 160) || "New community discussion",
    author: payload.author?.trim() || "You",
    category,
    replyCount: 0,
    likeCount: 0,
    postedAt: new Date().toISOString(),
    baseLikeCount: 0,
    likedByUser: false,
  };

  discussionStore.set(nextDiscussion.id, nextDiscussion);

  return NextResponse.json(
    {
      discussion: serializeDiscussion(nextDiscussion),
      ok: true,
    },
    { status: 201 }
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload = (await request.json().catch(() => ({}))) as {
    replyIncrement?: number;
  };
  const discussion = discussionStore.get(id);

  if (!discussion) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }

  const replyIncrement = Number(payload.replyIncrement) || 0;
  discussion.replyCount = Math.max(0, discussion.replyCount + replyIncrement);

  return NextResponse.json({
    replyCount: discussion.replyCount,
    id: discussion.id,
  });
}
