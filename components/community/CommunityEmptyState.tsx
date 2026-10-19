"use client";

import type { ReactNode } from "react";

interface CommunityEmptyStateProps {
  /** Headline shown above the message. */
  title?: string;
  /** Supporting copy explaining what the user can do next. */
  message?: string;
  /** Label of the primary call to action. */
  actionLabel?: string;
  /**
   * Invoked when the call to action is pressed. The CTA is only rendered when
   * a handler is provided, so the component can also be used read-only.
   */
  onAction?: () => void;
  /** Custom icon/illustration; falls back to a conversation glyph. */
  icon?: ReactNode;
  className?: string;
}

function DefaultIcon() {
  return (
    <svg
      className="h-8 w-8 sm:h-10 sm:w-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 10h8M8 14h5m-9 6l2.5-3H18a3 3 0 003-3V7a3 3 0 00-3-3H6a3 3 0 00-3 3v7a3 3 0 003 3v3z"
      />
    </svg>
  );
}

/**
 * Reusable empty state for Community surfaces (#998).
 *
 * Keeps the icon, message and primary CTA in one accessible block: the
 * illustration is decorative (`aria-hidden`), the headline gives the region a
 * name, and the layout stacks on mobile and centres on larger screens.
 */
export function CommunityEmptyState({
  title = "No discussions yet",
  message = "Be the first to start a conversation — ask a question, share a win, or offer advice to the community.",
  actionLabel = "Start Discussion",
  onAction,
  icon,
  className = "",
}: CommunityEmptyStateProps) {
  return (
    <div
      data-testid="community-empty-state"
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--secondary)] px-4 py-12 text-center sm:px-8 sm:py-16 ${className}`}
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--background)] text-[var(--primary)] sm:h-20 sm:w-20"
        aria-hidden="true"
      >
        {icon ?? <DefaultIcon />}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-[var(--foreground)] sm:text-xl">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
        {message}
      </p>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:w-auto"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default CommunityEmptyState;
