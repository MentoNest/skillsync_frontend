"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import { useCommunityRealtime } from "@/hooks/useCommunityRealtime";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { communityApi } from "@/lib/community-api";
import type { Discussion, DiscussionSort } from "@/lib/community-types";

export default function CommunityPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<DiscussionSort>("latest");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const pageRef = useRef(1);

  // Real-time updates
  const { isConnected } = useCommunityRealtime({
    onNewDiscussion: (discussion) => {
      const newDisc = discussion as Discussion;
      if (!newDisc?.id) return;
      setDiscussions((prev) => {
        // Prevent duplicates
        if (prev.some((d) => d.id === newDisc.id)) return prev;
        return [newDisc, ...prev];
      });
    },
    onNewReply: (discussionId, reply) => {
      setDiscussions((prev) =>
        prev.map((d) =>
          d.id === discussionId
            ? { ...d, replyCount: d.replyCount + 1, lastReply: reply as Discussion["lastReply"] }
            : d
        )
      );
    },
    onLikeUpdate: (discussionId, likeCount) => {
      setDiscussions((prev) =>
        prev.map((d) =>
          d.id === discussionId ? { ...d, likeCount } : d
        )
      );
    },
  });

  // Fetch discussions from the backend. A new request aborts the previous one
  // so a slow response for old filters can never overwrite newer results.
  const fetchDiscussions = useCallback(
    async (page = 1, append = false) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        if (page === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }
        setError(null);

        const result = await communityApi.getDiscussions(
          {
            page,
            limit: 10,
            sort: sortBy,
            category: selectedCategory,
            search: searchQuery,
          },
          controller.signal
        );

        if (controller.signal.aborted) return;

        if (append) {
          setDiscussions((prev) => {
            // Prevent duplicates
            const existingIds = new Set(prev.map((d) => d.id));
            const newDiscussions = result.discussions.filter(
              (d) => !existingIds.has(d.id)
            );
            return [...prev, ...newDiscussions];
          });
        } else {
          setDiscussions(result.discussions);
        }

        setHasMore(result.hasMore);
        pageRef.current = result.page;
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "Failed to load discussions"
        );
        if (!append) {
          setDiscussions([]);
          setHasMore(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [selectedCategory, searchQuery, sortBy]
  );

  // Initial fetch
  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  // Cancel any in-flight request when the page unmounts.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Next page of results. Guard against firing while the first page is still
  // loading, which would abort that request.
  const handleLoadMore = useCallback(() => {
    if (isLoading || isLoadingMore || !hasMore) return;
    fetchDiscussions(pageRef.current + 1, true);
  }, [fetchDiscussions, hasMore, isLoading, isLoadingMore]);

  // Infinite scroll
  const { resetInfiniteScroll } = useInfiniteScroll({
    isLoading: isLoadingMore,
    hasMore,
    onLoadMore: handleLoadMore,
    observerRef,
    loadMoreRef,
  });

  // Reset infinite scroll when filters change
  useEffect(() => {
    resetInfiniteScroll();
  }, [selectedCategory, searchQuery, sortBy, resetInfiniteScroll]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: DiscussionSort) => {
    setSortBy(sort);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Community
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Connect, share, and learn with fellow mentees and mentors
          </p>
          {isConnected && (
            <span className="mt-2 inline-flex items-center gap-1 text-sm text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live updates enabled
            </span>
          )}
        </div>

        <CommunityHeroBanner />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <main className="flex-1 min-w-0">
            {error && (
              <div
                role="alert"
                className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
              >
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => fetchDiscussions(1, false)}
                  className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-800 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Try again
                </button>
              </div>
            )}

            <CommunityFeed
              discussions={discussions}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              sortBy={sortBy}
              onCategoryChange={handleCategoryChange}
              onSearchChange={handleSearchChange}
              onSortChange={handleSortChange}
              loadMoreRef={loadMoreRef}
            />
          </main>

          <aside className="w-full lg:w-80 flex-shrink-0">
            <CommunitySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
