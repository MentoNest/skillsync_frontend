"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FilterSidebar from '@/components/mentors/FilterSidebar';
import MentorSkillTag from '@/components/mentors/MentorSkillTag';
import AvailabilityBadge, { AvailabilityStatus } from '@/components/mentors/AvailabilityBadge';

type Mentor = {
  id: number;
  name: string;
  role: string;
  company: string;
  category: string;
  initials: string;
  accent: string;
  bg: string;
  image?: string;
  available: boolean;
  status?: AvailabilityStatus;
  rating: number;
  rate: number;
  sessions: number;
  description: string;
  tags: string[];
import type { Mentor } from '@/lib/types/mentor';
import { useState } from 'react';
import MentorCard from '@/components/mentors/MentorCard';
import { MentorCardSkeleton } from '@/components/loadingSkeletons';
import type { Mentor } from '@/lib/mentors';

const CATEGORIES = ['All', 'Engineering', 'Design', 'Product', 'Business', 'Data'];
const AVAILABILITY = ['All', 'Available', 'Fully Booked'];
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterSidebar from "@/components/mentors/FilterSidebar";
import Pagination from "@/components/mentors/Pagination";

type FilterPanelProps = {
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  activeAvailability: string;
  setActiveAvailability: (v: string) => void;
  minRate: string;
  maxRate: string;
  setMinRate: (v: string) => void;
  setMaxRate: (v: string) => void;
};

function parseCategoryParam(value: string | null) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return CATEGORIES.find(category => category.toLowerCase() === normalized) || null;
}

function parseAvailabilityParam(value: string | null) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'available') return 'Available';
  if (normalized === 'fully-booked' || normalized === 'fullybooked' || normalized === 'fully booked') return 'Fully Booked';
  return null;
}

function normalizeRateParam(value: string | null) {
  if (!value) return '';
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? String(parsed) : '';
const mentors: Mentor[] = [
  {
    id: 1,
    name: "Kwame Asante",
    role: "Staff Engineer",
    company: "Stripe",
    category: "Engineering",
    initials: "KA",
    accent: "#3b82f6",
    bg: "#0f1f3d",
    image: "/tony-adebanjo.jpg",
    available: true,
    status: 'available' as AvailabilityStatus,
    rating: 4.95,
    rate: 180,
    sessions: 204,
    description:
      "Helps engineers level up to Staff and beyond. Specialises in distributed systems, technical leadership, and promo packets.",
    tags: ["System Design", "Leadership", "Go"],
  },
  {
    id: 2,
    name: "Priya Menon",
    role: "Head of Product Design",
    company: "Figma",
    category: "Design",
    initials: "PM",
    accent: "#a855f7",
    bg: "#1e0f3d",
    image: "/Image (Sarah Johnson).svg",
    available: true,
    status: 'busy' as AvailabilityStatus,
    rating: 4.98,
    rate: 145,
    sessions: 187,
    description:
      "Portfolio reviews, design system strategy, and breaking into senior IC or management tracks at top-tier product companies.",
    tags: ["Figma", "Design Systems", "Portfolio"],
  },
  {
    id: 3,
    name: "Tomás Reyes",
    role: "Senior PM",
    company: "Notion",
    category: "Product",
    initials: "TR",
    accent: "#10b981",
    bg: "#0a2318",
    image: "/Image (Marcus Williams).svg",
    available: false,
    status: 'fully_booked' as AvailabilityStatus,
    rating: 4.91,
    rate: 160,
    sessions: 139,
    description:
      "From APM to PM to Group PM — Tomás has made every jump and guides others through the same transitions with precision.",
    tags: ["Roadmapping", "Stakeholders", "APM"],
  },
  {
    id: 4,
    name: "Aisha Nwosu",
    role: "Data Science Lead",
    company: "Spotify",
    category: "Data",
    initials: "AN",
    accent: "#f59e0b",
    bg: "#2a1800",
    image: "/Image (Cole Hathans).svg",
    available: true,
    status: 'available' as AvailabilityStatus,
    rating: 4.93,
    rate: 155,
    sessions: 256,
    description:
      "ML pipelines, A/B testing at scale, and transitioning from academia to industry. Obsessed with making data teams actually functional.",
    tags: ["Python", "ML", "Analytics"],
  },
  {
    id: 5,
    name: "Leon Fischer",
    role: "Founding Engineer",
    company: "3× YC Startups",
    category: "Engineering",
    initials: "LF",
    accent: "#ef4444",
    bg: "#2a0a0a",
    image: "/tony-adebanjo.jpg",
    available: true,
    status: 'busy' as AvailabilityStatus,
    rating: 4.89,
    rate: 135,
    sessions: 98,
    description:
      "Zero to one builder. Helps early-career devs ship fast, make technical decisions under uncertainty, and navigate startup chaos.",
    tags: ["React", "Node", "Startup"],
  },
  {
    id: 6,
    name: "Sara Lindqvist",
    role: "VP of Growth",
    company: "Duolingo",
    category: "Business",
    initials: "SL",
    accent: "#06b6d4",
    bg: "#011f26",
    image: "/Image (Sarah Johnson).svg",
    available: false,
    status: 'fully_booked' as AvailabilityStatus,
    rating: 4.96,
    rate: 170,
    sessions: 321,
    description:
      "Growth loops, retention mechanics, and go-to-market for consumer apps. Former founder. Brutally practical and candid.",
    tags: ["Growth", "GTM", "Retention"],
  },
];

function MentorCard({ mentor }: { mentor: Mentor }) {
  const status = mentor.status ?? (mentor.available ? 'available' : 'fully_booked');
  return (
    <div className="bg-white rounded-2xl border border-[rgba(20,18,16,0.07)] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(20,18,16,0.1)]">
      {/* Top */}
      <div className="p-6 flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-[14px] flex-shrink-0 flex items-center justify-center text-lg font-bold relative overflow-hidden"
          style={{
            background: mentor.bg,
            color: mentor.accent,
            fontFamily: "'Syne', sans-serif",
          }}
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
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-bold text-[#141210] text-[15px] truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
              {mentor.name}
            </p>
            <AvailabilityBadge status={status} />
          </div>
          <span
            className={`absolute bottom-[-2px] right-[-2px] w-3 h-3 rounded-full border-2 border-white ${
              mentor.available ? "bg-emerald-500" : "bg-gray-300"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="font-bold text-[#141210] text-[15px] truncate"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {mentor.name}
          </p>
          <p className="text-[13px] text-[#94928d] truncate">{mentor.role}</p>
          <p
            className="text-[12px] font-medium mt-0.5"
            style={{ color: mentor.accent }}
          >
            {mentor.company}
          </p>
          <p className="text-[12px] mt-1 text-[#141210]">${mentor.rate}/hr</p>
        </div>

        <div className="flex items-center gap-1 bg-[#f7f5f2] rounded-lg px-2 py-1 flex-shrink-0">
          <span className="text-amber-400 text-[11px]">★</span>
          <span className="text-[12px] font-semibold text-[#141210]">
            {mentor.rating}
          </span>
        </div>
      </div>

      <div className="h-px bg-[rgba(20,18,16,0.07)] mx-6" />

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <p className="text-[13.5px] leading-[1.7] text-[#6b6860] flex-1">
          {mentor.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {mentor.tags.map(tag => (
            <MentorSkillTag key={tag} skill={tag} />
          {mentor.tags.map((tag) => (
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
          <strong className="text-[#141210] font-semibold">
            {mentor.sessions}
          </strong>{" "}
          sessions
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={`/mentors/${mentor.id}`}
            className="text-[12.5px] font-semibold px-4 py-2 rounded-xl transition-all duration-200 bg-[#f7f5f2] text-[#141210] hover:bg-[#ede8e2] border border-[rgba(20,18,16,0.1)]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View profile
          </Link>
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
        <Link
          href={mentor.available ? `/mentors/${mentor.id}` : "#"}
          className={`text-[12.5px] font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
            mentor.available
              ? "bg-[#141210] text-[#f7f5f2] hover:bg-[#2d2a27]"
              : "bg-[#f0efed] text-[#94928d] cursor-default pointer-events-none"
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {mentor.available ? "Book session" : "Fully booked"}
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const hasLoadedUrlParams = useRef(false);

  const initialCategory = useMemo(
    () => parseCategoryParam(searchParams.get('expertise')) ?? 'All',
    [searchParams],
  );
  const initialAvailability = useMemo(
    () => parseAvailabilityParam(searchParams.get('availability')) ?? 'All',
    [searchParams],
  );
  const initialMinRate = useMemo(() => normalizeRateParam(searchParams.get('minRate')), [searchParams]);
  const initialMaxRate = useMemo(() => normalizeRateParam(searchParams.get('maxRate')), [searchParams]);

  const [mentorList, setMentorList] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeAvailability, setActiveAvailability] = useState(initialAvailability);
  const [minRate, setMinRate] = useState(initialMinRate);
  const [maxRate, setMaxRate] = useState(initialMaxRate);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMentors = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/mentors', { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to load mentors');
        }

        const data = (await response.json()) as Mentor[];
        setMentorList(data);
      } catch (err) {
        if ((err as any).name === 'AbortError') return;
        setError('Unable to load mentors at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const category = parseCategoryParam(searchParams.get('expertise')) ?? 'All';
    const availability = parseAvailabilityParam(searchParams.get('availability')) ?? 'All';
    const min = normalizeRateParam(searchParams.get('minRate'));
    const max = normalizeRateParam(searchParams.get('maxRate'));

    setActiveCategory(category);
    setActiveAvailability(availability);
    setMinRate(min);
    setMaxRate(max);
    hasLoadedUrlParams.current = true;
  }, [searchParams]);

  useEffect(() => {
    if (!hasLoadedUrlParams.current) {
      return;
    }

    const params = new URLSearchParams();

    if (activeCategory !== 'All') {
      params.set('expertise', activeCategory.toLowerCase());
    }

    if (activeAvailability !== 'All') {
      params.set(
        'availability',
        activeAvailability === 'Fully Booked' ? 'fully-booked' : 'available',
      );
    }

    if (minRate) {
      params.set('minRate', minRate);
    }

    if (maxRate) {
      params.set('maxRate', maxRate);
    }

    const expectedQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (currentQuery !== expectedQuery) {
      const url = `${pathname}${expectedQuery ? `?${expectedQuery}` : ''}`;
      router.replace(url);
    }
  }, [activeCategory, activeAvailability, minRate, maxRate, pathname, router, searchParams]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeAvailability, setActiveAvailability] = useState('All');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 6;
  const { selectedMentors, toggleMentor, isSelected } = useMentorSelection();

  const filtered = mentorList.filter(m => {
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
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
          {loading
            ? 'Loading mentors from backend...'
            : `Browse ${mentorList.length} experienced professionals ready to guide your journey.`}
          Browse {filtered.length} experienced professionals ready to guide your journey.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-[rgba(20,18,16,0.12)] bg-white px-4 py-2 text-[13px] font-semibold text-[#141210] shadow-sm transition hover:border-[rgba(20,18,16,0.2)]"
          >
            Filters
          </button>
          <p className="text-[13px] text-[#94928d]">{filtered.length} mentor{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        {isMobileFiltersOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl border-r border-[rgba(20,18,16,0.08)] overflow-y-auto">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(20,18,16,0.07)]">
                <div>
                  <p className="text-[15px] font-semibold text-[#141210]">Filters</p>
                  <p className="text-[12px] text-[#6b6860]">Refine your mentor search</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-[13px] font-semibold text-[#141210]"
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

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, index) => (
                  <MentorCardSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-3xl bg-white border border-[rgba(20,18,16,0.07)] p-12 text-center">
                <p className="text-[15px] text-[#141210] font-semibold mb-3">Unable to load mentors</p>
                <p className="text-[14px] text-[#6b6860]">{error}</p>
              </div>
            ) : filtered.length === 0 ? (
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
