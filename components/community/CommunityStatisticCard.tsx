"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CommunityStatisticCardProps {
  /**
   * What the number measures, e.g. "Total Members".
   */
  label: string;
  /**
   * The number, already formatted — "2,400+", "98%".
   *
   * A string rather than a number because a stat is nearly always a formatted
   * claim, not a measurement.
   */
  value: string;
  /**
   * Optional decorative icon rendered above the value.
   * Always hidden from assistive technology; the label names the statistic.
   */
  icon?: ReactNode;
  /** Optional extra classes for layout flexibility. */
  className?: string;
}

export function CommunityStatisticCard({
  label,
  value,
  icon,
  className,
}: CommunityStatisticCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-center transition-shadow hover:shadow-md",
        className
      )}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]"
        >
          {icon}
        </span>
      ) : null}
      <p className="text-2xl font-bold tabular-nums tracking-tight text-[var(--foreground)]">
        {value}
      </p>
      <p className="text-sm text-[var(--muted)]">{label}</p>
    </div>
  );
}
