// Empty state for mentor listings when no results match (#853)
import React from "react";

interface MentorEmptyStateProps {
  onReset?: () => void;
}

const MentorEmptyState = ({ onReset }: MentorEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="text-5xl mb-4">🔍</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      No mentors found
    </h3>
    <p className="text-gray-500 mb-6 max-w-sm">
      Try adjusting your filters or search terms to find the right mentor.
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

export default MentorEmptyState;
