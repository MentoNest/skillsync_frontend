import { NextRequest, NextResponse } from "next/server";

const bookmarkedMentors = new Set<string>();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    bookmarkedMentors.add(id);

    return NextResponse.json({
      success: true,
      isBookmarked: true,
    });
  } catch (error) {
    console.error("Error bookmarking mentor:", error);
    return NextResponse.json(
      { error: "Failed to bookmark mentor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    bookmarkedMentors.delete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return NextResponse.json(
      { error: "Failed to remove bookmark" },
      { status: 500 }
    );
  }
}