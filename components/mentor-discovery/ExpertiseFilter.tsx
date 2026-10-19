"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export const DEFAULT_EXPERTISE_CATEGORIES = [
  "Frontend",
  "Backend",
  "UI/UX",
  "Product Management",
  "DevOps",
  "Full Stack",
  "Mobile",
  "Data Science",
  "Machine Learning",
  "QA Engineering",
];

export interface ExpertiseFilterProps {
  /** Currently selected expertise categories */
  selectedExpertise?: string[];
  /** Callback fired when selected expertise categories change */
  onChange: (selected: string[]) => void;
  /** Available expertise options (defaults to standard categories) */
  expertiseOptions?: string[];
  /** Optional mentor counts per expertise category */
  counts?: Record<string, number>;
  /** Title header for the filter section (default: "Expertise") */
  title?: string;
  /** Whether to show a clear button when categories are selected */
  showClear?: boolean;
  /** Optional callback fired when clear is clicked */
  onClear?: () => void;
  /** Custom className for the container */
  className?: string;
}

export function ExpertiseFilter({
  selectedExpertise = [],
  onChange,
  expertiseOptions = DEFAULT_EXPERTISE_CATEGORIES,
  counts,
  title = "Expertise",
  showClear = true,
  onClear,
  className,
}: ExpertiseFilterProps) {
  const filterGroupId = useId();

  const handleToggle = (expertise: string) => {
    const isSelected = selectedExpertise.includes(expertise);
    const updated = isSelected
      ? selectedExpertise.filter((e) => e !== expertise)
      : [...selectedExpertise, expertise];

    onChange(updated);
  };

  const handleClearAll = () => {
    onChange([]);
    onClear?.();
  };

  const hasSelections = selectedExpertise.length > 0;

  return (
    <div
      role="group"
      aria-labelledby={`${filterGroupId}-title`}
      className={cn("space-y-3", className)}
    >
      {/* Header with Title and Quick Actions */}
      <div className="flex items-center justify-between">
        <h3
          id={`${filterGroupId}-title`}
          className="text-sm font-semibold text-slate-900"
        >
          {title}
          {hasSelections && (
            <span className="ml-1.5 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
              {selectedExpertise.length}
            </span>
          )}
        </h3>

        {showClear && hasSelections && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors focus:outline-none focus:underline"
            aria-label="Clear expertise filters"
          >
            Clear
          </button>
        )}
      </div>

      {/* Expertise Options List */}
      <div className="space-y-2" role="list">
        {expertiseOptions.map((expertise) => {
          const isChecked = selectedExpertise.includes(expertise);
          const inputId = `${filterGroupId}-expertise-${expertise.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
          const count = counts?.[expertise];

          return (
            <label
              key={expertise}
              htmlFor={inputId}
              className={cn(
                "flex items-center justify-between gap-3 p-1.5 -mx-1.5 rounded-lg cursor-pointer transition-colors select-none group",
                isChecked ? "bg-indigo-50/60" : "hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <input
                  type="checkbox"
                  id={inputId}
                  checked={isChecked}
                  onChange={() => handleToggle(expertise)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition cursor-pointer"
                  aria-label={`Filter by ${expertise} expertise`}
                />
                <span
                  className={cn(
                    "text-sm truncate transition-colors",
                    isChecked
                      ? "font-medium text-indigo-900"
                      : "text-slate-700 group-hover:text-slate-900"
                  )}
                >
                  {expertise}
                </span>
              </div>

              {count !== undefined && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium shrink-0",
                    isChecked
                      ? "bg-indigo-100 text-indigo-800"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  {count}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default ExpertiseFilter;
