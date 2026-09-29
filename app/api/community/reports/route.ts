import { NextRequest, NextResponse } from "next/server";
import {
  createReport,
  listReports,
  resolveViewerId,
} from "@/lib/community-store";

export async function GET() {
  return NextResponse.json({
    reports: listReports(),
    pendingCount: listReports().filter((r) => r.status === "pending").length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { discussionId, reason } = body;

    if (!discussionId || typeof discussionId !== "string") {
      return NextResponse.json(
        { error: "Discussion ID is required" },
        { status: 400 }
      );
    }

    if (!reason || typeof reason !== "string") {
      return NextResponse.json(
        { error: "Report reason is required" },
        { status: 400 }
      );
    }

    const viewerId = resolveViewerId(request);

    const report = createReport({
      discussionId,
      reporterId: viewerId,
      reason,
    });

    return NextResponse.json(report, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to submit report";
    const status = message === "Discussion not found" ? 404 : message === "Invalid report reason" ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}