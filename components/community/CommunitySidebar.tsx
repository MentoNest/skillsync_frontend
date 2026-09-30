"use client";

import {
  COMMUNITY_CATEGORIES,
  type CommunityCategoryId,
} from "@/lib/community-types";
import { useCategoryFollows } from "@/hooks/useCategoryFollows";
import { CommunityCategories } from "./CommunityCategories";
import { FollowButton } from "./FollowButton";

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

export function CommunitySidebar({
  selectedCategory,
  onCategoryChange,
}: CommunitySidebarProps) {
  // Followed state is owned by the API so it persists across pages (#1014).
  const {
    isFollowing,
    isPending,
    error: followError,
    followedCount,
    toggle,
  } = useCategoryFollows();

  return (
    <div className="space-y-6">
      <div>
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
              onToggle={() =>
                // Ids originate from COMMUNITY_CATEGORIES, so they are already
                // valid category ids.
                toggle(category.id as CommunityCategoryId)
              }
              className="shrink-0"
            />
          )}
        />
        {followError && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {followError}
          </p>
        )}
      </div>

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
