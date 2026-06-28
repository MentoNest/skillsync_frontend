'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import ExpertiseFilter from '@/components/mentors/ExpertiseFilter';
import DiscoveryMentorCard from '@/components/mentors/DiscoveryMentorCard';
import {
  EXPERTISE_OPTIONS,
  type Expertise,
  type Mentor,
} from '@/components/mentors/data';

// Issue 481 – lazy-load the comparison drawer (only needed when user selects mentors)
const MentorComparisonDrawer = dynamic(
  () => import('@/components/mentors/MentorComparisonDrawer'),
  { ssr: false },
);

type SortOption = 'rating-desc' | 'price-asc' | 'price-desc' | 'experience-desc';

const SORT_OPTIONS: ReadonlyArray<{ value: SortOption; label: string }> = [
  { value: 'rating-desc', label: 'Highest rated' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'experience-desc', label: 'Most experienced' },
];

const MAX_COMPARE = 3;

interface MentorDiscoveryViewProps {
  mentors: Mentor[];
}

export default function MentorDiscoveryView({ mentors }: MentorDiscoveryViewProps) {
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sort, setSort] = useState<SortOption>('rating-desc');
  // Issue 479 – comparison state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  // Issue 480 – mobile filter drawer
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // Issue 482 – ref to announce live region messages
  const announceRef = useRef<HTMLParagraphElement>(null);

  // Issue 482 – keyboard-navigable focus skip link target
  const mainRef = useRef<HTMLElement>(null);

  // Issue 481 – memoized callbacks to avoid re-renders
  const toggleExpertise = useCallback((expertise: Expertise) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise) ? prev.filter((e) => e !== expertise) : [...prev, expertise],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedExpertise([]);
    setMinPrice('');
    setMaxPrice('');
  }, []);

  const clearExpertise = useCallback(() => setSelectedExpertise([]), []);

  // Issue 479 – compare toggle
  const toggleCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= MAX_COMPARE) return prev; // silently cap
        return [...prev, id];
      });
    },
    [],
  );

  const removeFromComparison = useCallback((id: string) => {
    setCompareIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const closeComparison = useCallback(() => {
    setShowComparison(false);
    setCompareIds([]);
  }, []);

  // Issue 481 – memoized counts
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

  // Issue 481 – memoized filtered + sorted mentors
  const filteredMentors = useMemo<Mentor[]>(() => {
    const matched = mentors.filter((mentor) => {
      if (
        selectedExpertise.length > 0 &&
        !mentor.expertise.some((e) => selectedExpertise.includes(e))
      ) {
        return false;
      }
      if (minPrice !== '' && mentor.pricePerSession < parseFloat(minPrice)) return false;
      if (maxPrice !== '' && mentor.pricePerSession > parseFloat(maxPrice)) return false;
      return true;
    });

    return [...matched].sort((a, b) => {
      switch (sort) {
        case 'rating-desc': return b.rating - a.rating;
        case 'price-asc': return a.pricePerSession - b.pricePerSession;
        case 'price-desc': return b.pricePerSession - a.pricePerSession;
        case 'experience-desc': return b.experienceYears - a.experienceYears;
        default: return 0;
      }
    });
  }, [mentors, selectedExpertise, minPrice, maxPrice, sort]);

  // Issue 479 – mentors selected for comparison
  const mentorsToCompare = useMemo(
    () => mentors.filter((m) => compareIds.includes(m.id)),
    [mentors, compareIds],
  );

  const hasFilters = selectedExpertise.length > 0 || minPrice !== '' || maxPrice !== '';
  const resultNoun = filteredMentors.length === 1 ? 'mentor' : 'mentors';

  // Issue 480 – shared filter panel markup (reused for both sidebar and mobile drawer)
  const FilterPanel = (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700/80 p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        {/* Issue 482 – use <h2> for semantic heading */}
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
            <label htmlFor="min-price" className="sr-only">Minimum price</label>
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
          <span className="text-gray-400 text-sm" aria-hidden="true">to</span>
          <div className="flex-1">
            <label htmlFor="max-price" className="sr-only">Maximum price</label>
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
  );

  return (
    <>
      {/* Issue 482 – skip link for keyboard users */}
      <a
        href="#mentor-results"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-cyan-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to results
      </a>

      {/* Issue 482 – visually hidden live region for filter/result announcements */}
      <p
        ref={announceRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <div className="max-w-screen-xl mx-auto px-4 pb-16">
        {/* Issue 480 – "Show filters" button visible only on mobile */}
        <div className="md:hidden py-4">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-haspopup="dialog"
            aria-expanded={mobileFiltersOpen}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
            </svg>
            Filters
            {hasFilters && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] font-bold">
                {selectedExpertise.length + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Issue 480 – Mobile filter drawer overlay */}
        {mobileFiltersOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mentor filters"
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFiltersOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer panel */}
            <div className="absolute inset-y-0 left-0 w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-xl flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                  aria-label="Close filters"
                  // Issue 482 – auto-focus the close button when drawer opens
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-5 flex-1">
                <ExpertiseFilter
                  selected={selectedExpertise}
                  counts={counts}
                  onToggle={toggleExpertise}
                  onClear={clearExpertise}
                />
                <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Hourly Rate ($)</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label htmlFor="min-price-mobile" className="sr-only">Minimum price</label>
                      <input
                        id="min-price-mobile"
                        type="number"
                        min="0"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                    <span className="text-gray-400 text-sm" aria-hidden="true">to</span>
                    <div className="flex-1">
                      <label htmlFor="max-price-mobile" className="sr-only">Maximum price</label>
                      <input
                        id="max-price-mobile"
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
              <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                <button
                  type="button"
                  onClick={() => { clearFilters(); setMobileFiltersOpen(false); }}
                  className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-8 md:flex-row md:gap-8">
          {/* Sidebar – hidden on mobile (Issue 480) */}
          <aside
            aria-label="Mentor filters"
            className="hidden md:block w-full md:w-64 lg:w-72 shrink-0"
          >
            <div className="md:sticky md:top-28">
              {FilterPanel}
            </div>
          </aside>

          {/* Listing */}
          <main
            id="mentor-results"
            ref={mainRef}
            aria-label="Mentor results"
            className="flex-1 min-w-0"
            tabIndex={-1}
          >
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Issue 482 – aria-live on result count */}
              <p
                className="text-sm text-gray-600 dark:text-gray-400"
                aria-live="polite"
                aria-atomic="true"
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
                    onChange={(e) => setSort(e.target.value as SortOption)}
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
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    aria-hidden="true" focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Issue 479 – compare CTA bar when ≥2 mentors selected */}
            {compareIds.length >= 2 && (
              <div
                role="status"
                aria-live="polite"
                className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 px-4 py-3"
              >
                <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-200">
                  {compareIds.length} mentor{compareIds.length > 1 ? 's' : ''} selected for comparison
                </p>
                <button
                  type="button"
                  onClick={() => setShowComparison(true)}
                  className="text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Compare now
                </button>
              </div>
            )}

            {filteredMentors.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-16 px-6 text-center">
                <div
                  className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400"
                  aria-hidden="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.4a7 7 0 11-14 0 7 7 0 0114 0z" />
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
              /* Issue 482 – use <ul role="list"> for semantic list of mentors */
              <ul
                role="list"
                aria-label="Mentor cards"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredMentors.map((mentor) => {
                  const isSelected = compareIds.includes(mentor.id);
                  const isDisabled = !isSelected && compareIds.length >= MAX_COMPARE;
                  return (
                    <li key={mentor.id} className="h-full flex flex-col">
                      {/* Issue 481 – card wrapper; lazy image handled inside DiscoveryMentorCard */}
                      <DiscoveryMentorCard mentor={mentor} />

                      {/* Issue 479 – compare toggle button per card */}
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => toggleCompare(mentor.id)}
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
                            ? 'border-cyan-600 bg-cyan-600 text-white hover:bg-cyan-700'
                            : isDisabled
                              ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed bg-transparent'
                              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 bg-transparent'
                        }`}
                      >
                        {isSelected ? '✓ Added to compare' : `+ Compare${isDisabled ? ' (limit reached)' : ''}`}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </main>
        </div>
      </div>

      {/* Issue 479 – Comparison drawer */}
      {showComparison && mentorsToCompare.length >= 2 && (
        <MentorComparisonDrawer
          mentors={mentorsToCompare}
          onRemove={removeFromComparison}
          onClose={closeComparison}
        />
      )}
    </>
  );
}
