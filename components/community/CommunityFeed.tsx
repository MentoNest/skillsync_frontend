"use client";

import { DiscussionCard } from "./DiscussionCard";
import { DiscussionFilters } from "./DiscussionFilters";
import { CommunityEmptyState } from "./CommunityEmptyState";
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
  loadMoreRef,
}: CommunityFeedProps) {
  return (
    <div className="space-y-4">
      <DiscussionFilters
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        sortBy={sortBy}
        onCategoryChange={onCategoryChange}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
      />

      {isLoading ? (
        <div className="flex justify-center py-12" role="status" aria-label="Loading discussions">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
        </div>
      ) : discussions.length === 0 ? (
        <CommunityEmptyState
          filtered={Boolean(selectedCategory || searchQuery)}
          onClearFilters={() => {
            onCategoryChange(null);
            onSearchChange("");
          }}
        />
      ) : (
        <div className="space-y-4" role="feed" aria-label="Discussion feed">
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </div>
      )}

      {isLoadingMore && (
        <div className="flex justify-center py-4" role="status" aria-label="Loading more">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
        </div>
      )}

      {!isLoading && !isLoadingMore && discussions.length > 0 && !hasMore && (
        <p className="py-4 text-center text-sm text-[var(--muted)]">
          You&apos;ve reached the end of the feed
        </p>
      )}

      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
    </div>
  );
}
