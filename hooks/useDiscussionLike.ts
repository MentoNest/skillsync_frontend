"use client";

import { useCallback, useEffect, useState } from "react";
import { communityApi, CommunityApiError } from "@/lib/community-api";

/**
 * Optimistic like/unlike for a discussion (#1011).
 * State is reconciled from the server after toggle and on mount.
 */
export function useDiscussionLike(
  discussionId: string,
  initialLiked = false,
  initialCount = 0,
) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    communityApi
      .getLikeState(discussionId)
      .then((state) => {
        if (cancelled) return;
        setIsLiked(state.isLiked);
        setLikeCount(state.likeCount);
      })
      .catch(() => {
        /* keep initial props if offline */
      });
    return () => {
      cancelled = true;
    };
  }, [discussionId]);

  const toggle = useCallback(async () => {
    if (isToggling) return;
    setError(null);
    const prevLiked = isLiked;
    const prevCount = likeCount;
    // Optimistic
    setIsLiked(!prevLiked);
    setLikeCount(prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1);
    setIsToggling(true);
    try {
      const result = await communityApi.toggleDiscussionLike(discussionId);
      setIsLiked(result.isLiked);
      setLikeCount(result.likeCount);
    } catch (err) {
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
      setError(
        err instanceof CommunityApiError
          ? err.message
          : "Could not update like",
      );
    } finally {
      setIsToggling(false);
    }
  }, [discussionId, isLiked, likeCount, isToggling]);

  return { isLiked, likeCount, isToggling, error, toggle };
}
