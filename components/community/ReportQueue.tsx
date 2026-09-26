"use client";

import type { Report } from "@/lib/community-types";

interface ReportQueueProps {
  reports: Report[];
  isLoading: boolean;
  onResolve: (reportId: string, action: "dismiss" | "remove_content" | "warn_user") => void;
}

export function ReportQueue({ reports, isLoading, onResolve }: ReportQueueProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading reports">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-8 text-center">
        <p className="text-[var(--muted)]">No reports to review</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="feed" aria-label="Report queue">
      {reports.map((report) => (
        <div
          key={report.id}
          className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--foreground)]">
                  Report #{report.id}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    report.status === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : report.status === "reviewed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Reason: {report.reason}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Reported: {new Date(report.createdAt).toLocaleDateString()}
              </p>
              {report.resolvedAt && (
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Resolved: {new Date(report.resolvedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {report.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => onResolve(report.id, "dismiss")}
                  className="rounded-lg bg-[var(--secondary)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => onResolve(report.id, "warn_user")}
                  className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  Warn User
                </button>
                <button
                  onClick={() => onResolve(report.id, "remove_content")}
                  className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  Remove Content
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
