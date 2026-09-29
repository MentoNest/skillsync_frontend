import { NextRequest, NextResponse } from "next/server";
import {
  deleteDiscussion,
  getDiscussion,
  incrementViewCount,
  isBookmarked,
  isFollowingUser,
  listRelatedDiscussions,
  listReplies,
  resolveViewerId,
  updateDiscussion,
} from "@/lib/community-store";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const discussion = getDiscussion(id);
  if (!discussion) {
    return NextResponse.json(
      { error: "Discussion not found" },
      { status: 404 },
    );
  }

  incrementViewCount(id);
  const viewerId = resolveViewerId(request);
  const replies = listReplies(id);
  const related = listRelatedDiscussions(id, 5).map((d) => ({
    ...d,
    isBookmarked: isBookmarked(viewerId, d.id),
    isAuthorFollowed: isFollowingUser(viewerId, d.authorId),
  }));

  return NextResponse.json({
    discussion: {
      ...discussion,
      isBookmarked: isBookmarked(viewerId, discussion.id),
      isAuthorFollowed: isFollowingUser(viewerId, discussion.authorId),
    },
    replies,
    related,
  });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const viewerId = resolveViewerId(request);
  let body: { title?: string; content?: string; category?: string; tags?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const updated = updateDiscussion(id, viewerId, body);
    if (!updated) {
      return NextResponse.json(
        { error: "Discussion not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ discussion: updated });
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return NextResponse.json(
        { error: "Only the author can edit this discussion" },
        { status: 403 },
      );
    }
    throw e;
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const viewerId = resolveViewerId(request);
  try {
    const ok = deleteDiscussion(id, viewerId);
    if (!ok) {
      return NextResponse.json(
        { error: "Discussion not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return NextResponse.json(
        { error: "Only the author can delete this discussion" },
        { status: 403 },
      );
    }
    throw e;
  }
}
