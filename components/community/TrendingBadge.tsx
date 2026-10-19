import type { Discussion } from "@/lib/community-types";
import { isTrendingDiscussion } from "@/lib/community-trending";
import { cn } from "@/lib/utils";

/**
 * Visual indicator for trending discussions (#985).
 *
 * * Optional — renders nothing when `trending` is false, so it can be dropped
 *   into any card without a wrapping condition.
 * * Accessible — the flame is `aria-hidden` and the label is announced as
 *   "Trending discussion", so the meaning does not rely on colour alone.
 * * Visually distinct — a rose→orange gradient pill that stands apart from the
 *   neutral Pinned/Locked badges.
 */

export interface TrendingBadgeProps {
  /** When false the badge renders nothing. */
  trending?: boolean;
  /** Visible text. Overridable for localisation. */
  label?: string;
  /** Extra classes, appended last so they can override the defaults. */
  className?: string;
}

/** Convenience wrapper: derive the state straight from a discussion. */
export interface TrendingBadgeForDiscussionProps
  extends Omit<TrendingBadgeProps, "trending"> {
  discussion: Pick<Discussion, "likeCount" | "replyCount" | "viewCount">;
  /** Force the badge on/off, bypassing the score. */
  trending?: boolean;
}

export function TrendingBadge({
  trending = true,
  label = "Trending",
  className,
}: TrendingBadgeProps) {
  if (!trending) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-2 py-0.5 text-xs font-semibold text-white",
        className
      )}
      aria-label="Trending discussion"
    >
      <svg
        className="h-3 w-3"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.001 2c.5 3.5-2.5 5-2.5 8a2.5 2.5 0 0 0 5 0c0-.7-.2-1.3-.5-1.9 2.1 1.3 3.5 3.5 3.5 6.4a5.5 5.5 0 1 1-11 0c0-4.6 5.5-8.4 5.5-12.5z" />
      </svg>
      {label}
    </span>
  );
}

/** Renders the badge only when the discussion's engagement is trending. */
export function TrendingBadgeForDiscussion({
  discussion,
  trending = isTrendingDiscussion(discussion),
  ...rest
}: TrendingBadgeForDiscussionProps) {
  return <TrendingBadge trending={trending} {...rest} />;
}

export default TrendingBadge;
