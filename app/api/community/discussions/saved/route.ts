import { NextRequest, NextResponse } from "next/server";
import { listSavedDiscussions, resolveViewerId } from "@/lib/community-store";

/**
 * GET /api/community/discussions/saved -> discussions bookmarked by the viewer,
 * most recently saved first. Backs the `/community/saved` page (#1013).
 */
export async function GET(request: NextRequest) {
  const viewerId = resolveViewerId(request);
  const discussions = listSavedDiscussions(viewerId);

  return NextResponse.json({
    discussions,
    total: discussions.length,
  });
}
