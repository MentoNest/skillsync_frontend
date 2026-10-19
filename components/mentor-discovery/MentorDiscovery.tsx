"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { Mentor, MentorFilters } from "@/lib/mentor-types";
import MentorCard, { MentorCardSkeleton } from "@/components/landing/MentorCard";
import Link from "next/link";
import { useUrlFilters } from "@/lib/url-filters";
import { mentorApi } from "@/lib/api";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import IndustryFilter from "@/components/mentor-discovery/IndustryFilter";
import ExperienceLevelFilter from "@/components/mentor-discovery/ExperienceLevelFilter";
import SearchInput from "@/components/mentor-discovery/SearchInput";
import MentorFilterSidebar from "@/components/mentor-discovery/MentorFilterSidebar";
import MobileFilterDrawer from "@/components/mentor-discovery/MobileFilterDrawer";
import MentorDiscoveryLayout from "@/components/mentor-discovery/MentorDiscoveryLayout";
import MentorPagination from "@/components/mentor/MentorPagination";
import PageSizeSelector from "@/components/mentor/PageSizeSelector";

interface MentorDiscoveryProps {
  /**
   * Whether a fixed site navbar (h-16) sits above the page. The public
   * `/mentors` route has one; the mentee dashboard does not.
   */
  belowFixedNavbar?: boolean;
  /**
   * Enable pagination mode instead of infinite scroll.
   * Default: false (infinite scroll)
   */
  usePagination?: boolean;
  /**
   * Number of mentors to display per page when pagination is enabled.
   * Default: 12
   */
  pageSize?: number;
}

function MentorsPageContent({ belowFixedNavbar = false, usePagination = false, pageSize: initialPageSize = 12 }: MentorDiscoveryProps) {
  const { filters, updateFilters, clearFilters, hasActiveFilters } = useUrlFilters();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [totalMentors, setTotalMentors] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const mentorListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bookmarkedMentors");
    if (stored) {
      setBookmarkedIds(JSON.parse(stored));
    }
  }, []);

  const fetchMentors = useCallback(
    async (pageNumber = 1, append = false) => {
      if (append) {
        setIsLoadingMore(true);
        setLoadMoreError(null);
      } else {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await mentorApi.getMentors(
          { ...filters, sortBy: filters.sortBy || "relevance" },
          pageNumber,
          pageSize
        );

        if (append) {
          setMentors((prev) => {
            // Prevent duplicate mentors
            const existingIds = new Set(prev.map((m) => m.id));
            const newMentors = response.mentors.filter((m) => !existingIds.has(m.id));
            return [...prev, ...newMentors];
          });
        } else {
          setMentors(response.mentors);
          // Scroll to top of mentor list when page changes (pagination mode only)
          if (usePagination && mentorListRef.current && pageNumber !== currentPage) {
            mentorListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }

        setCurrentPage(pageNumber);
        setTotalPages(response.totalPages);
        setTotalMentors(response.total);
        setHasMore(response.hasMore ?? (pageNumber < response.totalPages));
      } catch (err) {
        const message = "Failed to load mentors. Please try again.";
        if (append) {
          setLoadMoreError(message);
        } else {
          setError(message);
        }
        console.error("Error fetching mentors:", err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [filters, pageSize, usePagination, currentPage]
  );

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
    fetchMentors(1, false);
  }, [fetchMentors]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && !isLoadingMore && hasMore && !usePagination) {
      fetchMentors(currentPage + 1, true);
    }
  }, [isLoading, isLoadingMore, hasMore, currentPage, fetchMentors, usePagination]);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      fetchMentors(newPage, false);
    }
  }, [totalPages, currentPage, fetchMentors]);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    // fetchMentors will be called automatically via useEffect when pageSize changes
  }, []);

  const { resetInfiniteScroll } = useInfiniteScroll({
    isLoading: isLoadingMore,
    hasMore,
    onLoadMore: handleLoadMore,
    loadMoreRef,
  });

  useEffect(() => {
    resetInfiniteScroll();
  }, [filters, resetInfiniteScroll]);

  const handleFiltersChange = (newFilters: MentorFilters) => {
    updateFilters(newFilters, { replace: true });
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const toggleBookmark = (mentorId: string) => {
    setBookmarkedIds((prev) => {
      const updated = prev.includes(mentorId)
        ? prev.filter((id) => id !== mentorId)
        : [...prev, mentorId];
      localStorage.setItem("bookmarkedMentors", JSON.stringify(updated));
      return updated;
    });
  };

  const activeFilterCount = Object.values(filters).flat().filter(Boolean).length +
    (filters.minRating ? 1 : 0) +
    (filters.maxHourlyRate ? 1 : 0);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-slate-900">Something went wrong</h2>
          <p className="mt-2 text-slate-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className={`bg-white border-b border-slate-200 sticky z-40 ${belowFixedNavbar ? "top-16" : "top-0"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">Find Mentors</h1>
              <span className="px-2 py-0.5 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-full">
                {usePagination ? (
                  <>
                    {totalMentors} mentor{totalMentors !== 1 ? "s" : ""}
                    {totalPages > 1 && (
                      <span className="ml-1 text-indigo-500">
                        · Page {currentPage} of {totalPages}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {mentors.length} mentor{mentors.length !== 1 ? "s" : ""}
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                aria-label="Open filter drawer"
              >
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="hidden sm:inline-flex text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:block px-4 sm:px-6 lg:px-8 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <SearchInput
                value={filters.search || ""}
                onChange={(value) => updateFilters({ ...filters, search: value || undefined }, { replace: true })}
                placeholder="Search mentors by name, skill, or company..."
              />
            </div>
            <div className="flex items-center gap-4">
              {usePagination && (
                <PageSizeSelector
                  pageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                  totalResults={totalMentors}
                />
              )}
              <select
                value={filters.sortBy || "relevance"}
                onChange={(e) => updateFilters({ ...filters, sortBy: e.target.value as MentorFilters["sortBy"] }, { replace: true })}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Sort by"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rated</option>
                <option value="sessions">Most Sessions</option>
                <option value="hourlyRate">Price: Low to High</option>
              </select>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <MentorDiscoveryLayout
        sidebarTopClass={belowFixedNavbar ? "top-56" : "top-40"}
        sidebar={
          <MentorFilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        }
      >
          <div>
            {/* Active expertise filter badges */}
            {filters.expertise && filters.expertise.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-slate-500">Expertise:</span>
                {filters.expertise.map((exp) => (
                  <span key={exp} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                    {exp}
                  </span>
                ))}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: pageSize }).map((_, i) => (
                  <MentorCardSkeleton key={i} />
                ))}
              </div>
            ) : mentors.length === 0 ? (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2.5-5.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">No mentors found</h3>
                <p className="mt-2 text-slate-600">Try adjusting your filters or search term.</p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="mt-6 inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div ref={mentorListRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mentors.map((mentor) => (
                    <MentorCard
                      key={mentor.id}
                      mentor={mentor}
                      isBookmarked={bookmarkedIds.includes(mentor.id)}
                      onToggleBookmark={() => toggleBookmark(mentor.id)}
                    />
                  ))}
                </div>

                {/* Infinite scroll trigger / loading indicator */}
                {!usePagination && (
                  <div ref={loadMoreRef} className="mt-8 flex justify-center">
                    {isLoadingMore ? (
                      <div className="flex items-center gap-2 text-slate-600">
                        <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4h-4z" />
                        </svg>
                        <span className="text-sm font-medium">Loading more mentors...</span>
                      </div>
                    ) : loadMoreError ? (
                      <div className="text-center">
                        <p className="text-sm text-red-600 mb-2">{loadMoreError}</p>
                        <button
                          onClick={handleLoadMore}
                          className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50"
                        >
                          Retry
                        </button>
                      </div>
                    ) : hasMore ? (
                      <span className="text-sm text-slate-400">Scroll for more</span>
                    ) : mentors.length > 0 ? (
                      <span className="text-sm text-slate-400">You&#x27ve reached the end</span>
                    ) : null}
                  </div>
                )}

                {/* Pagination (pagination mode only) */}
                {usePagination && totalPages > 1 && (
                  <div className="mt-8">
                    <MentorPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
      </MentorDiscoveryLayout>

      <MobileFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}

export default function MentorDiscovery(props: MentorDiscoveryProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-600">
          <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4h-4z" />
          </svg>
          <span className="text-sm font-medium">Loading mentors...</span>
        </div>
      </div>
    }>
      <MentorsPageContent {...props} />
    </Suspense>
  );
}
