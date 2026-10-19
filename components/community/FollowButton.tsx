"use client";

interface FollowButtonProps {
  /** Target being followed, used in the accessible label. */
  targetName: string;
  isFollowing: boolean;
  isPending?: boolean;
  onToggle: () => void;
  /** `user` renders a person-plus icon, `category` a bell. */
  kind?: "user" | "category";
  className?: string;
}

/**
 * Presentational follow/unfollow toggle shared by the discussion card (#1015)
 * and the community sidebar (#1014).
 *
 * The button is a toggle button (`aria-pressed`) so assistive technology
 * announces "Followed"/"Not followed" instead of two separate controls.
 */
export function FollowButton({
  targetName,
  isFollowing,
  isPending = false,
  onToggle,
  kind = "user",
  className = "",
}: FollowButtonProps) {
  const label = `${isFollowing ? "Unfollow" : "Follow"} ${targetName}`;
  const pendingLabel = isPending
    ? `${isFollowing ? "Unfollowing" : "Following"} ${targetName}`
    : label;

  const icon = kind === "category" ? (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ) : (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={isPending}
      aria-pressed={isFollowing}
      aria-label={pendingLabel}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60 ${
        isFollowing
          ? "bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20"
          : "bg-[var(--secondary)] text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--foreground)]"
      } ${className}`}
    >
      {isFollowing ? (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        icon
      )}
      <span>{isFollowing ? "Following" : "Follow"}</span>
    </button>
  );
}
