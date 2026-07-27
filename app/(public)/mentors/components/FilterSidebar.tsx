'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import IndustryFilter from './IndustryFilter';
import {
  AVAILABILITY_OPTIONS,
  EXPERIENCE_LEVELS,
  PRICE_RANGES,
  type AvailabilityStatus,
  type ExperienceLevel,
  type Mentor,
  type PriceRangeId,
} from '../data/mockMentors';

// Tailwind's `lg` breakpoint lives at 1024 px. Below that the sidebar
// behaves as a slide-in drawer; above it sits inline in the page grid.
const LG_BREAKPOINT = '(min-width: 1024px)';

/**
 * SSR-safe media-query hook backed by useSyncExternalStore.
 *
 * - On the server `getServerSnapshot` returns `false` (responsive default).
 * - On the client `subscribe` registers the change listener; `getSnapshot`
 *   reads the current match.
 * - This avoids the `react-hooks/set-state-in-effect` rule violation that
 *   plagues a useState + useEffect pattern.
 */
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      if (typeof window === 'undefined' || !window.matchMedia) {
        return () => {};
      }
      const mql = window.matchMedia(query);
      mql.addEventListener('change', notify);
      return () => mql.removeEventListener('change', notify);
    },
    () => {
      if (typeof window === 'undefined' || !window.matchMedia) return false;
      return window.matchMedia(query).matches;
    },
    () => false,
  );
}

export interface FilterState {
  query: string;
  selectedIndustries: string[];
  selectedExperiences: ExperienceLevel[];
  selectedAvailability: AvailabilityStatus[];
  priceRangeId: PriceRangeId;
}

export interface FilterSidebarProps {
  /** Whether the sidebar is visible on mobile (drawer mode). */
  isOpen: boolean;
  /** Close handler for mobile drawer. */
  onClose: () => void;
  /** All mentors available before this sidebar's filters apply — drives counts. */
  mentors: Mentor[];
  /** Current state. */
  state: FilterState;
  /** Reset everything to defaults. */
  onReset: () => void;
  // Per-filter setters — sidebar is a controlled component.
  onToggleIndustry: (industry: string) => void;
  onToggleExperience: (level: ExperienceLevel) => void;
  onToggleAvailability: (status: AvailabilityStatus) => void;
  onChangePriceRange: (id: PriceRangeId) => void;
}

const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  available: 'Available now',
  busy: 'Limited slots',
  'fully-booked': 'Waitlist only',
};

/**
 * Reusable filter sidebar (Issue #458).
 *
 * - **Reusable.** Takes a controlled `FilterState` plus per-filter setters
 *   so the parent can keep ownership of state and persistence (local
 *   storage, URL params, global store, …) if/when that's desired.
 * - **Responsive.** On `lg`+ it renders as a sticky aside. Below that
 *   breakpoint the same component renders inside a fixed full-height
 *   drawer with a backdrop and a focusable close button — driven by the
 *   parent's `isOpen` flag.
 */
export default function FilterSidebar({
  isOpen,
  onClose,
  mentors,
  state,
  onReset,
  onToggleIndustry,
  onToggleExperience,
  onToggleAvailability,
  onChangePriceRange,
}: FilterSidebarProps) {
  const isDesktop = useMediaQuery(LG_BREAKPOINT);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close the drawer on Escape and lock body scroll while it's open on mobile.
  useEffect(() => {
    if (!isOpen || isDesktop) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isDesktop, onClose]);

  // Move focus into the drawer on open so keyboard users land somewhere usable.
  useEffect(() => {
    if (!isOpen || isDesktop) return;
    closeButtonRef.current?.focus();
  }, [isOpen, isDesktop]);

  const isFiltered =
    state.selectedIndustries.length > 0 ||
    state.selectedExperiences.length > 0 ||
    state.selectedAvailability.length > 0 ||
    state.priceRangeId !== 'any' ||
    state.query.length > 0;

  return (
    <>
      {/* Backdrop (mobile drawer only) */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* `inert` is set ONLY on mobile when the drawer is closed.
          On desktop the sidebar is always rendered inline and accessible. */}
      <aside
        aria-label="Mentor filters"
        inert={!isDesktop && !isOpen}
        className={`
          fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col gap-6 overflow-y-auto
          border-r border-gray-200 bg-white p-6 shadow-2xl transition-transform duration-300
          dark:border-gray-800 dark:bg-gray-950
          lg:static lg:z-auto lg:max-w-none lg:translate-x-0 lg:overflow-visible lg:rounded-2xl
          lg:border lg:shadow-sm
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
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
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Filters
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {isFiltered ? (
              <button
                type="button"
                onClick={onReset}
                className="rounded-md px-2 py-1 text-xs font-semibold text-cyan-600 transition-colors hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-900/30"
              >
                Reset
              </button>
            ) : null}

            {/* Close button only on mobile */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 lg:hidden"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
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
          </div>
        </header>

        {/* Industry */}
        <IndustryFilter
          mentors={mentors}
          selected={state.selectedIndustries}
          onToggle={onToggleIndustry}
        />

        <Divider />

        {/* Experience Level (multi-select) */}
        <FilterGroup title="Experience level">
          <ul role="list" className="mt-2 space-y-1.5">
            {EXPERIENCE_LEVELS.map((level) => {
              const checked = state.selectedExperiences.includes(level);
              return (
                <li key={level}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={checked}
                      onChange={() => onToggleExperience(level)}
                      aria-label={`Filter by experience level ${level}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500 peer-focus-visible:ring-offset-1 dark:peer-focus-visible:ring-offset-cyan-900/40 ${
                        checked
                          ? 'border-cyan-500 bg-cyan-500 text-white'
                          : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
                      }`}
                    >
                      {checked ? (
                        <svg
                          viewBox="0 0 12 12"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2 6.5l3 3 5-7"
                          />
                        </svg>
                      ) : null}
                    </span>
                    <span>{level}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </FilterGroup>

        <Divider />

        {/* Availability (multi-select) */}
        <FilterGroup title="Availability">
          <ul role="list" className="mt-2 space-y-1.5">
            {AVAILABILITY_OPTIONS.map((status) => {
              const checked = state.selectedAvailability.includes(status);
              return (
                <li key={status}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={checked}
                      onChange={() => onToggleAvailability(status)}
                      aria-label={`Filter by availability ${AVAILABILITY_LABELS[status]}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500 peer-focus-visible:ring-offset-1 dark:peer-focus-visible:ring-offset-cyan-900/40 ${
                        checked
                          ? 'border-cyan-500 bg-cyan-500 text-white'
                          : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
                      }`}
                    >
                      {checked ? (
                        <svg
                          viewBox="0 0 12 12"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2 6.5l3 3 5-7"
                          />
                        </svg>
                      ) : null}
                    </span>
                    <span>{AVAILABILITY_LABELS[status]}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </FilterGroup>

        <Divider />

        {/* Price (radio) */}
        <FilterGroup title="Price per session">
          <ul role="list" className="mt-2 space-y-1.5">
            {PRICE_RANGES.map((range) => {
              const checked = state.priceRangeId === range.id;
              return (
                <li key={range.id}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60">
                    <input
                      type="radio"
                      name="price-range"
                      className="peer sr-only"
                      checked={checked}
                      onChange={() => onChangePriceRange(range.id)}
                      aria-label={`Filter by ${range.label}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500 peer-focus-visible:ring-offset-1 dark:peer-focus-visible:ring-offset-cyan-900/40 ${
                        checked
                          ? 'border-cyan-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {checked ? (
                        <span className="h-2 w-2 rounded-full bg-cyan-500" />
                      ) : null}
                    </span>
                    <span>{range.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </FilterGroup>
      </aside>
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-gray-100 dark:border-gray-800" />;
}
