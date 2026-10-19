"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import { StartDiscussionModal } from "@/components/community/StartDiscussionModal";
import { CommunityToast } from "@/components/community/CommunityToast";
import {
  CommunityProvider,
  useCommunity,
} from "@/components/community/CommunityProvider";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { trackDiscussionCreated } from "@/lib/community-analytics";
import {
  isCommunityCategoryId,
  type Discussion,
} from "@/lib/community-types";

/**
 * Inner page content — reads all state from CommunityProvider via
 * useCommunity() so the page doesn't manage its own duplicate fetch/filter
 * state (#996, #1248).
 */
function CommunityPageContent() {
  const {
    discussions,
    filters,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    isLive,
    setCategory,
    setSearchQuery,
    setSortBy,
    loadMore,
    refresh,
  } = useCommunity();

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { resetInfiniteScroll } = useInfiniteScroll({
    isLoading: isLoadingMore,
    hasMore,
    onLoadMore: loadMore,
    observerRef,
    loadMoreRef,
  });

  const dismissToast = useCallback(() => setToastMessage(null), []);

  // Surface the created discussion immediately and reset pagination (#1004).
  const handleDiscussionCreated = useCallback(
    (created: Discussion) => {
      resetInfiniteScroll();
      setToastMessage("Your discussion was published.");
      trackDiscussionCreated(created.id, created.category);
      refresh();
    },
    [resetInfiniteScroll, refresh]
  );

  const { selectedCategory } = filters;

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

        <CommunityHeroBanner onStartDiscussion={() => setIsComposerOpen(true)} />

        {/*
         * Responsive layout (#1000):
         * - Desktop (lg+): feed left, sidebar right.
         * - Tablet / Mobile: single column; sidebar stacks below the feed.
         */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <main className="min-w-0 flex-1">
            <CommunityFeed
              discussions={discussions}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              selectedCategory={selectedCategory}
              searchQuery={filters.searchQuery}
              sortBy={filters.sortBy}
              onCategoryChange={setCategory}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
              error={error}
              onRetry={refresh}
              onStartDiscussion={() => setIsComposerOpen(true)}
              loadMoreRef={loadMoreRef}
            />
          </main>

          <aside
            aria-label="Community sidebar"
            className="w-full min-w-0 border-t border-[var(--border)] pt-6 lg:w-80 lg:flex-shrink-0 lg:border-t-0 lg:pt-0"
          >
            <CommunitySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setCategory}
            />
          </aside>
        </div>
      </div>

      <StartDiscussionModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onCreated={handleDiscussionCreated}
        defaultCategory={
          selectedCategory && isCommunityCategoryId(selectedCategory)
            ? selectedCategory
            : undefined
        }
      />

      {toastMessage && (
        <CommunityToast message={toastMessage} onDismiss={dismissToast} />
      )}
    </div>
  );
}

export default function CommunityPage() {
  return (
    <CommunityProvider>
      <CommunityContent />
      <CommunityPageContent />
    </CommunityProvider>
  );
}
