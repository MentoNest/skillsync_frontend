"use client";

import { MentorFilters } from "@/lib/mentor-types";

interface ExperienceLevelFilterProps {
  selectedLevels: string[];
  onChange: (levels: string[]) => void;
}

export const EXPERIENCE_LEVELS = [
  { value: "junior", label: "Junior" },
  { value: "mid-level", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
  { value: "executive", label: "Executive" },
] as const;

export default function ExperienceLevelFilter({
  selectedLevels,
  onChange,
}: ExperienceLevelFilterProps) {
  const handleToggle = (level: string) => {
    if (selectedLevels.includes(level)) {
      onChange(selectedLevels.filter((l) => l !== level));
    } else {
      onChange([...selectedLevels, level]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        Experience Level
      </h3>
      <div className="space-y-2">
        {EXPERIENCE_LEVELS.map(({ value, label }) => (
          <label
            key={value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedLevels.includes(value)}
              onChange={() => handleToggle(value)}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-offset-0"
              aria-label={`Filter by ${label} experience level`}
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
