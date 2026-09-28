import { NextRequest, NextResponse } from "next/server";
import {
  addBookmark,
  getDiscussion,
  isBookmarked,
  removeBookmark,
  resolveViewerId,
} from "@/lib/community-store";

/**
 * GET    /api/community/discussions/[id]/bookmark -> current bookmark state
 * POST   /api/community/discussions/[id]/bookmark -> bookmark the discussion
 * DELETE /api/community/discussions/[id]/bookmark -> remove the bookmark
 *
 * State lives in the community store so it survives between the feed, a
 * discussion card and the saved discussions page (#1013).
 */
type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  if (!getDiscussion(id)) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }

  const viewerId = resolveViewerId(request);

  return NextResponse.json({
    discussionId: id,
    isBookmarked: isBookmarked(viewerId, id),
  });
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  if (!getDiscussion(id)) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }

  const viewerId = resolveViewerId(request);
  const savedAt = addBookmark(viewerId, id);

  return NextResponse.json(
    { discussionId: id, isBookmarked: true, savedAt },
    { status: 201 }
  );
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  if (!getDiscussion(id)) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }

  const viewerId = resolveViewerId(request);
  removeBookmark(viewerId, id);

  return NextResponse.json({ discussionId: id, isBookmarked: false });
}
