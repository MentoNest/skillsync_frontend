// Community categories sidebar widget (#877)
import React from "react";

interface Category {
  name: string;
  discussionCount: number;
}

interface CommunityCategoriesSidebarProps {
  categories?: Category[];
}

const DEFAULT_CATEGORIES: Category[] = [
  { name: "Career Growth", discussionCount: 124 },
  { name: "Leadership", discussionCount: 89 },
  { name: "Interview Prep", discussionCount: 203 },
  { name: "Salary & Compensation", discussionCount: 67 },
  { name: "Work-Life Balance", discussionCount: 45 },
  { name: "Networking", discussionCount: 112 },
];

const CommunityCategoriesSidebar = ({
  categories = DEFAULT_CATEGORIES,
}: CommunityCategoriesSidebarProps) => (
  <nav aria-label="Community categories" className="bg-white rounded-xl border border-gray-200 p-4">
    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
    <ul className="space-y-1">
      {categories.map((cat) => (
        <li key={cat.name}>
          <button
            type="button"
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label={`${cat.name} category with ${cat.discussionCount} discussions`}
          >
            <span>{cat.name}</span>
            <span className="text-xs text-gray-500 font-medium" aria-hidden="true">
              {cat.discussionCount}
            </span>
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default CommunityCategoriesSidebar;
