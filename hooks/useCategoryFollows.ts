"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { communityApi } from "@/lib/community-api";
import {
  COMMUNITY_CATEGORY_IDS,
  type CommunityCategoryId,
} from "@/lib/community-types";

/** Keeps followed ids in the same display order as the sidebar. */
function inDisplayOrder(ids: CommunityCategoryId[]): CommunityCategoryId[] {
  return [...ids].sort(
    (a, b) =>
      COMMUNITY_CATEGORY_IDS.indexOf(a) - COMMUNITY_CATEGORY_IDS.indexOf(b)
  );
}

/**
 * Followed categories for the signed-in user (#1014).
 *
 * A single `GET /categories/following` request hydrates every category's
 * followed state; toggles are optimistic and rolled back on failure so the
 * sidebar updates immediately.
 */
export function useCategoryFollows() {
  const [followed, setFollowed] = useState<CommunityCategoryId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await communityApi.getFollowedCategories();
      // Defensive: a partial payload must not break the sidebar.
      setFollowed(
        Array.isArray(result?.categoryIds) ? inDisplayOrder(result.categoryIds) : []
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load followed categories"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const isFollowing = useCallback(
    (categoryId: string) => followed.includes(categoryId as CommunityCategoryId),
    [followed]
  );

  const toggle = useCallback(
    async (categoryId: CommunityCategoryId) => {
      const previous = followed;
      const wasFollowing = previous.includes(categoryId);

      setPendingId(categoryId);
      setError(null);
      setFollowed(
        inDisplayOrder(
          wasFollowing
            ? previous.filter((id) => id !== categoryId)
            : [...previous, categoryId]
        )
      );

      try {
        const result = wasFollowing
          ? await communityApi.unfollowCategory(categoryId)
          : await communityApi.followCategory(categoryId);
        const isNowFollowing = Boolean(result?.isFollowing);
        setFollowed((current) =>
          isNowFollowing
            ? current.includes(categoryId)
              ? current
              : inDisplayOrder([...current, categoryId])
            : current.filter((id) => id !== categoryId)
        );
      } catch (err) {
        setFollowed(previous);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to update followed categories"
        );
      } finally {
        setPendingId(null);
      }
    },
    [followed]
  );

  return useMemo(
    () => ({
      followedCategories: followed,
      followedCount: followed.length,
      isFollowing,
      isLoading,
      isPending: (categoryId: string) => pendingId === categoryId,
      error,
      toggle,
      refresh,
    }),
    [error, followed, isFollowing, isLoading, pendingId, refresh, toggle]
  );
}
