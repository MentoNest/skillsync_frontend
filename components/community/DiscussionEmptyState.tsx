// Empty state for community discussions when no results match (#992)
import React from "react";

interface DiscussionEmptyStateProps {
  onReset?: () => void;
}

const DiscussionEmptyState = ({ onReset }: DiscussionEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="text-5xl mb-4">🔍</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      No discussions found
    </h3>
    <p className="text-gray-500 mb-6 max-w-sm">
      Try adjusting your search or category to find what you are looking for.
    </p>
    {onReset && (
      <button
        onClick={onReset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Clear filters
      </button>
    )}
  </div>
);

export default DiscussionEmptyState;
