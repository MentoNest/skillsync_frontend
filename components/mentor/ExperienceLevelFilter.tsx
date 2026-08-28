// Experience level filter for mentor discovery (#841)
"use client";
import React from "react";
import type { ExperienceLevel } from "@/types/mentor";

interface ExperienceLevelFilterProps {
  value: ExperienceLevel | "";
  onChange: (level: ExperienceLevel | "") => void;
}

const LEVELS: { label: string; value: ExperienceLevel }[] = [
  { label: "Junior (0–2 yrs)", value: "junior" },
  { label: "Mid (2–5 yrs)", value: "mid" },
  { label: "Senior (5–10 yrs)", value: "senior" },
  { label: "Principal (10+ yrs)", value: "principal" },
];

const ExperienceLevelFilter = ({ value, onChange }: ExperienceLevelFilterProps) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-700">Experience Level</p>
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type="radio"
          name="experience-level"
          value=""
          checked={value === ""}
          onChange={() => onChange("")}
          className="accent-blue-600"
        />
        Any
      </label>
      {LEVELS.map((lvl) => (
        <label key={lvl.value} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="radio"
            name="experience-level"
            value={lvl.value}
            checked={value === lvl.value}
            onChange={() => onChange(lvl.value)}
            className="accent-blue-600"
          />
          {lvl.label}
        </label>
      ))}
    </div>
  </div>
);

export default ExperienceLevelFilter;
