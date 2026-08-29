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
  <div className="flex flex-wrap gap-2">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat === "All" ? "" : cat)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
          (cat === "All" && !selected) || selected === cat
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
