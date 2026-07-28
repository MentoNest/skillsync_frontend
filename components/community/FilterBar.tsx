'use client';

import CategoryFilter from './CategoryFilter';
import { SORT_OPTIONS, type SortOrder, DEFAULT_FILTER_STATE } from '@/lib/filters';

interface Props {
  category: string | null;
  sort: SortOrder;
  search: string;
  onCategoryChange: (category: string | null) => void;
  onSortChange: (sort: SortOrder) => void;
  onSearchChange: (search: string) => void;
  onReset?: () => void;
}

export default function FilterBar({
  category,
  sort,
  search,
  onCategoryChange,
  onSortChange,
  onSearchChange,
  onReset,
}: Props) {
  const hasActiveFilters = category !== null || sort !== 'latest' || search !== '';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-sm text-gray-500">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOrder)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <CategoryFilter selected={category} onChange={onCategoryChange} />
        {hasActiveFilters && onReset && (
          <button
            onClick={() => {
              onReset?.();
              onCategoryChange(DEFAULT_FILTER_STATE.category);
              onSortChange(DEFAULT_FILTER_STATE.sort);
              onSearchChange(DEFAULT_FILTER_STATE.search);
            }}
            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
