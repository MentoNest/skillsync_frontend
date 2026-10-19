import { NextResponse } from "next/server";
import {
  getCommunityStatistics,
  listEvents,
} from "@/lib/community-store";

// Stats are derived from the in-memory store and must not be cached.
export const dynamic = "force-dynamic";

/**
 * Sidebar overview for the community page (#990, #996).
 *
 * Returns the statistics widget metrics plus the events the community is
 * running. Kept separate from `/api/community/events`, which is the SSE
 * stream used for real-time updates.
 */
export async function GET() {
  return NextResponse.json({
    statistics: getCommunityStatistics(),
    events: listEvents(),
  });
}
