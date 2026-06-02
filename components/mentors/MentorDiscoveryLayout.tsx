'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FilterSidebar from '@/components/mentors/FilterSidebar';
import type { Mentor } from '@/lib/types/mentor';
import { mentors } from '@/lib/data/mentors';
import { useMentorSelection } from '@/lib/context/MentorSelectionContext';
import ComparisonBar from '@/components/mentors/ComparisonBar';

const CATEGORIES = ['All', 'Engineering', 'Design', 'Product', 'Data', 'Business'];
const AVAILABILITY = ['All', 'Available', 'Fully Booked'];

function MentorCard({
  mentor,
  isSelected,
  onToggle,
}: {
  mentor: Mentor;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[rgba(20,18,16,0.07)] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(20,18,16,0.1)]">
      {/* Top */}
      <div className="p-6 flex items-start gap-4">
        <button
          onClick={onToggle}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
            isSelected
              ? 'bg-[#141210] border-[#141210]'
              : 'border-[rgba(20,18,16,0.2)] hover:border-[#141210]'
          }`}
          aria-label={isSelected ? `Deselect ${mentor.name}` : `Select ${mentor.name} for comparison`}
        >
          {isSelected && <span className="text-[#f7f5f2] text-[10px]">✓</span>}
        </button>
        <div
          className="w-14 h-14 rounded-[14px] flex-shrink-0 flex items-center justify-center text-lg font-bold relative overflow-hidden"
          style={{ background: mentor.bg, color: mentor.accent, fontFamily: "'Syne', sans-serif" }}
        >
          {mentor.image ? (
            <Image
              src={mentor.image}
              alt={`${mentor.name} profile`}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{mentor.initials}</span>
          )}
          <span
            className={`absolute bottom-[-2px] right-[-2px] w-3 h-3 rounded-full border-2 border-white ${
              mentor.available ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#141210] text-[15px] truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
            {mentor.name}
          </p>
          <p className="text-[13px] text-[#94928d] truncate">{mentor.role}</p>
          <p className="text-[12px] font-medium mt-0.5" style={{ color: mentor.accent }}>
            {mentor.company}
          </p>
          <p className="text-[12px] mt-1 text-[#141210]">${mentor.rate}/hr</p>
        </div>

        <div className="flex items-center gap-1 bg-[#f7f5f2] rounded-lg px-2 py-1 flex-shrink-0">
          <span className="text-amber-400 text-[11px]">★</span>
          <span className="text-[12px] font-semibold text-[#141210]">{mentor.rating}</span>
        </div>
      </div>

      <div className="h-px bg-[rgba(20,18,16,0.07)] mx-6" />

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <p className="text-[13.5px] leading-[1.7] text-[#6b6860] flex-1">{mentor.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {mentor.tags.map(tag => (
            <span
              key={tag}
              className="text-[11.5px] font-medium px-2.5 py-1 rounded-md bg-[#f7f5f2] text-[#6b6860] border border-[rgba(20,18,16,0.08)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 flex items-center justify-between gap-3">
        <span className="text-[12px] text-[#94928d]">
          <strong className="text-[#141210] font-semibold">{mentor.sessions}</strong> sessions
        </span>
        <Link
          href={mentor.available ? `/mentors/${mentor.id}` : '#'}
          className={`text-[12.5px] font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
            mentor.available
              ? 'bg-[#141210] text-[#f7f5f2] hover:bg-[#2d2a27]'
              : 'bg-[#f0efed] text-[#94928d] cursor-default pointer-events-none'
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {mentor.available ? 'Book session' : 'Fully booked'}
        </Link>
      </div>
    </div>
  );
}

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
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#141210] text-[#f7f5f2] font-medium'
                    : 'text-[#6b6860] hover:bg-[#f7f5f2] hover:text-[#141210]'
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
          {AVAILABILITY.map(opt => (
            <li key={opt}>
              <button
                onClick={() => setActiveAvailability(opt)}
                className={`w-full text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${
                  activeAvailability === opt
                    ? 'bg-[#141210] text-[#f7f5f2] font-medium'
                    : 'text-[#6b6860] hover:bg-[#f7f5f2] hover:text-[#141210]'
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
              onChange={e => setMinRate(e.target.value)}
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
              onChange={e => setMaxRate(e.target.value)}
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
  const { selectedMentors, toggleMentor, isSelected } = useMentorSelection();

  const filtered = mentors.filter(m => {
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
    const matchesAvailability =
      activeAvailability === 'All' ||
      (activeAvailability === 'Available' && m.available) ||
      (activeAvailability === 'Fully Booked' && !m.available);
    const parsedMin = minRate === '' ? 0 : parseFloat(minRate);
    const parsedMax = maxRate === '' ? Number.POSITIVE_INFINITY : parseFloat(maxRate);
    const matchesRate = m.rate >= parsedMin && m.rate <= parsedMax;

    return matchesCategory && matchesAvailability && matchesRate;
  });

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
          Browse {mentors.length} experienced professionals ready to guide your journey.
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
              <span className="font-semibold text-[#141210]">{filtered.length}</span>{' '}
              mentor{filtered.length !== 1 ? 's' : ''} found
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-[#94928d] text-[15px]">
                No mentors match the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(mentor => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    isSelected={isSelected(mentor.id)}
                    onToggle={() => toggleMentor(mentor)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <ComparisonBar />
    </div>
  );
}
