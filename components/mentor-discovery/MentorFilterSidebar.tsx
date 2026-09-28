"use client";

import React, { useId } from "react";
import { MentorFilters } from "@/lib/mentor-types";
import { cn } from "@/lib/utils";
import IndustryFilter, {
  DEFAULT_INDUSTRIES,
} from "@/components/mentor-discovery/IndustryFilter";

export const EXPERTISE_OPTIONS = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Product Management",
  "UX Design",
  "QA Engineering",
];

export const EXPERIENCE_OPTIONS = ["junior", "mid", "senior", "lead", "principal"];

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0];

/** Filter keys this sidebar controls (sorting lives elsewhere). */
const SIDEBAR_FILTER_KEYS = [
  "expertise",
  "experience",
  "industry",
  "minRating",
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
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  variant: MentorFilterSidebarVariant;
  capitalize?: boolean;
}

/** One independent multi-select group. Only reports its own selection. */
function CheckboxGroup({
  title,
  options,
  selected,
  onChange,
  variant,
  capitalize,
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
              className={cn(
                variant === "list" && "text-sm text-slate-700",
                capitalize && "capitalize"
              )}
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

      <CheckboxGroup
        title="Experience Level"
        options={EXPERIENCE_OPTIONS}
        selected={filters.experience || []}
        onChange={(v) => setFilter("experience", v)}
        variant={variant}
        capitalize
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
          htmlFor="filter-max-rate"
          className="block text-sm font-semibold text-slate-900 mb-3"
        >
          Max Hourly Rate
        </label>
        <input
          id="filter-max-rate"
          type="number"
          min={0}
          value={filters.maxHourlyRate || ""}
          onChange={(e) => setFilter("maxHourlyRate", Number(e.target.value) || undefined)}
          placeholder="e.g., 200"
          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}

export { MentorFilterSidebar };
export { default, MentorFilterSidebar } from "@/components/mentor-discovery/MentorFilterSidebar";
export type { MentorFilterSidebarProps } from "@/components/mentor-discovery/MentorFilterSidebar";
export { IndustryFilter } from "@/components/mentor-discovery/IndustryFilter";    
