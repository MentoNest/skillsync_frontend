import { NextRequest, NextResponse } from "next/server";
import {
  getDiscussion,
  isDiscussionLiked,
  resolveViewerId,
  toggleDiscussionLike,
} from "@/lib/community-store";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const discussion = getDiscussion(id);
  if (!discussion) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }
  const viewerId = resolveViewerId(request);
  return NextResponse.json({
    discussionId: id,
    isLiked: isDiscussionLiked(viewerId, id),
    likeCount: discussion.likeCount,
  });
}

/** Toggle like for the signed-in viewer (#1011). */
export async function POST(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  if (!getDiscussion(id)) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }
  const viewerId = resolveViewerId(request);
  try {
    const result = toggleDiscussionLike(viewerId, id);
    return NextResponse.json({
      discussionId: id,
      ...result,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to toggle like" },
      { status: 400 },
    );
  }
}
