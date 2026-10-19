"use client";

import { cn } from "@/lib/utils";
import type { CommunityStatistics } from "@/lib/community-types";
import { CommunityStatisticCard } from "./CommunityStatisticCard";

export interface CommunityStatisticsWidgetProps {
  /** The metrics to display. */
  stats: CommunityStatistics;
  /** Renders placeholders while the metrics are loading. */
  isLoading?: boolean;
  /** Shown in place of the metrics when loading fails. */
  error?: string | null;
  className?: string;
}

const METRICS: ReadonlyArray<{
  key: keyof CommunityStatistics;
  label: string;
}> = [
  { key: "totalMembers", label: "Total Members" },
  { key: "activeDiscussions", label: "Active Discussions" },
  { key: "totalDiscussions", label: "Total Discussions" },
  { key: "eventsThisMonth", label: "Events This Month" },
];

function formatStat(value: number): string {
  return Number.isFinite(value) ? value.toLocaleString("en-US") : "–";
}

/**
 * Sidebar statistics widget (#990).
 *
 * Renders the community's headline metrics as a responsive two-column grid of
 * `CommunityStatisticCard`s. Presentational: the metrics are supplied by the
 * caller (the community state provider feeds them from the API).
 */
export function CommunityStatisticsWidget({
  stats,
  isLoading = false,
  error = null,
  className,
}: CommunityStatisticsWidgetProps) {
  return (
    <section
      aria-labelledby="community-stats-heading"
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4",
        className
      )}
    >
      <h2
        id="community-stats-heading"
        className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]"
      >
        Community Stats
      </h2>

      {error ? (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : null}

      {isLoading ? (
        <div
          role="status"
          aria-label="Loading community statistics"
          className="grid grid-cols-2 gap-3"
        >
          {METRICS.map((metric) => (
            <div
              key={metric.key}
              className="h-24 animate-pulse rounded-lg border border-[var(--border)] bg-[var(--background)]"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3" role="list">
          {METRICS.map((metric) => (
            <div key={metric.key} role="listitem">
              <CommunityStatisticCard
                label={metric.label}
                value={formatStat(stats[metric.key])}
                className="h-full"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
