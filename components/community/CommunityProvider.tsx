"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { communityApi } from "@/lib/community-api";
import { trackEventRegistered } from "@/lib/community-analytics";
import {
  COMMUNITY_CATEGORIES,
  type CommunityEvent,
  type CommunityStatistics,
  type Discussion,
  type DiscussionSort,
} from "@/lib/community-types";
import { useCommunityRealtime } from "@/hooks/useCommunityRealtime";

/** Feed page size, shared by the initial fetch and pagination. */
export const COMMUNITY_PAGE_SIZE = 10;

export interface CommunityFilters {
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: DiscussionSort;
}

export interface CommunityContextValue {
  /** Discussions for the active filters, in API order. */
  discussions: Discussion[];
  /** Canonical category list (single source of truth, see `community-types`). */
  categories: typeof COMMUNITY_CATEGORIES;
  /** Community events supplied by the overview endpoint (#989). */
  events: CommunityEvent[];
  /** Sidebar metrics (#990); null until the overview loads. */
  statistics: CommunityStatistics | null;
  filters: CommunityFilters;
  isLoading: boolean;
  isLoadingMore: boolean;
  isLoadingOverview: boolean;
  hasMore: boolean;
  /** Feed error, e.g. the discussions request failed. */
  error: string | null;
  /** Overview error, e.g. the stats/events request failed. */
  overviewError: string | null;
  /** Whether the real-time SSE connection is open. */
  isLive: boolean;
  setCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: DiscussionSort) => void;
  loadMore: () => void;
  refresh: () => void;
  /** Optimistically register the viewer for an event (#989). */
  registerForEvent: (eventId: string) => void;
}

const CommunityContext = createContext<CommunityContextValue | null>(null);

/**
 * Centralized state for the community module (#996).
 *
 * Owns the discussion feed (#995), the sidebar overview, the active filters
 * and the real-time subscription, so the page, the feed and the sidebar all
 * read from one place instead of threading props through every level.
 */
export function CommunityProvider({ children }: { children: ReactNode }) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [statistics, setStatistics] = useState<CommunityStatistics | null>(
    null
  );
  const [filters, setFilters] = useState<CommunityFilters>({
    selectedCategory: null,
    searchQuery: "",
    sortBy: "latest",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingOverview, setIsLoadingOverview] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  // Monotonic id so a slow response for stale filters cannot overwrite the
  // results of a newer request.
  const requestIdRef = useRef(0);

  const fetchDiscussions = useCallback(
    async (page: number, append: boolean) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      if (append) setIsLoadingMore(true);
      else setIsLoading(true);
      setError(null);

      try {
        const result = await communityApi.getDiscussions({
          page,
          limit: COMMUNITY_PAGE_SIZE,
          sort: filters.sortBy,
          category: filters.selectedCategory,
          search: filters.searchQuery,
        });

        if (requestId !== requestIdRef.current) return; // superseded

        setDiscussions((previous) => {
          if (!append) return result.discussions;
          const seen = new Set(previous.map((d) => d.id));
          return [
            ...previous,
            ...result.discussions.filter((d) => !seen.has(d.id)),
          ];
        });
        setHasMore(Boolean(result.hasMore));
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(
          err instanceof Error ? err.message : "Failed to load discussions"
        );
        if (!append) {
          setDiscussions([]);
          setHasMore(false);
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [filters.selectedCategory, filters.searchQuery, filters.sortBy]
  );

  // Refetch the first page whenever the filters change (#995).
  useEffect(() => {
    void fetchDiscussions(1, false);
  }, [fetchDiscussions]);

  const loadOverview = useCallback(async () => {
    setIsLoadingOverview(true);
    setOverviewError(null);
    try {
      const overview = await communityApi.getCommunityOverview();
      // Defensive: a partial payload must not crash the sidebar.
      setStatistics(overview?.statistics ?? null);
      setEvents(Array.isArray(overview?.events) ? overview.events : []);
    } catch (err) {
      setOverviewError(
        err instanceof Error ? err.message : "Failed to load community stats"
      );
    } finally {
      setIsLoadingOverview(false);
    }
  }, []);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  /* Real-time updates keep the shared state in sync without polling. */
  const handleNewDiscussion = useCallback((discussion: unknown) => {
    const incoming = discussion as Discussion | undefined;
    if (!incoming?.id) return;
    setDiscussions((previous) =>
      previous.some((d) => d.id === incoming.id)
        ? previous
        : [incoming, ...previous]
    );
    setStatistics((previous) =>
      previous
        ? { ...previous, totalDiscussions: previous.totalDiscussions + 1 }
        : previous
    );
  }, []);

  const handleNewReply = useCallback((discussionId: string, reply: unknown) => {
    setDiscussions((previous) =>
      previous.map((discussion) =>
        discussion.id === discussionId
          ? {
              ...discussion,
              replyCount: discussion.replyCount + 1,
              lastReply: reply as Discussion["lastReply"],
            }
          : discussion
      )
    );
  }, []);

  const handleLikeUpdate = useCallback(
    (discussionId: string, likeCount: number) => {
      setDiscussions((previous) =>
        previous.map((discussion) =>
          discussion.id === discussionId
            ? { ...discussion, likeCount }
            : discussion
        )
      );
    },
    []
  );

  const { isConnected: isLive } = useCommunityRealtime({
    onNewDiscussion: handleNewDiscussion,
    onNewReply: handleNewReply,
    onLikeUpdate: handleLikeUpdate,
  });

  const loadMore = useCallback(() => {
    if (isLoading || isLoadingMore || !hasMore) return;
    const nextPage = Math.floor(discussions.length / COMMUNITY_PAGE_SIZE) + 1;
    void fetchDiscussions(nextPage, true);
  }, [discussions.length, fetchDiscussions, hasMore, isLoading, isLoadingMore]);

  const refresh = useCallback(() => {
    void fetchDiscussions(1, false);
    void loadOverview();
  }, [fetchDiscussions, loadOverview]);

  const setCategory = useCallback((category: string | null) => {
    setFilters((previous) => ({ ...previous, selectedCategory: category }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((previous) => ({ ...previous, searchQuery: query }));
  }, []);

  const setSortBy = useCallback((sort: DiscussionSort) => {
    setFilters((previous) => ({ ...previous, sortBy: sort }));
  }, []);

  const registerForEvent = useCallback((eventId: string) => {
    setEvents((previous) =>
      previous.map((event) => {
        if (event.id !== eventId || event.isRegistered) return event;
        if (
          event.capacity !== undefined &&
          event.registrationCount >= event.capacity
        ) {
          return event;
        }
        return {
          ...event,
          registrationCount: event.registrationCount + 1,
          isRegistered: true,
        };
      })
    );
    trackEventRegistered(eventId);
  }, []);

  const value = useMemo<CommunityContextValue>(
    () => ({
      discussions,
      categories: COMMUNITY_CATEGORIES,
      events,
      statistics,
      filters,
      isLoading,
      isLoadingMore,
      isLoadingOverview,
      hasMore,
      error,
      overviewError,
      isLive,
      setCategory,
      setSearchQuery,
      setSortBy,
      loadMore,
      refresh,
      registerForEvent,
    }),
    [
      discussions,
      events,
      statistics,
      filters,
      isLoading,
      isLoadingMore,
      isLoadingOverview,
      hasMore,
      error,
      overviewError,
      isLive,
      setCategory,
      setSearchQuery,
      setSortBy,
      loadMore,
      refresh,
      registerForEvent,
    ]
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

/** Read the shared community state. Must be used inside `CommunityProvider`. */
export function useCommunity(): CommunityContextValue {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }
  return context;
}
