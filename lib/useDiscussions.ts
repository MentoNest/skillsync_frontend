// Hook to fetch community discussions from API (#885)
"use client";
import { useState, useEffect, useCallback } from "react";
import type { Discussion } from "./communityContext";

interface UseDiscussionsOptions {
  category?: string;
  page?: number;
  pageSize?: number;
}

interface UseDiscussionsResult {
  discussions: Discussion[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const useDiscussions = (
  options: UseDiscussionsOptions = {}
): UseDiscussionsResult => {
  const { category, page = 1, pageSize = 10 } = options;

  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(page);
  const [hasMore, setHasMore] = useState(true);

  const fetchDiscussions = useCallback(
    async (pg: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(pg),
          pageSize: String(pageSize),
          ...(category ? { category } : {}),
        });
        const res = await fetch(`/api/community/discussions?${params}`);
        if (!res.ok) throw new Error(`Failed to fetch discussions: ${res.status}`);
        const data: { discussions: Discussion[]; hasMore: boolean } =
          await res.json();
        setDiscussions((prev) =>
          pg === 1 ? data.discussions : [...prev, ...data.discussions]
        );
        setHasMore(data.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    [category, pageSize]
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchDiscussions(1);
  }, [category, fetchDiscussions]);

  const loadMore = useCallback(() => {
    const next = currentPage + 1;
    setCurrentPage(next);
    fetchDiscussions(next);
  }, [currentPage, fetchDiscussions]);

  return { discussions, isLoading, error, hasMore, loadMore };
};
