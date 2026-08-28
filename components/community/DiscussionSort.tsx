// Discussion sorting selector (#884)
"use client";
import React from "react";

export type SortOption = "trending" | "latest" | "most-replies" | "most-liked";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "latest", label: "Latest" },
  { value: "most-replies", label: "Most Replies" },
  { value: "most-liked", label: "Most Liked" },
];

interface DiscussionSortProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const DiscussionSort = ({ value, onChange }: DiscussionSortProps) => (
  <div className="flex items-center gap-2">
    <label htmlFor="discussion-sort" className="text-sm text-gray-500 whitespace-nowrap">
      Sort by:
    </label>
    <select
      id="discussion-sort"
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default DiscussionSort;
