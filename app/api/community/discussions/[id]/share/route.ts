import { NextRequest, NextResponse } from "next/server";
import { buildShareUrl, getDiscussion, recordShare, resolveViewerId } from "@/lib/community-store";

/** How the link reached the recipient - stored so shares can be attributed. */
const SHARE_METHODS = ["native", "clipboard", "manual"] as const;
type ShareMethod = (typeof SHARE_METHODS)[number];

function parseShareMethod(value: unknown): ShareMethod {
  return SHARE_METHODS.includes(value as ShareMethod)
    ? (value as ShareMethod)
    : "clipboard";
}

/**
 * POST /api/community/discussions/[id]/share
 *
 * Records a share of a discussion and returns the canonical, absolute URL that
 * the client copies or hands to the native share sheet (#1016).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const discussion = getDiscussion(id);

  if (!discussion) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }

  let method: ShareMethod = "clipboard";
  try {
    const body = await request.json();
    method = parseShareMethod(body?.method);
  } catch {
    // No body: fall back to the clipboard method (link was copied).
  }

  const viewerId = resolveViewerId(request);
  const shareCount = recordShare(discussion);

  return NextResponse.json({
    discussionId: discussion.id,
    title: discussion.title,
    url: buildShareUrl(discussion, request),
    method,
    shareCount,
    sharedBy: viewerId,
  });
}
