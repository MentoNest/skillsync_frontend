"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import OptimizedMentorCard from "./OptimizedMentorCard";
import { MentorCardProps } from "@/components/landing/MentorCard";

interface VirtualizedMentorListProps {
  mentors: MentorCardProps[];
  onBookmark?: (mentorId: string) => void;
  onCompare?: (mentor: MentorCardProps) => void;
  bookmarkedIds?: string[];
  selectedForComparison?: MentorCardProps[];
  itemHeight?: number;
  overscan?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  loadMoreThreshold?: number;
}

export default function VirtualizedMentorList({
  mentors,
  onBookmark,
  onCompare,
  bookmarkedIds = [],
  selectedForComparison = [],
  itemHeight = 400,
  overscan = 3,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  loadMoreThreshold = 3,
}: VirtualizedMentorListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const loadMoreLockRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    const handleResize = () => {
      setContainerHeight(container.clientHeight);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const uniqueMentors = useMemo(() => {
    const seen = new Set<string>();
    return mentors.filter((mentor) => {
      const key = mentor.name;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [mentors]);

  const visibleRange = useCallback(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      uniqueMentors.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, containerHeight, itemHeight, overscan, uniqueMentors.length]);

  const { startIndex, endIndex } = visibleRange();
  const visibleMentors = uniqueMentors.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  useEffect(() => {
    if (!onLoadMore || !hasMore || isLoadingMore) return;
    if (uniqueMentors.length === 0) return;

    const nearEnd =
      endIndex >= uniqueMentors.length - 1 - loadMoreThreshold;

    if (nearEnd && !loadMoreLockRef.current) {
      loadMoreLockRef.current = true;
      onLoadMore();
    }
  }, [
    endIndex,
    uniqueMentors.length,
    onLoadMore,
    hasMore,
    isLoadingMore,
    loadMoreThreshold,
  ]);

  useEffect(() => {
    if (!isLoadingMore) {
      loadMoreLockRef.current = false;
    }
  }, [isLoadingMore]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto"
      style={{ height: "100%" }}
      role="list"
      aria-label="Mentors"
    >
      <div style={{ height: `${uniqueMentors.length * itemHeight}px`, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            willChange: "transform",
          }}
          role="list"
        >
          {visibleMentors.map((mentor, index) => {
            const actualIndex = startIndex + index;
            const isBookmarked = bookmarkedIds.includes(mentor.name);
            const isSelectedForComparison = selectedForComparison.some((m) => m.name === mentor.name);

            return (
              <div
                key={`${mentor.name}-${actualIndex}`}
                style={{
                  height: `${itemHeight}px`,
                  contain: "layout paint",
                }}
                role="listitem"
              >
                <OptimizedMentorCard
                  {...mentor}
                  onBookmark={onBookmark}
                  onCompare={onCompare}
                  isBookmarked={isBookmarked}
                  isSelectedForComparison={isSelectedForComparison}
                />
              </div>
            );
          })}
        </div>
      </div>
      {isLoadingMore && (
        <div
          className="flex items-center justify-center gap-2 py-6 text-sm font-medium text-slate-600"
          role="status"
          aria-live="polite"
        >
          <svg
            className="w-5 h-5 animate-spin text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading more mentors...
        </div>
      )}
    </div>
  );
}