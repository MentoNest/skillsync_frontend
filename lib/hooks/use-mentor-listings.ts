// Hook for fetching mentor listings with loading, error and success states (#857).
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMentorListings, type MentorListingFilters } from "@/lib/api/mentors";
import type { Mentor } from "@/types/mentor";

export interface UseMentorListingsResult {
  mentors: Mentor[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMentorListings(
  filters: MentorListingFilters = {},
): UseMentorListingsResult {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    setLoading(true);
    setError(null);

    getMentorListings(filtersRef.current, { signal: controller.signal })
      .then((response) => {
        if (cancelled) return;
        setMentors(response.mentors);
        setTotal(response.total);
        setLoading(false);
      })
      .catch((reason: unknown) => {
        if (cancelled) return;
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError(
          reason instanceof Error ? reason.message : "Failed to load mentors. Please try again.",
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [filtersKey, reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { mentors, total, loading, error, refetch };
}