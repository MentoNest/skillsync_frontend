'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MentorCard from '@/components/mentors/MentorCard';
import { MentorCardSkeleton } from '@/components/loadingSkeletons';
import type { Mentor } from '@/lib/mentors';

const CATEGORIES = ['All', 'Engineering', 'Design', 'Product', 'Business', 'Data'];
const AVAILABILITY = ['All', 'Available', 'Fully Booked'];

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
}: FilterPanelProps) {
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

  const filtered = mentorList.filter(m => {
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
          {loading
            ? 'Loading mentors from backend...'
            : `Browse ${mentorList.length} experienced professionals ready to guide your journey.`}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filters (horizontal pills) */}
        <div className="lg:hidden mb-6 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 text-[12.5px] font-medium px-4 py-2 rounded-full border transition-all ${
                  activeCategory === cat
                    ? 'bg-[#141210] text-[#f7f5f2] border-[#141210]'
                    : 'text-[#6b6860] border-[rgba(20,18,16,0.15)] hover:border-[rgba(20,18,16,0.4)] hover:text-[#141210]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {AVAILABILITY.map(opt => (
              <button
                key={opt}
                onClick={() => setActiveAvailability(opt)}
                className={`flex-shrink-0 text-[12.5px] font-medium px-4 py-2 rounded-full border transition-all ${
                  activeAvailability === opt
                    ? 'bg-[#141210] text-[#f7f5f2] border-[#141210]'
                    : 'text-[#6b6860] border-[rgba(20,18,16,0.15)] hover:border-[rgba(20,18,16,0.4)] hover:text-[#141210]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 items-start">
          {/* Sidebar — hidden on mobile, sticky on desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-20">
            <FilterPanel
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
