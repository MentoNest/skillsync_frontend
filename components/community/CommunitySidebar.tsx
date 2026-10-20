"use client";

import {
  useCommunityActions,
  useCommunityState,
} from "@/lib/community-store";

export function CommunitySidebar() {
  const { categories, selectedCategory } = useCommunityState();
  const { setCategory } = useCommunityActions();

  COMMUNITY_CATEGORIES,
  type CommunityCategoryId,
  type CommunityEvent,
} from "@/lib/community-types";
import { useCategoryFollows } from "@/hooks/useCategoryFollows";
import { CommunityCategories } from "./CommunityCategories";
import { FollowButton } from "./FollowButton";
import { UpcomingEvents } from "./UpcomingEvents";

interface CommunitySidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

// Display counts are placeholder UI until real counts come from the API (#993).
const categoryCounts: Record<string, number> = {
  general: 45,
  career: 32,
  technical: 28,
  mentoring: 19,
  announcements: 8,
};

const categories = COMMUNITY_CATEGORIES.map((c) => ({
  id: c.id,
  name: c.name,
  discussionCount: categoryCounts[c.id] ?? 0,
}));

// Placeholder events until the events API lands (#988).
const upcomingEvents: CommunityEvent[] = [
  {
    id: "resume-review-clinic",
    title: "Resume Review Clinic",
    host: "SkillSync Mentors",
    startsAt: "2026-10-06T16:00:00.000Z",
    endsAt: "2026-10-06T17:00:00.000Z",
    registrationCount: 42,
  },
  {
    id: "career-paths-ama",
    title: "Career Paths AMA",
    host: "Amara Okafor",
    startsAt: "2026-10-13T15:30:00.000Z",
    endsAt: "2026-10-13T16:30:00.000Z",
    registrationCount: 128,
  },
];

export function CommunitySidebar({
  selectedCategory,
  onCategoryChange,
}: CommunitySidebarProps) {
  const {
    isFollowing,
    isPending,
    error: followError,
    followedCount,
    toggle,
  } = useCategoryFollows();

  return (
    // widgets stack vertically on tablet/mobile and fill the desktop
    // rail on lg+. `min-w-0` keeps long category names from forcing overflow.
    <div className="min-w-0 space-y-6 lg:space-y-8">
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
        renderCategoryAction={(cat) => (
          <FollowButton
            kind="category"
            targetName={cat.name}
            isFollowing={isFollowing(cat.id)}
            isPending={isPending(cat.id)}
            onToggle={() => toggle(cat.id as CommunityCategoryId)}
            className="shrink-0"
          />
        )}
      />

      {followError && (
        <p role="alert" className="text-xs text-red-600">
          {followError}
        </p>
      )}

      <div className="min-w-0 rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4">
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

      <UpcomingEvents events={upcomingEvents} />
    </div>
  );
}
