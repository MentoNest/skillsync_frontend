"use client";

import { CATEGORIES } from "@/lib/filters";

interface CategoriesSidebarWidgetProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
  counts?: Record<string, number>;
}

export default function CategoriesSidebarWidget({
  selected,
  onSelect,
  counts,
}: CategoriesSidebarWidgetProps) {
  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            selected === null
              ? "bg-cyan-100 text-cyan-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="flex justify-between">
            <span>All Discussions</span>
            <span className="text-gray-400">{total}</span>
          </span>
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelect(selected === cat.value ? null : cat.value)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selected === cat.value
                ? "bg-cyan-100 text-cyan-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex justify-between">
              <span>{cat.label}</span>
              <span className="text-gray-400">
                {counts?.[cat.value] ?? cat.count ?? 0}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
