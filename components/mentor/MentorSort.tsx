// Mentor sort control — rating, price, experience, popularity (#854)
"use client";
import React from "react";
import type { SortOption } from "@/types/mentor";

interface MentorSortProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Rating", value: "rating" },
  { label: "Price", value: "price" },
  { label: "Experience", value: "experience" },
  { label: "Popularity", value: "popularity" },
];

const MentorSort = ({ value, onChange }: MentorSortProps) => (
  <div className="flex items-center gap-2">
    <label htmlFor="mentor-sort" className="text-sm text-gray-600 font-medium">
      Sort by:
    </label>
    <select
      id="mentor-sort"
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default MentorSort;
