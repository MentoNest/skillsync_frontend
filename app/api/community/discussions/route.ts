import { NextRequest, NextResponse } from "next/server";
import { parseCategoryParam } from "@/lib/community-types";
import {
  createDiscussion,
  isBookmarked,
  isFollowingUser,
  listDiscussions,
  resolveViewerId,
} from "@/lib/community-store";

// Discussions are generated data for now - will be replaced with actual database
// (`lib/community-store.ts` owns the seed and the viewer-specific state).
const mockDiscussions = listDiscussions();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sort = searchParams.get("sort") || "latest";
  // #993: accept single (?category=technical), comma-separated
  // (?category=career,technical), and repeated (?category=a&category=b)
  // params. Single-select UI sends one value; multi-select can reuse this.
  const categories = parseCategoryParam(searchParams.getAll("category"));
  const search = searchParams.get("q");

  let filtered = [...mockDiscussions];

  // Filter by category (selected category changes feed results)
  if (categories.length > 0) {
    filtered = filtered.filter((d) => categories.includes(d.category));
  }

  // Filter by search query (title, content, author, category; case-insensitive) (#992)
  if (search) {
    const searchLower = search.trim().toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.title.toLowerCase().includes(searchLower) ||
        d.content.toLowerCase().includes(searchLower) ||
        d.authorName.toLowerCase().includes(searchLower) ||
        d.category.toLowerCase().includes(searchLower)
    );
  }

  // Sort (#994): latest | most-liked | most-replies | trending
  // - latest: newest createdAt first
  // - most-liked: highest likeCount first
  // - most-replies: highest replyCount first
  // - trending: weighted engagement score (likes, replies, views) with recency tie-break
  // Legacy aliases: "popular" -> "most-liked" for backward compatibility.
  const getTrendingScore = (d: (typeof filtered)[number]) =>
    d.likeCount * 2 + d.replyCount * 3 + d.viewCount * 0.5;

  if (sort === "most-liked" || sort === "popular") {
    filtered.sort((a, b) => b.likeCount - a.likeCount);
  } else if (sort === "most-replies") {
    filtered.sort((a, b) => b.replyCount - a.replyCount);
  } else if (sort === "trending") {
    filtered.sort((a, b) => {
      const scoreDiff = getTrendingScore(b) - getTrendingScore(a);
      if (scoreDiff !== 0) return scoreDiff;
      return (
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    });
  } else {
    // latest (default)
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // Pinned discussions always at top
  filtered.sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  // Decorate with viewer-specific state so cards can render bookmark/follow
  // state without extra requests (#1013, #1015).
  const viewerId = resolveViewerId(request);
  const discussions = paginated.map((discussion) => ({
    ...discussion,
    isBookmarked: isBookmarked(viewerId, discussion.id),
    isAuthorFollowed: isFollowingUser(viewerId, discussion.authorId),
  }));

  return NextResponse.json({
    discussions,
    hasMore: end < filtered.length,
    total: filtered.length,
    page,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const viewerId = resolveViewerId(request);

    const newDiscussion = createDiscussion({
      title: body.title,
      content: body.content,
      category: body.category,
      tags: body.tags || [],
      authorId: viewerId,
      authorName: body.authorName || "Current User",
    });

    return NextResponse.json(newDiscussion, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
