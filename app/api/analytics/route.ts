import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events } = body;

    if (!events || !Array.isArray(events)) {
      return NextResponse.json({ error: "Invalid events array" }, { status: 400 });
    }

    for (const event of events) {
      console.log("[Analytics]", JSON.stringify(event));
    }

    return NextResponse.json({ success: true, received: events.length });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}