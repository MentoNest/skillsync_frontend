import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isPinned } = body;

    if (typeof isPinned !== "boolean") {
      return NextResponse.json(
        { error: "isPinned must be a boolean" },
        { status: 400 }
      );
    }

    // In a real app, this would update the database
    // For now, return success
    return NextResponse.json({
      id,
      isPinned,
      message: `Discussion ${isPinned ? "pinned" : "unpinned"} successfully`,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
