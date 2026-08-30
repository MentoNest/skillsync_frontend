// Hook to fetch community discussions from API (#885)
"use client";
import { useState, useEffect, useCallback } from "react";

interface Discussion {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  repliesCount: number;
  likeCount: number;
}

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

const COMMUNITY_UPDATE_EVENT = "community:updated";

export const notifyCommunityUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(COMMUNITY_UPDATE_EVENT));
  }
};

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
    async (pg: number, replace = false) => {
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
        const data: {
          discussions: Array<{
            id: string;
            title: string;
            excerpt: string;
            author: string;
            replyCount?: number;
            repliesCount?: number;
            likeCount?: number;
          }>;
          hasMore: boolean;
        } = await res.json();

        const nextDiscussions = (data.discussions ?? []).map((discussion) => ({
          id: String(discussion.id),
          title: discussion.title,
          excerpt: discussion.excerpt,
          author: discussion.author,
          repliesCount: discussion.replyCount ?? discussion.repliesCount ?? 0,
          likeCount: discussion.likeCount ?? 0,
        }));

        setDiscussions((prev) =>
          replace || pg === 1 ? nextDiscussions : [...prev, ...nextDiscussions]
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
    fetchDiscussions(1, true);
  }, [category, fetchDiscussions]);

  useEffect(() => {
    const handleUpdate = () => {
      setCurrentPage(1);
      fetchDiscussions(1, true);
    };

    window.addEventListener(COMMUNITY_UPDATE_EVENT, handleUpdate);
    const interval = window.setInterval(() => {
      fetchDiscussions(1, true);
    }, 5000);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener(COMMUNITY_UPDATE_EVENT, handleUpdate);
    };
  }, [fetchDiscussions]);

  const loadMore = useCallback(() => {
    const next = currentPage + 1;
    setCurrentPage(next);
    fetchDiscussions(next);
  }, [currentPage, fetchDiscussions]);

  return { discussions, isLoading, error, hasMore, loadMore };
};
