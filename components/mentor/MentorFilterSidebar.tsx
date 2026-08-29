// Filter panel used by both the desktop sidebar and the mobile drawer (#862).
"use client";

import React from "react";
import type { ExperienceLevel } from "@/types/mentor";
import { EXPERTISE_CATEGORIES } from "@/lib/mentors";
import ExperienceLevelFilter from "./ExperienceLevelFilter";
import HourlyRateFilter from "./HourlyRateFilter";

interface MentorFilterSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  expertise: string[];
  onToggleExpertise: (value: string) => void;
  experience: ExperienceLevel | "";
  onExperienceChange: (level: ExperienceLevel | "") => void;
  minRate: number | "";
  maxRate: number | "";
  onRateChange: (min: number, max: number) => void;
  activeFilterCount: number;
  onClearAll: () => void;
}

const MentorFilterSidebar = ({
  search,
  onSearchChange,
  expertise,
  onToggleExpertise,
  experience,
  onExperienceChange,
  minRate,
  maxRate,
  onRateChange,
  activeFilterCount,
  onClearAll,
}: MentorFilterSidebarProps) => (
  <div className="space-y-6" role="group" aria-label="Mentor filters">
    <div>
      <p className="text-sm font-medium text-gray-700">Search</p>
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Name, skill or title"
        aria-label="Search mentors"
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>

    <fieldset>
      <legend className="text-sm font-medium text-gray-700">Expertise</legend>
      <div className="mt-2 space-y-2">
        {EXPERTISE_CATEGORIES.map((category) => {
          const value = category.toLowerCase();
          const isChecked = expertise.includes(value);
          return (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleExpertise(value)}
                className="accent-primary-600"
              />
              {category}
            </label>
          );
        })}
      </div>
    </fieldset>

    <ExperienceLevelFilter value={experience} onChange={onExperienceChange} />

    <HourlyRateFilter
      min={typeof minRate === "number" && !Number.isNaN(minRate) ? minRate : 0}
      max={typeof maxRate === "number" && !Number.isNaN(maxRate) ? maxRate : 200}
      onChange={onRateChange}
    />

    {activeFilterCount > 0 && (
      <button
        type="button"
        onClick={onClearAll}
        className="rounded text-sm font-medium text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        Clear all filters ({activeFilterCount})
      </button>
    )}
  </div>
);

export default MentorFilterSidebar;