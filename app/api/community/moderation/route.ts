import { NextResponse } from "next/server";
import { reportStore, getReportReasonLabel } from "../reports/route";
import { discussionStore } from "../discussions/route";

export interface ModerationQueueItem {
  id: string;
  discussionId: string;
  discussionTitle: string;
  discussionAuthor: string;
  reason: string;
  reasonLabel: string;
  details?: string;
  reportedBy: string;
  createdAt: string;
  status: "pending" | "reviewed" | "dismissed" | "actioned";
}

export interface ModerationStats {
  totalReports: number;
  pendingReports: number;
  actionedReports: number;
  dismissedReports: number;
  flaggedDiscussions: number;
}

export async function GET() {
  const reports = [...reportStore.values()];
  const pending = reports.filter((r) => r.status === "pending");
  const actioned = reports.filter((r) => r.status === "actioned");
  const dismissed = reports.filter((r) => r.status === "dismissed");

  const queue: ModerationQueueItem[] = reports
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((report) => {
      const discussion = discussionStore.get(report.discussionId);
      return {
        id: report.id,
        discussionId: report.discussionId,
        discussionTitle: discussion?.title ?? "Unknown discussion",
        discussionAuthor: discussion?.author ?? "Unknown",
        reason: report.reason,
        reasonLabel: getReportReasonLabel(report.reason),
        details: report.details,
        reportedBy: report.reportedBy,
        createdAt: report.createdAt,
        status: report.status,
      };
    });

  const stats: ModerationStats = {
    totalReports: reports.length,
    pendingReports: pending.length,
    actionedReports: actioned.length,
    dismissedReports: dismissed.length,
    flaggedDiscussions: new Set(reports.map((r) => r.discussionId)).size,
  };

  return NextResponse.json({ queue, stats });
}
