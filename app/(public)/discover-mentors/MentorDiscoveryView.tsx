"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";
import ExpertiseFilter from "@/components/mentors/ExpertiseFilter";
import DiscoveryMentorCard from "@/components/mentors/DiscoveryMentorCard";
import EmptyState from "@/components/mentors/EmptyState";
import MentorCardSkeleton from "@/components/mentor-card-skeleton";
import {
  EXPERTISE_OPTIONS,
  type Expertise,
  type Mentor,
} from "@/components/mentors/data";

type SortOption =
  | "rating-desc"
  | "price-asc"
  | "price-desc"
  | "experience-desc"
  | "popularity-desc";

// Issue 481 – lazy-load the comparison drawer (only needed when user selects mentors)
const MentorComparisonDrawer = dynamic(
  () => import("@/components/mentors/MentorComparisonDrawer"),
  { ssr: false },
);

const SORT_OPTIONS: ReadonlyArray<{ value: SortOption; label: string }> = [
  { value: "rating-desc", label: "Highest rated" },
  { value: "popularity-desc", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "experience-desc", label: "Most experienced" },
];

const MAX_COMPARE = 3;

interface MentorDiscoveryViewProps {
  mentors: Mentor[];
}

export default function MentorDiscoveryView({
  mentors: initialMentors,
}: MentorDiscoveryViewProps) {
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("rating-desc");
  // Bookmark state
  const [bookmarkedMentors, setBookmarkedMentors] = useState<Set<string>>(
    new Set(),
  );
  // Infinite scroll state
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [hasMore, setHasMore] = useState(true);
  // Loading state for initial data fetch
  const [isLoading, setIsLoading] = useState(true);
  // Issue 479 – comparison state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  // Issue 480 – mobile filter drawer
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // Issue 482 – ref to announce live region messages
  const announceRef = useRef<HTMLParagraphElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<"pagination" | "infinite">(
    "infinite",
  );
  const PAGE_SIZE = 6;
  const [infiniteLimit, setInfiniteLimit] = useState(PAGE_SIZE);

  const filteredMentors = useMemo(() => {
    return (initialMentors || [])
      .filter((mentor) => {
        const expertiseMatch =
          selectedExpertise.length === 0 ||
          (mentor.expertise &&
            selectedExpertise.every((e) => mentor.expertise?.includes(e)));

        const parsedMin = minPrice !== "" ? parseFloat(minPrice) : 0;
        const parsedMax = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;

        const priceMatch =
          (mentor.pricePerSession ?? 0) >= parsedMin &&
          (mentor.pricePerSession ?? 0) <= parsedMax;

        return expertiseMatch && priceMatch;
      })
      .sort((a, b) => {
        if (sort === "price-asc")
          return (a.pricePerSession ?? 0) - (b.pricePerSession ?? 0);
        if (sort === "price-desc")
          return (b.pricePerSession ?? 0) - (a.pricePerSession ?? 0);
        if (sort === "experience-desc")
          return (b.experienceYears ?? 0) - (a.experienceYears ?? 0);
        return (b.rating ?? 0) - (a.rating ?? 0);
      });
  }, [initialMentors, selectedExpertise, minPrice, maxPrice, sort]);

  const infiniteMentors = useMemo(
    () => filteredMentors.slice(0, infiniteLimit),
    [filteredMentors, infiniteLimit],
  );

  const totalPages = Math.ceil(filteredMentors.length / PAGE_SIZE);

  const paginatedMentors = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredMentors.slice(start, start + PAGE_SIZE);
  }, [filteredMentors, currentPage, PAGE_SIZE]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const fetchMoreData = () => {
    if (infiniteLimit >= filteredMentors.length) return;
    setTimeout(() => {
      setInfiniteLimit((prev) => prev + PAGE_SIZE);
    }, 400);
  };

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMentors(initialMentors);
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, [initialMentors]);

  const toggleBookmark = (mentorId: string) => {
    setBookmarkedMentors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(mentorId)) {
        newSet.delete(mentorId);
      } else {
        newSet.add(mentorId);
      }
      return newSet;
    });
  };

  // Issue 482 – keyboard-navigable focus skip link target
  const mainRef = useRef<HTMLElement>(null);

  // Issue 481 – memoized callbacks to avoid re-renders
  const toggleExpertise = useCallback((expertise: Expertise) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise],
    );
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      <main
        ref={mainRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
      >
        {isLoading ? (
          // Show loading skeletons while initial data is loading
          <ul
            role="list"
            aria-label="Loading mentors"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {Array.from({ length: PAGE_SIZE }, (_, i) => (
              <MentorCardSkeleton key={`skeleton-${i}`} />
            ))}
          </ul>
        ) : displayMode === "infinite" ? (
          <InfiniteScroll
            dataLength={infiniteMentors.length}
            next={fetchMoreData}
            hasMore={infiniteMentors.length < filteredMentors.length}
            loader={
              <div className="flex justify-center items-center py-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                  <span className="h-4 w-4 rounded-full border-2 border-cyan-600 border-t-transparent animate-spin" />
                  Loading more mentors...
                </div>
              </div>
            }
            endMessage={
              <p className="text-center py-8 text-xs font-semibold text-gray-400 dark:text-gray-500">
                You&apos;ve viewed all {filteredMentors.length} mentors
              </p>
            }
          >
            <ul
              role="list"
              aria-label="Mentor cards"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {infiniteMentors.map((mentor) => {
                const idStr = String(mentor.id || mentor.mentorId || "");
                const isSelected = compareIds.includes(idStr);
                const isDisabled =
                  !isSelected && compareIds.length >= MAX_COMPARE;
                return (
                  <li key={idStr} className="h-full flex flex-col">
                    <DiscoveryMentorCard mentor={mentor} />

                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => toggleCompare(idStr)}
                      aria-pressed={isSelected}
                      aria-label={
                        isSelected
                          ? `Remove ${mentor.name} from comparison`
                          : isDisabled
                            ? `Cannot add ${mentor.name}: maximum ${MAX_COMPARE} mentors already selected`
                            : `Add ${mentor.name} to comparison`
                      }
                      className={`mt-2 w-full rounded-lg border py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                        isSelected
                          ? "border-cyan-600 bg-cyan-600 text-white hover:bg-cyan-700"
                          : isDisabled
                            ? "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed bg-transparent"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 bg-transparent"
                      }`}
                    >
                      {isSelected
                        ? "✓ Added to compare"
                        : `+ Compare${isDisabled ? " (limit reached)" : ""}`}
                    </button>
                  </li>
                );
              })}
            </ul>
          </InfiniteScroll>
        ) : (
          <>
            <ul
              role="list"
              aria-label="Mentor cards"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {paginatedMentors.map((mentor) => {
                const idStr = String(mentor.id || mentor.mentorId || "");
                const isSelected = compareIds.includes(idStr);
                const isDisabled =
                  !isSelected && compareIds.length >= MAX_COMPARE;
                return (
                  <li key={idStr} className="h-full flex flex-col">
                    <DiscoveryMentorCard mentor={mentor} />

                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => toggleCompare(idStr)}
                      aria-pressed={isSelected}
                      aria-label={
                        isSelected
                          ? `Remove ${mentor.name} from comparison`
                          : isDisabled
                            ? `Cannot add ${mentor.name}: maximum ${MAX_COMPARE} mentors already selected`
                            : `Add ${mentor.name} to comparison`
                      }
                      className={`mt-2 w-full rounded-lg border py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                        isSelected
                          ? "border-cyan-600 bg-cyan-600 text-white hover:bg-cyan-700"
                          : isDisabled
                            ? "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed bg-transparent"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 bg-transparent"
                      }`}
                    >
                      {isSelected
                        ? "✓ Added to compare"
                        : `+ Compare${isDisabled ? " (limit reached)" : ""}`}
                    </button>
                  </li>
                );
              })}
            </ul>

            {totalPages > 1 && (
              <nav
                aria-label="Mentor discovery pagination"
                className="flex items-center justify-center gap-2 mt-10"
              >
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  aria-label="Previous page"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        aria-label={`Page ${p}`}
                        aria-current={currentPage === p ? "page" : undefined}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          currentPage === p
                            ? "bg-cyan-600 text-white shadow-sm"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                </div>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  aria-label="Next page"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}
