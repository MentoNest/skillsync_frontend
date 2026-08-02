"use client";

import { useState, useEffect, useCallback } from "react";
import { communityService } from "@/lib/community-service";
import type { DiscussionMetadata } from "@/lib/community-types";

interface UseDiscussionsOptions {
  category?: string | null;
  sort?: string;
  page?: number;
  limit?: number;
}

interface UseDiscussionsReturn {
  discussions: DiscussionMetadata[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDiscussions(
  options: UseDiscussionsOptions = {},
): UseDiscussionsReturn {
  const { category, sort = "latest", page = 1, limit = 10 } = options;
  const [discussions, setDiscussions] = useState<DiscussionMetadata[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await communityService.fetchDiscussions({
        page,
        limit,
        category: category ?? undefined,
        sort,
      });
      setDiscussions(result.discussions);
      setTotal(result.total);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load discussions",
      );
    } finally {
      setLoading(false);
    }
  }, [category, sort, page, limit]);

  useEffect(() => {
    let ignore = false;
    communityService
      .fetchDiscussions({ page, limit, category: category ?? undefined, sort })
      .then((result) => {
        if (!ignore) {
          setDiscussions(result.discussions);
          setTotal(result.total);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "Failed to load discussions",
          );
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [category, sort, page, limit]);

  return { discussions, total, loading, error, refetch: fetchDiscussions };
}
