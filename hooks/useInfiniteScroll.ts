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
  const latestOptionsRef = useRef({ isLoading, hasMore, onLoadMore });
  latestOptionsRef.current = { isLoading, hasMore, onLoadMore };

  const resetInfiniteScroll = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    const { hasMore: canLoadMore, isLoading: isCurrentlyLoading } = latestOptionsRef.current;
    if (loadMoreRef.current && canLoadMore && !isCurrentlyLoading) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const currentOptions = latestOptionsRef.current;
          if (entries[0]?.isIntersecting && currentOptions.hasMore && !currentOptions.isLoading) {
            currentOptions.onLoadMore();
          }
        },
        { rootMargin: "100px" }
      );
      observerRef.current.observe(loadMoreRef.current);
    }
  }, [observerRef, loadMoreRef]);

  useEffect(() => {
    resetInfiniteScroll();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [resetInfiniteScroll, observerRef, hasMore, isLoading]);

  return { resetInfiniteScroll };
}
