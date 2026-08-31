import { NextRequest, NextResponse } from "next/server";
import { reportStore } from "../route";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload = (await request.json().catch(() => ({}))) as {
    status?: "pending" | "reviewed" | "dismissed" | "actioned";
  };

  const report = reportStore.get(id);
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const validStatuses = ["pending", "reviewed", "dismissed", "actioned"];
  if (!payload.status || !validStatuses.includes(payload.status)) {
    return NextResponse.json(
      { error: "A valid status is required" },
      { status: 400 }
    );
  }

  report.status = payload.status;
  reportStore.set(id, report);

  return NextResponse.json({ report });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const report = reportStore.get(id);
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  reportStore.delete(id);
  return NextResponse.json({ success: true });
}
