"use client";

import { useState, useEffect } from "react";
import { communityApi } from "@/lib/community-api";
import type { ReportReason } from "@/lib/community-store";

interface ReportDiscussionButtonProps {
  discussionId: string;
  discussionTitle: string;
}

const REPORT_REASONS: { value: ReportReason; label: string; description: string }[] = [
  {
    value: "spam",
    label: "Spam",
    description: "Unwanted promotional or commercial content",
  },
  {
    value: "harassment",
    label: "Harassment",
    description: "Targeted abuse, threats, or intimidation",
  },
  {
    value: "offensive_content",
    label: "Offensive content",
    description: "Hate speech, explicit material, or inappropriate language",
  },
  {
    value: "misinformation",
    label: "Misinformation",
    description: "False or misleading information presented as fact",
  },
  {
    value: "other",
    label: "Other",
    description: "Another reason not listed above",
  },
];

export function ReportDiscussionButton({
  discussionId,
  discussionTitle,
}: ReportDiscussionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    function handleEscape(key: KeyboardEvent) {
      if (key.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleSubmit() {
    if (!selectedReason) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await communityApi.reportDiscussion(discussionId, selectedReason);
      setSuccess(true);
      setSelectedReason(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setIsOpen(false);
    setSelectedReason(null);
    setError(null);
    setSuccess(false);
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={handleClose} aria-hidden="true" />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-success-title"
          className="relative w-full max-w-md rounded-lg bg-[var(--background)] p-6 shadow-xl"
        >
          <div className="mx-auto mt-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 id="report-success-title" className="mt-4 text-center text-lg font-semibold text-[var(--foreground)]">
            Report submitted
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--muted)]">
            Thank you for reporting this discussion. Our moderation team will review it shortly.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-6 w-full rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Report discussion: ${discussionTitle}`}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>Report</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={handleClose} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            className="relative w-full max-w-md rounded-lg bg-[var(--background)] p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 id="report-modal-title" className="text-lg font-semibold text-[var(--foreground)]">
                Report discussion
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close report dialog"
                className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Help keep our community safe. Select a reason for reporting "{discussionTitle}".
            </p>

            {error && (
              <div
                role="alert"
                className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                {error}
              </div>
            )}

            <fieldset className="mt-4 space-y-2">
              <legend className="sr-only">Report reason</legend>
              {REPORT_REASONS.map((reason) => (
                <label
                  key={reason.value}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    selectedReason === reason.value
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-[var(--primary)]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="report-reason"
                    value={reason.value}
                    checked={selectedReason === reason.value}
                    onChange={() => setSelectedReason(reason.value)}
                    className="sr-only peer"
                    aria-describedby={`reason-desc-${reason.value}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[var(--foreground)]">{reason.label}</span>
                      {selectedReason === reason.value && (
                        <svg className="h-5 w-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p id={`reason-desc-${reason.value}`} className="mt-0.5 text-sm text-[var(--muted)]">
                      {reason.description}
                    </p>
                  </div>
                </label>
              ))}
            </fieldset>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedReason || isSubmitting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}