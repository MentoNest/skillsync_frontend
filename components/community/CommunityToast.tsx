"use client";

import { useEffect } from "react";

export type CommunityToastTone = "success" | "error";

interface CommunityToastProps {
  message: string;
  tone?: CommunityToastTone;
  onDismiss: () => void;
  /** Auto-dismiss delay in milliseconds. Use 0 to require a manual dismiss. */
  duration?: number;
}

const TONE_STYLES: Record<CommunityToastTone, string> = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100",
  error:
    "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100",
};

/**
 * Lightweight, accessible toast used for Community action feedback (#1004).
 *
 * Rendered as a polite live region so screen readers announce the outcome
 * without interrupting what the user is doing, and auto-dismisses after
 * `duration` unless the user closes it first.
 */
export function CommunityToast({
  message,
  tone = "success",
  onDismiss,
  duration = 5000,
}: CommunityToastProps) {
  useEffect(() => {
    if (duration <= 0) return;
    const timeout = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timeout);
  }, [duration, onDismiss, message]);

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="community-toast"
      className={`fixed inset-x-4 bottom-4 z-[60] flex items-start gap-3 rounded-lg border p-4 shadow-lg sm:left-auto sm:right-4 sm:w-full sm:max-w-sm ${TONE_STYLES[tone]}`}
    >
      <span className="mt-0.5 flex-shrink-0" aria-hidden="true">
        {tone === "success" ? (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v4m0 4h.01"
            />
          </svg>
        )}
      </span>

      <p className="flex-1 text-sm font-medium">{message}</p>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="flex-shrink-0 rounded p-0.5 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
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
            d="M6 6l12 12M18 6L6 18"
          />
        </svg>
      </button>
    </div>
  );
}

export default CommunityToast;
