import { NextRequest, NextResponse } from "next/server";

export type ReportReason =
  | "spam"
  | "harassment"
  | "inappropriate"
  | "off-topic"
  | "other";

export interface Report {
  id: string;
  discussionId: string;
  reason: ReportReason;
  details?: string;
  reportedBy: string;
  createdAt: string;
  status: "pending" | "reviewed" | "dismissed" | "actioned";
}

type StoredReport = Report;

const REPORT_REASONS: Record<ReportReason, string> = {
  spam: "Spam or advertising",
  harassment: "Harassment or abuse",
  inappropriate: "Inappropriate content",
  "off-topic": "Off-topic",
  other: "Other",
};

export function getReportReasonLabel(reason: ReportReason): string {
  return REPORT_REASONS[reason];
}

export const reportStore = new Map<string, StoredReport>();

function generateReportId(): string {
  return `report_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function GET() {
  const reports = [...reportStore.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json({ reports });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    discussionId?: string;
    reason?: string;
    details?: string;
    reportedBy?: string;
  };

  if (!payload.discussionId) {
    return NextResponse.json(
      { error: "Discussion ID is required" },
      { status: 400 }
    );
  }

  if (!payload.reason || !REPORT_REASONS[payload.reason as ReportReason]) {
    return NextResponse.json(
      { error: "A valid report reason is required" },
      { status: 400 }
    );
  }

  const existingReport = [...reportStore.values()].find(
    (r) =>
      r.discussionId === payload.discussionId &&
      r.reportedBy === (payload.reportedBy ?? "anonymous") &&
      r.status === "pending"
  );

  if (existingReport) {
    return NextResponse.json(
      { error: "You have already reported this discussion", reportId: existingReport.id },
      { status: 409 }
    );
  }

  const report: StoredReport = {
    id: generateReportId(),
    discussionId: payload.discussionId,
    reason: payload.reason as ReportReason,
    details: payload.details?.trim(),
    reportedBy: payload.reportedBy ?? "anonymous",
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  reportStore.set(report.id, report);

  return NextResponse.json({ report }, { status: 201 });
}
