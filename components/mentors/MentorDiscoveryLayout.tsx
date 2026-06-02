'use client';

import { useEffect, useState } from 'react';
import FilterSidebar from '@/components/mentors/FilterSidebar';
import MentorCard from '@/components/mentors/MentorCard';
import MentorSearchBar from '@/components/mentors/MentorSearchBar';
import Pagination from '@/components/mentors/Pagination';
import { mentors } from '@/lib/mentors';

const ITEMS_PER_PAGE = 6;

export default function MentorDiscoveryLayout() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeAvailability, setActiveAvailability] = useState('All');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filtered = mentors.filter((mentor) => {
    const matchesCategory = activeCategory === 'All' || mentor.category === activeCategory;
    const matchesAvailability =
      activeAvailability === 'All' ||
      (activeAvailability === 'Available' && mentor.available) ||
      (activeAvailability === 'Fully Booked' && !mentor.available);

    const parsedMin = minRate === '' ? 0 : parseFloat(minRate);
    const parsedMax = maxRate === '' ? Number.POSITIVE_INFINITY : parseFloat(maxRate);
    const matchesRate = mentor.rate >= parsedMin && mentor.rate <= parsedMax;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      [mentor.name, mentor.role, mentor.company, ...mentor.tags]
        .some((value) => value.toLowerCase().includes(query));

    return matchesCategory && matchesAvailability && matchesRate && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMentors = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeAvailability, minRate, maxRate, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[rgba(20,18,16,0.07)]">
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#94928d] mb-2">
          Our Community
        </p>
        <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-[#141210] leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          Find your mentor
        </h1>
        <p className="mt-2 text-[15px] text-[#6b6860]">
          Browse the mentor directory and refine your search with roles, availability, and hourly rate.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-[rgba(20,18,16,0.12)] bg-white px-4 py-2 text-[13px] font-semibold text-[#141210] shadow-sm transition hover:border-[rgba(20,18,16,0.2)] focus:outline-none focus:ring-2 focus:ring-[#d6d3d1]"
          >
            Filters
          </button>
          <p className="text-[13px] text-[#94928d]">
            {filtered.length} mentor{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {isMobileFiltersOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
            <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl border-r border-[rgba(20,18,16,0.08)] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="filter-dialog-title">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(20,18,16,0.07)]">
                <div>
                  <p id="filter-dialog-title" className="text-[15px] font-semibold text-[#141210]">
                    Filter mentors
                  </p>
                  <p className="text-[12px] text-[#6b6860]">Use filters to narrow your search</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-[13px] font-semibold text-[#141210] focus:outline-none focus:ring-2 focus:ring-[#d6d3d1]"
                >
                  Close
                </button>
              </div>
              <div className="p-5">
                <FilterSidebar
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  activeAvailability={activeAvailability}
                  setActiveAvailability={setActiveAvailability}
                  minRate={minRate}
                  maxRate={maxRate}
                  setMinRate={setMinRate}
                  setMaxRate={setMaxRate}
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-20" aria-labelledby="desktop-filter-heading">
            <div className="space-y-4">
              <h2 id="desktop-filter-heading" className="sr-only">
                Mentor filters
              </h2>
              <FilterSidebar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeAvailability={activeAvailability}
                setActiveAvailability={setActiveAvailability}
                minRate={minRate}
                maxRate={maxRate}
                setMinRate={setMinRate}
                setMaxRate={setMaxRate}
              />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <section aria-labelledby="mentor-search-heading" className="mb-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="w-full md:max-w-xl">
                  <h2 id="mentor-search-heading" className="sr-only">
                    Mentor search
                  </h2>
                  <MentorSearchBar onSearch={setSearchQuery} />
                </div>
                <div className="text-[13px] text-[#94928d]">
                  <span className="font-semibold text-[#141210]">{filtered.length}</span>{' '}
                  mentor{filtered.length !== 1 ? 's' : ''} found
                </div>
              </div>
              <p className="sr-only" aria-live="polite">
                {filtered.length} mentors found. Page {currentPage} of {totalPages}.
              </p>
            </section>

            <section aria-labelledby="mentor-results-heading">
              <h2 id="mentor-results-heading" className="sr-only">
                Mentor results
              </h2>
              {filtered.length === 0 ? (
                <div role="status" className="rounded-3xl bg-white p-10 text-center text-[#94928d] text-[15px]">
                  No mentors match the selected filters.
                </div>
              ) : (
                <>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" role="list">
                    {paginatedMentors.map((mentor) => (
                      <li key={mentor.id}>
                        <MentorCard mentor={mentor} />
                      </li>
                    ))}
                  </ul>
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
