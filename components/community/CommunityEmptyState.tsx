import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CommunityEmptyStateProps {
  /**
   * True when the feed is empty because a category/search filter is active,
   * which changes the message and reveals the "Clear filters" action.
   */
  filtered?: boolean;
  /** Clears the active filters. Omit to hide the secondary action. */
  onClearFilters?: () => void;
  /** Optional extra classes for layout flexibility. */
  className?: string;
}

/**
 * Empty state shown when the community discussion feed has no results.
 *
 * Renders an inline illustration, a helpful message and a Start Discussion
 * CTA. Layout goes full-width/stacked on mobile and inline on larger screens.
 * The status role announces the state when it replaces the loading feed.
 */
export function CommunityEmptyState({
  filtered = false,
  onClearFilters,
  className,
}: CommunityEmptyStateProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--secondary)] px-6 py-12 text-center sm:px-10 sm:py-16",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)] sm:h-20 sm:w-20"
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 16a4 4 0 0 1 4-4h26a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H25l-8 7v-7h-3a4 4 0 0 1-4-4V16Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M38 26h12a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-2v6l-6-6h-4"
          />
          <path strokeLinecap="round" d="M17 21h18M17 28h11" />
        </svg>
      </span>

      <h2 className="mt-5 text-lg font-semibold text-[var(--foreground)] sm:text-xl">
        {filtered ? "No discussions match your filters" : "No discussions yet"}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        {filtered
          ? "Try a different category or search term, or start a new conversation."
          : "Be the first to start a conversation and bring the community together."}
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center">
        <Link
          href="/community/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary)]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:w-auto"
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Start Discussion
        </Link>

        {filtered && onClearFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:w-auto"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </section>
  );
}
