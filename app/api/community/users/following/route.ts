import { NextRequest, NextResponse } from "next/server";
import { listFollowedUsers, resolveViewerId } from "@/lib/community-store";

/**
 * GET /api/community/users/following -> members the viewer follows (#1015).
 * Exposed as a separate collection route so clients can hydrate every follow
 * state with a single request (e.g. the feed sidebar).
 */
export async function GET(request: NextRequest) {
  const viewerId = resolveViewerId(request);
  const users = listFollowedUsers(viewerId);

  return NextResponse.json({
    users,
    total: users.length,
  });
}
