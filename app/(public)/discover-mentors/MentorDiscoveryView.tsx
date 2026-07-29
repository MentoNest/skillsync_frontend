"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import dynamic from 'next/dynamic';
import ExpertiseFilter from '@/components/mentors/ExpertiseFilter';
import DiscoveryMentorCard from '@/components/mentors/DiscoveryMentorCard';
import EmptyState from '@/components/mentors/EmptyState';
import MentorCardSkeleton from '@/components/mentor-card-skeleton';
import {
  EXPERTISE_OPTIONS,
  type Expertise,
  type Mentor,
} from '@/components/mentors/data';

type SortOption =
  | 'rating-desc'
  | 'price-asc'
  | 'price-desc'
  | 'experience-desc'
  | 'popularity-desc';
// Issue 481 – lazy-load the comparison drawer (only needed when user selects mentors)
const MentorComparisonDrawer = dynamic(
  () => import('@/components/mentors/MentorComparisonDrawer'),
  { ssr: false },
);

type SortOption = 'rating-desc' | 'price-asc' | 'price-desc' | 'experience-desc';

const SORT_OPTIONS: ReadonlyArray<{ value: SortOption; label: string }> = [
  { value: 'rating-desc', label: 'Highest rated' },
  { value: 'popularity-desc', label: 'Most popular' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'experience-desc', label: 'Most experienced' },
];

const MAX_COMPARE = 3;

interface MentorDiscoveryViewProps {
  mentors: Mentor[];
}

export default function MentorDiscoveryView({ mentors: initialMentors }: MentorDiscoveryViewProps) {
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sort, setSort] = useState<SortOption>('rating-desc');
  // Bookmark state
  const [bookmarkedMentors, setBookmarkedMentors] = useState<Set<string>>(new Set());
  // Infinite scroll state
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [hasMore, setHasMore] = useState(true);
  // Loading state for initial data fetch
  const [isLoading, setIsLoading] = useState(true);
  // Issue 479 – comparison state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  // Issue 480 – mobile filter drawer
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // Issue 482 – ref to announce live region messages
  const announceRef = useRef<HTMLParagraphElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'pagination' | 'infinite'>('infinite');
  const PAGE_SIZE = 6;
  const [infiniteLimit, setInfiniteLimit] = useState(PAGE_SIZE);

  const fetchMoreData = () => {
    if (infiniteLimit >= filteredMentors.length) return;
    setTimeout(() => {
      setInfiniteLimit((prev) => prev + PAGE_SIZE);
    }, 400);
  };

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMentors(initialMentors);
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, [initialMentors]);

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

  // Issue 482 – keyboard-navigable focus skip link target
  const mainRef = useRef<HTMLElement>(null);

  // Issue 481 – memoized callbacks to avoid re-renders
  const toggleExpertise = useCallback((expertise: Expertise) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise) ? prev.filter((e) => e !== expertise) : [...prev, expertise],
import { useCallback, useMemo, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

import type { Mentor } from "@/lib/types";
import { MOCK_MENTORS } from "@/app/(public)/mentors/data/mockMentors";
import MentorCard from "@/app/(public)/mentors/components/MentorCard";
import {
  EXPERIENCE_LEVELS,
  ExperienceLevel,
} from "@/app/(public)/mentors/data";
import ExperienceLevelFilter from "@/app/(public)/mentors/components/ExperienceLevelFilter";
import IndustryFilter from "@/app/(public)/mentors/components/IndustryFilter";
import PriceRangeFilter from "@/app/(public)/mentors/components/PriceRangeFilter";

export default function MentorDiscoveryView() {
  const [initialMentors] = useState<Mentor[]>(() => MOCK_MENTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<
    ExperienceLevel[]
  >([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const toggleIndustry = useCallback((industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((item) => item !== industry)
        : [...prev, industry],
    );
  }, []);

  const toggleExperienceLevel = useCallback((level: ExperienceLevel) => {
    setSelectedExperienceLevels((prev) =>
      prev.includes(level)
        ? prev.filter((item) => item !== level)
        : [...prev, level],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedIndustries([]);
    setSelectedExperienceLevels([]);
    setPriceRange({ min: 0, max: 1000 });
  }, []);

  const filteredMentors = useMemo(() => {
    return initialMentors.filter((mentor) => {
      const searchMatch =
        searchQuery.length > 0
          ? mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.title.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

      const industryMatch =
        selectedIndustries.length > 0
          ? selectedIndustries.some((industry) =>
              mentor.industries?.includes(industry),
            )
          : true;

      const experienceLevelMatch =
        selectedExperienceLevels.length > 0
          ? selectedExperienceLevels.includes(mentor.experienceLevel)
          : true;

      const priceMatch =
        mentor.pricePerSession >= priceRange.min &&
        mentor.pricePerSession <= priceRange.max;

      return searchMatch && industryMatch && experienceLevelMatch && priceMatch;
    });
  }, [
    initialMentors,
    searchQuery,
    selectedIndustries,
    selectedExperienceLevels,
    priceRange,
  ]);

  const hasFilters =
    selectedIndustries.length > 0 ||
    selectedExperienceLevels.length > 0 ||
    priceRange.min > 0 ||
    priceRange.max < 1000;

  const FilterPanel = ({ isMobile }: { isMobile?: boolean }) => (
    <div className={isMobile ? "" : "py-6"}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Filters
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-500 dark:hover:text-cyan-400"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
        <IndustryFilter
          mentors={initialMentors}
          selected={selectedIndustries}
          onToggle={toggleIndustry}
        />
      </div>

      <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Experience Level
        </h3>
        <ExperienceLevelFilter
          mentors={initialMentors}
          selected={selectedExperienceLevels}
          onToggle={toggleExperienceLevel}
        />
      </div>

      <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
        <PriceRangeFilter
          min={0}
          max={1000}
          value={priceRange}
          onChange={setPriceRange}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as="div">
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as="div"
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as="div"
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl dark:bg-gray-900">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 dark:bg-gray-900"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200 dark:border-gray-800 px-4">
                    <FilterPanel isMobile />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24 dark:border-gray-800">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Discover Mentors
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Mentors
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                <FilterPanel />
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-end lg:hidden mb-4">
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            isLoading ? (
              // Show loading skeletons while initial data is loading
              <ul
                role="list"
                aria-label="Loading mentors"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {Array.from({ length: PAGE_SIZE }, (_, i) => (
                  <MentorCardSkeleton key={`skeleton-${i}`} />
                ))}
              </ul>
            ) : (
              displayMode === 'infinite' ? (
                <InfiniteScroll
                  dataLength={infiniteMentors.length}
                  next={fetchMoreData}
                  hasMore={infiniteMentors.length < filteredMentors.length}
                  loader={
                    <div className="flex justify-center items-center py-8">
                      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                        <span className="h-4 w-4 rounded-full border-2 border-cyan-600 border-t-transparent animate-spin" />
                        Loading more mentors...
                      </div>
                    </div>
                  }
                  endMessage={
                    <p className="text-center py-8 text-xs font-semibold text-gray-400 dark:text-gray-500">
                      You&apos;ve viewed all {filteredMentors.length} mentors
                    </p>
                  }
                >
                  <ul
                    role="list"
                    aria-label="Mentor cards"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {infiniteMentors.map((mentor) => {
                      const isSelected = compareIds.includes(mentor.id);
                      const isDisabled = !isSelected && compareIds.length >= MAX_COMPARE;
                      return (
                        <li key={mentor.id} className="h-full flex flex-col">
                          <DiscoveryMentorCard mentor={mentor} />

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
                </InfiniteScroll>
              ) : (
                <>
                  <ul
                    role="list"
                    aria-label="Mentor cards"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {paginatedMentors.map((mentor) => {
                      const isSelected = compareIds.includes(mentor.id);
                      const isDisabled = !isSelected && compareIds.length >= MAX_COMPARE;
                      return (
                        <li key={mentor.id} className="h-full flex flex-col">
                          <DiscoveryMentorCard mentor={mentor} />

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

                {totalPages > 1 && (
                  <nav aria-label="Mentor discovery pagination" className="flex items-center justify-center gap-2 mt-10">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      aria-label="Previous page"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-1.5 px-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => setCurrentPage(p)}
                          aria-label={`Page ${p}`}
                          aria-current={currentPage === p ? 'page' : undefined}
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            currentPage === p
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            )
          )}
          </main>
        </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
