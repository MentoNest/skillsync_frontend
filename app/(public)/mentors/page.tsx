'use client';

import { useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterSidebar, { type FilterState } from './components/FilterSidebar';
import DiscoveryMentorCard from './components/DiscoveryMentorCard';
import {
  MENTORS,
  PRICE_RANGES,
  SORT_OPTIONS,
  matchesQuery,
  type AvailabilityStatus,
  type ExperienceLevel,
  type PriceRangeId,
  type SortOption,
} from './data/mockMentors';

const DEFAULT_STATE: FilterState = {
  query: '',
  selectedIndustries: [],
  selectedExperiences: [],
  selectedAvailability: [],
  priceRangeId: 'any',
};

/**
 * Mentor Discovery page.
 *
 * Closes GitHub issues:
 *  - #458 Create Filter Sidebar Component (reusable, responsive)
 *  - #460 Add Industry Filter (multi-select industries)
 *  - #457 Implement Mentor Search Functionality (name / skills / headline)
 *
 * State is local since the dataset is small and client-side filtering is
 * instantaneous. URL-shareable state can be layered on later via
 * `useRouter().replace` without changing these components.
 */
export default function MentorsDiscoveryPage() {
  const [state, setState] = useState<FilterState>(DEFAULT_STATE);
  const [sortBy, setSortBy] = useState<SortOption>('top-rated');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // The mentor list is static for now — kept as a constant so swapping it
  // for a fetch() later is a one-line change.
  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === state.priceRangeId) ??
      PRICE_RANGES[0];

    const matches = MENTORS.filter((mentor) => {
      // 1. Search by name / headline / skills (Issue #457)
      if (!matchesQuery(mentor, state.query)) return false;

      // 2. Multi-select industry — logical OR (Issue #460)
      if (
        state.selectedIndustries.length > 0 &&
        !mentor.industries.some((i) => state.selectedIndustries.includes(i))
      ) {
        return false;
      }

      // 3. Multi-select experience — logical OR
      if (
        state.selectedExperiences.length > 0 &&
        !state.selectedExperiences.includes(mentor.experienceLevel)
      ) {
        return false;
      }

      // 4. Multi-select availability — logical OR
      if (
        state.selectedAvailability.length > 0 &&
        !state.selectedAvailability.includes(mentor.availability)
      ) {
        return false;
      }

      // 5. Price range
      if (mentor.pricePerSession < range.min) return false;
      if (mentor.pricePerSession > range.max) return false;

      return true;
    });

    // Sort
    const sorted = [...matches];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.pricePerSession - b.pricePerSession);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.pricePerSession - a.pricePerSession);
        break;
      case 'most-reviewed':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'top-rated':
      default:
        sorted.sort(
          (a, b) =>
            b.rating - a.rating || b.reviewCount - a.reviewCount,
        );
        break;
    }
    return sorted;
  }, [state, sortBy]);

  // ── Handlers ─────────────────────────────────────────────────────
  const toggleIndustry = (industry: string) =>
    setState((prev) => ({
      ...prev,
      selectedIndustries: prev.selectedIndustries.includes(industry)
        ? prev.selectedIndustries.filter((i) => i !== industry)
        : [...prev.selectedIndustries, industry],
    }));

  const toggleExperience = (level: ExperienceLevel) =>
    setState((prev) => ({
      ...prev,
      selectedExperiences: prev.selectedExperiences.includes(level)
        ? prev.selectedExperiences.filter((l) => l !== level)
        : [...prev.selectedExperiences, level],
    }));

  const toggleAvailability = (status: AvailabilityStatus) =>
    setState((prev) => ({
      ...prev,
      selectedAvailability: prev.selectedAvailability.includes(status)
        ? prev.selectedAvailability.filter((s) => s !== status)
        : [...prev.selectedAvailability, status],
    }));

  const changePriceRange = (id: PriceRangeId) =>
    setState((prev) => ({ ...prev, priceRangeId: id }));

  const resetFilters = () => setState(DEFAULT_STATE);

  const activeFilterCount =
    state.selectedIndustries.length +
    state.selectedExperiences.length +
    state.selectedAvailability.length +
    (state.priceRangeId !== 'any' ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        aria-labelledby="discovery-hero-heading"
        className="relative overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-600 to-blue-700 px-4 py-12 text-white md:py-16"
      >
        {/* Decorative background orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-screen-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20 backdrop-blur">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            Discover Your Next Mentor
          </span>
          <h1
            id="discovery-hero-heading"
            className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl"
          >
            Find a mentor that fits your career path
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-cyan-50 md:text-lg">
            Search by skill, headline, or industry. Filter by availability,
            experience, and price to land on the right match — instantly.
          </p>

          <div className="mt-6 max-w-2xl">
            <SearchBar
              value={state.query}
              onChange={(query) =>
                setState((prev) => ({ ...prev, query }))
              }
            />
          </div>
        </div>
      </section>

      {/* ── Toolbar / sort + mobile filter trigger ─────────────── */}
      <section className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Mobile filters button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
              aria-label="Open filters"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h18M6 12h12M10 19.5h4"
                />
              </svg>
              Filters
              {activeFilterCount > 0 ? (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-600 px-1.5 text-xs font-semibold text-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                {filtered.length}
              </span>{' '}
              {filtered.length === 1 ? 'mentor' : 'mentors'} ·{' '}
              <span className="text-gray-500 dark:text-gray-500">
                {MENTORS.length} total
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-by"
              className="text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Sort by
            </label>
            <div className="relative">
              <select
                id="sort-by"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 ? (
          <div className="mx-auto mt-3 flex max-w-screen-xl flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Active:
            </span>
            {state.selectedIndustries.map((i) => (
              <Chip
                key={`i-${i}`}
                label={`Industry: ${i}`}
                onRemove={() => toggleIndustry(i)}
              />
            ))}
            {state.selectedExperiences.map((l) => (
              <Chip
                key={`l-${l}`}
                label={`Experience: ${l}`}
                onRemove={() => toggleExperience(l)}
              />
            ))}
            {state.selectedAvailability.map((s) => (
              <Chip
                key={`s-${s}`}
                label={`Availability: ${s.replace('-', ' ')}`}
                onRemove={() => toggleAvailability(s)}
              />
            ))}
            {state.priceRangeId !== 'any' ? (
              <Chip
                key="price"
                label={
                  'Price: ' +
                  (PRICE_RANGES.find((r) => r.id === state.priceRangeId)
                    ?.label ?? '')
                }
                onRemove={() => changePriceRange('any')}
              />
            ) : null}
            {state.query ? (
              <Chip
                key="query"
                label={`Search: “${state.query}”`}
                onRemove={() =>
                  setState((prev) => ({ ...prev, query: '' }))
                }
              />
            ) : null}

            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Clear all
            </button>
          </div>
        ) : null}
      </section>

      {/* ── Main grid ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[18rem,1fr]">
          <FilterSidebar
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            mentors={MENTORS}
            state={state}
            onReset={resetFilters}
            onToggleIndustry={toggleIndustry}
            onToggleExperience={toggleExperience}
            onToggleAvailability={toggleAvailability}
            onChangePriceRange={changePriceRange}
          />

          {filtered.length > 0 ? (
            <ul
              role="list"
              aria-label="Mentor results"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((mentor) => (
                <li key={mentor.id}>
                  <DiscoveryMentorCard mentor={mentor} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState onReset={resetFilters} hasQuery={state.query.length > 0} />
          )}
        </div>
      </section>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 py-1 pl-3 pr-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="flex h-5 w-5 items-center justify-center rounded-full text-cyan-700 transition-colors hover:bg-cyan-200 dark:text-cyan-300 dark:hover:bg-cyan-800"
      >
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </span>
  );
}

function EmptyState({
  onReset,
  hasQuery,
}: {
  onReset: () => void;
  hasQuery: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300">
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
        No mentors match your filters
      </h3>
      <p className="mt-1 max-w-sm text-sm text-gray-600 dark:text-gray-400">
        {hasQuery
          ? 'Try a different search term or broaden your filters to see more results.'
          : 'Try removing a filter to widen your search.'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      >
        Clear all filters
      </button>
    </div>
  );
}
