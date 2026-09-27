"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { CommunityHeroBanner } from "@/components/community/CommunityHeroBanner";
import { useCommunityRealtime } from "@/hooks/useCommunityRealtime";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Discussion } from "@/lib/community-types";

export default function CommunityPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Real-time updates
  const { isConnected, lastEvent } = useCommunityRealtime({
    onNewDiscussion: (discussion) => {
      setDiscussions((prev) => {
        // Prevent duplicates
        if (prev.some((d) => d.id === discussion.id)) return prev;
        return [discussion, ...prev];
      });
    },
    onNewReply: (discussionId, reply) => {
      setDiscussions((prev) =>
        prev.map((d) =>
          d.id === discussionId
            ? { ...d, replyCount: d.replyCount + 1, lastReply: reply }
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

  const handleSortChange = (sort: "latest" | "popular" | "trending") => {
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
