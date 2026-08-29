// Mentor discovery page — wires API-backed listings (#857) with URL-synced
// filter query parameters (#858) and bookmark toggles (#859).
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useMentorListings } from "@/lib/hooks/use-mentor-listings";
import { useMentorQueryFilters } from "@/lib/hooks/use-mentor-query-params";
import { useBookmarkedMentors } from "@/lib/hooks/use-bookmarked-mentors";
import type { MentorListingFilters } from "@/lib/api/mentors";
import { EXPERTISE_CATEGORIES } from "@/lib/mentors";
import type { SortOption } from "@/types/mentor";
import MentorCard from "./MentorCard";
import { MentorCardSkeletonList } from "./MentorCardSkeleton";
import MentorEmptyState from "./MentorEmptyState";
import MentorBookmarkButton from "./MentorBookmarkButton";
import MentorSort from "./MentorSort";
import ExperienceLevelFilter from "./ExperienceLevelFilter";
import HourlyRateFilter from "./HourlyRateFilter";

const toApiFilters = (filters: {
  expertise: string;
  experience: string;
  minRate: number | "";
  maxRate: number | "";
  sortBy: SortOption;
  search: string;
}): MentorListingFilters => ({
  expertise: filters.expertise || undefined,
  experience: filters.experience || undefined,
  minRate: typeof filters.minRate === "number" ? filters.minRate : undefined,
  maxRate: typeof filters.maxRate === "number" ? filters.maxRate : undefined,
  sortBy: filters.sortBy,
  search: filters.search || undefined,
});

const MentorDiscoveryPage = () => {
  const { filters, setFilter, clearFilters, activeFilterCount } = useMentorQueryFilters();
  const apiFilters = useMemo(() => toApiFilters(filters), [filters]);
  const { mentors, total, loading, error, refetch } = useMentorListings(apiFilters);
  const { bookmarkedIds, isBookmarked, toggleBookmark } = useBookmarkedMentors();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Find a Mentor</h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse mentors that match your goals and book a session.
          </p>
        </div>
        <Link
          href="/dashboard/saved-mentors"
          className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Saved mentors
          <span
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1 text-xs font-semibold text-white"
            aria-label={`${bookmarkedIds.length} saved mentors`}
          >
            {bookmarkedIds.length}
          </span>
        </Link>
      </div>

      <section
        className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]"
        aria-label="Mentor search and results"
      >
        <aside className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 lg:self-start">
          <div>
            <p className="text-sm font-medium text-gray-700">Search</p>
            <input
              id="mentor-search"
              type="search"
              value={filters.search}
              onChange={(event) => setFilter("search", event.target.value)}
              placeholder="Name, skill or title"
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-gray-700">Expertise</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {EXPERTISE_CATEGORIES.map((category) => {
                const value = category.toLowerCase();
                const selected = filters.expertise === value;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter("expertise", selected ? "" : value)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      selected
                        ? "border-primary-600 bg-primary-600 text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:text-primary-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <ExperienceLevelFilter
            value={filters.experience}
            onChange={(level) => setFilter("experience", level)}
          />

          <HourlyRateFilter
            min={typeof filters.minRate === "number" ? filters.minRate : 0}
            max={typeof filters.maxRate === "number" ? filters.maxRate : 200}
            onChange={(min, max) => {
              setFilter("minRate", min);
              setFilter("maxRate", max);
            }}
          />

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              Clear all filters ({activeFilterCount})
            </button>
          )}
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500" aria-live="polite">
              {loading
                ? "Loading mentors…"
                : error
                  ? "Unable to load mentors"
                  : `${total} ${total === 1 ? "mentor" : "mentors"} found`}
            </p>
            <MentorSort
              value={filters.sortBy}
              onChange={(sortBy) => setFilter("sortBy", sortBy)}
            />
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
            >
              <p className="font-medium text-red-700">Something went wrong</p>
              <p className="mt-1 text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={refetch}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Try again
              </button>
            </div>
          ) : loading ? (
            <MentorCardSkeletonList count={6} />
          ) : mentors.length === 0 ? (
            <MentorEmptyState onReset={clearFilters} />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="false">
              {mentors.map((mentor) => (
                <li key={mentor.id}>
                  <MentorCard
                    mentor={mentor}
                    actions={
                      <MentorBookmarkButton
                        mentorId={mentor.id}
                        isBookmarked={isBookmarked(mentor.id)}
                        onToggle={toggleBookmark}
                      />
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default MentorDiscoveryPage;