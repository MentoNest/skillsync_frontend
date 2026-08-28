// Load More Discussions button component (#876)
import React from "react";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

const LoadMoreButton = ({
  onClick,
  isLoading = false,
  hasMore = true,
}: LoadMoreButtonProps) => {
  if (!hasMore) return null;
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-6 py-2.5 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Loading...
          </span>
        ) : (
          "Load More Discussions"
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;
