"use client";

import { COMMUNITY_CATEGORIES } from "@/lib/community-types";
import { useCategoryFollows } from "@/hooks/useCategoryFollows";
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
  ...c,
  count: categoryCounts[c.id] ?? 0,
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
    // #1000: widgets stack vertically on tablet/mobile and fill the desktop
    // rail on lg+. `min-w-0` keeps long category names from forcing overflow.
    <div className="min-w-0 space-y-6 lg:space-y-8">
      <nav aria-label="Community categories" className="min-w-0">
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
        {/* #1000: single column on small screens, two columns from md up so
        the stacked widgets stay compact on tablets. */}
        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1">
          <li key="all">
            <button
              onClick={() => onCategoryChange(null)}
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
                className={`flex min-w-0 items-center gap-1 rounded-lg pr-1 transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-[var(--primary)]/10"
                    : "hover:bg-[var(--secondary)]"
                }`}
              >
                <button
                  onClick={() => onCategoryChange(cat.id)}
                  aria-current={selectedCategory === cat.id ? "true" : undefined}
                  className={`flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                    selectedCategory === cat.id
                      ? "font-medium text-[var(--primary)]"
                      : "text-[var(--foreground)]"
                  }`}
                >
                  <span className="min-w-0 truncate">{cat.name}</span>
                  <span className="shrink-0 text-xs text-[var(--muted)]">{cat.count}</span>
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
    </div>
  );
}
