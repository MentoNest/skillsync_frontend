"use client";

import { useDiscussionLike } from "@/hooks/useDiscussionLike";

interface LikeDiscussionButtonProps {
  discussionId: string;
  initialLiked?: boolean;
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

export function LikeDiscussionButton({
  discussionId,
  initialLiked = false,
  initialCount = 0,
  onCountChange,
}: LikeDiscussionButtonProps) {
  const { isLiked, likeCount, isToggling, error, toggle } = useDiscussionLike(
    discussionId,
    initialLiked,
    initialCount,
  );

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={async () => {
          await toggle();
          // parent may lag one tick; count is also shown locally
          onCountChange?.(isLiked ? Math.max(0, likeCount - 1) : likeCount + 1);
        }}
        disabled={isToggling}
        aria-pressed={isLiked}
        aria-label={isLiked ? "Unlike discussion" : "Like discussion"}
        className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60 ${
          isLiked
            ? "text-rose-600 hover:bg-rose-50"
            : "text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
        }`}
      >
        <svg
          className="h-4 w-4"
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{likeCount}</span>
      </button>
      {error && (
        <span role="alert" className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
