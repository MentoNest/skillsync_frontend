import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isLocked } = body;

    if (typeof isLocked !== "boolean") {
      return NextResponse.json(
        { error: "isLocked must be a boolean" },
        { status: 400 }
      );
    }

    // In a real app, this would update the database
    // For now, return success
    return NextResponse.json({
      id,
      isLocked,
      message: `Discussion ${isLocked ? "locked" : "unlocked"} successfully`,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
