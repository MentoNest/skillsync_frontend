import { NextRequest, NextResponse } from "next/server";
import { discussionStore } from "../../route";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload = (await request.json().catch(() => ({}))) as { liked?: boolean };
  const nextLiked = payload.liked ?? true;
  const discussion = discussionStore.get(id);

  if (!discussion) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }

  discussion.likedByUser = nextLiked;

  return NextResponse.json({
    id: discussion.id,
    liked: discussion.likedByUser,
    likeCount: discussion.baseLikeCount + (discussion.likedByUser ? 1 : 0),
  });
}
