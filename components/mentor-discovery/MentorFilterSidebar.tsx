"use client";

import { useEffect, useId, useState } from "react";
import {
  EXPERIENCE_OPTIONS,
  EXPERTISE_OPTIONS,
  INDUSTRY_OPTIONS,
  createEmptyFilters,
  type ExperienceLevel,
  type MentorFilters,
} from "./mentorData";

export interface MentorFilterSidebarProps {
  filters: MentorFilters;
  onChange: (filters: MentorFilters) => void;
  onClear?: () => void;
  expertiseOptions?: readonly string[];
  industryOptions?: readonly string[];
  experienceOptions?: readonly ExperienceLevel[];
  resultCount?: number;
  className?: string;
}

interface FilterPanelProps {
  titleId: string;
  filters: MentorFilters;
  onChange: (filters: MentorFilters) => void;
  onClear: () => void;
  activeCount: number;
  expertiseOptions: readonly string[];
  industryOptions: readonly string[];
  experienceOptions: readonly ExperienceLevel[];
  experienceName: string;
}

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function FilterPanel({
  titleId,
  filters,
  onChange,
  onClear,
  activeCount,
  expertiseOptions,
  industryOptions,
  experienceOptions,
  experienceName,
}: FilterPanelProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 id={titleId} className="text-base font-semibold text-slate-900">
          Filters
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded text-sm font-medium text-purple-700 hover:text-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-5 space-y-6">
        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">Expertise</legend>
          <div className="mt-3 space-y-2">
            {expertiseOptions.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-purple-700"
                  checked={filters.expertise.includes(option)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      expertise: toggleValue(filters.expertise, option),
                    })
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">Industry</legend>
          <div className="mt-3 space-y-2">
            {industryOptions.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-purple-700"
                  checked={filters.industry.includes(option)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      industry: toggleValue(filters.industry, option),
                    })
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">
            Experience level
          </legend>
          <div className="mt-3 space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name={experienceName}
                className="h-4 w-4 border-slate-300 accent-purple-700"
                checked={filters.experience === ""}
                onChange={() => onChange({ ...filters, experience: "" })}
              />
              Any level
            </label>
            {experienceOptions.map((level) => (
              <label
                key={level}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="radio"
                  name={experienceName}
                  className="h-4 w-4 border-slate-300 accent-purple-700"
                  checked={filters.experience === level}
                  onChange={() => onChange({ ...filters, experience: level })}
                />
                {level}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default function MentorFilterSidebar({
  filters,
  onChange,
  onClear,
  expertiseOptions = EXPERTISE_OPTIONS,
  industryOptions = INDUSTRY_OPTIONS,
  experienceOptions = EXPERIENCE_OPTIONS,
  resultCount,
  className = "",
}: MentorFilterSidebarProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const drawerId = `${id}-drawer`;
  const desktopTitleId = `${id}-desktop-title`;
  const drawerTitleId = `${id}-drawer-title`;
  const activeCount =
    filters.expertise.length + filters.industry.length + (filters.experience ? 1 : 0);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const clear = () => {
    if (onClear) onClear();
    else onChange(createEmptyFilters());
  };

  return (
    <aside className={`${className} md:col-span-1`} aria-label="Mentor filters">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={drawerId}
        className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 md:hidden"
      >
        <span>Filters</span>
        <span className="flex items-center gap-2">
          {activeCount > 0 && (
            <span className="rounded-full bg-purple-700 px-2 py-0.5 text-xs text-white">
              {activeCount}
            </span>
          )}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
          </svg>
        </span>
      </button>

      <div className="sticky top-24 hidden md:block">
        <FilterPanel
          titleId={desktopTitleId}
          filters={filters}
          onChange={onChange}
          onClear={clear}
          activeCount={activeCount}
          expertiseOptions={expertiseOptions}
          industryOptions={industryOptions}
          experienceOptions={experienceOptions}
          experienceName={`${id}-desktop-experience`}
        />
      </div>

      {open && (
        <div
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={drawerTitleId}
          className="fixed inset-0 z-[60] md:hidden"
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-slate-900/50"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-slate-50 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 id={drawerTitleId} className="text-lg font-semibold text-slate-900">
                Filters
              </h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setOpen(false)}
                className="rounded p-1 text-slate-600 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterPanel
                titleId={`${id}-drawer-panel-title`}
                filters={filters}
                onChange={onChange}
                onClear={clear}
                activeCount={activeCount}
                expertiseOptions={expertiseOptions}
                industryOptions={industryOptions}
                experienceOptions={experienceOptions}
                experienceName={`${id}-drawer-experience`}
              />
            </div>
            <div className="border-t border-slate-200 bg-white p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full rounded-lg bg-purple-700 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                Show {resultCount ?? "matching"} {resultCount === 1 ? "mentor" : "mentors"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
