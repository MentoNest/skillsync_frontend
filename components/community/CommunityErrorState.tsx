"use client";

interface CommunityErrorStateProps {
  /** Headline shown above the error message. */
  title?: string;
  /** Human readable error detail. */
  message?: string;
  /**
   * Retry handler. It should re-issue the request that failed; the wrapper
   * only owns the pending/disabled presentation.
   */
  onRetry?: () => void;
  /** True while the retried request is in flight. */
  isRetrying?: boolean;
  retryLabel?: string;
  className?: string;
}

/**
 * Reusable error state for failed Community requests (#999).
 *
 * Rendered as `role="alert"` so assistive technology announces the failure as
 * soon as it appears, with a single retry action that re-invokes the data
 * request. Retry is disabled and announced as busy while it runs.
 */
export function CommunityErrorState({
  title = "Something went wrong",
  message = "We couldn't load the community feed. Please try again.",
  onRetry,
  isRetrying = false,
  retryLabel = "Try again",
  className = "",
}: CommunityErrorStateProps) {
  return (
    <div
      role="alert"
      data-testid="community-error-state"
      className={`flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-10 text-center sm:px-8 sm:py-12 dark:border-red-900/50 dark:bg-red-950/30 ${className}`}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
        aria-hidden="true"
      >
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-red-900 dark:text-red-200">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-red-800 dark:text-red-300">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          aria-busy={isRetrying}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006.3 5.7L4 8m16 8l-2.3 2.3A8 8 0 014 15"
            />
          </svg>
          {isRetrying ? "Retrying…" : retryLabel}
        </button>
      )}
    </div>
  );
}

export default CommunityErrorState;
