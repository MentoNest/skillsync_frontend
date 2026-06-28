'use client';

import { useMemo, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ExpertiseFilter from '@/components/mentors/ExpertiseFilter';
import DiscoveryMentorCard from '@/components/mentors/DiscoveryMentorCard';
import EmptyState from '@/components/mentors/EmptyState';
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

export default function MentorDiscoveryView({ mentors: initialMentors }: MentorDiscoveryViewProps) {
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sort, setSort] = useState<SortOption>('rating-desc');
  const [bookmarkedMentors, setBookmarkedMentors] = useState<Set<string>>(new Set());
  const [mentors, setMentors] = useState<Mentor[]>(initialMentors);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreMentors = () => {
    // In a real app, you'd fetch data from an API.
    // Here, we'll just simulate it by duplicating the initial mentors.
    if (mentors.length >= 50) { // Cap at 50 mentors for this demo
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setMentors(prevMentors => [
        ...prevMentors,
        ...initialMentors.map(m => ({ ...m, id: `${m.id}-${mentors.length}` })),
      ]);
    }, 1500);
  };

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
              <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Hourly Rate ($)
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label htmlFor="min-price" className="sr-only">
                      Minimum price
                    </label>
                    <input
                      id="min-price"
                      type="number"
                      min="0"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                  <span className="text-gray-400 text-sm">to</span>
                  <div className="flex-1">
                    <label htmlFor="max-price" className="sr-only">
                      Maximum price
                    </label>
                    <input
                      id="max-price"
                      type="number"
                      min="0"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                </div>
              </div>
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
            <EmptyState onClearFilters={hasFilters ? clearFilters : undefined} />
          ) : (
            <InfiniteScroll
              dataLength={filteredMentors.length}
              next={fetchMoreMentors}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <ul
                role="list"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredMentors.map((mentor) => (
                  <li key={mentor.id} className="h-full">
                    <DiscoveryMentorCard
                      mentor={{
                        ...mentor,
                        isBookmarked: bookmarkedMentors.has(mentor.id as string),
                        onToggleBookmark: () => toggleBookmark(mentor.id as string),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          )}
        </section>
      </div>
    </div>
  );
}