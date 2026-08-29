// Reusable Filter Sidebar component for mentor filtering (#862).
"use client";

import React from "react";
import type { ExperienceLevel } from "@/types/mentor";
import { EXPERTISE_CATEGORIES, INDUSTRY_CATEGORIES } from "@/lib/mentors";
import ExperienceLevelFilter from "./ExperienceLevelFilter";
import HourlyRateFilter from "./HourlyRateFilter";

export interface FilterSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  expertise: string[];
  onToggleExpertise: (value: string) => void;
  industries?: string[];
  onToggleIndustry?: (value: string) => void;
  experience: ExperienceLevel | "";
  onExperienceChange: (level: ExperienceLevel | "") => void;
  minRate: number | "";
  maxRate: number | "";
  onRateChange: (min: number, max: number) => void;
  activeFilterCount: number;
  onClearAll: () => void;
  className?: string;
  showHeader?: boolean;
}

export default function FilterSidebar({
  search,
  onSearchChange,
  expertise,
  onToggleExpertise,
  industries = [],
  onToggleIndustry,
  experience,
  onExperienceChange,
  minRate,
  maxRate,
  onRateChange,
  activeFilterCount,
  onClearAll,
  className = "",
  showHeader = false,
}: FilterSidebarProps) {
  return (
    <div
      className={`space-y-6 ${className}`}
      role="group"
      aria-label="Mentor filters"
    >
      {showHeader && (
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-xs font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              Reset all
            </button>
          )}
        </div>
      )}

      {/* Search Input Section */}
      <div>
        <label
          htmlFor="filter-sidebar-search"
          className="text-sm font-medium text-gray-700 block mb-1.5"
        >
          Keyword Search
        </label>
        <div className="relative">
          <input
            id="filter-sidebar-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Name, skills, or headline"
            aria-label="Search mentors by name, skills, or headline"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear keyword search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Industry Multi-Select Checkbox Group */}
      {onToggleIndustry && (
        <fieldset className="border-t border-gray-100 pt-4">
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Industry
          </legend>
          <div className="space-y-2">
            {INDUSTRY_CATEGORIES.map((category) => {
              const value = category.toLowerCase();
              const isChecked = industries.includes(value);
              return (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleIndustry(value)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 accent-primary-600"
                  />
                  <span className={isChecked ? "font-medium text-primary-900" : ""}>
                    {category}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Expertise Categories Checkbox Group */}
      <fieldset className="border-t border-gray-100 pt-4">
        <legend className="text-sm font-medium text-gray-700 mb-2">
          Expertise & Specialization
        </legend>
        <div className="space-y-2">
          {EXPERTISE_CATEGORIES.map((category) => {
            const value = category.toLowerCase();
            const isChecked = expertise.includes(value);
            return (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleExpertise(value)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 accent-primary-600"
                />
                <span className={isChecked ? "font-medium text-primary-900" : ""}>
                  {category}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Experience Level Selector */}
      <div className="border-t border-gray-100 pt-4">
        <ExperienceLevelFilter value={experience} onChange={onExperienceChange} />
      </div>

      {/* Hourly Rate Range Filter */}
      <div className="border-t border-gray-100 pt-4">
        <HourlyRateFilter
          min={typeof minRate === "number" && !Number.isNaN(minRate) ? minRate : 0}
          max={typeof maxRate === "number" && !Number.isNaN(maxRate) ? maxRate : 200}
          onChange={onRateChange}
        />
      </div>

      {/* Clear Filters Action */}
      {activeFilterCount > 0 && !showHeader && (
        <div className="border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClearAll}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Clear all filters ({activeFilterCount})
          </button>
        </div>
      )}
    </div>
  );
}
