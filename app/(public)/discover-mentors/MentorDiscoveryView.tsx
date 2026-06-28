'use client';

import { useMemo, useState } from 'react';
import ExpertiseFilter from '@/components/mentors/ExpertiseFilter';
import DiscoveryMentorCard from '@/components/mentors/DiscoveryMentorCard';
import {
  EXPERTISE_OPTIONS,
  type Expertise,
  type Mentor,
} from '@/components/mentors/data';

type SortOption = 'rating-desc' | 'price-asc' | 'price-desc' | 'experience-desc';

const SORT_OPTIONS: ReadonlyArray<{ value: SortOption; label: string }> = [
  { value: 'rating-desc', label: 'Highest rated' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'experience-desc', label: 'Most experienced' },
];

interface MentorDiscoveryViewProps {
  mentors: Mentor[];
}

export default function MentorDiscoveryView({ mentors }: MentorDiscoveryViewProps) {
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sort, setSort] = useState<SortOption>('rating-desc');

  const toggleExpertise = (expertise: Expertise) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise) ? prev.filter((e) => e !== expertise) : [...prev, expertise],
    );
  };

  const clearFilters = () => {
    setSelectedExpertise([]);
    setMinPrice('');
    setMaxPrice('');
  };

  const clearExpertise = () => setSelectedExpertise([]);

  /** Total mentors per expertise, regardless of currently selected filters. */
  const counts = useMemo<Record<Expertise, number>>(() => {
    const initial = {} as Record<Expertise, number>;
    for (const exp of EXPERTISE_OPTIONS) initial[exp] = 0;
    for (const mentor of mentors) {
      for (const exp of mentor.expertise) {
        initial[exp] += 1;
      }
    }
    return initial;
  }, [mentors]);

  const filteredMentors = useMemo<Mentor[]>(() => {
    const matched = mentors.filter((mentor) => {
      // 1. Expertise filter
      if (
        selectedExpertise.length > 0 &&
        !mentor.expertise.some((e) => selectedExpertise.includes(e))
      ) {
        return false;
      }

      // 2. Minimum price filter
      if (minPrice !== '' && mentor.pricePerSession < parseFloat(minPrice)) {
        return false;
      }

      // 3. Maximum price filter
      if (maxPrice !== '' && mentor.pricePerSession > parseFloat(maxPrice)) {
        return false;
      }

      return true;
    });

    const sorted = [...matched];
    sorted.sort((a, b) => {
      switch (sort) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'price-asc':
          return a.pricePerSession - b.pricePerSession;
        case 'price-desc':
          return b.pricePerSession - a.pricePerSession;
        case 'experience-desc':
          return b.experienceYears - a.experienceYears;
        default:
          return 0;
      }
    });
    return sorted;
  }, [mentors, selectedExpertise, minPrice, maxPrice, sort]);

  const hasFilters = selectedExpertise.length > 0 || minPrice !== '' || maxPrice !== '';
  const resultNoun = filteredMentors.length === 1 ? 'mentor' : 'mentors';

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-16">
      <div className="flex flex-col gap-8 md:flex-row md:gap-8">
        {/* Sidebar */}
        <aside
          aria-label="Mentor filters"
          className="w-full md:w-64 lg:w-72 shrink-0"
        >
          <div className="md:sticky md:top-28">
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700/80 p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Filters
                </h2>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 focus:outline-none focus:underline"
                    aria-label="Clear all mentor filters"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <ExpertiseFilter
                selected={selectedExpertise}
                counts={counts}
                onToggle={toggleExpertise}
                onClear={clearExpertise}
              />
            </div>
          </div>
        </aside>

        {/* Listing */}
        <section
          aria-label="Mentor results"
          className="flex-1 min-w-0"
        >
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-sm text-gray-600 dark:text-gray-400"
              aria-live="polite"
            >
              <span className="font-semibold text-gray-900 dark:text-white tabular-nums">
                {filteredMentors.length}
              </span>{' '}
              {resultNoun}
              {hasFilters ? ' match your filters' : ' available'}
            </p>

            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap"
              >
                Sort by
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="appearance-none rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-3 pr-9 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {filteredMentors.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-16 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.85-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                No mentors match your filters
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                Try removing a tag or two from the expertise filter to broaden your search.
              </p>
              <button
                type="button"
                onClick={clearExpertise}
                className="mt-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 focus:outline-none focus:underline"
              >
                Clear expertise filters
              </button>
            </div>
          ) : (
            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredMentors.map((mentor) => (
                <li key={mentor.id} className="h-full">
                  <DiscoveryMentorCard mentor={mentor} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

