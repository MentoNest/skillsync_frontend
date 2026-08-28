// Infinite scroll trigger component using IntersectionObserver (#851)
"use client";
import React, { useEffect, useRef } from "react";

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const InfiniteScrollTrigger = ({ onLoadMore, hasMore, isLoading }: InfiniteScrollTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onLoadMore(); },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="flex justify-center py-6">
      {isLoading && (
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" aria-label="Loading more mentors" />
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;
