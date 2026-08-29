// Empty state for community discussions (#888)
import React from "react";

interface CommunityEmptyStateProps {
  onStartDiscussion?: () => void;
}

const CommunityEmptyState = ({ onStartDiscussion }: CommunityEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="text-5xl mb-4">💬</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      No discussions yet
    </h3>
    <p className="text-gray-500 mb-6 max-w-sm">
      Be the first to start a conversation. Share your thoughts, ask questions,
      or spark a debate with the community.
    </p>
    {onStartDiscussion && (
      <button
        onClick={onStartDiscussion}
        className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        Start a Discussion
      </button>
    )}
  </div>
);

export default CommunityEmptyState;
