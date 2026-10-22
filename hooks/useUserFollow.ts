"use client";

import { useCallback, useEffect, useState } from "react";
import { communityApi } from "@/lib/community-api";

interface UseUserFollowOptions {
  /** Known state from the feed payload; skips the initial fetch when provided. */
  initialIsFollowing?: boolean;
}

/**
 * Follow state for a single community member (#1015).
 *
 * Hydrates the current state from `GET /users/[id]/follow`, then toggles with
 * an optimistic update that is rolled back if the request fails.
 */
export function useUserFollow(userId: string, options: UseUserFollowOptions = {}) {
  const { initialIsFollowing } = options;
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing ?? false);
  const [isLoading, setIsLoading] = useState(initialIsFollowing === undefined);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const state = await communityApi.getUserFollowState(userId);
      setIsFollowing(Boolean(state?.isFollowing));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load follow state"
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (initialIsFollowing !== undefined) {
      setIsFollowing(initialIsFollowing);
      setIsLoading(false);
      return;
    }
    void refresh();
  }, [initialIsFollowing, refresh]);

  const toggle = useCallback(async () => {
    const previous = isFollowing;
    setIsFollowing(!previous);
    setIsPending(true);
    setError(null);

    try {
      const result = previous
        ? await communityApi.unfollowUser(userId)
        : await communityApi.followUser(userId);
      setIsFollowing(Boolean(result?.isFollowing));
    } catch (err) {
      setIsFollowing(previous);
      setError(
        err instanceof Error ? err.message : "Failed to update follow state"
      );
    } finally {
      setIsPending(false);
    }
  }, [isFollowing, userId]);

  return { isFollowing, isLoading, isPending, error, toggle, refresh };
}
