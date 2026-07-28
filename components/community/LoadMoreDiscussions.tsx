'use client';

interface LoadMoreDiscussionsProps {
  onClick: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

export default function LoadMoreDiscussions({ onClick, isLoading = false, hasMore = true }: LoadMoreDiscussionsProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center py-6">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="min-w-[200px] px-6 py-2.5 rounded-lg border border-cyan-300 text-cyan-600 text-sm font-medium hover:bg-cyan-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : (
          'Load More Discussions'
        )}
      </button>
    </div>
  );
}
