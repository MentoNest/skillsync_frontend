"use client";

import { cn } from "@/lib/utils";

export interface LoadMoreDiscussionsButtonProps {
  /** Whether another page of discussions is available. */
  hasMore: boolean;
  /**
   * True while the next page is being fetched. The button stays mounted but
   * disabled so the layout does not jump when a request starts.
   */
  isLoading?: boolean;
  /** Requests the next page. */
  onLoadMore: () => void;
  /** Forces the button disabled independently of `isLoading`. */
  disabled?: boolean;
  /** Button text. Override to reuse the control outside the community feed. */
  label?: string;
  /** Shown once `hasMore` becomes false. */
  endMessage?: string;
  /** Announced while a page is in flight. */
  loadingMessage?: string;
  /** Optional extra classes for layout flexibility. */
  className?: string;
}

/**
 * Load-more control for a paginated discussion feed (#986).
 *
 * Three states, all driven by props: idle, loading (disabled + spinner) and
 * end-of-results. The feed keeps its infinite-scroll sentinel as well, so this
 * is the explicit, keyboard-accessible path to the same `onLoadMore` callback.
 */
export function LoadMoreDiscussionsButton({
  hasMore,
  isLoading = false,
  onLoadMore,
  disabled = false,
  label = "Load more discussions",
  endMessage = "You've reached the end of the feed",
  loadingMessage = "Loading more discussions",
  className,
}: LoadMoreDiscussionsButtonProps) {
  if (!hasMore) {
    return (
      <p
        role="status"
        className={cn(
          "py-4 text-center text-sm text-[var(--muted)]",
          className
        )}
      >
        {endMessage}
      </p>
    );
  }

  const isDisabled = disabled || isLoading;

  return (
    <div className={cn("flex justify-center py-4", className)}>
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isDisabled}
        aria-busy={isLoading}
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        )}
        <span>{isLoading ? "Loading…" : label}</span>
      </button>

      {/* The visible button text swaps to "Loading…", so the full state is
          announced from a live region instead. */}
      <span role="status" aria-live="polite" className="sr-only">
        {isLoading ? loadingMessage : ""}
      </span>
    </div>
  );
}
