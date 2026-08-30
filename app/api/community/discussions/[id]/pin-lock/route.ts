import { NextRequest, NextResponse } from "next/server";
import { discussionStore } from "@/app/api/community/discussions/route";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const storeId = decodeURIComponent(id);

  const discussion = discussionStore.get(storeId);
  if (!discussion) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const { isPinned, isLocked } = body as { isPinned?: boolean; isLocked?: boolean };

  if (typeof isPinned === "boolean") {
    discussion.isPinned = isPinned;
  }
  if (typeof isLocked === "boolean") {
    discussion.isLocked = isLocked;
  }

  discussionStore.set(storeId, discussion);

  return NextResponse.json({
    id: discussion.id,
    isPinned: discussion.isPinned ?? false,
    isLocked: discussion.isLocked ?? false,
  });
}
