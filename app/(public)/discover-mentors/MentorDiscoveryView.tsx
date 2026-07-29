"use client";

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
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
