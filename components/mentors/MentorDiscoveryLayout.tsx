'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FilterSidebar from '@/components/mentors/FilterSidebar';

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
  rating: number;
  rate: number;
  sessions: number;
  description: string;
  tags: string[];
};

const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Kwame Asante',
    role: 'Staff Engineer',
    company: 'Stripe',
    category: 'Engineering',
    initials: 'KA',
    accent: '#3b82f6',
    bg: '#0f1f3d',
    image: '/tony-adebanjo.jpg',
    available: true,
    rating: 4.95,
    rate: 180,
    sessions: 204,
    description:
      'Helps engineers level up to Staff and beyond. Specialises in distributed systems, technical leadership, and promo packets.',
    tags: ['System Design', 'Leadership', 'Go'],
  },
  {
    id: 2,
    name: 'Priya Menon',
    role: 'Head of Product Design',
    company: 'Figma',
    category: 'Design',
    initials: 'PM',
    accent: '#a855f7',
    bg: '#1e0f3d',
    image: '/Image (Sarah Johnson).svg',
    available: true,
    rating: 4.98,
    rate: 145,
    sessions: 187,
    description:
      'Portfolio reviews, design system strategy, and breaking into senior IC or management tracks at top-tier product companies.',
    tags: ['Figma', 'Design Systems', 'Portfolio'],
  },
  {
    id: 3,
    name: 'Tomás Reyes',
    role: 'Senior PM',
    company: 'Notion',
    category: 'Product',
    initials: 'TR',
    accent: '#10b981',
    bg: '#0a2318',
    image: '/Image (Marcus Williams).svg',
    available: false,
    rating: 4.91,
    rate: 160,
    sessions: 139,
    description:
      'From APM to PM to Group PM — Tomás has made every jump and guides others through the same transitions with precision.',
    tags: ['Roadmapping', 'Stakeholders', 'APM'],
  },
  {
    id: 4,
    name: 'Aisha Nwosu',
    role: 'Data Science Lead',
    company: 'Spotify',
    category: 'Data',
    initials: 'AN',
    accent: '#f59e0b',
    bg: '#2a1800',
    image: '/Image (Cole Hathans).svg',
    available: true,
    rating: 4.93,
    rate: 155,
    sessions: 256,
    description:
      'ML pipelines, A/B testing at scale, and transitioning from academia to industry. Obsessed with making data teams actually functional.',
    tags: ['Python', 'ML', 'Analytics'],
  },
  {
    id: 5,
    name: 'Leon Fischer',
    role: 'Founding Engineer',
    company: '3× YC Startups',
    category: 'Engineering',
    initials: 'LF',
    accent: '#ef4444',
    bg: '#2a0a0a',
    image: '/tony-adebanjo.jpg',
    available: true,
    rating: 4.89,
    rate: 135,
    sessions: 98,
    description:
      'Zero to one builder. Helps early-career devs ship fast, make technical decisions under uncertainty, and navigate startup chaos.',
    tags: ['React', 'Node', 'Startup'],
  },
  {
    id: 6,
    name: 'Sara Lindqvist',
    role: 'VP of Growth',
    company: 'Duolingo',
    category: 'Business',
    initials: 'SL',
    accent: '#06b6d4',
    bg: '#011f26',
    image: '/Image (Sarah Johnson).svg',
    available: false,
    rating: 4.96,
    rate: 170,
    sessions: 321,
    description:
      'Growth loops, retention mechanics, and go-to-market for consumer apps. Former founder. Brutally practical and candid.',
    tags: ['Growth', 'GTM', 'Retention'],
  },
];

const MENTOR_CARD_SKELETON_COUNT = 6;

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-white rounded-2xl border border-[rgba(20,18,16,0.07)] overflow-hidden flex h-full min-h-[338px] flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(20,18,16,0.1)]">
      {/* Top */}
      <div className="p-6 flex items-start gap-4">
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

function MentorCardSkeleton() {
  return (
    <div
      className="h-full min-h-[338px] overflow-hidden rounded-2xl border border-[rgba(20,18,16,0.07)] bg-white animate-pulse"
      aria-hidden="true"
    >
      <div className="p-6 flex items-start gap-4">
        <div className="h-14 w-14 flex-shrink-0 rounded-[14px] bg-[#e6e1d8]" />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-[#e6e1d8]" />
          <div className="h-3 w-2/3 rounded bg-[#ece8df]" />
          <div className="h-3 w-1/2 rounded bg-[#ece8df]" />
          <div className="h-3 w-1/3 rounded bg-[#ece8df]" />
        </div>

        <div className="h-7 w-14 flex-shrink-0 rounded-lg bg-[#f0ede7]" />
      </div>

      <div className="h-px bg-[rgba(20,18,16,0.07)] mx-6" />

      <div className="p-6 flex flex-col gap-4">
        <div className="space-y-3">
          <div className="h-3.5 w-full rounded bg-[#ece8df]" />
          <div className="h-3.5 w-11/12 rounded bg-[#ece8df]" />
          <div className="h-3.5 w-4/5 rounded bg-[#ece8df]" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <div className="h-7 w-20 rounded-md bg-[#f0ede7]" />
          <div className="h-7 w-24 rounded-md bg-[#f0ede7]" />
          <div className="h-7 w-16 rounded-md bg-[#f0ede7]" />
        </div>
      </div>

      <div className="px-6 pb-6 flex items-center justify-between gap-3">
        <div className="h-3.5 w-24 rounded bg-[#ece8df]" />
        <div className="h-9 w-24 rounded-xl bg-[#e6e1d8]" />
      </div>
    </div>
  );
}

export default function MentorDiscoveryLayout() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeAvailability, setActiveAvailability] = useState('All');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [isLoadingMentors, setIsLoadingMentors] = useState(true);

  useEffect(() => {
    const loadFrame = window.requestAnimationFrame(() => {
      setIsLoadingMentors(false);
    });

    return () => window.cancelAnimationFrame(loadFrame);
  }, []);

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
  const displayedMentorCount = isLoadingMentors ? mentors.length : filtered.length;

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
          <main className="flex-1 min-w-0" aria-busy={isLoadingMentors}>
            <p className="text-[13px] text-[#94928d] mb-5">
              <span className="font-semibold text-[#141210]">
                {displayedMentorCount}
              </span>{' '}
              mentor{displayedMentorCount !== 1 ? 's' : ''} found
            </p>

            {isLoadingMentors ? (
              <>
                <span className="sr-only" role="status">
                  Loading mentors
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {Array.from({ length: MENTOR_CARD_SKELETON_COUNT }).map((_, index) => (
                    <MentorCardSkeleton key={index} />
                  ))}
                </div>
              </>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-[#94928d] text-[15px]">
                No mentors match the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(mentor => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
