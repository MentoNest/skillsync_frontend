"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CommunityCategoryOption {
  id: string;
  name: string;
  /** Number of discussions in the category, shown next to its name. */
  discussionCount: number;
}

export interface CommunityCategoriesProps {
  /** Categories in display order. */
  categories: CommunityCategoryOption[];
  /** Currently selected category id, or `null` for "All". */
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  /** Heading text. */
  heading?: string;
  /**
   * Label of the "All" entry. Pass `null` to hide it and drive the selection
   * from elsewhere.
   */
  allLabel?: string | null;
  /** Optional content for the heading row, e.g. a followed-category count. */
  headerMeta?: ReactNode;
  /**
   * Renders an action next to each category. Used by the sidebar to slot in
   * the follow toggle (#1014) without this component needing to know about it.
   */
  renderCategoryAction?: (category: CommunityCategoryOption) => ReactNode;
  /** Optional extra classes for layout flexibility. */
  className?: string;
}

/**
 * Categories widget for the community sidebar (#987): the category name, how
 * many discussions it holds, and navigation between them.
 *
 * Kept presentational so it can be dropped into the sidebar, a mobile drawer or
 * a landing page without dragging the follow API along with it.
 */
export function CommunityCategories({
  categories,
  selectedCategory,
  onCategoryChange,
  heading = "Categories",
  allLabel = "All",
  headerMeta,
  renderCategoryAction,
  className,
}: CommunityCategoriesProps) {
  return (
    <nav
      aria-label="Community categories"
      className={cn("min-w-0", className)}
    >
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          {heading}
        </h2>
        {headerMeta}
      </div>

      <ul className="space-y-1">
        {allLabel !== null && (
          <li>
            <button
              type="button"
              onClick={() => onCategoryChange(null)}
              aria-current={selectedCategory === null ? "true" : undefined}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
                selectedCategory === null
                  ? "bg-[var(--primary)]/10 font-medium text-[var(--primary)]"
                  : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
              )}
            >
              <span className="truncate">{allLabel}</span>
            </button>
          </li>
        )}

        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <li key={category.id}>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-lg pr-1 transition-colors",
                  isSelected
                    ? "bg-[var(--primary)]/10"
                    : "hover:bg-[var(--secondary)]"
                )}
              >
                <button
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  aria-current={isSelected ? "true" : undefined}
                  className={cn(
                    "flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
                    isSelected
                      ? "font-medium text-[var(--primary)]"
                      : "text-[var(--foreground)]"
                  )}
                >
                  <span className="truncate">{category.name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-[var(--muted)]">
                    {category.discussionCount}
                  </span>
                  <span className="sr-only"> discussions</span>
                </button>

                {renderCategoryAction?.(category)}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
