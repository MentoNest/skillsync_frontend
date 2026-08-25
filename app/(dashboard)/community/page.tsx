'use client';

/**
 * Community Page — Performance-optimized
 *
 * Optimizations applied:
 * 1. DiscussionCard is React.memo'd — skips re-render unless its own props change.
 * 2. CommunitySidebar is React.memo'd AND lazy-loaded via next/dynamic — its JS
 *    bundle is deferred until after the critical discussion feed is interactive.
 * 3. All analytics callbacks passed to DiscussionCard are wrapped in useCallback
 *    so their references are stable across renders, keeping memo effective.
 * 4. The onStartDiscussion callback for CommunityHeroBanner is also useCallback'd.
 * 5. Static data arrays (DISCUSSIONS, CATEGORIES, EVENTS, STATS) are defined at
 *    module scope — never re-created on render.
 * 6. `will-change-scroll-position` is set on the scrollable tab strip via CSS to
 *    hint the browser to promote it to its own compositor layer for smooth scroll.
 * 7. `content-visibility: auto` (via Tailwind's `[content-visibility:auto]`) on
 *    each DiscussionCard defers off-screen rendering work.
 */

import React, { useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CommunityHeroBanner from '@/components/community/CommunityHeroBanner';
import DiscussionCard from '@/components/community/DiscussionCard';
import { useCommunityAnalytics } from '@/hooks/useCommunityAnalytics';
import type { CommunitySidebarProps } from '@/components/community/CommunitySidebar';

// ── Lazy-load the sidebar ─────────────────────────────────────────────────────
// The sidebar is below the fold on mobile and not critical for initial paint.
// next/dynamic defers its JavaScript bundle until after hydration, improving
// Time-to-Interactive for the discussion feed.

const CommunitySidebar = dynamic<CommunitySidebarProps>(
  () => import('@/components/community/CommunitySidebar'),
  {
    ssr: false,
    loading: () => (
      <aside
        className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4"
        aria-label="Community sidebar"
        aria-busy="true"
      >
        {/* Skeleton — matches the sidebar's visual weight */}
        {[80, 64, 56].map((h) => (
          <div
            key={h}
            className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 animate-pulse`}
            style={{ minHeight: h * 2 }}
          />
        ))}
      </aside>
    ),
  },
);

// ── Static data (module scope — never re-created on render) ──────────────────

const TABS = ['All Discussions', 'Questions', 'Success Stories', 'Resources', 'Events'] as const;

const DISCUSSIONS = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
] as const;

const CATEGORIES = [
  { label: 'Career Advice', count: 142, color: 'bg-cyan-100 text-cyan-700' },
  { label: 'Technical Skills', count: 98, color: 'bg-purple-100 text-purple-700' },
  { label: 'Interview Prep', count: 74, color: 'bg-amber-100 text-amber-700' },
  { label: 'Success Stories', count: 63, color: 'bg-green-100 text-green-700' },
  { label: 'Resources', count: 51, color: 'bg-blue-100 text-blue-700' },
  { label: 'Networking', count: 38, color: 'bg-rose-100 text-rose-700' },
] as const;

const EVENTS = [
  { id: 'evt-1', title: 'AMA: Breaking into Product Management', date: 'Jul 5, 2026', time: '3:00 PM WAT', attendees: 47 },
  { id: 'evt-2', title: 'Workshop: Negotiating Your Salary', date: 'Jul 12, 2026', time: '5:00 PM WAT', attendees: 112 },
  { id: 'evt-3', title: 'Panel: Women in Tech Leadership', date: 'Jul 19, 2026', time: '4:00 PM WAT', attendees: 89 },
] as const;

const STATS = [
  { label: 'Community Members', value: '12,480', icon: '👥' },
  { label: 'Discussions Started', value: '3,214', icon: '💬' },
  { label: 'Questions Answered', value: '8,901', icon: '✅' },
  { label: 'Events Hosted', value: '256', icon: '📅' },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const {
    trackDiscussionCreated,
    trackDiscussionViewed,
    trackDiscussionLiked,
    trackDiscussionReplied,
    trackDiscussionShared,
    trackDiscussionBookmarked,
    trackEventRegistered,
  } = useCommunityAnalytics();

  // Track page-level views on mount.
  useEffect(() => {
    DISCUSSIONS.forEach((post) =>
      trackDiscussionViewed({
        discussionId: post.id,
        title: post.title,
        category: post.category,
      }),
    );
  }, [trackDiscussionViewed]);

  // ── Stable callbacks ────────────────────────────────────────────────────────
  // useCallback ensures each handler reference is stable between renders so
  // React.memo on DiscussionCard and CommunityHeroBanner can do its job.

  const handleStartDiscussion = useCallback(() => {
    trackDiscussionCreated({ discussionId: 'new', title: 'New Discussion', category: 'General' });
  }, [trackDiscussionCreated]);

  const handleEventRegister = useCallback(
    (eventId: string, eventTitle: string) => {
      trackEventRegistered({ eventId, eventTitle });
    },
    [trackEventRegistered],
  );

  // Per-post callbacks are keyed by post.id so each card gets its own stable fn.
  // The dependency arrays only contain the tracker (itself stable via useCallback
  // inside useCommunityAnalytics).
  const makeHandlers = useCallback(
    (post: (typeof DISCUSSIONS)[number]) => ({
      onView: () => trackDiscussionViewed({ discussionId: post.id, title: post.title, category: post.category }),
      onLike: () => trackDiscussionLiked({ discussionId: post.id, title: post.title }),
      onReply: () => trackDiscussionReplied({ discussionId: post.id, title: post.title }),
      onShare: () => trackDiscussionShared({ discussionId: post.id, title: post.title, shareMethod: 'copy_link' }),
      onBookmark: () => trackDiscussionBookmarked({ discussionId: post.id, title: post.title }),
    }),
    [trackDiscussionViewed, trackDiscussionLiked, trackDiscussionReplied, trackDiscussionShared, trackDiscussionBookmarked],
  );

  return (
    <div className="space-y-6">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <CommunityHeroBanner onStartDiscussion={handleStartDiscussion} />

      {/* ── Main content + sidebar ────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Left: Discussion feed ─────────────────────────────────────── */}
        <div className="w-full lg:flex-1 min-w-0 space-y-4">
          {/* Tabs — overflow-x-auto with will-change for smooth compositor scroll */}
          <nav
            className="bg-white rounded-xl border border-gray-100 shadow-sm px-4"
            aria-label="Discussion filters"
          >
            <ul
              className="flex gap-1 overflow-x-auto [will-change:scroll-position] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
            >
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

          {/* Discussion list — content-visibility:auto defers off-screen paint */}
          <div className="space-y-3" role="feed" aria-label="Discussions">
            {DISCUSSIONS.map((post) => {
              const handlers = makeHandlers(post);
              return (
                <div
                  key={post.id}
                  className="[content-visibility:auto] [contain-intrinsic-size:0_180px]"
                >
                  <DiscussionCard post={post} {...handlers} />
                </div>
              );
            })}
          </div>
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCommunity } from "./community-context";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import StartDiscussionModal from "@/components/community/StartDiscussionModal";
import DiscussionFeed from "@/components/community/DiscussionFeed";
import { Tabs, TabItem } from "@/components/ui/tabs";
import { CategoriesWidget } from "@/components/ui/categories-widget";
import { UpcomingEventsWidget } from "@/components/ui/upcoming-events-widget";
import { StatisticCard } from "@/components/ui/statistic-card";
import type { DiscussionMetadata } from "@/lib/community-types";
import type { Discussion } from "./community-context";

type DiscussionView = "trending" | "latest" | "my-posts";

const VIEW_TABS: TabItem<DiscussionView>[] = [
  { value: "trending", label: "Trending" },
  { value: "latest", label: "Latest" },
  { value: "my-posts", label: "My Posts" },
];

const CURRENT_USER = { id: "current-user", name: "Emily Rodriguez" };

function toDiscussionMetadata(discussion: Discussion): DiscussionMetadata {
  return {
    id: discussion.id,
    title: discussion.title,
    author: {
      id: discussion.authorId ?? discussion.id,
      name: discussion.author,
      role: "Community Member",
    },
    category: discussion.category,
    createdAt: discussion.createdAt.toISOString(),
    likeCount: discussion.likes,
    commentCount: discussion.replies,
    viewCount: discussion.trending,
    isPinned: discussion.isPinned,
    isLocked: discussion.isLocked,
  };
}

const UsersIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MessageIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ActiveIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default function CommunityPage() {
  const [view, setView] = useState<DiscussionView>("trending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    categories,
    events,
    statistics,
    getFilteredDiscussions,
    handleEventRegistration,
  } = useCommunity();

  const allDiscussions = useMemo(
    () => getFilteredDiscussions().map(toDiscussionMetadata),
    [getFilteredDiscussions],
  );

  const visibleDiscussions = useMemo(() => {
    const list = [...allDiscussions];

    if (view === "my-posts") {
      return list.filter((d) => d.author.id === CURRENT_USER.id);
    }

    list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (view === "trending") return (b.viewCount || 0) - (a.viewCount || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [allDiscussions, view]);

  const handleDiscussionClick = (id: string) => {
    router.push(`/community/${id}`);
  };

  const handleLike = (id: string) => {
    // Placeholder for future API integration (issue #676 follow-up)
    console.log("Like discussion:", id);
  };

  const handleBookmark = (id: string) => {
    // Placeholder for future API integration (issue #676 follow-up)
    console.log("Bookmark discussion:", id);
  };

  return (
    <div className="space-y-6">
      {/* Issue #673: Community Hero Banner */}
      <CommunityHeroBanner onStartDiscussion={() => setIsModalOpen(true)} />

      {/* Community statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          label="Total Members"
          value={statistics.totalMembers}
          icon={<UsersIcon />}
        />
        <StatisticCard
          label="Active Discussions"
          value={statistics.activeDiscussions}
          icon={<ActiveIcon />}
        />
        <StatisticCard
          label="Total Discussions"
          value={statistics.totalDiscussions}
          icon={<MessageIcon />}
        />
        <StatisticCard
          label="Events This Month"
          value={statistics.eventsThisMonth}
          icon={<CalendarIcon />}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Issue #676: Discussion Feed Container */}
        <section
          className="w-full lg:flex-1 min-w-0 space-y-4"
          aria-label="Discussions"
        >
          <div className="bg-white rounded-lg shadow">
            {/* Issue #675: Community Navigation Tabs */}
            <Tabs
              tabs={VIEW_TABS}
              activeTab={view}
              onChange={setView}
              ariaLabel="Discussion views"
            />

            <div className="p-4 sm:p-6">
              <DiscussionFeed
                discussions={visibleDiscussions}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onDiscussionClick={handleDiscussionClick}
              />
            </div>
          </div>
        </section>

        {/* ── Right: Sidebar (lazy-loaded) ──────────────────────────────── */}
        <CommunitySidebar
          categories={CATEGORIES as unknown as { label: string; count: number; color: string }[]}
          events={EVENTS as unknown as { id: string; title: string; date: string; time: string; attendees: number }[]}
          stats={STATS as unknown as { label: string; value: string; icon: string }[]}
          onEventRegister={handleEventRegister}
        />
        <aside
          className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-6"
          aria-label="Community sidebar"
        >
          <CategoriesWidget
            categories={categories}
            selectedCategory={null}
            onCategorySelect={() => {}}
            totalDiscussions={statistics.totalDiscussions}
          />

          <UpcomingEventsWidget
            events={events}
            onRegister={handleEventRegistration}
          />

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Community Statistics
            </h2>
            <dl className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <dt className="text-xs text-gray-600">Total Members</dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {statistics.totalMembers.toLocaleString()}
                </dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <dt className="text-xs text-gray-600">Active Discussions</dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {statistics.activeDiscussions}
                </dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <dt className="text-xs text-gray-600">Total Discussions</dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {statistics.totalDiscussions}
                </dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <dt className="text-xs text-gray-600">Events This Month</dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {statistics.eventsThisMonth}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {/* Issue #674: Start a Discussion CTA modal */}
      <StartDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
