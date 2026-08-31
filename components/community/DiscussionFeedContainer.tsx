"use client";

import { useState, useCallback, useEffect, useMemo, memo } from "react";
import DiscussionCard from "./DiscussionCard";
import DiscussionSort, { type SortOption } from "./DiscussionSort";
import DiscussionSearch from "./DiscussionSearch";
import CategoryFilter from "./CategoryFilter";
import LoadMoreButton from "./LoadMoreButton";
import CommunityEmptyState from "./CommunityEmptyState";
import { useCommunityAnalytics } from "@/lib/useCommunityAnalytics";

type ApiDiscussion = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  replyCount: number;
  likeCount: number;
  postedAt: string;
  isLiked?: boolean;
};

interface DiscussionResponse {
  discussions: ApiDiscussion[];
  hasMore: boolean;
  total: number;
  page: number;
  pageSize: number;
}

const DiscussionCardMemo = memo(DiscussionCard);

export default function DiscussionFeedContainer() {
  const { trackSearch, trackSortChange, trackCategoryFilter, trackCommunityPageView } =
    useCommunityAnalytics();

  const [discussions, setDiscussions] = useState<ApiDiscussion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("trending");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    trackCommunityPageView();
  }, [trackCommunityPageView]);

  const fetchDiscussions = useCallback(
    async (page: number, category: string, query: string, replace: boolean) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: "10",
        });
        if (category) params.set("category", category);

        const response = await fetch(`/api/community/discussions?${params}`);
        if (!response.ok) throw new Error("Failed to fetch discussions");

        const data: DiscussionResponse = await response.json();
        const filtered = query
          ? data.discussions.filter(
              (d) =>
                d.title.toLowerCase().includes(query.toLowerCase()) ||
                d.excerpt.toLowerCase().includes(query.toLowerCase())
            )
          : data.discussions;

        setDiscussions((prev) =>
          replace ? filtered : [...prev, ...filtered]
        );
        setHasMore(data.hasMore);
        setTotalCount(data.total);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load discussions");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: "1",
          pageSize: "10",
        });
        if (selectedCategory) params.set("category", selectedCategory);

        const response = await fetch(`/api/community/discussions?${params}`);
        if (!response.ok) throw new Error("Failed to fetch discussions");

        const data: DiscussionResponse = await response.json();
        const filtered = searchQuery
          ? data.discussions.filter(
              (d) =>
                d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : data.discussions;

        if (!cancelled) {
          setDiscussions(filtered);
          setHasMore(data.hasMore);
          setTotalCount(data.total);
          setCurrentPage(1);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load discussions");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, [selectedCategory, searchQuery]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query) {
        trackSearch(query, totalCount);
      }
    },
    [trackSearch, totalCount]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setSortBy(sort);
      trackSortChange(sort);
    },
    [trackSortChange]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      trackCategoryFilter(category);
    },
    [trackCategoryFilter]
  );

  const handleLoadMore = useCallback(() => {
    const next = currentPage + 1;
    fetchDiscussions(next, selectedCategory, searchQuery, false);
  }, [currentPage, selectedCategory, searchQuery, fetchDiscussions]);

  const sortedDiscussions = useMemo(() => {
    const items = [...discussions];
    switch (sortBy) {
      case "latest":
        return items.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
      case "most-liked":
        return items.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
      case "most-replies":
        return items.sort((a, b) => (b.replyCount ?? 0) - (a.replyCount ?? 0));
      case "trending":
      default:
        return items.sort(
          (a, b) =>
            (b.likeCount ?? 0) +
            (b.replyCount ?? 0) -
            ((a.likeCount ?? 0) + (a.replyCount ?? 0))
        );
    }
  }, [discussions, sortBy]);

  if (isLoading && discussions.length === 0) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
        <button
          type="button"
          onClick={() => fetchDiscussions(1, selectedCategory, searchQuery, true)}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (sortedDiscussions.length === 0) {
    return <CommunityEmptyState title="No discussions found" message="Start the conversation!" />;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <DiscussionSearch onSearch={handleSearch} />
        <DiscussionSort value={sortBy} onChange={handleSortChange} />
      </div>

      <CategoryFilter selected={selectedCategory} onChange={handleCategoryChange} />

      <p className="text-xs text-gray-400 dark:text-gray-500">
        {totalCount} discussion{totalCount !== 1 ? "s" : ""}
        {selectedCategory && ` in ${selectedCategory}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </p>

      <div className="flex flex-col gap-4 sm:gap-6">
        {sortedDiscussions.map((discussion) => (
          <DiscussionCardMemo
            key={discussion.id}
            discussion={{
              id: discussion.id,
              title: discussion.title,
              excerpt: discussion.excerpt,
              author: discussion.author,
              repliesCount: discussion.replyCount,
              likeCount: discussion.likeCount,
            }}
          />
        ))}
      </div>

      {hasMore && <LoadMoreButton onClick={handleLoadMore} isLoading={isLoading} />}
    </div>
  );
}
