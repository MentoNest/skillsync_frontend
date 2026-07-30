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
    let list = [...allDiscussions];

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
