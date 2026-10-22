"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { CommunityStatistics } from "@/lib/community-types";
import { CommunityErrorState } from "./CommunityErrorState";
import { CommunityStatisticCard } from "./CommunityStatisticCard";

export interface CommunityStatisticsWidgetProps {
  /** The metrics to display. */
  stats: CommunityStatistics;
  /** Renders placeholders while the metrics are loading. */
  isLoading?: boolean;
  /** Shown in place of the metrics when loading fails. */
  error?: string | null;
  /** Re-issues the metrics request (#1254). */
  onRetry?: () => void;
  /** True while the retried metrics request is in flight (#1254). */
  isRetrying?: boolean;
  className?: string;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-5 w-5",
  "aria-hidden": true,
  focusable: "false",
} as const;

function MembersIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ActiveDiscussionsIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </svg>
  );
}

function TotalDiscussionsIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function EventsIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

const METRICS: ReadonlyArray<{
  key: keyof CommunityStatistics;
  label: string;
  icon: ReactNode;
}> = [
  { key: "totalMembers", label: "Total Members", icon: <MembersIcon /> },
  {
    key: "activeDiscussions",
    label: "Active Discussions",
    icon: <ActiveDiscussionsIcon />,
  },
  {
    key: "totalDiscussions",
    label: "Total Discussions",
    icon: <TotalDiscussionsIcon />,
  },
  { key: "eventsThisMonth", label: "Events This Month", icon: <EventsIcon /> },
];

/**
 * Two columns where there is room; a single column on very narrow screens so
 * values and labels never get cramped.
 */
const GRID_CLASSES = "grid grid-cols-1 gap-3 min-[380px]:grid-cols-2";

function formatStat(value: number): string {
  return Number.isFinite(value) ? value.toLocaleString("en-US") : "–";
}

/**
 * Sidebar statistics widget (#990, #1245).
 *
 * Renders the community's headline metrics as a responsive grid of
 * `CommunityStatisticCard`s. Presentational: the metrics are supplied by the
 * caller (the community state provider feeds them from the API).
 */
export function CommunityStatisticsWidget({
  stats,
  isLoading = false,
  error = null,
  onRetry,
  isRetrying = false,
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
        Community Statistics
      </h2>

      {error ? (
        <CommunityErrorState
          title="Couldn't load statistics"
          message={error}
          onRetry={onRetry}
          isRetrying={isRetrying}
          className="px-3 py-6"
        />
      ) : null}

      {isLoading ? (
        <div
          role="status"
          aria-label="Loading community statistics"
          className={GRID_CLASSES}
        >
          {METRICS.map((metric) => (
            <div
              key={metric.key}
              className="h-24 animate-pulse rounded-lg border border-[var(--border)] bg-[var(--background)]"
            />
          ))}
        </div>
      ) : (
        <div className={GRID_CLASSES} role="list">
          {METRICS.map((metric) => (
            <div key={metric.key} role="listitem">
              <CommunityStatisticCard
                label={metric.label}
                value={formatStat(stats[metric.key])}
                icon={metric.icon}
                className="h-full"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
