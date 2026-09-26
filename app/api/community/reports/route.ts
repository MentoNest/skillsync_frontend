import { NextResponse } from "next/server";

const mockReports = [
  {
    id: "report-1",
    discussionId: "discussion-1",
    reporterId: "user-1",
    reason: "Spam content",
    status: "pending" as const,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "report-2",
    discussionId: "discussion-2",
    reporterId: "user-2",
    reason: "Inappropriate language",
    status: "pending" as const,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "report-3",
    discussionId: "discussion-3",
    reporterId: "user-3",
    reason: "Off-topic",
    status: "reviewed" as const,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "report-4",
    discussionId: "discussion-4",
    reporterId: "user-4",
    reason: "Duplicate post",
    status: "resolved" as const,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    resolvedAt: new Date(Date.now() - 86400000).toISOString(),
    resolvedBy: "moderator-1",
  },
];

export async function GET() {
  return NextResponse.json({
    reports: mockReports,
    pendingCount: mockReports.filter((r) => r.status === "pending").length,
  });
}
