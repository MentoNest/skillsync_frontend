"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import {
  CommunityProvider,
  useCommunity,
} from "@/components/community/CommunityProvider";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

/**
 * Feed view. All discussion, filter and real-time state comes from
 * `CommunityProvider` (#995, #996) so the sidebar reads the same source.
 */
function CommunityPageContent() {
  const {
    discussions,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    filters,
    isLive,
    loadMore,
    setCategory,
    setSearchQuery,
    setSortBy,
  } = useCommunity();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll
  const { resetInfiniteScroll } = useInfiniteScroll({
    isLoading: isLoadingMore,
    hasMore,
    onLoadMore: loadMore,
    observerRef,
    loadMoreRef,
  });

  // Reset infinite scroll when filters change
  useEffect(() => {
    resetInfiniteScroll();
  }, [
    filters.selectedCategory,
    filters.searchQuery,
    filters.sortBy,
    resetInfiniteScroll,
  ]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--foreground)]">
                Community
              </h1>
              <p className="mt-2 text-[var(--muted)]">
                Connect, share, and learn with fellow mentees and mentors
              </p>
              {isLive && (
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Live updates enabled
                </span>
              )}
            </div>
            <Link
              href="/community/saved"
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Saved discussions
            </Link>
          </div>
        </div>

        <CommunityHeroBanner />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <main className="flex-1 min-w-0">
            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
              >
                {error}
              </div>
            )}

            <CommunityFeed
              discussions={discussions}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              selectedCategory={filters.selectedCategory}
              searchQuery={filters.searchQuery}
              sortBy={filters.sortBy}
              onCategoryChange={setCategory}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
              loadMoreRef={loadMoreRef}
            />
          </main>

          <aside className="w-full lg:w-80 flex-shrink-0">
            <CommunitySidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <CommunityProvider>
      <CommunityPageContent />
    </CommunityProvider>
  );
}
