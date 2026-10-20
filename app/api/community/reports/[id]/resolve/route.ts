import { NextRequest, NextResponse } from "next/server";
import { getReport, resolveReport, resolveViewerId } from "@/lib/community-store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let action: unknown;
  try {
    const body = await request.json();
    action = body?.action;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (
    action !== "dismiss" &&
    action !== "remove_content" &&
    action !== "warn_user"
  ) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  if (!getReport(id)) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const report = resolveReport(id, action, resolveViewerId(request));
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  return NextResponse.json({ report });
}
