import { NextResponse } from "next/server";
import { listEvents } from "@/lib/community-store";

// Events come from the in-memory store and must not be cached.
export const dynamic = "force-dynamic";

/**
 * Upcoming community events consumed by the sidebar widget (#1243).
 *
 * Returns the same `CommunityEvent[]` shape as `/api/community/overview` so
 * both endpoints stay in sync through `lib/community-store` instead of
 * maintaining separate mock payloads.
 */
export async function GET() {
  return NextResponse.json({ events: listEvents() });
}
