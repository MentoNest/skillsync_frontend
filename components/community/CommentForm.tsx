"use client";

import { useState } from "react";
import { communityApi, CommunityApiError } from "@/lib/community-api";
import type { Comment } from "@/lib/community-types";

interface CommentFormProps {
  discussionId: string;
  parentId?: string | null;
  placeholder?: string;
  submitLabel?: string;
  onSubmitted: (comment: Comment) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}

export function CommentForm({
  discussionId,
  parentId = null,
  placeholder = "Write a comment…",
  submitLabel = "Post comment",
  onSubmitted,
  onCancel,
  autoFocus = false,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = content.trim();
  const isValid = trimmed.length > 0 && trimmed.length <= 5000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const { comment } = await communityApi.addComment(discussionId, trimmed, {
        parentId,
      });
      setContent("");
      onSubmitted(comment);
    } catch (err) {
      setError(
        err instanceof CommunityApiError
          ? err.message
          : "Failed to post comment",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label className="sr-only" htmlFor={`comment-${discussionId}-${parentId ?? "root"}`}>
        {placeholder}
      </label>
      <textarea
        id={`comment-${discussionId}-${parentId ?? "root"}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={parentId ? 2 : 3}
        maxLength={5000}
        disabled={isSubmitting}
        autoFocus={autoFocus}
        className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:opacity-60"
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Posting…" : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--secondary)]"
          >
            Cancel
          </button>
        )}
        <span className="ml-auto text-xs text-[var(--muted)]">
          {trimmed.length}/5000
        </span>
      </div>
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
