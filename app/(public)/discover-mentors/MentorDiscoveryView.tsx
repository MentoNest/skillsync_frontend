"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";
import ExpertiseFilter from "@/components/mentors/ExpertiseFilter";
import DiscoveryMentorCard from "@/components/mentors/DiscoveryMentorCard";
import EmptyState from "@/components/mentors/EmptyState";
import MentorCardSkeleton from "@/components/mentor-card-skeleton";
import { EXPERTISE_OPTIONS, type Expertise } from "@/components/mentors/data";
import type { Mentor } from "@/lib/types";

type SortOption =
  | "rating-desc"
  | "price-asc"
  | "price-desc"
  | "experience-desc"
  | "popularity-desc";
// Issue 481 â€“ lazy-load the comparison drawer (only needed when user selects mentors)
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

function filterAndSortMentors(
  initialMentors: Mentor[],
  selectedExpertise: Expertise[],
  minPriceNum: number,
  maxPriceNum: number,
  sort: SortOption,
): Mentor[] {
  return initialMentors
    .filter((mentor) => {
      if (
        selectedExpertise.length > 0 &&
        !selectedExpertise.some((e) => mentor.expertise?.includes(e))
      )
        return false;
      const price = mentor.pricePerSession ?? 0;
      if (!isNaN(minPriceNum) && price < minPriceNum) return false;
      if (!isNaN(maxPriceNum) && price > maxPriceNum) return false;
      return true;
    })
    .slice()
    .sort((a, b) => {
      if (sort === "price-asc")
        return (a.pricePerSession ?? 0) - (b.pricePerSession ?? 0);
      if (sort === "price-desc")
        return (b.pricePerSession ?? 0) - (a.pricePerSession ?? 0);
      if (sort === "experience-desc")
        return (b.yearsExperience ?? 0) - (a.yearsExperience ?? 0);
      if (sort === "popularity-desc")
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      return (b.rating ?? 0) - (a.rating ?? 0);
    });
}

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
  // Loading state for initial data fetch
  const [isLoading, setIsLoading] = useState(true);
  // Issue 479 – comparison state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  // Issue 482 – ref to announce live region messages
  const announceRef = useRef<HTMLParagraphElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<"pagination" | "infinite">(
    "infinite",
  );
  const PAGE_SIZE = 6;
  const [infiniteLimit, setInfiniteLimit] = useState(PAGE_SIZE);

  const fetchMoreData = () => {
    if (infiniteLimit >= filteredMentors.length) return;
    setTimeout(() => {
      setInfiniteLimit((prev) => prev + PAGE_SIZE);
    }, 400);
  };

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  // Issue 482 – keyboard-navigable focus skip link target
  const mainRef = useRef<HTMLElement>(null);

  // Issue 481 â€“ memoized callbacks to avoid re-renders
  const toggleExpertise = useCallback((expertise: Expertise) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise],
    );
  }, []);

  // Memoized price filter values
  const minPriceNum = minPrice === "" ? -Infinity : parseFloat(minPrice);
  const maxPriceNum = maxPrice === "" ? Infinity : parseFloat(maxPrice);

  const filteredMentors = filterAndSortMentors(
    initialMentors,
    selectedExpertise,
    minPriceNum,
    maxPriceNum,
    sort,
  );

  const totalPages = Math.max(1, Math.ceil(filteredMentors.length / PAGE_SIZE));
  const paginatedMentors = filteredMentors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const infiniteMentors = filteredMentors.slice(0, infiniteLimit);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_COMPARE
          ? [...prev, id]
          : prev,
    );
  }, []);

  const closeComparison = useCallback(() => {
    setShowComparison(false);
    setCompareIds([]);
  }, []);

  const mentorsToCompare = initialMentors.filter((m) =>
    compareIds.includes(m.id || m.mentorId || ""),
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold"
        onClick={() => mainRef.current?.focus()}
      >
        Skip to content
      </a>

      {/* Live announce region */}
      <p
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Discover Mentors
          </h1>
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-select"
              className="text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Sort by
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() =>
                setDisplayMode((m) =>
                  m === "infinite" ? "pagination" : "infinite",
                )
              }
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {displayMode === "infinite"
                ? "Switch to pages"
                : "Switch to scroll"}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <ExpertiseFilter
                selected={selectedExpertise}
                counts={EXPERTISE_OPTIONS.reduce(
                  (acc, exp) => {
                    acc[exp] = initialMentors.filter((m) =>
                      m.expertise?.includes(exp),
                    ).length;
                    return acc;
                  },
                  {} as Record<Expertise, number>,
                )}
                onToggle={toggleExpertise}
                onClear={() => setSelectedExpertise([])}
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Price Range ($/hr)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    min={0}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-20 px-2 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="text-gray-400">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    min={0}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-20 px-2 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main
            id="main-content"
            ref={mainRef}
            tabIndex={-1}
            className="flex-1 min-w-0 focus:outline-none"
          >
            {isLoading ? (
              <ul
                role="list"
                aria-label="Loading mentors"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {Array.from({ length: PAGE_SIZE }, (_, i) => (
                  <MentorCardSkeleton key={`skeleton-${i}`} />
                ))}
              </ul>
            ) : filteredMentors.length === 0 ? (
              <EmptyState
                onClearFilters={() => {
                  setSelectedExpertise([]);
                  setMinPrice("");
                  setMaxPrice("");
                }}
              />
            ) : displayMode === "infinite" ? (
              <InfiniteScroll
                dataLength={infiniteMentors.length}
                next={fetchMoreData}
                hasMore={infiniteMentors.length < filteredMentors.length}
                loader={
                  <div className="flex justify-center py-8">
                    <span className="h-4 w-4 rounded-full border-2 border-cyan-600 border-t-transparent animate-spin" />
                  </div>
                }
                endMessage={
                  <p className="text-center py-8 text-xs font-semibold text-gray-400 dark:text-gray-500">
                    {`You've viewed all ${filteredMentors.length} mentors`}
                  </p>
                }
              >
                <ul
                  role="list"
                  aria-label="Mentor cards"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {infiniteMentors.map((mentor) => {
                    const mId = mentor.id || mentor.mentorId || "";
                    const isSelected = compareIds.includes(mId);
                    const isDisabled =
                      !isSelected && compareIds.length >= MAX_COMPARE;
                    return (
                      <li key={mId} className="h-full flex flex-col">
                        <DiscoveryMentorCard mentor={mentor} />
                        <button
                          type="button"
                          disabled={isDisabled}
                          onClick={() => toggleCompare(mId)}
                          aria-pressed={isSelected}
                          aria-label={
                            isSelected
                              ? `Remove ${mentor.name} from comparison`
                              : isDisabled
                                ? `Cannot add ${mentor.name}: limit reached`
                                : `Add ${mentor.name} to comparison`
                          }
                          className={`mt-2 w-full rounded-lg border py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${isSelected ? "border-cyan-600 bg-cyan-600 text-white" : isDisabled ? "border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed bg-transparent" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-600 bg-transparent"}`}
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
                    const mId = mentor.id || mentor.mentorId || "";
                    const isSelected = compareIds.includes(mId);
                    const isDisabled =
                      !isSelected && compareIds.length >= MAX_COMPARE;
                    return (
                      <li key={mId} className="h-full flex flex-col">
                        <DiscoveryMentorCard mentor={mentor} />
                        <button
                          type="button"
                          disabled={isDisabled}
                          onClick={() => toggleCompare(mId)}
                          aria-pressed={isSelected}
                          aria-label={
                            isSelected
                              ? `Remove ${mentor.name} from comparison`
                              : isDisabled
                                ? `Cannot add ${mentor.name}: limit reached`
                                : `Add ${mentor.name} to comparison`
                          }
                          className={`mt-2 w-full rounded-lg border py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${isSelected ? "border-cyan-600 bg-cyan-600 text-white" : isDisabled ? "border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed bg-transparent" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-600 bg-transparent"}`}
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
                            aria-current={
                              currentPage === p ? "page" : undefined
                            }
                            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${currentPage === p ? "bg-cyan-600 text-white shadow-sm" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
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
      </div>

      {/* Comparison drawer */}
      {showComparison && mentorsToCompare.length >= 2 && (
        <MentorComparisonDrawer
          mentors={mentorsToCompare}
          onRemove={(id) =>
            setCompareIds((prev) => prev.filter((x) => x !== id))
          }
          onClose={closeComparison}
        />
      )}
    </div>
  );
}
