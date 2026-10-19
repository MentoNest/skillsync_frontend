"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import { StartDiscussionModal } from "@/components/community/StartDiscussionModal";
import { CommunityToast } from "@/components/community/CommunityToast";
import { useCommunityRealtime } from "@/hooks/useCommunityRealtime";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { trackDiscussionCreated } from "@/lib/community-analytics";
import {
  isCommunityCategoryId,
  type Discussion,
  type DiscussionSort,
} from "@/lib/community-types";

const PAGE_SIZE = 10;

export default function CommunityPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<DiscussionSort>("latest");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Real-time updates
  const { isConnected } = useCommunityRealtime({
    onNewDiscussion: (discussion) => {
      const newDisc = discussion as Discussion;
      if (!newDisc?.id) return;
      setDiscussions((prev) => {
        if (prev.some((d) => d.id === newDisc.id)) return prev;
        return [newDisc, ...prev];
      });
    },
    onNewReply: (discussionId, reply) => {
      setDiscussions((prev) =>
        prev.map((d) =>
          d.id === discussionId
            ? {
                ...d,
                replyCount: d.replyCount + 1,
                lastReply: reply as Discussion["lastReply"],
              }
            : d
        )
      );
    },
    onLikeUpdate: (discussionId, likeCount) => {
      setDiscussions((prev) =>
        prev.map((d) => (d.id === discussionId ? { ...d, likeCount } : d))
      );
    },
  });

  // Fetch discussions
  const fetchDiscussions = useCallback(
    async (page = 1, append = false) => {
      try {
        if (page === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }
        setError(null);

        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
          sort: sortBy,
        });
        if (selectedCategory) params.set("category", selectedCategory);
        if (searchQuery) params.set("q", searchQuery);

        const res = await fetch(`/api/community/discussions?${params}`);
        if (!res.ok) throw new Error("Failed to fetch discussions");

        const data = await res.json();

        if (append) {
          setDiscussions((prev) => {
            const existingIds = new Set(prev.map((d) => d.id));
            const newDiscussions = data.discussions.filter(
              (d: Discussion) => !existingIds.has(d.id)
            );
            return [...prev, ...newDiscussions];
          });
        } else {
          setDiscussions(data.discussions);
        }

        setHasMore(data.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [selectedCategory, searchQuery, sortBy]
  );

  // Initial fetch
  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  // Next page — shared by the load-more button and the scroll sentinel.
  const handleLoadMore = useCallback(
    () => fetchDiscussions(Math.floor(discussions.length / PAGE_SIZE) + 1, true),
    [fetchDiscussions, discussions.length]
  );

  // Infinite scroll sentinel
  const { resetInfiniteScroll } = useInfiniteScroll({
    isLoading: isLoadingMore,
    hasMore,
    onLoadMore: handleLoadMore,
    observerRef,
    loadMoreRef,
  });

  // Reset scroll position when filters change
  useEffect(() => {
    resetInfiniteScroll();
  }, [selectedCategory, searchQuery, sortBy, resetInfiniteScroll]);

  const dismissToast = useCallback(() => setToastMessage(null), []);

  const handleDiscussionCreated = useCallback(
    (created: Discussion) => {
      setDiscussions((prev) =>
        prev.some((d) => d.id === created.id) ? prev : [created, ...prev]
      );
      setHasMore(true);
      resetInfiniteScroll();
      setToastMessage("Your discussion was published.");
      trackDiscussionCreated(created.id, created.category);
    },
    [resetInfiniteScroll]
  );

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
              {isConnected && (
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-green-600">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
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
         * Responsive layout:
         * - Desktop (lg+): feed left, sidebar right.
         * - Tablet / mobile: single column; sidebar stacks below the feed.
         * DOM order is always feed-then-sidebar so keyboard focus and
         * screen-reader reading order match the visual layout on every breakpoint.
         */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <main className="min-w-0 flex-1">
            <CommunityFeed
              discussions={discussions}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
              onLoadMore={handleLoadMore}
              error={error}
              onRetry={() => fetchDiscussions(1, false)}
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
              onCategoryChange={setSelectedCategory}
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
