"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useCommunity } from "@/lib/communityContext";

type ModerationQueueItem = {
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
};

type ModerationStats = {
  totalReports: number;
  pendingReports: number;
  actionedReports: number;
  dismissedReports: number;
  flaggedDiscussions: number;
};

const REASON_BADGE_COLORS: Record<string, string> = {
  spam: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  harassment: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  inappropriate: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "off-topic": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

const STATUS_BADGE_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  reviewed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  dismissed: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  actioned: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

function formatRelativeTime(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ModerationDashboard() {
  const { trackModerationAction } = useCommunity();
  const [queue, setQueue] = useState<ModerationQueueItem[]>([]);
  const [stats, setStats] = useState<ModerationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed" | "dismissed" | "actioned">("all");
  const [actioning, setActioning] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch("/api/community/moderation");
        if (!response.ok) throw new Error("Failed to fetch moderation data");
        const data = await response.json();
        if (!cancelled) {
          setQueue(data.queue);
          setStats(data.stats);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load moderation queue");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleAction = useCallback(
    async (
      reportId: string,
      newStatus: "pending" | "reviewed" | "dismissed" | "actioned"
    ) => {
      setActioning(reportId);
      setError("");

      const item = queue.find((q) => q.id === reportId);
      const oldStatus = item?.status;

      try {
        const response = await fetch(`/api/community/reports/${reportId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (!response.ok) throw new Error("Failed to update report");

        trackModerationAction(newStatus, reportId);
        setQueue((prev) =>
          prev.map((item) =>
            item.id === reportId ? { ...item, status: newStatus } : item
          )
        );
        setStats((prev) => {
          if (!prev) return prev;
          const updated = { ...prev };
          if (oldStatus === "pending") updated.pendingReports--;
          if (oldStatus === "actioned") updated.actionedReports--;
          if (oldStatus === "dismissed") updated.dismissedReports--;
          if (newStatus === "pending") updated.pendingReports++;
          if (newStatus === "actioned") updated.actionedReports++;
          if (newStatus === "dismissed") updated.dismissedReports++;
          return updated;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update report");
      } finally {
        setActioning(null);
      }
    },
    [queue, trackModerationAction]
  );

  const filteredQueue = useMemo(
    () => (filter === "all" ? queue : queue.filter((item) => item.status === filter)),
    [queue, filter]
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <StatCard label="Total Reports" value={stats.totalReports} color="gray" />
          <StatCard label="Pending" value={stats.pendingReports} color="yellow" />
          <StatCard label="Actioned" value={stats.actionedReports} color="red" />
          <StatCard label="Dismissed" value={stats.dismissedReports} color="gray" />
          <StatCard label="Flagged Posts" value={stats.flaggedDiscussions} color="purple" />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {(["all", "pending", "reviewed", "dismissed", "actioned"] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
              filter === status
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {status}
            {status !== "all" && stats && (
              <span className="ml-1.5 opacity-70">
                ({queue.filter((q) => q.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {filteredQueue.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-bold text-gray-900 dark:text-white">All clear!</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {filter === "all"
              ? "No reports have been filed yet."
              : `No ${filter} reports.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredQueue.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {item.discussionTitle}
                    </h4>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        REASON_BADGE_COLORS[item.reason] ?? "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.reasonLabel}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        STATUS_BADGE_COLORS[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    By {item.discussionAuthor} · Reported by {item.reportedBy} ·{" "}
                    {formatRelativeTime(item.createdAt)}
                  </p>
                  {item.details && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 rounded-lg px-3 py-2 dark:bg-gray-800">
                      &ldquo;{item.details}&rdquo;
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  {item.status === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAction(item.id, "actioned")}
                        disabled={actioning === item.id}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                      >
                        Remove Post
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(item.id, "dismissed")}
                        disabled={actioning === item.id}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                      >
                        Dismiss
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(item.id, "reviewed")}
                        disabled={actioning === item.id}
                        className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-100 disabled:opacity-50 dark:bg-indigo-950 dark:text-indigo-400"
                      >
                        Mark Reviewed
                      </button>
                    </>
                  )}
                  {item.status !== "pending" && (
                    <button
                      type="button"
                      onClick={() => handleAction(item.id, "pending")}
                      disabled={actioning === item.id}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-400"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "gray" | "yellow" | "red" | "purple";
}) {
  const colors = {
    gray: "bg-gray-50 dark:bg-gray-800",
    yellow: "bg-amber-50 dark:bg-amber-950",
    red: "bg-red-50 dark:bg-red-950",
    purple: "bg-purple-50 dark:bg-purple-950",
  };
  const textColors = {
    gray: "text-gray-900 dark:text-white",
    yellow: "text-amber-700 dark:text-amber-300",
    red: "text-red-700 dark:text-red-300",
    purple: "text-purple-700 dark:text-purple-300",
  };

  return (
    <div className={`rounded-xl p-4 ${colors[color]}`}>
      <p className={`text-2xl font-bold ${textColors[color]}`}>{value}</p>
      <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}
