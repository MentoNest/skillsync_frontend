// Empty state for community discussions (#888)
import React from "react";

interface CommunityEmptyStateProps {
  title?: string;
  message?: string;
  onStartDiscussion?: () => void;
}

const CommunityEmptyState = ({
  title = "No discussions yet",
  message = "Be the first to start a conversation. Share your thoughts, ask questions, or spark a debate with the community.",
  onStartDiscussion,
}: CommunityEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="mb-4 text-5xl">💬</div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mb-6 max-w-sm text-gray-500">{message}</p>
    {onStartDiscussion && (
      <button
        onClick={onStartDiscussion}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        Start a Discussion
      </button>
    )}
  </div>
);

export default CommunityEmptyState;
