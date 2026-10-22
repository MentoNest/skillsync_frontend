import { NextRequest, NextResponse } from "next/server";
import {
  addComment,
  getDiscussion,
  listComments,
  resolveViewerId,
  getMember,
} from "@/lib/community-store";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  if (!getDiscussion(id)) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }
  const comments = listComments(id);
  return NextResponse.json({
    discussionId: id,
    comments,
    total: comments.reduce((n, c) => n + 1 + (c.replies?.length ?? 0), 0),
  });
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const discussion = getDiscussion(id);
  if (!discussion) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }
  if (discussion.isLocked) {
    return NextResponse.json({ error: "Discussion is locked" }, { status: 403 });
  }

  const viewerId = resolveViewerId(request);
  let body: { content?: string; parentId?: string | null; authorName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const content = body.content?.trim() ?? "";
  if (!content) {
    return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
  }
  if (content.length > 5000) {
    return NextResponse.json({ error: "Comment is too long" }, { status: 400 });
  }

  const member = getMember(viewerId);
  try {
    const comment = addComment({
      discussionId: id,
      content,
      authorId: viewerId,
      authorName: body.authorName?.trim() || member?.name || "Community Member",
      authorAvatar: member?.avatar,
      parentId: body.parentId ?? null,
    });
    return NextResponse.json({ comment }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to add comment" },
      { status: 400 },
    );
  }
}
