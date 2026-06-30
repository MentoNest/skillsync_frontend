'use client';

import React from 'react';
import CategoryBadge from '@/components/CategoryBadge';

// ── Mock data ────────────────────────────────────────────────────────────────

const TABS = ['All Discussions', 'Questions', 'Success Stories', 'Resources', 'Events'];

const DISCUSSIONS = [
  {
    id: 1,
    author: 'Amara Osei',
    avatar: null,
    role: 'Mentee',
    time: '2 hours ago',
    category: 'Question',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'How do I transition from frontend to full-stack development?',
    excerpt:
      "I've been working as a frontend developer for 2 years and want to expand into backend. What resources or learning paths do you recommend?",
    likes: 24,
    replies: 12,
  },
  {
    id: 2,
    author: 'Kwame Mensah',
    avatar: null,
    role: 'Mentor',
    time: '5 hours ago',
    category: 'Success Story',
    categoryColor: 'bg-green-100 text-green-700',
    title: 'Landed my first senior engineering role after 6 months of mentorship!',
    excerpt:
      'I wanted to share my journey. Six months ago I was stuck at mid-level. After consistent mentorship sessions and deliberate practice, I just accepted a senior offer at a fintech company.',
    likes: 89,
    replies: 31,
  },
  {
    id: 3,
    author: 'Fatima Al-Hassan',
    avatar: null,
    role: 'Mentee',
    time: '1 day ago',
    category: 'Resource',
    categoryColor: 'bg-purple-100 text-purple-700',
    title: 'Curated list of system design resources for interviews',
    excerpt:
      'I compiled everything I used to prep for system design interviews at FAANG companies. Includes books, YouTube channels, and mock interview tips.',
    likes: 56,
    replies: 8,
  },
  {
    id: 4,
    author: 'David Nkrumah',
    avatar: null,
    role: 'Mentor',
    time: '2 days ago',
    category: 'Question',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'Best practices for code reviews as a senior developer?',
    excerpt:
      "I've recently moved into a senior role and want to make sure my code reviews are helpful rather than demoralizing. How do you balance thoroughness with empathy?",
    likes: 41,
    replies: 19,
  },
];

const CATEGORIES = [
  { label: 'Career Advice', count: 142, color: 'bg-cyan-100 text-cyan-700' },
  { label: 'Technical Skills', count: 98, color: 'bg-purple-100 text-purple-700' },
  { label: 'Interview Prep', count: 74, color: 'bg-amber-100 text-amber-700' },
  { label: 'Success Stories', count: 63, color: 'bg-green-100 text-green-700' },
  { label: 'Resources', count: 51, color: 'bg-blue-100 text-blue-700' },
  { label: 'Networking', count: 38, color: 'bg-rose-100 text-rose-700' },
];

const EVENTS = [
  {
    id: 1,
    title: 'AMA: Breaking into Product Management',
    date: 'Jul 5, 2026',
    time: '3:00 PM WAT',
    attendees: 47,
  },
  {
    id: 2,
    title: 'Workshop: Negotiating Your Salary',
    date: 'Jul 12, 2026',
    time: '5:00 PM WAT',
    attendees: 112,
  },
  {
    id: 3,
    title: 'Panel: Women in Tech Leadership',
    date: 'Jul 19, 2026',
    time: '4:00 PM WAT',
    attendees: 89,
  },
];

const STATS = [
  { label: 'Community Members', value: '12,480', icon: '👥' },
  { label: 'Discussions Started', value: '3,214', icon: '💬' },
  { label: 'Questions Answered', value: '8,901', icon: '✅' },
  { label: 'Events Hosted', value: '256', icon: '📅' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_GRADIENTS = [
  'from-purple-500 to-indigo-600',
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
];

function avatarGradient(name: string) {
  return AVATAR_GRADIENTS[name.length % AVATAR_GRADIENTS.length];
}

// ── Sub-components ────────────────────────────────────────────────────────────

function DiscussionCard({ post }: { post: (typeof DISCUSSIONS)[number] }) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradient(post.author)} flex items-center justify-center text-white text-sm font-bold`}
          aria-hidden="true"
        >
          {getInitials(post.author)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Author + meta */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-900">{post.author}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{post.role}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">{post.time}</span>
            <CategoryBadge category={post.category} color={post.categoryColor} />
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 leading-snug mb-1 hover:text-purple-700 transition-colors cursor-pointer">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{post.excerpt}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            <button
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label={`${post.likes} likes`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes}
            </button>
            <button
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label={`${post.replies} replies`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.replies} replies
            </button>
import { SortOption } from '@/components/ui/discussion-sort';
import { useCommunity } from './community-context';

export default function CommunityPage() {
  const {
    getFilteredDiscussions,
    filters,
    setSortBy,
    statistics,
    categories,
    loading,
    error
  } = useCommunity();

  const sortedDiscussions = getFilteredDiscussions();
import React, { useState, useMemo, useEffect } from 'react';
import { DiscussionSort, SortOption } from '@/components/ui/discussion-sort';
import CreateDiscussionForm from '@/components/community/CreateDiscussionForm';
import type { DiscussionMetadata } from '@/lib/community-types';

export default function CommunityPage() {
  const [currentSort, setCurrentSort] = useState<SortOption>('trending');
  const [discussions, setDiscussions] = useState<DiscussionMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch('/api/discussions');
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data);
      }
    } catch (error) {
      console.error('Failed to fetch discussions:', error);
    } finally {
      setIsLoading(false);
    }
  };
import StartDiscussionModal from '@/components/community/StartDiscussionModal';

interface Discussion {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  replies: number;
  likes: number;
  trending: number;
}

const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'How to transition into a career in UX design?',
    author: 'Sarah Johnson',
    createdAt: new Date('2025-06-25'),
    replies: 12,
    likes: 24,
    trending: 85
  },
  {
    id: '2',
    title: 'Best resources for learning cloud computing',
    author: 'Mike Chen',
    createdAt: new Date('2025-06-27'),
    replies: 8,
    likes: 18,
    trending: 72
  },
  {
    id: '3',
    title: 'Tips for negotiating a salary raise',
    author: 'Emily Rodriguez',
    createdAt: new Date('2025-06-28'),
    replies: 23,
    likes: 31,
    trending: 95
  },
  {
    id: '4',
    title: 'How to build a personal brand as a developer',
    author: 'James Wilson',
    createdAt: new Date('2025-06-26'),
    replies: 15,
    likes: 42,
    trending: 78
  }
];

export default function CommunityPage() {
  const [currentSort, setCurrentSort] = useState<SortOption>('trending');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedDiscussions = useMemo(() => {
    const discussionsList = [...discussions];
    
    switch (currentSort) {
      case 'trending':
        return discussionsList.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
      case 'latest':
        return discussionsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'most-replies':
        return discussionsList.sort((a, b) => b.commentCount - a.commentCount);
      case 'most-liked':
        return discussionsList.sort((a, b) => b.likeCount - a.likeCount);
      default:
        return discussionsList;
    }
  }, [currentSort, discussions]);

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <p className="mt-2 text-gray-600">
            Connect with mentors and mentees — ask questions, share experiences, and join community events.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
        >
          {showCreateForm ? 'Cancel' : 'New Discussion'}
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
        >
          Start Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {showCreateForm && (
        <div className="mb-6">
          <CreateDiscussionForm onSuccess={() => { setShowCreateForm(false); fetchDiscussions(); }} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Discussions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 order-1 lg:order-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Discussions</h2>
            <DiscussionSort 
              currentSort={filters.sortBy as SortOption} 
              onSortChange={(sort) => setSortBy(sort)} 
            />
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading discussions...</div>
          ) : (
            <div className="space-y-4">
              {sortedDiscussions.map((discussion) => (
                <div key={discussion.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-2">{discussion.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Started by {discussion.author.name}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {discussion.commentCount} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {discussion.likeCount} likes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl px-6 py-10 sm:px-10 sm:py-14 text-white shadow-md"
        aria-label="Community hero"
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            Welcome to the Community
          </h1>
          <p className="text-purple-100/90 text-base sm:text-lg leading-relaxed mb-6">
            Connect with mentors and peers — ask questions, share wins, discover resources, and join live events.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Start a Discussion
          </button>
        </div>
      </section>

      {/* ── Main content + sidebar ────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Left: Discussion feed ─────────────────────────────────────── */}
        <div className="w-full lg:flex-1 min-w-0 space-y-4">
          {/* Tabs */}
          <nav
            className="bg-white rounded-xl border border-gray-100 shadow-sm px-4"
            aria-label="Discussion filters"
          >
            <ul className="flex gap-1 overflow-x-auto" role="tablist">
              {TABS.map((tab, i) => (
                <li key={tab} role="presentation">
                  <button
                    role="tab"
                    aria-selected={i === 0}
                    className={`whitespace-nowrap px-4 py-3.5 text-sm font-medium border-b-2 transition-colors focus:outline-none focus-visible:underline ${
                      i === 0
                        ? 'border-purple-600 text-purple-700'
                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Discussion list */}
          <div className="space-y-3" role="feed" aria-label="Discussions">
            {DISCUSSIONS.map((post) => (
              <DiscussionCard key={post.id} post={post} />
            ))}
        {/* Sidebar */}
        <div className="flex flex-col gap-6 order-2 lg:order-2">
          {/* Categories */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => setCategoryFilter(null)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  filters.category === null 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="flex justify-between">
                  <span>All Discussions</span>
                  <span className="text-gray-500">{statistics.totalDiscussions}</span>
                </span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    filters.category === category.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="flex justify-between">
                    <span>{category.name}</span>
                    <span className="text-gray-500">{category.count}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              <p className="text-sm">No upcoming events yet.</p>
            </div>
          </div>

          {/* Load more */}
          <div className="text-center pt-2">
            <button className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus-visible:underline">
              Load more discussions
            </button>
          </div>

          {/* Community Statistics Widget */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Statistics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{statistics.totalMembers.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1">Total Members</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{statistics.activeDiscussions}</p>
                <p className="text-xs text-gray-600 mt-1">Active Discussions</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{statistics.totalDiscussions}</p>
                <p className="text-xs text-gray-600 mt-1">Total Discussions</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{statistics.eventsThisMonth}</p>
                <p className="text-xs text-gray-600 mt-1">Events This Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Sidebar ────────────────────────────────────────────── */}
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4" aria-label="Community sidebar">
          {/* Categories */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Browse Categories</h2>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.label}>
                  <button className="w-full flex items-center justify-between group focus:outline-none focus-visible:underline">
                    <CategoryBadge category={cat.label} color={cat.color} />
                    <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Upcoming Events</h2>
            <ul className="space-y-3">
              {EVENTS.map((event) => (
                <li key={event.id} className="flex gap-3 cursor-pointer group">
                  {/* Date chip */}
                  <div className="flex-shrink-0 w-10 text-center">
                    <div className="bg-purple-100 text-purple-700 rounded-lg px-1 py-1">
                      <span className="block text-xs font-bold leading-none">
                        {event.date.split(' ')[0]}
                      </span>
                      <span className="block text-lg font-extrabold leading-tight">
                        {event.date.split(' ')[1].replace(',', '')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors leading-snug">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.time}</p>
                    <p className="text-xs text-gray-400">
                      <span aria-hidden="true">👤 </span>
                      {event.attendees} attending
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full text-center text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus-visible:underline">
              View all events →
            </button>
          </div>

          {/* Community Statistics */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Community Stats</h2>
            <ul className="grid grid-cols-2 gap-3">
              {STATS.map((stat) => (
                <li key={stat.label} className="bg-white rounded-lg p-3 shadow-sm text-center">
                  <span className="text-xl" role="img" aria-label={stat.label}>
                    {stat.icon}
                  </span>
                  <p className="text-base font-extrabold text-gray-900 mt-1 leading-none">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <StartDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}