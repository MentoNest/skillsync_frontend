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
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const announceRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<"pagination" | "infinite">(
    "infinite",
  );
  const PAGE_SIZE = 6;
  const [infiniteLimit, setInfiniteLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMentors(initialMentors || []);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [initialMentors]);

  const toggleExpertise = useCallback((expertise: Expertise) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise],
    );
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  const filteredMentors = useMemo(() => {
    return (mentors || [])
      .filter((mentor) => {
        if (
          selectedExpertise.length > 0 &&
          !selectedExpertise.some((exp) => mentor.skills?.includes(exp))
        ) {
          return false;
        }
        const price = mentor.pricePerSession ?? 0;
        if (minPrice !== "" && price < Number(minPrice)) return false;
        if (maxPrice !== "" && price > Number(maxPrice)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "rating-desc") return (b.rating ?? 0) - (a.rating ?? 0);
        if (sort === "price-asc")
          return (a.pricePerSession ?? 0) - (b.pricePerSession ?? 0);
        if (sort === "price-desc")
          return (b.pricePerSession ?? 0) - (a.pricePerSession ?? 0);
        if (sort === "experience-desc")
          return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
        if (sort === "popularity-desc")
          return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
        return 0;
      });
  }, [mentors, selectedExpertise, minPrice, maxPrice, sort]);

  const fetchMoreData = () => {
    if (infiniteLimit >= filteredMentors.length) return;
    setTimeout(() => {
      setInfiniteLimit((prev) => prev + PAGE_SIZE);
    }, 300);
  };

  const infiniteMentors = useMemo(() => {
    return filteredMentors.slice(0, infiniteLimit);
  }, [filteredMentors, infiniteLimit]);

  const totalPages = Math.max(1, Math.ceil(filteredMentors.length / PAGE_SIZE));
  const paginatedMentors = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredMentors.slice(start, start + PAGE_SIZE);
  }, [filteredMentors, currentPage, PAGE_SIZE]);

  const comparedMentors = useMemo(() => {
    return mentors.filter((m) => compareIds.includes(m.id || m.mentorId || ""));
  }, [mentors, compareIds]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <p ref={announceRef} className="sr-only" aria-live="polite" />

      <main
        ref={mainRef}
        id="main-content"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Discover Mentors
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Connect with vetted industry experts for personalized 1-on-1
              guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* View mode switcher */}
            <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-1">
              <button
                type="button"
                onClick={() => setDisplayMode("infinite")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  displayMode === "infinite"
                    ? "bg-white dark:bg-gray-700 text-cyan-600 dark:text-cyan-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Infinite Scroll
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode("pagination")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  displayMode === "pagination"
                    ? "bg-white dark:bg-gray-700 text-cyan-600 dark:text-cyan-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Pagination
              </button>
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-xs font-semibold text-gray-600 dark:text-gray-400"
              >
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Sidebar filters */}
          <aside className="space-y-6">
            <ExpertiseFilter
              selectedExpertise={selectedExpertise}
              onToggleExpertise={toggleExpertise}
            />

            {/* Price range filter */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Price Per Session ($)
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </aside>

          {/* Main content grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <ul
                role="list"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {Array.from({ length: PAGE_SIZE }, (_, i) => (
                  <MentorCardSkeleton key={`skeleton-${i}`} />
                ))}
              </ul>
            ) : filteredMentors.length === 0 ? (
              <EmptyState />
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
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {infiniteMentors.map((mentor) => {
                    const id = mentor.id || mentor.mentorId || "";
                    const isSelected = compareIds.includes(id);
                    const isDisabled =
                      !isSelected && compareIds.length >= MAX_COMPARE;
                    return (
                      <li key={id} className="h-full flex flex-col">
                        <DiscoveryMentorCard mentor={mentor} />
                        <button
                          type="button"
                          disabled={isDisabled}
                          onClick={() => toggleCompare(id)}
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
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {paginatedMentors.map((mentor) => {
                    const id = mentor.id || mentor.mentorId || "";
                    const isSelected = compareIds.includes(id);
                    const isDisabled =
                      !isSelected && compareIds.length >= MAX_COMPARE;
                    return (
                      <li key={id} className="h-full flex flex-col">
                        <DiscoveryMentorCard mentor={mentor} />
                        <button
                          type="button"
                          disabled={isDisabled}
                          onClick={() => toggleCompare(id)}
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
                            aria-current={
                              currentPage === p ? "page" : undefined
                            }
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
          </div>
        </div>
      </main>

      {/* Comparison Drawer */}
      {compareIds.length > 0 && (
        <MentorComparisonDrawer
          selectedMentors={comparedMentors}
          onRemoveMentor={toggleCompare}
          onClearAll={clearCompare}
        />
      )}
    </div>
  );
}