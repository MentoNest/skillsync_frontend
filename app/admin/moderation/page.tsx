"use client";

import { useState, useEffect } from "react";
import { ReportQueue } from "@/components/community/ReportQueue";
import type { Report } from "@/lib/community-types";

export default function ModerationDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "reviewed" | "resolved">("pending");

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/community/reports");
      if (!res.ok) throw new Error("Failed to fetch reports");
      const data = await res.json();
      setReports(data.reports);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResolveReport(reportId: string, action: "dismiss" | "remove_content" | "warn_user") {
    try {
      const res = await fetch(`/api/community/reports/${reportId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error("Failed to resolve report");

      setReports((prev) =>
        prev.map((r) =>
          r.id === reportId
            ? { ...r, status: "resolved", resolvedAt: new Date().toISOString() }
            : r
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resolve report");
    }
  }

  const filteredReports = reports.filter((r) => r.status === filter);
  const pendingCount = reports.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Moderation Dashboard
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Review and manage community reports
          </p>
          {pendingCount > 0 && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800" role="alert">
              <p className="font-medium">
                {pendingCount} report{pendingCount !== 1 ? "s" : ""} pending review
              </p>
            </div>
          )}
        </div>

        {error && (
          <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-2" role="tablist" aria-label="Report filters">
          {(["pending", "reviewed", "resolved"] as const).map((status) => (
            <button
              key={status}
              role="tab"
              aria-selected={filter === status}
              onClick={() => setFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                filter === status
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--muted)] hover:bg-[var(--border)]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <ReportQueue
          reports={filteredReports}
          isLoading={isLoading}
          onResolve={handleResolveReport}
        />
      </div>
    </div>
  );
}
