"use client";

import { useEffect, useRef } from "react";
import { MentorFilters } from "@/types/mentor";
import { createPortal } from "react-dom";
import SearchInput from "./SearchInput";
import MentorFilterSidebar from "@/components/mentor-discovery/MentorFilterSidebar";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MentorFilters;
  onFiltersChange: (filters: MentorFilters) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "sessions", label: "Most Sessions" },
  { value: "hourlyRate", label: "Price: Low to High" },
  { value: "relevance", label: "Relevance" },
];

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
  onApplyFilters,
}: MobileFilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    const drawer = drawerRef.current;
    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && (!drawer || !element.contains(drawer))
    );
    const previousInertStates = backgroundElements.map((element) => [element, element.inert] as const);

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
    });
    drawer?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousInertStates.forEach(([element, wasInert]) => {
        element.inert = wasInert;
      });
      previousActiveElement.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const focusableElements = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []).filter(
          (element) => !element.hasAttribute("disabled") && element.tabIndex >= 0
        );
        if (focusableElements.length === 0) {
          e.preventDefault();
          drawerRef.current?.focus();
          return;
        }
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const focusIsOutsideDrawer = !drawerRef.current?.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === firstElement || focusIsOutsideDrawer)) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && (document.activeElement === lastElement || focusIsOutsideDrawer)) {
          e.preventDefault();
          firstElement.focus();
        }
        console.error("Error fetching mentors:", err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [filters]
  );

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <MentorFilterSidebar
              filters={filters}
              onFiltersChange={onFiltersChange}
              onClearFilters={onClearFilters}
              variant="pills"
              showHeader={false}
            />

  const drawerContent = (
    <div
      id="mentor-filter-drawer"
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-drawer-title"
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
        aria-label="Filter options"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h2 id="filter-drawer-title" className="text-lg font-semibold text-slate-900">
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close filters"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <fieldset>
              <legend className="text-sm font-medium text-slate-900 mb-3">Expertise</legend>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE_OPTIONS.map((expertise) => (
                  <label
                    key={expertise}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-700 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.expertise?.includes(expertise) || false}
                      onChange={(e) => {
                        const newExpertise = filters.expertise || [];
                        if (e.target.checked) {
                          onFiltersChange({ ...filters, expertise: [...newExpertise, expertise] });
                        } else {
                          onFiltersChange({
                            ...filters,
                            expertise: newExpertise.filter((e) => e !== expertise),
                          });
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    {expertise}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-slate-900 mb-3">Experience Level</legend>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_OPTIONS.map((exp) => (
                  <label
                    key={exp}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-700 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.experience?.includes(exp) || false}
                      onChange={(e) => {
                        const newExp = filters.experience || [];
                        if (e.target.checked) {
                          onFiltersChange({ ...filters, experience: [...newExp, exp] });
                        } else {
                          onFiltersChange({
                            ...filters,
                            experience: newExp.filter((e) => e !== exp),
                          });
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    {exp.charAt(0).toUpperCase() + exp.slice(1)}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-slate-900 mb-3">Industry</legend>
              <div className="flex flex-wrap gap-2">
                {INDUSTRY_OPTIONS.map((industry) => (
                  <label
                    key={industry}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-700 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.industry?.includes(industry) || false}
                      onChange={(e) => {
                        const newIndustry = filters.industry || [];
                        if (e.target.checked) {
                          onFiltersChange({ ...filters, industry: [...newIndustry, industry] });
                        } else {
                          onFiltersChange({
                            ...filters,
                            industry: newIndustry.filter((i) => i !== industry),
                          });
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    {industry}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="mobile-min-rating" className="block text-sm font-medium text-slate-900 mb-3">Minimum Rating</label>
              <select
                id="mobile-min-rating"
                value={filters.minRating || ""}
                onChange={(e) => onFiltersChange({ ...filters, minRating: Number(e.target.value) || undefined })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Minimum rating"
              >
                <option value="">Any rating</option>
                <option value={4.5}>4.5+</option>
                <option value={4.0}>4.0+</option>
                <option value={3.5}>3.5+</option>
                <option value={3.0}>3.0+</option>
              </select>
            </div>

            <div>
              <label htmlFor="mobile-max-hourly-rate" className="block text-sm font-medium text-slate-900 mb-3">Maximum Hourly Rate</label>
              <input
                id="mobile-max-hourly-rate"
                type="number"
                value={filters.maxHourlyRate || ""}
                onChange={(e) => onFiltersChange({ ...filters, maxHourlyRate: Number(e.target.value) || undefined })}
                placeholder="e.g., 200"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Maximum hourly rate"
              />
            </div>

            <div>
              <label htmlFor="mobile-sort-by" className="block text-sm font-medium text-slate-900 mb-3">Sort By</label>
              <select
                id="mobile-sort-by"
                value={filters.sortBy || "relevance"}
                onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as MentorFilters["sortBy"] })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Sort by"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-slate-900 mb-3">Sort Order</legend>
              <div className="flex gap-4">
                {["asc", "desc"].map((order) => (
                  <label
                    key={order}
                    className="inline-flex items-center gap-2 cursor-pointer"
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
            </fieldset>
          </div>

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

  return createPortal(drawerContent, document.body);
}
