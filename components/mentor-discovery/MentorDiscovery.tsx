"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { Mentor, MentorFilters } from "@/lib/mentor-types";
import MentorCard, { MentorCardSkeleton } from "@/components/landing/MentorCard";
import Link from "next/link";
import { useUrlFilters } from "@/lib/url-filters";
import { mentorApi } from "@/lib/api";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import IndustryFilter from "@/components/mentor-discovery/IndustryFilter";
import ExpertiseFilter from "@/components/mentor-discovery/ExpertiseFilter";
import MobileFilterDrawer from "@/components/mentor-discovery/MobileFilterDrawer";
import MentorDiscoveryLayout from "@/components/mentor-discovery/MentorDiscoveryLayout";

interface MentorDiscoveryProps {
  /**
   * Whether a fixed site navbar (h-16) sits above the page. The public
   * `/mentors` route has one; the mentee dashboard does not.
   */
  belowFixedNavbar?: boolean;
}

const EXPERIENCE_LABELS: Record<string, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
  principal: "Principal",
};

function MentorsPageContent({ belowFixedNavbar = false }: MentorDiscoveryProps) {
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

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
        const response = await mentorApi.getMentors(filters, pageNumber);

        if (append) {
          setMentors((prev) => {
            // Prevent duplicate mentors
            const existingIds = new Set(prev.map((m) => m.id));
            const newMentors = response.mentors.filter((m) => !existingIds.has(m.id));
            return [...prev, ...newMentors];
          });
        } else {
          setMentors(response.mentors);
        }

        setCurrentPage(pageNumber);
        setTotalPages(response.totalPages);
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
    [filters]
  );

  useEffect(() => {
    fetchMentors(1, false);
  }, [fetchMentors]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && !isLoadingMore && hasMore) {
      fetchMentors(currentPage + 1, true);
    }
  }, [isLoading, isLoadingMore, hasMore, currentPage, fetchMentors]);

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
                {mentors.length} mentor{mentors.length !== 1 ? "s" : ""}
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
              <label htmlFor="search" className="sr-only">Search mentors</label>
              <input
                type="search"
                id="search"
                placeholder="Search mentors by name, skill, or company..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-4">
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
            <>
              <ExpertiseFilter
                selectedExpertise={filters.expertise || []}
                onChange={(newExpertise) => {
                  updateFilters(
                    {
                      ...filters,
                      expertise: newExpertise.length > 0 ? newExpertise : undefined,
                    },
                    { replace: true }
                  );
                }}
              />

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Experience Level</h3>
                <div className="space-y-2">
                  {["junior", "mid", "senior", "lead", "principal"].map((exp) => (
                    <label key={exp} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.experience?.includes(exp) || false}
                        onChange={(e) => {
                          const newExp = filters.experience || [];
                          if (e.target.checked) {
                            updateFilters({ ...filters, experience: [...newExp, exp] }, { replace: true });
                          } else {
                            updateFilters({ ...filters, experience: newExp.filter((e) => e !== exp) }, { replace: true });
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700 capitalize">{exp}</span>
                    </label>
                  ))}
                </div>
              </div>

              <IndustryFilter
                selectedIndustries={filters.industry || []}
                onChange={(newIndustries) => {
                  updateFilters(
                    {
                      ...filters,
                      industry: newIndustries.length > 0 ? newIndustries : undefined,
                    },
                    { replace: true }
                  );
                }}
              />

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Minimum Rating</h3>
                <select
                  value={filters.minRating || ""}
                  onChange={(e) => updateFilters({ ...filters, minRating: Number(e.target.value) || undefined }, { replace: true })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Any rating</option>
                  <option value={4.5}>4.5+</option>
                  <option value={4.0}>4.0+</option>
                  <option value={3.5}>3.5+</option>
                  <option value={3.0}>3.0+</option>
                </select>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Max Hourly Rate</h3>
                <input
                  type="number"
                  value={filters.maxHourlyRate || ""}
                  onChange={(e) => updateFilters({ ...filters, maxHourlyRate: Number(e.target.value) || undefined }, { replace: true })}
                  placeholder="e.g., 200"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </>
        }
      >
          <div>
            {/* Active expertise filter badges */}
            {filters.expertise && filters.expertise.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6" aria-label="Active expertise filters">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Expertise:
                </span>
                {filters.expertise.map((exp) => (
                  <button
                    key={exp}
                    onClick={() => {
                      const newExp = filters.expertise?.filter((e) => e !== exp) || [];
                      updateFilters(
                        { ...filters, expertise: newExp.length > 0 ? newExp : undefined },
                        { replace: true }
                      );
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors group"
                    aria-label={`Remove ${exp} expertise filter`}
                  >
                    <span>{exp}</span>
                    <svg className="w-3.5 h-3.5 text-indigo-500 group-hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={() => updateFilters({ ...filters, expertise: undefined }, { replace: true })}
                  className="text-xs text-slate-500 hover:text-indigo-600 underline font-medium ml-1"
                >
                  Clear all expertise
                </button>
              </div>
            )}
            {/* Active industry filter badges */}
            {filters.industry && filters.industry.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6" aria-label="Active industry filters">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Industry:
                </span>
                {filters.industry.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => {
                      const newInd = filters.industry?.filter((i) => i !== ind) || [];
                      updateFilters(
                        { ...filters, industry: newInd.length > 0 ? newInd : undefined },
                        { replace: true }
                      );
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors group"
                    aria-label={`Remove ${ind} industry filter`}
                  >
                    <span>{ind}</span>
                    <svg className="w-3.5 h-3.5 text-indigo-500 group-hover:text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={() => updateFilters({ ...filters, industry: undefined }, { replace: true })}
                  className="text-xs text-slate-500 hover:text-indigo-600 underline font-medium ml-1"
                >
                  Clear all industries
                </button>
              </div>
            )}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[...Array(6)].map((_, i) => (
                  <MentorCardSkeleton key={i} />
                ))}
              </div>
            ) : mentors.length === 0 ? (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mt-4 text-xl font-semibold text-slate-900">No mentors found</h2>
                <p className="mt-2 text-slate-600">Try adjusting your filters to find more mentors.</p>
                <button onClick={handleClearFilters} className="mt-6 inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {mentors.map((mentor) => {
                    const isBookmarked = bookmarkedIds.includes(mentor.id);

                    return (
                      <MentorCard
                        key={mentor.id}
                        id={mentor.id}
                        name={mentor.name}
                        title={mentor.headline}
                        description={mentor.bio}
                        skills={mentor.skills}
                        avatar={mentor.avatar}
                        avatarInitials={mentor.name.split(" ").map((n) => n[0]).join("")}
                        avatarColor="bg-gradient-to-br from-indigo-500 to-cyan-500"
                        rating={mentor.rating}
                        sessions={mentor.sessions}
                        hourlyRate={mentor.hourlyRate}
                        availability={mentor.availability}
                        profileHref={mentor.profileHref || `/mentors/${mentor.id}`}
                      >
                        <div className="mt-auto px-6 pb-6 space-y-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() => toggleBookmark(mentor.id)}
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
                          </div>
                          <Link
                            href={mentor.profileHref || `/mentors/${mentor.id}`}
                            className="block w-full text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            View profile
                          </Link>
                        </div>
                      </MentorCard>
                    );
                  })}
                </div>

                {/* Loading state when fetching additional mentors */}
                {isLoadingMore && (
                  <div
                    role="status"
                    aria-live="polite"
                    aria-label="Loading more mentors"
                    className="mt-8 flex flex-col items-center justify-center py-6 gap-3"
                  >
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                    <span className="text-sm font-medium text-slate-500">Loading more mentors...</span>
                  </div>
                )}

                {/* Error retry when loading more fails */}
                {loadMoreError && (
                  <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                    <p className="text-sm text-red-600 mb-2">{loadMoreError}</p>
                    <button
                      onClick={() => fetchMentors(currentPage + 1, true)}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors"
                    >
                      Retry loading more
                    </button>
                  </div>
                )}

                {/* End of results message */}
                {!hasMore && !isLoading && !isLoadingMore && mentors.length > 0 && (
                  <div className="mt-10 py-6 border-t border-slate-200 text-center">
                    <p className="text-sm font-medium text-slate-500">
                      You&apos;ve reached the end of the mentors list ({mentors.length} mentor{mentors.length !== 1 ? "s" : ""} loaded)
                    </p>
                  </div>
                )}

                {/* Sentinel element for infinite scroll */}
                <div ref={loadMoreRef} className="h-4 w-full" aria-hidden="true" />
              </>
            )}
          </div>
      </MentorDiscoveryLayout>

      <MobileFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        onFiltersChange={(f) => updateFilters(f, { replace: true })}
        onClearFilters={handleClearFilters}
        onApplyFilters={() => setIsMobileFiltersOpen(false)}
      />
    </div>
  );
}

export default function MentorDiscovery(props: MentorDiscoveryProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            Loading mentors...
          </div>
        </div>
      }
    >
      <MentorsPageContent {...props} />
    </Suspense>
  );
}
