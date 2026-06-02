"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FilterSidebar from '@/components/mentors/FilterSidebar';
import MentorCard from '@/components/mentors/MentorCard';
import Pagination from '@/components/mentors/Pagination';
import { mentors } from '@/lib/mentors';
import { useMentorSelection } from '@/lib/context/MentorSelectionContext';
import ComparisonBar from '@/components/mentors/ComparisonBar';

const CATEGORIES = ['All', 'Engineering', 'Design', 'Product', 'Business', 'Data'];
const AVAILABILITY = ['All', 'Available', 'Fully Booked'];

function FilterPanel({
  activeCategory,
  setActiveCategory,
  activeAvailability,
  setActiveAvailability,
  minRate,
  maxRate,
  setMinRate,
  setMaxRate,
}: {
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  activeAvailability: string;
  setActiveAvailability: (v: string) => void;
  minRate: string;
  maxRate: string;
  setMinRate: (v: string) => void;
  setMaxRate: (v: string) => void;
}) {
  return (
    <>
      {/* Category */}
      <div className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)]">
        <h3 className="text-[13px] font-semibold text-[#141210] mb-3 uppercase tracking-wider">
          Category
        </h3>
        <ul className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === cat
                    ? "bg-[#141210] text-[#f7f5f2] font-medium"
                    : "text-[#6b6860] hover:bg-[#f7f5f2] hover:text-[#141210]"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Availability */}
      <div className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)] mt-4">
        <h3 className="text-[13px] font-semibold text-[#141210] mb-3 uppercase tracking-wider">
          Availability
        </h3>
        <ul className="space-y-0.5">
          {AVAILABILITY.map((opt) => (
            <li key={opt}>
              <button
                onClick={() => setActiveAvailability(opt)}
                className={`w-full text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${
                  activeAvailability === opt
                    ? "bg-[#141210] text-[#f7f5f2] font-medium"
                    : "text-[#6b6860] hover:bg-[#f7f5f2] hover:text-[#141210]"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Hourly rate */}
      <div className="bg-white rounded-2xl p-5 border border-[rgba(20,18,16,0.07)] mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-[#141210] uppercase tracking-wider">
            Hourly rate
          </h3>
          <span className="text-[11px] text-[#6b6860]">USD</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-[12px] text-[#6b6860]">
            Min
            <input
              type="number"
              min={0}
              value={minRate}
              onChange={(e) => setMinRate(e.target.value)}
              placeholder="Any"
              className="mt-2 w-full rounded-xl border border-[rgba(20,18,16,0.12)] bg-[#f7f5f2] px-3 py-2 text-sm text-[#141210] focus:border-[#141210] focus:outline-none"
            />
          </label>
          <label className="block text-[12px] text-[#6b6860]">
            Max
            <input
              type="number"
              min={0}
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
              placeholder="Any"
              className="mt-2 w-full rounded-xl border border-[rgba(20,18,16,0.12)] bg-[#f7f5f2] px-3 py-2 text-sm text-[#141210] focus:border-[#141210] focus:outline-none"
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default function MentorDiscoveryLayout() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeAvailability, setActiveAvailability] = useState('All');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [displayedCount, setDisplayedCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 6;
  const { selectedMentors, toggleMentor, isSelected } = useMentorSelection();

  const filtered = mentors.filter((m) => {
    const matchesCategory =
      activeCategory === "All" || m.category === activeCategory;
    const matchesAvailability =
      activeAvailability === "All" ||
      (activeAvailability === "Available" && m.available) ||
      (activeAvailability === "Fully Booked" && !m.available);
    const parsedMin = minRate === "" ? 0 : parseFloat(minRate);
    const parsedMax =
      maxRate === "" ? Number.POSITIVE_INFINITY : parseFloat(maxRate);
    const matchesRate = m.rate >= parsedMin && m.rate <= parsedMax;

    return matchesCategory && matchesAvailability && matchesRate;
  });

  useEffect(() => {
    setDisplayedCount(9);
    setCurrentPage(1);
  }, [activeCategory, activeAvailability, minRate, maxRate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading && displayedCount < filtered.length) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayedCount(prev => Math.min(prev + 6, filtered.length));
            setIsLoading(false);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [displayedCount, filtered.length, isLoading]);

  const displayedMentors = filtered.slice(0, displayedCount);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMentors = filtered.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[rgba(20,18,16,0.07)]">
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#94928d] mb-2">
          Our Community
        </p>
        <h1
          className="text-[clamp(28px,4vw,42px)] font-extrabold text-[#141210] leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Find your mentor
        </h1>
        <p className="mt-2 text-[15px] text-[#6b6860]">
          Browse {filtered.length} experienced professionals ready to guide your journey.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filters (horizontal pills) */}
        <div className="lg:hidden mb-6 space-y-3">
          <FilterSidebar
            mode="pill"
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeAvailability={activeAvailability}
            setActiveAvailability={setActiveAvailability}
          />
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 items-start">
          {/* Sidebar — hidden on mobile, sticky on desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-20">
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
          </aside>

          {/* Mentor listing area */}
          <main className="flex-1 min-w-0">
            <p className="text-[13px] text-[#94928d] mb-5">
              <span className="font-semibold text-[#141210]">{displayedMentors.length}</span> of{' '}
              <span className="font-semibold text-[#141210]">{filtered.length}</span>{' '}
              mentor{filtered.length !== 1 ? 's' : ''} found
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-[#94928d] text-[15px]">
                No mentors match the selected filters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {displayedMentors.map(mentor => (
                    <MentorCard
                      key={mentor.id}
                      mentor={mentor}
                      isSelected={isSelected(mentor.id)}
                      onToggle={() => toggleMentor(mentor)}
                    />
                  ))}
                </div>

                {/* Loading indicator and intersection observer target */}
                {displayedCount < filtered.length && (
                  <div ref={observerTarget} className="mt-8 flex justify-center">
                    {isLoading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="bg-white rounded-2xl border border-[rgba(20,18,16,0.07)] overflow-hidden flex flex-col">
                            <div className="p-6 flex items-start gap-4">
                              <div className="w-14 h-14 rounded-[14px] flex-shrink-0 bg-[#e8e5e0] animate-pulse" />
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-[#e8e5e0] rounded animate-pulse w-3/4" />
                                <div className="h-3 bg-[#e8e5e0] rounded animate-pulse w-1/2" />
                              </div>
                              <div className="w-12 h-8 bg-[#e8e5e0] rounded-lg animate-pulse flex-shrink-0" />
                            </div>
                            <div className="h-px bg-[rgba(20,18,16,0.07)] mx-6" />
                            <div className="p-6 flex-1 flex flex-col gap-4">
                              <div className="space-y-2">
                                <div className="h-3 bg-[#e8e5e0] rounded animate-pulse" />
                                <div className="h-3 bg-[#e8e5e0] rounded animate-pulse w-5/6" />
                              </div>
                              <div className="flex gap-1.5">
                                {[...Array(3)].map((_, j) => (
                                  <div key={j} className="h-6 bg-[#e8e5e0] rounded-md animate-pulse w-14" />
                                ))}
                              </div>
                            </div>
                            <div className="px-6 pb-6 flex items-center justify-between gap-3">
                              <div className="h-4 bg-[#e8e5e0] rounded animate-pulse w-20" />
                              <div className="h-8 bg-[#e8e5e0] rounded-xl animate-pulse w-24" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-[#94928d] text-sm">
                        Scroll to load more mentors
                      </div>
                    )}
                  </div>
                )}

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </main>
        </div>
      </div>

      <ComparisonBar />
    </div>
  );
}
