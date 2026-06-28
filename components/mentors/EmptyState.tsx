import React from 'react';

interface EmptyStateProps {
  onClearFilters?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.85-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        No mentors match your filters
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        Try removing a tag or two to broaden your search.
      </p>
      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 focus:outline-none focus:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;