"use client";

import { useCallback, useEffect, useState } from "react";
import { communityApi } from "@/lib/community-api";
import { trackDiscussionBookmarked } from "@/lib/community-analytics";

interface UseDiscussionBookmarkOptions {
  /** Known state from the feed payload; skips the initial fetch when provided. */
  initialIsBookmarked?: boolean;
  /** Fired after the bookmark state settles so a parent list can re-sync. */
  onChange?: (isBookmarked: boolean) => void;
}

/**
 * Bookmark state for a discussion (#1013).
 *
 * State lives on the server (community store) so the feed, the saved page and
 * any other surface agree on what is saved. Toggles are optimistic and rolled
 * back when the request fails.
 */
export function useDiscussionBookmark(
  discussionId: string,
  options: UseDiscussionBookmarkOptions = {}
) {
  const { initialIsBookmarked, onChange } = options;
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked ?? false);
  const [isLoading, setIsLoading] = useState(initialIsBookmarked === undefined);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const state = await communityApi.getBookmarkState(discussionId);
      setIsBookmarked(Boolean(state?.isBookmarked));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load bookmark state"
      );
    } finally {
      setIsLoading(false);
    }
  }, [discussionId]);

  useEffect(() => {
    if (initialIsBookmarked !== undefined) {
      setIsBookmarked(initialIsBookmarked);
      setIsLoading(false);
      return;
    }
    void refresh();
  }, [initialIsBookmarked, refresh]);

  const toggle = useCallback(async () => {
    const previous = isBookmarked;
    setIsBookmarked(!previous);
    setIsPending(true);
    setError(null);

    try {
      const result = previous
        ? await communityApi.removeDiscussionBookmark(discussionId)
        : await communityApi.bookmarkDiscussion(discussionId);

      setIsBookmarked(Boolean(result?.isBookmarked));
      onChange?.(Boolean(result?.isBookmarked));
      if (result.isBookmarked) trackDiscussionBookmarked(discussionId);
    } catch (err) {
      setIsBookmarked(previous);
      setError(
        err instanceof Error ? err.message : "Failed to update bookmark"
      );
    } finally {
      setIsPending(false);
    }
  }, [discussionId, isBookmarked, onChange]);

  return { isBookmarked, isLoading, isPending, error, toggle, refresh };
}
