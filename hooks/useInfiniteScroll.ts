"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  observerRef?: React.Refobject<IntersectionObserver | null> | React.MutableRefobject<IntersectionObserver | null>;
  loadMoreRef: React.RefObject<HTMLDiv | null>;
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

  // Keep the latest values in refs so the observer callback never reads stale
  // state and we don't have to tear down/recreate the observer on every change.
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);
  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  const resetInfiniteScroll = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const target = loadMoreRef.current;
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current && !isLoadingRef.current) {
          onLoadMoreRef.current();
        }
      },
      { rootMargin: "100px" }
    );
    observerRef.current.observe(target);
  }, [observerRef, loadMoreRef]);

  useEffect(() => {
    resetInfiniteScroll();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [resetInfiniteScroll, observerRef]);

  return { resetInfiniteScroll };
}
