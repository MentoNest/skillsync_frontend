"use client";

import { useCategoryFollows } from "@/hooks/useCategoryFollows";
import {
  COMMUNITY_CATEGORIES,
  isCommunityCategoryId,
  type CommunityEvent,
  type CommunityStatistics,
} from "@/lib/community-types";
import { CommunityCategories } from "./CommunityCategories";
import { CommunityStatisticsWidget } from "./CommunityStatisticsWidget";
import { FollowButton } from "./FollowButton";
import { UpcomingEvents } from "./UpcomingEvents";

interface CommunitySidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  events?: CommunityEvent[];
  statistics?: CommunityStatistics | null;
  isLoadingStatistics?: boolean;
  overviewError?: string | null;
  eventsError?: string | null;
  onRegisterForEvent?: (eventId: string) => void;
  /** Re-issues the sidebar overview request after a failure (#1254). */
  onRetryOverview?: () => void;
  isRetryingOverview?: boolean;
}

const categoryCounts: Record<string, number> = {
  general: 45,
  career: 32,
  technical: 28,
  mentoring: 19,
  announcements: 8,
};

const categories = COMMUNITY_CATEGORIES.map((category) => ({
  id: category.id,
  name: category.name,
  discussionCount: categoryCounts[category.id] ?? 0,
}));

const emptyStatistics: CommunityStatistics = {
  totalMembers: 0,
  activeDiscussions: 0,
  totalDiscussions: 0,
  eventsThisMonth: 0,
};

export function CommunitySidebar({
  selectedCategory,
  onCategoryChange,
  events = [],
  statistics,
  isLoadingStatistics = false,
  overviewError,
  eventsError,
  onRegisterForEvent,
  onRetryOverview,
  isRetryingOverview = false,
}: CommunitySidebarProps) {
  const {
    isFollowing,
    isPending,
    error: followError,
    followedCount,
    toggle,
  } = useCategoryFollows();

  return (
    <aside
      aria-label="Community information"
      className="min-w-0 space-y-6 lg:space-y-8"
    >
      <section className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
        <CommunityCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          headerMeta={
            followedCount > 0 ? (
              <span className="text-xs text-[var(--muted)]">
                {followedCount} followed
              </span>
            ) : undefined
          }
          renderCategoryAction={(category) => (
            <FollowButton
              kind="category"
              targetName={category.name}
              isFollowing={isFollowing(category.id)}
              isPending={isPending(category.id)}
              onToggle={() => {
                if (isCommunityCategoryId(category.id)) {
                  void toggle(category.id);
                }
              }}
              className="shrink-0"
            />
          )}
        />
        {followError ? (
          <p role="alert" className="mt-3 text-xs text-red-600">
            {followError}
          </p>
        ) : null}
      </section>

      <CommunityStatisticsWidget
        stats={statistics ?? emptyStatistics}
        isLoading={isLoadingStatistics}
        error={overviewError}
        onRetry={onRetryOverview}
        isRetrying={isRetryingOverview}
      />

      {eventsError ? (
        <p role="alert" className="text-xs text-red-600">
          {eventsError}
        </p>
      ) : null}
      <UpcomingEvents events={events} onRegister={onRegisterForEvent} />

      <section className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4">
        <h2 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
          Community Guidelines
        </h2>
        <ul className="space-y-1 text-sm text-[var(--muted)]">
          <li>Be respectful and constructive</li>
          <li>Stay on topic</li>
          <li>No spam or self-promotion</li>
          <li>Search before posting</li>
        </ul>
      </section>
    </aside>
  );
}
