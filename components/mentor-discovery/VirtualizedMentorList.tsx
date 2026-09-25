"use client";

import { useRef, useEffect, useState, useCallback } from "react";
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
}

export default function VirtualizedMentorList({
  mentors,
  onBookmark,
  onCompare,
  bookmarkedIds = [],
  selectedForComparison = [],
  itemHeight = 400,
  overscan = 3,
}: VirtualizedMentorListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

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

  const visibleRange = useCallback(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      mentors.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, containerHeight, itemHeight, overscan, mentors.length]);

  const { startIndex, endIndex } = visibleRange();
  const visibleMentors = mentors.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto"
      style={{ height: "100%" }}
      role="list"
      aria-label="Mentors"
    >
      <div style={{ height: `${mentors.length * itemHeight}px`, position: "relative" }}>
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
                key={mentor.name}
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
                >
                  <div className="mt-auto px-6 pb-6 space-y-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => onBookmark?.(mentor.name)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          isBookmarked
                            ? "bg-rose-600 text-white border-rose-600 focus:ring-rose-500"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 focus:ring-slate-500"
                        }`}
                        aria-label={isBookmarked ? `Remove ${mentor.name} from bookmarks` : `Bookmark ${mentor.name}`}
                        aria-pressed={isBookmarked}
                      >
                        <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {isBookmarked ? "Saved" : "Save"}
                      </button>
                      <button
                        onClick={() => onCompare?.(mentor)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          isSelectedForComparison
                            ? "bg-indigo-600 text-white border-indigo-600 focus:ring-indigo-500"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 focus:ring-slate-500"
                        }`}
                        aria-label={isSelectedForComparison ? `Remove ${mentor.name} from comparison` : `Add ${mentor.name} to comparison`}
                        aria-pressed={isSelectedForComparison}
                        disabled={!isSelectedForComparison && selectedForComparison.length >= 3}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Compare
                      </button>
                    </div>
                  </div>
                </OptimizedMentorCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}