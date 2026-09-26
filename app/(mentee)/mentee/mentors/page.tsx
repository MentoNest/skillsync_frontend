"use client";

import { useState, useEffect, useCallback } from "react";
import { Mentor, MentorFilters } from "@/lib/mentor-types";
import MentorCard from "@/components/landing/MentorCard";
import MobileFilterDrawer from "@/components/mentor-discovery/MobileFilterDrawer";
import MentorComparison from "@/components/mentor-discovery/MentorComparison";
import Link from "next/link";
import { useUrlFilters } from "@/lib/url-filters";
import { mentorApi } from "@/lib/api";
import {
  trackSearch,
  trackFilterUsage,
  trackSortChange,
  trackMentorProfileClick,
  trackBookmarkAction,
  trackComparisonAction,
  trackFilterDrawerOpen,
  trackFilterDrawerClose,
  trackFilterClear,
  trackFilterApply,
} from "@/lib/analytics";

const EXPERIENCE_LABELS: Record<string, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
  principal: "Principal",
};

export default function MentorsPage() {
  const { filters, updateFilters, clearFilters, hasActiveFilters } = useUrlFilters();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<Mentor[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("bookmarkedMentors");
    if (stored) {
      setBookmarkedIds(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await mentorApi.getMentors(filters, currentPage);
        setMentors(response.mentors);
        setFilteredMentors(response.mentors);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError("Failed to load mentors. Please try again.");
        console.error("Error fetching mentors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, [filters, currentPage]);

  const handleFiltersChange = (newFilters: MentorFilters) => {
    const prevExpertise = filters.expertise || [];
    const newExpertise = newFilters.expertise || [];
    const addedExpertise = newExpertise.filter((e) => !prevExpertise.includes(e));
    const removedExpertise = prevExpertise.filter((e) => !newExpertise.includes(e));
    
    addedExpertise.forEach((e) => trackFilterUsage("expertise", e, "add"));
    removedExpertise.forEach((e) => trackFilterUsage("expertise", e, "remove"));

    const prevExperience = filters.experience || [];
    const newExperience = newFilters.experience || [];
    const addedExperience = newExperience.filter((e) => !prevExperience.includes(e));
    const removedExperience = prevExperience.filter((e) => !newExperience.includes(e));
    
    addedExperience.forEach((e) => trackFilterUsage("experience", e, "add"));
    removedExperience.forEach((e) => trackFilterUsage("experience", e, "remove"));

    const prevIndustry = filters.industry || [];
    const newIndustry = newFilters.industry || [];
    const addedIndustry = newIndustry.filter((e) => !prevIndustry.includes(e));
    const removedIndustry = prevIndustry.filter((e) => !newIndustry.includes(e));
    
    addedIndustry.forEach((e) => trackFilterUsage("industry", e, "add"));
    removedIndustry.forEach((e) => trackFilterUsage("industry", e, "remove"));

    if (newFilters.minRating !== filters.minRating) {
      trackFilterUsage("minRating", String(newFilters.minRating || ""), newFilters.minRating ? "add" : "remove");
    }
    if (newFilters.maxHourlyRate !== filters.maxHourlyRate) {
      trackFilterUsage("maxHourlyRate", String(newFilters.maxHourlyRate || ""), newFilters.maxHourlyRate ? "add" : "remove");
    }
    if (newFilters.sortBy !== filters.sortBy) {
      trackSortChange(newFilters.sortBy || "relevance", newFilters.sortOrder || "asc");
    }

    updateFilters(newFilters, { replace: true });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    trackFilterClear();
    clearFilters();
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    trackFilterApply(
      Object.values(filters).flat().filter(Boolean).length +
      (filters.minRating ? 1 : 0) +
      (filters.maxHourlyRate ? 1 : 0)
    );
    setIsFilterDrawerOpen(false);
  };

  const toggleBookmark = (mentorId: string) => {
    const mentor = mentors.find((m) => m.id === mentorId);
    setBookmarkedIds((prev) => {
      const updated = prev.includes(mentorId)
        ? prev.filter((id) => id !== mentorId)
        : [...prev, mentorId];
      localStorage.setItem("bookmarkedMentors", JSON.stringify(updated));
      trackBookmarkAction(mentorId, mentor?.name || "", prev.includes(mentorId) ? "remove" : "add");
      return updated;
    });
  };

  const toggleComparison = (mentor: Mentor) => {
    setSelectedForComparison((prev) => {
      if (prev.some((m) => m.id === mentor.id)) {
        trackComparisonAction("remove", prev.length - 1, prev.filter((m) => m.id !== mentor.id).map((m) => m.id));
        return prev.filter((m) => m.id !== mentor.id);
      }
      if (prev.length >= 3) {
        trackComparisonAction("add", 3, [...prev.slice(1), mentor].map((m) => m.id));
        return [...prev.slice(1), mentor];
      }
      trackComparisonAction("add", prev.length + 1, [...prev, mentor].map((m) => m.id));
      return [...prev, mentor];
    });
  };

  const removeFromComparison = (mentorId: string) => {
    setSelectedForComparison((prev) => {
      trackComparisonAction("remove", prev.length - 1, prev.filter((m) => m.id !== mentorId).map((m) => m.id));
      return prev.filter((m) => m.id !== mentorId);
    });
  };

  const closeComparison = () => {
    trackComparisonAction("close", selectedForComparison.length, selectedForComparison.map((m) => m.id));
    setSelectedForComparison([]);
  };

  useEffect(() => {
    if (selectedForComparison.length > 0) {
      trackComparisonAction("open", selectedForComparison.length, selectedForComparison.map((m) => m.id));
    }
  }, [selectedForComparison.length]);

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
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">Find Mentors</h1>
              <span className="px-2 py-0.5 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-full">
                {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  trackFilterDrawerOpen();
                  setIsFilterDrawerOpen(true);
                }}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Open filters"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18a1 1 0 001-1v-2.586a1 1 0 01.293-.707l6.414-6.414a1 1 0 00.293-.707V5l-4-4v6.586a1 1 0 01-.293.707L14.707 13.293A1 1 0 0015 14v2.586a1 1 0 001 1" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              {selectedForComparison.length > 0 && (
                <button
                  onClick={() => {}}
                  className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Compare ({selectedForComparison.length})
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Expertise</h3>
                <div className="space-y-2">
                  {["Frontend", "Backend", "Full Stack", "Mobile", "DevOps", "Data Science", "Machine Learning", "Product Management", "UX Design", "QA Engineering"].map((exp) => (
                    <label key={exp} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.expertise?.includes(exp) || false}
                        onChange={(e) => {
                          const newExp = filters.expertise || [];
                          if (e.target.checked) {
                            updateFilters({ ...filters, expertise: [...newExp, exp] }, { replace: true });
                          } else {
                            updateFilters({ ...filters, expertise: newExp.filter((e) => e !== exp) }, { replace: true });
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">{exp}</span>
                    </label>
                  ))}
                </div>
              </div>

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

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Industry</h3>
                <div className="space-y-2">
                  {["Technology", "Finance", "Healthcare", "E-commerce", "Education", "Gaming", "Media", "Non-profit"].map((ind) => (
                    <label key={ind} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.industry?.includes(ind) || false}
                        onChange={(e) => {
                          const newInd = filters.industry || [];
                          if (e.target.checked) {
                            updateFilters({ ...filters, industry: [...newInd, ind] }, { replace: true });
                          } else {
                            updateFilters({ ...filters, industry: newInd.filter((i) => i !== ind) }, { replace: true });
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">{ind}</span>
                    </label>
                  ))}
                </div>
              </div>

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
            </div>
          </aside>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
                    <div className="h-14 w-14 rounded-2xl bg-slate-200 mb-4" />
                    <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-200 rounded" />
                      <div className="h-4 w-2/3 bg-slate-200 rounded" />
                      <div className="h-4 w-1/2 bg-slate-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMentors.length === 0 ? (
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
                  {filteredMentors.map((mentor) => {
                    const isBookmarked = bookmarkedIds.includes(mentor.id);
                    const isSelectedForComparison = selectedForComparison.some((m) => m.id === mentor.id);

                    return (
                      <MentorCard
                        key={mentor.id}
                        name={mentor.name}
                        title={mentor.headline}
                        description={mentor.bio}
                        skills={mentor.skills}
                        avatarInitials={mentor.name.split(" ").map((n) => n[0]).join("")}
                        avatarColor="bg-gradient-to-br from-indigo-500 to-cyan-500"
                        rating={mentor.rating}
                        sessions={mentor.sessions}
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
                            <button
                              onClick={() => toggleComparison(mentor)}
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
                          <Link
                            href={mentor.profileHref || `/mentors/${mentor.id}`}
                            onClick={() => trackMentorProfileClick(mentor.id, mentor.name, "mentor_card")}
                            className="block w-full text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            View profile
                          </Link>
                        </div>
                      </MentorCard>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      aria-label="Previous page"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-slate-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => {
          trackFilterDrawerClose();
          setIsFilterDrawerOpen(false);
        }}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />

      <MentorComparison
        selectedMentors={selectedForComparison}
        onClose={() => {
          trackComparisonAction("close", selectedForComparison.length, selectedForComparison.map((m) => m.id));
          closeComparison();
        }}
        onRemoveMentor={(mentorId) => {
          trackComparisonAction("remove", selectedForComparison.length - 1, selectedForComparison.filter((m) => m.id !== mentorId).map((m) => m.id));
          removeFromComparison(mentorId);
        }}
      />
    </div>
  );
}