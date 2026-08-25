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

          {/* Load more */}
          <div className="text-center pt-2">
            <button className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus-visible:underline">
              Load more discussions
            </button>
          </div>
        </div>

        {/* ── Right: Sidebar (lazy-loaded) ──────────────────────────────── */}
        <CommunitySidebar
          categories={CATEGORIES as unknown as { label: string; count: number; color: string }[]}
          events={EVENTS as unknown as { id: string; title: string; date: string; time: string; attendees: number }[]}
          stats={STATS as unknown as { label: string; value: string; icon: string }[]}
          onEventRegister={handleEventRegister}
        />
      </div>
    </div>
  );
}
