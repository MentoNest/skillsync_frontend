// Mentor discovery page — comparison (#861), mobile filter drawer (#862),
// performance optimizations (#863) and accessibility (#864).
"use client";

import React, { useCallback, useDeferredValue, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ExperienceLevel, Mentor, SortOption } from "@/types/mentor";
import { MENTOR_DIRECTORY } from "@/lib/mentor-directory";
import MentorCard from "./MentorCard";
import MentorSort from "./MentorSort";
import MentorEmptyState from "./MentorEmptyState";
import MentorCompareToggle from "./MentorCompareToggle";
import MentorFilterSidebar from "./MentorFilterSidebar";
import MentorFilterDrawer from "./MentorFilterDrawer";
import MentorComparisonPanel from "./MentorComparisonPanel";

const MAX_COMPARE = 3;
const MAX_RATE_BOUND = 200;

const EXPERIENCE_ORDER: Record<ExperienceLevel, number> = {
  junior: 0,
  mid: 1,
  senior: 2,
  principal: 3,
};

const SORTERS: Record<SortOption, (a: Mentor, b: Mentor) => number> = {
  rating: (a, b) => b.rating - a.rating,
  price: (a, b) => a.hourlyRate - b.hourlyRate,
  experience: (a, b) => EXPERIENCE_ORDER[b.experienceLevel] - EXPERIENCE_ORDER[a.experienceLevel],
  popularity: (a, b) => b.popularity - a.popularity,
};

const MentorDiscoveryPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [experience, setExperience] = useState<ExperienceLevel | "">("");
  const [minRate, setMinRate] = useState<number>(0);
  const [maxRate, setMaxRate] = useState<number>(MAX_RATE_BOUND);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const filteredMentors = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase();
    let list = MENTOR_DIRECTORY.filter((mentor) => {
      if (expertise.length > 0) {
        const expertiseMatches = mentor.skills.some((skill) =>
          expertise.includes(skill.name.toLowerCase()),
        );
        if (!expertiseMatches) return false;
      }
      if (experience && mentor.experienceLevel !== experience) return false;
      if (mentor.hourlyRate < minRate || mentor.hourlyRate > maxRate) return false;
      if (term) {
        const haystack = `${mentor.name} ${mentor.title} ${mentor.bio} ${mentor.skills
          .map((skill) => skill.name)
          .join(" ")}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
    const sorter = SORTERS[sortBy];
    return list.sort(sorter);
  }, [deferredSearch, expertise, experience, minRate, maxRate, sortBy]);

  const compareMentors = useMemo(
    () => MENTOR_DIRECTORY.filter((mentor) => compareIds.includes(mentor.id)),
    [compareIds],
  );

  const toggleExpertise = useCallback((value: string) => {
    setExpertise((previous) =>
      previous.includes(value)
        ? previous.filter((entry) => entry !== value)
        : [...previous, value],
    );
  }, []);

  const toggleCompare = useCallback((mentorId: string) => {
    setCompareIds((previous) => {
      if (previous.includes(mentorId)) {
        return previous.filter((id) => id !== mentorId);
      }
      if (previous.length >= MAX_COMPARE) return previous;
      return [...previous, mentorId];
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearch("");
    setExpertise([]);
    setExperience("");
    setMinRate(0);
    setMaxRate(MAX_RATE_BOUND);
  }, []);

  const openDrawer = useCallback(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    restoreFocusRef.current?.focus();
    restoreFocusRef.current = null;
  }, []);

  const activeFilterCount =
    (search.trim() ? 1 : 0) +
    expertise.length +
    (experience ? 1 : 0) +
    (minRate > 0 ? 1 : 0) +
    (maxRate < MAX_RATE_BOUND ? 1 : 0);

  const compareDisabledFor = (mentorId: string) => {
    const isChecked = compareIds.includes(mentorId);
    return !isChecked && compareIds.length >= MAX_COMPARE;
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <a
        href="#mentor-results"
        className="sr-only rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        Skip to mentors
      </a>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Find a Mentor</h1>
          <p className="mt-1 text-sm text-gray-500">
            Compare and filter mentors to find the right match for you.
          </p>
        </div>
        <button
          type="button"
          onClick={openDrawer}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden"
          aria-expanded={drawerOpen}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1 text-xs font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden rounded-2xl border border-gray-200 bg-white p-5 lg:block lg:self-start">
          <MentorFilterSidebar
            search={search}
            onSearchChange={setSearch}
            expertise={expertise}
            onToggleExpertise={toggleExpertise}
            experience={experience}
            onExperienceChange={setExperience}
            minRate={minRate}
            maxRate={maxRate}
            onRateChange={(min, max) => {
              setMinRate(min);
              setMaxRate(max);
            }}
            activeFilterCount={activeFilterCount}
            onClearAll={clearAllFilters}
          />
        </aside>

        <section aria-labelledby="mentor-results-heading">
          <h2 id="mentor-results-heading" className="sr-only">
            Mentor results
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500" aria-live="polite">
              {filteredMentors.length} {filteredMentors.length === 1 ? "mentor" : "mentors"} found
            </p>
            <MentorSort value={sortBy} onChange={setSortBy} />
          </div>

          <div id="mentor-results" className="mt-4">
            {filteredMentors.length === 0 ? (
              <MentorEmptyState onReset={clearAllFilters} />
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredMentors.map((mentor) => {
                  const isCompareDisabled = compareDisabledFor(mentor.id);
                  return (
                    <li key={mentor.id}>
                      <MentorCard
                        mentor={mentor}
                        onViewProfile={(id) => router.push(`/mentors/${id}`)}
                        actions={
                          <MentorCompareToggle
                            checked={compareIds.includes(mentor.id)}
                            disabled={isCompareDisabled}
                            disabledReason={`You can compare up to ${MAX_COMPARE} mentors`}
                            onToggle={() => toggleCompare(mentor.id)}
                          />
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>

      {compareMentors.length > 0 && (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4"
          aria-live="polite"
        >
          <div className="pointer-events-auto flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
            <p className="text-sm text-gray-700">
              Comparing <strong>{compareMentors.length}</strong> of {MAX_COMPARE} mentors
            </p>
            <button
              type="button"
              onClick={() => setComparisonOpen(true)}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              View comparison
            </button>
          </div>
        </div>
      )}

      <MentorFilterDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        title="Filters"
      >
        <MentorFilterSidebar
          search={search}
          onSearchChange={setSearch}
          expertise={expertise}
          onToggleExpertise={toggleExpertise}
          experience={experience}
          onExperienceChange={setExperience}
          minRate={minRate}
          maxRate={maxRate}
          onRateChange={(min, max) => {
            setMinRate(min);
            setMaxRate(max);
          }}
          activeFilterCount={activeFilterCount}
          onClearAll={clearAllFilters}
        />
      </MentorFilterDrawer>

      {comparisonOpen && compareMentors.length > 0 && (
        <MentorComparisonPanel
          mentors={compareMentors}
          onRemove={toggleCompare}
          onClear={() => setCompareIds([])}
          onClose={() => setComparisonOpen(false)}
        />
      )}
    </div>
  );
};

export default MentorDiscoveryPage;