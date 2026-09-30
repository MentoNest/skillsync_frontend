"use client";

import { DiscussionCard } from "./DiscussionCard";
import { DiscussionFilters } from "./DiscussionFilters";
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
  /** Requests the next page; shared by the button and the scroll sentinel. */
  onLoadMore: () => void;
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
        <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-8 text-center">
          <p className="text-[var(--muted)]">No discussions found</p>
        </div>
      ) : (
        <div className="space-y-4" role="feed" aria-label="Discussion feed">
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </div>
      )}

      {!isLoading && discussions.length > 0 && (
        <LoadMoreDiscussionsButton
          hasMore={hasMore}
          isLoading={isLoadingMore}
          onLoadMore={onLoadMore}
        />
      )}

      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
    </div>
  );
}
