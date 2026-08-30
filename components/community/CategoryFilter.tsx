// Community category filter component (#883)
"use client";
import React from "react";

const CATEGORIES = [
  "All",
  "Career Growth",
  "Leadership",
  "Interview Prep",
  "Networking",
  "Salary & Compensation",
  "Work-Life Balance",
];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({ selected, onChange }: CategoryFilterProps) => (
  <div className="flex flex-wrap gap-2" aria-label="Filter discussion categories">
    {CATEGORIES.map((cat) => {
      const normalized = cat === "All" ? "" : cat;
      const isSelected = (cat === "All" && !selected) || selected === cat;

      return (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(normalized)}
          aria-label={cat === "All" ? "Show all discussion categories" : `Filter discussions by ${cat}`}
          aria-pressed={isSelected}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
            isSelected
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;
