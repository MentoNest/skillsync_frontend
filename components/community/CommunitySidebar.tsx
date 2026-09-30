"use client";

import { useCategoryFollows } from "@/hooks/useCategoryFollows";
import type { CommunityEvent, CommunityStatistics } from "@/lib/community-types";
import { FollowButton } from "./FollowButton";
import { CommunityStatisticsWidget } from "./CommunityStatisticsWidget";
import { CommunityEventCard } from "./CommunityEventCard";
import { useCommunity } from "./CommunityProvider";

// Display counts are placeholder UI until real counts come from the API (#993).
const categoryCounts: Record<string, number> = {
  general: 45,
  career: 32,
  technical: 28,
  mentoring: 19,
  announcements: 8,
};

const EMPTY_STATISTICS: CommunityStatistics = {
  totalMembers: 0,
  activeDiscussions: 0,
  totalDiscussions: 0,
  eventsThisMonth: 0,
};

/** Max events shown in the sidebar so it stays scannable. */
const MAX_UPCOMING_EVENTS = 2;

function upcomingEvents(
  events: CommunityEvent[],
  now: number
): CommunityEvent[] {
  return events
    .filter((event) => new Date(event.startsAt).getTime() >= now)
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    )
    .slice(0, MAX_UPCOMING_EVENTS);
}

/**
 * Community sidebar.
 *
 * Reads the shared community state (#996) instead of receiving props, so the
 * active category, statistics and events stay in sync with the feed.
 */
export function CommunitySidebar() {
  const {
    categories,
    events,
    statistics,
    isLoadingOverview,
    overviewError,
    filters,
    setCategory,
    registerForEvent,
  } = useCommunity();

  // Followed state is owned by the API so it persists across pages (#1014).
  const {
    isFollowing,
    isPending,
    error: followError,
    followedCount,
    toggle,
  } = useCategoryFollows();

  const selectedCategory = filters.selectedCategory;
  const nextEvents = upcomingEvents(events, Date.now());

  return (
    <div className="space-y-6">
      <CommunityStatisticsWidget
        stats={statistics ?? EMPTY_STATISTICS}
        isLoading={isLoadingOverview}
        error={overviewError}
      />

      <nav aria-label="Community categories">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Categories
          </h2>
          {followedCount > 0 && (
            <span className="text-xs text-[var(--muted)]">
              {followedCount} followed
            </span>
          )}
        </div>
        <ul className="space-y-1">
          <li key="all">
            <button
              onClick={() => setCategory(null)}
              aria-current={selectedCategory === null ? "true" : undefined}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                selectedCategory === null
                  ? "bg-[var(--primary)]/10 font-medium text-[var(--primary)]"
                  : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
              }`}
            >
              <span>All</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <div
                className={`flex items-center gap-1 rounded-lg pr-1 transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-[var(--primary)]/10"
                    : "hover:bg-[var(--secondary)]"
                }`}
              >
                <button
                  onClick={() => setCategory(cat.id)}
                  aria-current={selectedCategory === cat.id ? "true" : undefined}
                  className={`flex flex-1 items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                    selectedCategory === cat.id
                      ? "font-medium text-[var(--primary)]"
                      : "text-[var(--foreground)]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-[var(--muted)]">
                    {categoryCounts[cat.id] ?? 0}
                  </span>
                </button>
                <FollowButton
                  kind="category"
                  targetName={cat.name}
                  isFollowing={isFollowing(cat.id)}
                  isPending={isPending(cat.id)}
                  onToggle={() => toggle(cat.id)}
                  className="shrink-0"
                />
              </div>
            </li>
          ))}
        </ul>
        {followError && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {followError}
          </p>
        )}
      </nav>

      {nextEvents.length > 0 && (
        <section aria-labelledby="community-events-heading" className="space-y-3">
          <h2
            id="community-events-heading"
            className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]"
          >
            Upcoming Events
          </h2>
          <ul className="space-y-3">
            {nextEvents.map((event) => (
              <li key={event.id}>
                <CommunityEventCard
                  event={event}
                  onRegister={registerForEvent}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4">
        <h2 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
          Community Guidelines
        </h2>
        <ul className="space-y-1 text-sm text-[var(--muted)]">
          <li>Be respectful and constructive</li>
          <li>Stay on topic</li>
          <li>No spam or self-promotion</li>
          <li>Search before posting</li>
        </ul>
      </div>
    </div>
  );
}
