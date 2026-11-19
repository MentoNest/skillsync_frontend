"use client";

import React, { useId } from "react";
import {
  isMentorExperienceLevel,
  MENTOR_EXPERIENCE_LABELS,
  MENTOR_EXPERIENCE_LEVELS,
  MENTOR_EXPERTISE_OPTIONS,
  MentorFilters,
} from "@/types/mentor";
import { cn } from "@/lib/utils";
import IndustryFilter, {
  DEFAULT_INDUSTRIES,
} from "@/components/mentor-discovery/IndustryFilter";
import ExperienceLevelFilter from "@/components/mentor-discovery/ExperienceLevelFilter";

/** Expertise categories mentors can be filtered by. */
export const EXPERTISE_OPTIONS = MENTOR_EXPERTISE_OPTIONS;

/**
 * App-wide experience vocabulary.
 *
 * These are the values stored in `MentorFilters.experience`, persisted to the URL
 * by `useUrlFilters`, and mapped back to display text by
 * `MENTOR_EXPERIENCE_LABELS`. They are deliberately *not* the Junior / Mid-Level /
 * Senior / Executive set in `EXPERIENCE_LEVELS` — changing them would invalidate
 * every bookmarked filter URL and silently stop matching mentors.
 */
export const EXPERIENCE_OPTIONS = MENTOR_EXPERIENCE_LEVELS;

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0];

/** Filter keys this sidebar controls (sorting lives elsewhere). */
const SIDEBAR_FILTER_KEYS = [
  "expertise",
  "experience",
  "industry",
  "minRating",
  "minHourlyRate",
  "maxHourlyRate",
] as const satisfies readonly (keyof MentorFilters)[];

export type MentorFilterSidebarVariant = "list" | "pills";

export interface MentorFilterSidebarProps {
  filters: MentorFilters;
  onFiltersChange: (filters: MentorFilters) => void;
  onClearFilters: () => void;
  /**
   * "list" stacks checkboxes vertically (desktop sidebar).
   * "pills" wraps them as tappable chips (mobile drawer).
   */
  variant?: MentorFilterSidebarVariant;
  /** Show the "Filters" heading with the active count and Clear all button. */
  showHeader?: boolean;
  className?: string;
}

interface CheckboxGroupProps {
  title: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  variant: MentorFilterSidebarVariant;
}

/** One independent multi-select group. Only reports its own selection. */
function CheckboxGroup({
  title,
  options,
  selected,
  onChange,
  variant,
}: CheckboxGroupProps) {
  const groupId = useId();

  const toggle = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((o) => o !== option)
        : [...selected, option]
    );
  };

  return (
    <div role="group" aria-labelledby={`${groupId}-title`}>
      <h3
        id={`${groupId}-title`}
        className="text-sm font-semibold text-slate-900 mb-3"
      >
        {title}
      </h3>
      <div className={variant === "pills" ? "flex flex-wrap gap-2" : "space-y-2"}>
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "cursor-pointer",
              variant === "pills"
                ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                : "flex items-center gap-2"
            )}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggle(option)}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
            />
            <span
              className={cn(variant === "list" && "text-sm text-slate-700")}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

/**
 * Reusable mentor filter panel. Each control is independent: changing one
 * only updates its own key in `filters`. Used by both the desktop sidebar
 * and the mobile filter drawer so the two never drift apart.
 */
export default function MentorFilterSidebar({
  filters,
  onFiltersChange,
  onClearFilters,
  variant = "list",
  showHeader = true,
  className,
}: MentorFilterSidebarProps) {
  const setFilter = <K extends keyof MentorFilters>(
    key: K,
    value: MentorFilters[K] | undefined
  ) => {
    const isEmpty =
      value === undefined || (Array.isArray(value) && value.length === 0);
    onFiltersChange({ ...filters, [key]: isEmpty ? undefined : value });
  };

  /**
   * #1206 — the rate range.
   *
   * `MentorFilters.minHourlyRate` has existed on the type and is sent to
   * `mentorApi.getMentors`, but nothing in the UI ever set it: the sidebar only
   * offered a maximum, so a mentor could be capped from above but never bounded
   * from below.
   *
   * "Valid range is enforced" means the pair is kept ordered. When an edit would
   * invert it, the opposite bound is moved rather than the edit being dropped —
   * silently discarding what the user just typed is worse than moving a number
   * they can see and correct. Doing it here rather than during render keeps the
   * correction on the event that caused it.
   */
  const setRateBound = (bound: "minHourlyRate" | "maxHourlyRate", raw: string) => {
    const value = toPositiveNumber(raw);
    const next: MentorFilters = { ...filters, [bound]: value };

    if (
      next.minHourlyRate !== undefined &&
      next.maxHourlyRate !== undefined &&
      next.minHourlyRate > next.maxHourlyRate
    ) {
      if (bound === "minHourlyRate") {
        next.maxHourlyRate = next.minHourlyRate;
      } else {
        next.minHourlyRate = next.maxHourlyRate;
      }
    }

    onFiltersChange(next);
  };

  const isRangeInverted =
    filters.minHourlyRate !== undefined &&
    filters.maxHourlyRate !== undefined &&
    filters.minHourlyRate > filters.maxHourlyRate;

  const activeCount = SIDEBAR_FILTER_KEYS.reduce((count, key) => {
    const value = filters[key];
    if (Array.isArray(value)) return count + value.length;
    return value ? count + 1 : count;
  }, 0);

  return (
    <div className={cn("space-y-6", className)}>
      {showHeader && (
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Filters
          {activeCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none focus:underline"
            aria-label="Clear all mentor filters"
          >
            Clear all
          </button>
        )}
      </div>
      )}

      <CheckboxGroup
        title="Expertise"
        options={EXPERTISE_OPTIONS}
        selected={filters.expertise || []}
        onChange={(v) => setFilter("expertise", v)}
        variant={variant}
      />

      <ExperienceLevelFilter
        selectedLevels={filters.experience || []}
        onChange={(levels) =>
          setFilter(
            "experience",
            levels.filter(isMentorExperienceLevel)
          )
        }
        variant={variant}
        options={EXPERIENCE_OPTIONS.map((value) => ({
          value,
          label: MENTOR_EXPERIENCE_LABELS[value],
        }))}
      />

      {variant === "list" ? (
        <IndustryFilter
          selectedIndustries={filters.industry || []}
          onChange={(v) => setFilter("industry", v)}
        />
      ) : (
        <CheckboxGroup
          title="Industry"
          options={DEFAULT_INDUSTRIES}
          selected={filters.industry || []}
          onChange={(v) => setFilter("industry", v)}
          variant={variant}
        />
      )}

      <div>
        <label
          htmlFor="filter-min-rating"
          className="block text-sm font-semibold text-slate-900 mb-3"
        >
          Minimum Rating
        </label>
        <select
          id="filter-min-rating"
          value={filters.minRating || ""}
          onChange={(e) => setFilter("minRating", Number(e.target.value) || undefined)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Any rating</option>
          {RATING_OPTIONS.map((rating) => (
            <option key={rating} value={rating}>
              {rating.toFixed(1)}+
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="filter-min-rate"
          className="block text-sm font-semibold text-slate-900 mb-3"
        >
          Hourly Rate
        </label>

        <div className="flex items-center gap-2">
          <input
            id="filter-min-rate"
            type="number"
            min={0}
            inputMode="numeric"
            aria-label="Minimum hourly rate"
            value={filters.minHourlyRate ?? ""}
            onChange={(e) => setRateBound("minHourlyRate", e.target.value)}
            placeholder="Min"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <span aria-hidden="true" className="text-slate-400 text-sm">
            –
          </span>
          <input
            id="filter-max-rate"
            type="number"
            min={0}
            inputMode="numeric"
            aria-label="Maximum hourly rate"
            value={filters.maxHourlyRate ?? ""}
            onChange={(e) => setRateBound("maxHourlyRate", e.target.value)}
            placeholder="Max"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {isRangeInverted ? (
          <p
            role="alert"
            className="mt-2 flex items-start gap-1 text-xs text-amber-700"
          >
            <span aria-hidden="true">⚠</span>
            <span>
              Minimum is above maximum — no mentor can match. Maximum has been
              raised to the minimum.
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Parse a rate input, treating blank and non-numeric as "no bound". */
function toPositiveNumber(raw: string): number | undefined {
  if (raw.trim() === "") return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return undefined;
  return value;
}

export { MentorFilterSidebar };
export { IndustryFilter } from "@/components/mentor-discovery/IndustryFilter";
