"use client";

import { CATEGORIES } from "@/lib/filters";

interface CategoryFilterBarProps {
  selected: string | null;
  onChange: (category: string | null) => void;
  counts?: Record<string, number>;
}

export default function CategoryFilterBar({
  selected,
  onChange,
  counts,
}: CategoryFilterBarProps) {
  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by category"
    >
      <button
        onClick={() => onChange(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? "bg-cyan-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All {total > 0 && <span className="ml-1 opacity-70">({total})</span>}
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(selected === cat.value ? null : cat.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === cat.value
              ? "bg-cyan-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat.label}
          {counts?.[cat.value] !== undefined && (
            <span className="ml-1 opacity-70">({counts[cat.value]})</span>
          )}
        </button>
      ))}
    </div>
  );
}
