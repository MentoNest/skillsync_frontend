"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  observerRef?: React.RefObject<IntersectionObserver | null> | React.MutableRefObject<IntersectionObserver | null>;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

export function useInfiniteScroll({
  isLoading,
  hasMore,
  onLoadMore,
  observerRef: externalObserverRef,
  loadMoreRef,
}: UseInfiniteScrollOptions) {
  const internalObserverRef = useRef<IntersectionObserver | null>(null);
  const observerRef = externalObserverRef ?? internalObserverRef;
  const resetInfiniteScroll = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (loadMoreRef.current && hasMore && !isLoading) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            onLoadMore();
          }
        },
        { rootMargin: "100px" }
      );
      observerRef.current.observe(loadMoreRef.current);
    }
  }, [hasMore, isLoading, onLoadMore, observerRef, loadMoreRef]);

  useEffect(() => {
    resetInfiniteScroll();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [resetInfiniteScroll, observerRef]);

  return { resetInfiniteScroll };
}
