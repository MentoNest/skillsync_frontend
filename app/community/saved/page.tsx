"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { communityApi } from "@/lib/community-api";
import { DiscussionCard } from "@/components/community/DiscussionCard";
import type { SavedDiscussion } from "@/lib/community-types";

/**
 * `/community/saved` — every discussion the signed-in user has bookmarked,
 * most recently saved first. Removing a bookmark here updates the store so the
 * state is consistent with the community feed (#1013).
 */
export default function SavedDiscussionsPage() {
  const [discussions, setDiscussions] = useState<SavedDiscussion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const loadSavedDiscussions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await communityApi.getSavedDiscussions();
      setDiscussions(Array.isArray(result?.discussions) ? result.discussions : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load saved discussions"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSavedDiscussions();
  }, [loadSavedDiscussions]);

  async function handleRemoveBookmark(discussionId: string) {
    setRemovingId(discussionId);
    setError(null);
    // Optimistic removal keeps the list responsive; reverted on failure.
    const previous = discussions;
    setDiscussions((current) =>
      current.filter((discussion) => discussion.id !== discussionId)
    );

    try {
      await communityApi.removeDiscussionBookmark(discussionId);
    } catch (err) {
      setDiscussions(previous);
      setError(
        err instanceof Error ? err.message : "Failed to remove bookmark"
      );
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Saved Discussions
            </h1>
            <p className="mt-2 text-[var(--muted)]">
              Bookmarks you kept for later. They stay here until you remove
              them.
            </p>
          </div>
          <Link
            href="/community"
            className="inline-flex items-center rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            Back to community
          </Link>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={loadSavedDiscussions}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4" role="status" aria-label="Loading saved discussions">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="animate-pulse rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--secondary)]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 rounded bg-[var(--secondary)]" />
                    <div className="h-4 w-2/3 rounded bg-[var(--secondary)]" />
                    <div className="h-3 w-full rounded bg-[var(--secondary)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : discussions.length === 0 ? (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-[var(--muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h2 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
              No saved discussions yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
              Bookmark a discussion from the community feed and it will show up
              here for quick access.
            </p>
            <Link
              href="/community"
              className="mt-6 inline-flex items-center rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              Browse discussions
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-[var(--muted)]">
              {discussions.length} saved discussion
              {discussions.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-4" role="feed" aria-label="Saved discussions">
              {discussions.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  onRemoveBookmark={handleRemoveBookmark}
                  isRemovingBookmark={removingId === discussion.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
