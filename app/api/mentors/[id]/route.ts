import { NextRequest, NextResponse } from "next/server";
import { MOCK_MENTORS } from "@/lib/mock-mentors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const mentor = MOCK_MENTORS.find((m) => m.id === id);

    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Error fetching mentor:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentor" },
      { status: 500 }
    );
  }
}
