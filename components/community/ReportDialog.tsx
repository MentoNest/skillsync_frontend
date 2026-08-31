"use client";

import { useState, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

type ReportReason = "spam" | "harassment" | "inappropriate" | "off-topic" | "other";

const REPORT_REASONS: { value: ReportReason; label: string; description: string }[] = [
  { value: "spam", label: "Spam or advertising", description: "Unwanted promotional content or repetitive posts" },
  { value: "harassment", label: "Harassment or abuse", description: "Targeted attacks, threats, or bullying" },
  { value: "inappropriate", label: "Inappropriate content", description: "Offensive, explicit, or NSFW material" },
  { value: "off-topic", label: "Off-topic", description: "Not relevant to the community" },
  { value: "other", label: "Other", description: "Something else — please describe below" },
];

interface ReportDialogProps {
  discussionId: string;
  discussionTitle: string;
  onClose: () => void;
}

export default function ReportDialog({ discussionId, discussionTitle, onClose }: ReportDialogProps) {
  const [reason, setReason] = useState<ReportReason | "">("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!reason) {
        setError("Please select a reason for reporting.");
        return;
      }

      setIsSubmitting(true);
      setError("");

      try {
        const response = await fetch("/api/community/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            discussionId,
            reason,
            details: details.trim() || undefined,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error ?? "Failed to submit report.");
        }

        trackEvent("discussion_reported", { discussionId, reason });
        setSubmitted(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [discussionId, reason, details]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        {submitted ? (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 id="report-dialog-title" className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              Report submitted
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Thank you. Our moderation team will review this discussion shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <h2 id="report-dialog-title" className="text-lg font-bold text-gray-900 dark:text-white">
                  Report discussion
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                  {discussionTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
                aria-label="Close dialog"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5">
              <fieldset>
                <legend className="sr-only">Reason for reporting</legend>
                <div className="space-y-2">
                  {REPORT_REASONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                        reason === option.value
                          ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="report-reason"
                        value={option.value}
                        checked={reason === option.value}
                        onChange={() => setReason(option.value)}
                        className="mt-0.5 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-4">
                <label htmlFor="report-details" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional details (optional)
                </label>
                <textarea
                  id="report-details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Provide any additional context..."
                  className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {details.length}/500
                </p>
              </div>

              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                  {error}
                </p>
              )}

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !reason}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit report"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
