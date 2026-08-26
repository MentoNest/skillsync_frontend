'use client';

import React, { useEffect } from 'react';
import CategoryBadge from '@/components/CategoryBadge';
import CommunityHeroBanner from '@/components/community/CommunityHeroBanner';
import { useCommunityAnalytics } from '@/hooks/useCommunityAnalytics';
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
const VIEW_TABS: TabItem<DiscussionView>[] = [
  { value: "trending", label: "Trending" },
  { value: "latest", label: "Latest" },
  { value: "my-posts", label: "My Posts" },
];

const CURRENT_USER = { id: "current-user", name: "Emily Rodriguez" };

const EVENTS = [
  {
    id: 'evt-1',
    title: 'AMA: Breaking into Product Management',
    date: 'Jul 5, 2026',
    time: '3:00 PM WAT',
    attendees: 47,
  },
  {
    id: 'evt-2',
    title: 'Workshop: Negotiating Your Salary',
    date: 'Jul 12, 2026',
    time: '5:00 PM WAT',
    attendees: 112,
  },
  {
    id: 'evt-3',
    title: 'Panel: Women in Tech Leadership',
    date: 'Jul 19, 2026',
    time: '4:00 PM WAT',
    attendees: 89,
  },
];
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

// ── DiscussionCard ────────────────────────────────────────────────────────────

interface DiscussionCardProps {
  post: (typeof DISCUSSIONS)[number];
  onView: () => void;
  onLike: () => void;
  onReply: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

function DiscussionCard({
  post,
  onView,
  onLike,
  onReply,
  onShare,
  onBookmark,
}: DiscussionCardProps) {
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

          {/* Title — fires discussion_viewed on click */}
          <h3
            className="text-base font-semibold text-gray-900 leading-snug mb-1 hover:text-purple-700 transition-colors cursor-pointer"
            onClick={onView}
          >
            {post.title}
          </h3>
    if (view === "my-posts") {
      return list.filter((d) => d.author.id === CURRENT_USER.id);
    }

    list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (view === "trending") return (b.viewCount || 0) - (a.viewCount || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            {/* Like */}
            <button
              onClick={onLike}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label={`${post.likes} likes`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes}
            </button>

            {/* Reply */}
            <button
              onClick={onReply}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label={`${post.replies} replies`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.replies} replies
            </button>

            {/* Share */}
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label="Share discussion"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>

            {/* Bookmark */}
            <button
              onClick={onBookmark}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label="Bookmark discussion"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
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

  // Track a page-level "view" for all visible discussions on mount.
  useEffect(() => {
    DISCUSSIONS.forEach((post) =>
      trackDiscussionViewed({
        discussionId: post.id,
        title: post.title,
        category: post.category,
      }),
    );
  }, [trackDiscussionViewed]);

  return (
    <div className="space-y-6">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <CommunityHeroBanner
        onStartDiscussion={() =>
          trackDiscussionCreated({
            discussionId: 'new',
            title: 'New Discussion',
            category: 'General',
          })
        }
      />
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

          {/* Discussion list */}
          <div className="space-y-3" role="feed" aria-label="Discussions">
            {DISCUSSIONS.map((post) => (
              <DiscussionCard
                key={post.id}
                post={post}
                onView={() =>
                  trackDiscussionViewed({
                    discussionId: post.id,
                    title: post.title,
                    category: post.category,
                  })
                }
                onLike={() =>
                  trackDiscussionLiked({
                    discussionId: post.id,
                    title: post.title,
                  })
                }
                onReply={() =>
                  trackDiscussionReplied({
                    discussionId: post.id,
                    title: post.title,
                  })
                }
                onShare={() =>
                  trackDiscussionShared({
                    discussionId: post.id,
                    title: post.title,
                    shareMethod: 'copy_link',
                  })
                }
                onBookmark={() =>
                  trackDiscussionBookmarked({
                    discussionId: post.id,
                    title: post.title,
                  })
                }
              />
            ))}
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
                    {/* Register button fires event_registered */}
                    <button
                      onClick={() =>
                        trackEventRegistered({
                          eventId: event.id,
                          eventTitle: event.title,
                        })
                      }
                      className="mt-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus-visible:underline"
                    >
                      Register →
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full text-center text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus-visible:underline">
              View all events →
            </button>
          </div>
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
