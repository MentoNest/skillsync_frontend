"use client";

import { useCallback, useEffect, useState } from "react";
import { communityApi, CommunityApiError } from "@/lib/community-api";
import { trackDiscussionLiked } from "@/lib/community-analytics";

/**
 * Optimistic like/unlike for a discussion (#1011, #1266).
 * When the parent already knows the viewer's like state (e.g. feed cards
 * decorated with `isLiked`), the initial GET is skipped; otherwise the state
 * is reconciled from the server on mount.
 */
export function useDiscussionLike(
  discussionId: string,
  initialLiked?: boolean,
  initialCount = 0,
) {
  const hasInitialLiked = initialLiked !== undefined;
  const [isLiked, setIsLiked] = useState(initialLiked ?? false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasInitialLiked) return;
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
  }, [discussionId, hasInitialLiked]);

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
      if (result.isLiked) {
        trackDiscussionLiked(discussionId);
      }
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
