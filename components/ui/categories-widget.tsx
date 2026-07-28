'use client';

import React from 'react';

// Type definitions
interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoriesWidgetProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  totalDiscussions: number;
}

// Reusable list item component for categories
function CategoryListItem({
  name,
  count,
  isSelected,
  onClick
}: {
  name: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
        isSelected 
          ? 'bg-blue-100 text-blue-700' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <span className="flex justify-between items-center">
        <span>{name}</span>
        <span className="text-gray-500 text-sm">{count}</span>
      </span>
    </button>
  );
}

export function CategoriesWidget({
  categories,
  selectedCategory,
  onCategorySelect,
  totalDiscussions
}: CategoriesWidgetProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="space-y-1">
        {/* All Discussions option */}
        <CategoryListItem
          name="All Discussions"
          count={totalDiscussions}
          isSelected={selectedCategory === null}
          onClick={() => onCategorySelect(null)}
        />
        {/* Individual categories */}
        {categories.map((category) => (
          <CategoryListItem
            key={category.id}
            name={category.name}
            count={category.count}
            isSelected={selectedCategory === category.id}
            onClick={() => onCategorySelect(category.id)}
          />
        ))}
      </div>
    </div>
  );
}