'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroll-component';
import MentorCard from '@/components/MentorCard';
import MentorSearchBar from '@/components/MentorSearchBar';
import { Button } from '@/components/ui/button';

import { Mentor } from '@/lib/types';

// Lazy-load the comparison drawer (only needed when user selects mentors)
const MentorComparisonDrawer = dynamic(
  () => import('@/components/mentors/MentorComparisonDrawer'),
  { ssr: false },
);

const MAX_COMPARE = 3;

const mentors: Mentor[] = [
  {
    mentorId: 'sarah-doe',
    name: 'Sarah Doe',
    title: 'Software Engineer @ Google',
    bio: 'Expert in React, Node.js, and cloud infrastructure with over 10 years of experience building scalable applications.',
    avatarUrl: '/avatars/sarah.jpg',
    rating: 4.8,
    reviewCount: 124,
    pricePerSession: 85,
    skills: ['React', 'Node.js', 'Cloud', 'System Design'],
    expertise: ['Frontend Development', 'Full-Stack Engineering'],
    yearsExperience: 10,
    isFeatured: true,
  },
  {
    mentorId: 'john-smith',
    name: 'John Smith',
    title: 'Product Manager @ Microsoft',
    bio: 'Specializes in product strategy, user-centric design, and agile methodologies. Led 3 major product launches.',
    avatarUrl: '/avatars/john.jpg',
    rating: 4.6,
    reviewCount: 98,
    pricePerSession: 75,
    skills: ['Product Strategy', 'UX', 'Agile', 'Leadership'],
    expertise: ['Product Management', 'Engineering Leadership'],
    yearsExperience: 8,
  },
  {
    mentorId: 'jane-roe',
    name: 'Jane Roe',
    title: 'UX Designer @ Apple',
    bio: 'Passionate about creating beautiful and intuitive user experiences. Expertise in design systems and accessibility.',
    avatarUrl: '/avatars/jane.jpg',
    rating: 4.9,
    reviewCount: 156,
    pricePerSession: 90,
    skills: ['UX Design', 'Figma', 'Prototyping'],
    expertise: ['UI/UX Design', 'Frontend Development'],
    yearsExperience: 7,
  },
  {
    mentorId: 'emma-wilson',
    name: 'Emma Wilson',
    title: 'Data Scientist @ Netflix',
    bio: 'Data science expert with deep experience in ML, analytics, and recommendation systems.',
    rating: 4.5,
    reviewCount: 87,
    pricePerSession: 80,
    skills: ['Machine Learning', 'Python', 'SQL', 'Statistics'],
    expertise: ['Data Science & ML'],
    yearsExperience: 5,
  },
  {
    mentorId: 'james-brown',
    name: 'James Brown',
    title: 'CTO @ TechStartup',
    bio: 'Serial entrepreneur and CTO who has built and scaled multiple products from zero to millions of users.',
    rating: 4.9,
    reviewCount: 203,
    pricePerSession: 120,
    skills: ['Startups', 'Leadership', 'Strategy', 'Fundraising'],
    expertise: ['Engineering Leadership', 'System Architecture'],
    yearsExperience: 15,
  },
  {
    mentorId: 'priya-patel',
    name: 'Priya Patel',
    title: 'DevOps Lead @ Amazon',
    bio: 'Cloud infrastructure expert specializing in CI/CD, Kubernetes, and site reliability engineering.',
    rating: 4.7,
    reviewCount: 76,
    pricePerSession: 100,
    skills: ['DevOps', 'Kubernetes', 'AWS', 'CI/CD'],
    expertise: ['DevOps & Cloud'],
    yearsExperience: 9,
  },
  {
    mentorId: 'carlos-garcia',
    name: 'Carlos Garcia',
    title: 'AI Research Scientist @ DeepMind',
    bio: 'Published researcher in deep learning and NLP, passionate about making AI accessible to everyone.',
    rating: 4.8,
    reviewCount: 64,
    pricePerSession: 110,
    skills: ['Deep Learning', 'NLP', 'Python', 'Research'],
    expertise: ['Data Science & ML'],
    yearsExperience: 6,
  },
];

const PAGE_SIZE = 6;

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'pagination' | 'infinite'>('infinite');
  const [infiniteLimit, setInfiniteLimit] = useState(PAGE_SIZE);
  const [bookmarkedMentors, setBookmarkedMentors] = useState<Set<string>>(new Set());
  // Comparison state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

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

  // Toggle mentor for comparison
  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev; // silently cap
      return [...prev, id];
    });
  };

  const removeFromComparison = (id: string) => {
    setCompareIds((prev) => prev.filter((x) => x !== id));
  };

  const closeComparison = () => {
    setShowComparison(false);
    setCompareIds([]);
  };

  // Get mentors selected for comparison
  const mentorsToCompare = useMemo(
    () => mentors.filter((m) => compareIds.includes(m.mentorId as string)),
    [compareIds],
  );

  const filteredMentors = mentors.filter((mentor) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(q) ||
      (mentor.title && mentor.title.toLowerCase().includes(q)) ||
      (mentor.bio && mentor.bio.toLowerCase().includes(q)) ||
      (mentor.skills && mentor.skills.some((skill) => skill.toLowerCase().includes(q)))
    );
  });

  const totalPages = Math.ceil(filteredMentors.length / PAGE_SIZE);
  const displayedMentors = filteredMentors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const infiniteMentors = filteredMentors.slice(0, infiniteLimit);

  const fetchMoreData = () => {
    if (infiniteLimit >= filteredMentors.length) return;
    setTimeout(() => {
      setInfiniteLimit((prev) => prev + PAGE_SIZE);
    }, 400);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Search Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Find Your Mentor
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Connect with experienced professionals who can guide you on your journey.
          </p>
          <div className="mt-6">
            <MentorSearchBar onSearch={(q) => { setSearchQuery(q); setPage(1); setInfiniteLimit(PAGE_SIZE); }} />
          </div>

          {/* View Mode Switcher */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Display Mode:</span>
            <div className="inline-flex rounded-lg p-1 bg-gray-100 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setDisplayMode('infinite')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  displayMode === 'infinite'
                    ? 'bg-white dark:bg-gray-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Infinite Scroll
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('pagination')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  displayMode === 'pagination'
                    ? 'bg-white dark:bg-gray-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Pagination
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="max-w-screen-xl mx-auto py-12 px-4 lg:px-6">
        {/* Comparison bar */}
        {compareIds.length >= 2 && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 px-4 py-3"
          >
            <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-200">
              {compareIds.length} mentor{compareIds.length > 1 ? 's' : ''} selected for comparison
            </p>
            <button
              type="button"
              onClick={() => setShowComparison(true)}
              className="text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Compare now
            </button>
          </div>
        )}

        {filteredMentors.length > 0 ? (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {infiniteMentors.map((mentor) => {
                  const isSelected = compareIds.includes(mentor.mentorId as string);
                  const isDisabled = !isSelected && compareIds.length >= MAX_COMPARE;
                  return (
                    <div key={mentor.mentorId} className="flex flex-col">
                      <MentorCard
                        {...mentor}
                        isBookmarked={bookmarkedMentors.has(mentor.mentorId as string)}
                        onToggleBookmark={() => toggleBookmark(mentor.mentorId as string)}
                      />
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => toggleCompare(mentor.mentorId as string)}
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
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayedMentors.map((mentor) => {
                const isSelected = compareIds.includes(mentor.mentorId as string);
                const isDisabled = !isSelected && compareIds.length >= MAX_COMPARE;
                return (
                  <div key={mentor.mentorId} className="flex flex-col">
                    <MentorCard
                      {...mentor}
                      isBookmarked={bookmarkedMentors.has(mentor.mentorId as string)}
                      onToggleBookmark={() => toggleBookmark(mentor.mentorId as string)}
                    />
                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => toggleCompare(mentor.mentorId as string)}
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
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No mentors found
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Try searching for something else.
            </p>
          </div>
        )}

        {/* Pagination (only in pagination mode) */}
        {displayMode === 'pagination' && totalPages > 1 && (
          <nav aria-label="Mentor search pagination" className="flex items-center justify-center gap-2 mt-12">
            <Button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              Previous
            </Button>

            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  aria-label={`Page ${p}`}
                  aria-current={page === p ? 'page' : undefined}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    page === p
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <Button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              Next
            </Button>
          </nav>
        )}
      </section>

      {/* Comparison drawer */}
      {showComparison && mentorsToCompare.length >= 2 && (
        <MentorComparisonDrawer
          mentors={mentorsToCompare}
          onRemove={removeFromComparison}
          onClose={closeComparison}
        />
      )}
    </main>
  );
}