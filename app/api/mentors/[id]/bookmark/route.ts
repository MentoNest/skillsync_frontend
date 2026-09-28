import { NextRequest, NextResponse } from "next/server";
import { MOCK_MENTORS } from "@/lib/mock-mentors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ids = searchParams.get("ids")?.split(",").filter(Boolean) || [];

    const mentors = MOCK_MENTORS.filter((m) => ids.includes(m.id));

    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching bookmarked mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarked mentors" },
      { status: 500 }
    );
  }
}
