"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import { useCommunityRealtime } from "@/hooks/useCommunityRealtime";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
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
          limit: "10",
          sort: sortBy,
        });
        if (selectedCategory) params.set("category", selectedCategory);
        if (searchQuery) params.set("q", searchQuery);

        const res = await fetch(`/api/community/discussions?${params}`);
        if (!res.ok) throw new Error("Failed to fetch discussions");

        const data = await res.json();

        if (append) {
          setDiscussions((prev) => {
            // Prevent duplicates
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

  // Infinite scroll
  const { resetInfiniteScroll } = useInfiniteScroll({
    isLoading: isLoadingMore,
    hasMore,
    onLoadMore: () => fetchDiscussions(Math.floor(discussions.length / 10) + 1, true),
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

        {/**
         * #1000 — Responsive Community Sidebar layout:
         * - Desktop (lg+): right sidebar (feed left, sidebar right).
         * - Tablet (md): single column — sidebar widgets stack below the feed
         *   and keep full width for comfortable touch targets.
         * - Mobile (<md): same single column; the sidebar (categories +
         *   guidelines) renders after the discussion feed for logical ordering.
         * DOM order stays feed-then-sidebar on every breakpoint so keyboard
         * focus and screen-reader order always match the visual order.
         */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <main className="min-w-0 flex-1">
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
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              sortBy={sortBy}
              onCategoryChange={handleCategoryChange}
              onSearchChange={handleSearchChange}
              onSortChange={handleSortChange}
              loadMoreRef={loadMoreRef}
            />
          </main>

          <aside
            aria-label="Community sidebar"
            className="
              w-full min-w-0
              lg:w-80 lg:flex-shrink-0
              border-t border-[var(--border)] pt-6 lg:border-t-0 lg:pt-0
            "
          >
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
