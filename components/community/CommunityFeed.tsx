"use client";

import { DiscussionCard } from "./DiscussionCard";
import { DiscussionFilters } from "./DiscussionFilters";
import { CommunityEmptyState } from "./CommunityEmptyState";
import { DiscussionFeedSkeleton } from "./CommunitySkeleton";
import { CommunityEmptyState } from "./CommunityEmptyState";
import { CommunityErrorState } from "./CommunityErrorState";
import { LoadMoreDiscussionsButton } from "./LoadMoreDiscussionsButton";
import type { Discussion, DiscussionSort } from "@/lib/community-types";

interface CommunityFeedProps {
  discussions: Discussion[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: DiscussionSort;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: DiscussionSort) => void;
  /** Requests the next page of discussions. */
  onLoadMore: () => void;
  /** Error message from the last feed request, if any (#999). */
  error?: string | null;
  /** Re-issues the feed request after a failure (#999). */
  onRetry?: () => void;
  /** Opens the discussion composer from the empty state CTA (#998). */
  onStartDiscussion?: () => void;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

export function CommunityFeed({
  discussions,
  isLoading,
  isLoadingMore,
  hasMore,
  selectedCategory,
  searchQuery,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onLoadMore,
  error,
  onRetry,
  onStartDiscussion,
  loadMoreRef,
}: CommunityFeedProps) {
  const hasActiveFilters =
    Boolean(selectedCategory) || searchQuery.trim().length > 0;

  return (
    <div className="space-y-4">
      <DiscussionFilters />

      {isLoading ? (
        <DiscussionFeedSkeleton count={4} />
      ) : error ? (
        <CommunityErrorState message={error} onRetry={onRetry} />
      ) : discussions.length === 0 ? (
        <CommunityEmptyState
          filtered={Boolean(selectedCategory || searchQuery)}
          onClearFilters={() => {
            onCategoryChange(null);
            onSearchChange("");
          }}
        />
        hasActiveFilters ? (
          <CommunityEmptyState
            title="No discussions found"
            message="No discussions match your current filters. Try another category or a different search term."
            onAction={onStartDiscussion}
          />
        ) : (
          <CommunityEmptyState onAction={onStartDiscussion} />
        )
      ) : (
        <div className="space-y-4" role="feed" aria-label="Discussion feed">
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </div>
      )}

      {/* Explicit load-more control — keyboard-accessible complement to the
          invisible infinite-scroll sentinel below. Handles loading, disabled
          and end-of-results states internally. */}
      {!isLoading && !error && discussions.length > 0 && (
        <LoadMoreDiscussionsButton
          hasMore={hasMore}
          isLoading={isLoadingMore}
          onLoadMore={onLoadMore}
        />
      )}

      {/* Intersection-observer sentinel for automatic infinite scroll */}
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
    </div>
  );
}
