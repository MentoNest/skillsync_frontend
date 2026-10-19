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
  type RefObject,
} from "react";
import { useCommunityRealtime } from "@/hooks/useCommunityRealtime";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import {
  COMMUNITY_CATEGORIES,
  type Category,
  type CommunityEvent,
  type Discussion,
  type DiscussionSort,
} from "./community-types";

const PAGE_SIZE = 10;

/**
 * Centralized community state. All community content (discussions,
 * categories, events) plus filters, sorting, loading and error state live
 * here so components read/write shared state directly instead of receiving
 * it through prop drilling.
 */
export interface CommunityState {
  discussions: Discussion[];
  categories: Category[];
  events: CommunityEvent[];
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: DiscussionSort;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  isConnected: boolean;
  error: string | null;
  categoriesError: string | null;
  eventsError: string | null;
  /** Sentinel ref for the intersection-observer-based infinite scroll. */
  loadMoreRef: RefObject<HTMLDivElement | null>;
}

export interface CommunityActions {
  setCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: DiscussionSort) => void;
  /** Reload the feed from the first page. */
  refetch: () => void;
  /** Load the next page of discussions. */
  loadMore: () => void;
  refetchCategories: () => void;
  refetchEvents: () => void;
}

const CommunityStateContext = createContext<CommunityState | null>(null);
const CommunityActionsContext = createContext<CommunityActions | null>(null);

const FALLBACK_CATEGORIES: Category[] = COMMUNITY_CATEGORIES.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.id,
  description: "",
  discussionCount: 0,
}));

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<DiscussionSort>("latest");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const pageRef = useRef(1);
  const requestIdRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchDiscussions = useCallback(
    async (targetPage: number, append: boolean) => {
      const requestId = ++requestIdRef.current;
      try {
        if (targetPage === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }
        setError(null);

        const params = new URLSearchParams({
          page: String(targetPage),
          limit: String(PAGE_SIZE),
          sort: sortBy,
        });
        if (selectedCategory) params.set("category", selectedCategory);
        if (searchQuery) params.set("q", searchQuery);

        const res = await fetch(`/api/community/discussions?${params}`);
        if (!res.ok) throw new Error("Failed to fetch discussions");

        const data = await res.json();
        // Ignore responses superseded by a newer request (e.g. fast filter changes).
        if (requestId !== requestIdRef.current) return;

        const incoming: Discussion[] = Array.isArray(data.discussions)
          ? data.discussions
          : [];

        if (append) {
          setDiscussions((prev) => {
            const existingIds = new Set(prev.map((d) => d.id));
            return [
              ...prev,
              ...incoming.filter((d) => !existingIds.has(d.id)),
            ];
          });
        } else {
          setDiscussions(incoming);
        }

        setHasMore(Boolean(data.hasMore));
        pageRef.current = targetPage;
      } catch (err) {
        if (requestId === requestIdRef.current) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [selectedCategory, searchQuery, sortBy]
  );

  const loadMore = useCallback(() => {
    fetchDiscussions(pageRef.current + 1, true);
  }, [fetchDiscussions]);

  const fetchCategories = useCallback(async () => {
    try {
      setCategoriesError(null);
      const res = await fetch("/api/community/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(
        Array.isArray(data.categories) ? data.categories : FALLBACK_CATEGORIES
      );
    } catch (err) {
      setCategoriesError(
        err instanceof Error ? err.message : "Failed to fetch categories"
      );
      // Keep the sidebar usable even if the categories request fails.
      setCategories(FALLBACK_CATEGORIES);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      setEventsError(null);
      const res = await fetch("/api/community/events/upcoming");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      setEventsError(
        err instanceof Error ? err.message : "Failed to fetch events"
      );
      setEvents([]);
    }
  }, []);

  // Real-time updates keep the shared discussion list in sync.
  const handleNewDiscussion = useCallback((discussion: unknown) => {
    const newDiscussion = discussion as Discussion;
    if (!newDiscussion?.id) return;
    setDiscussions((prev) =>
      prev.some((d) => d.id === newDiscussion.id)
        ? prev
        : [newDiscussion, ...prev]
    );
  }, []);

  const handleNewReply = useCallback((discussionId: string, reply: unknown) => {
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
  }, []);

  const handleLikeUpdate = useCallback(
    (discussionId: string, likeCount: number) => {
      setDiscussions((prev) =>
        prev.map((d) => (d.id === discussionId ? { ...d, likeCount } : d))
      );
    },
    []
  );

  const { isConnected } = useCommunityRealtime({
    onNewDiscussion: handleNewDiscussion,
    onNewReply: handleNewReply,
    onLikeUpdate: handleLikeUpdate,
  });

  const { resetInfiniteScroll } = useInfiniteScroll({
    isLoading: isLoadingMore,
    hasMore,
    onLoadMore: loadMore,
    observerRef,
    loadMoreRef,
  });

  // Refetch page 1 whenever the filters/sorting change.
  useEffect(() => {
    fetchDiscussions(1, false);
  }, [fetchDiscussions]);

  // Reset infinite scroll when filters/sorting change.
  useEffect(() => {
    resetInfiniteScroll();
  }, [selectedCategory, searchQuery, sortBy, resetInfiniteScroll]);

  // Load secondary community content once on mount.
  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, [fetchCategories, fetchEvents]);

  const actions = useMemo<CommunityActions>(
    () => ({
      setCategory: setSelectedCategory,
      setSearchQuery,
      setSortBy,
      refetch: () => fetchDiscussions(1, false),
      loadMore,
      refetchCategories: fetchCategories,
      refetchEvents: fetchEvents,
    }),
    [fetchDiscussions, loadMore, fetchCategories, fetchEvents]
  );

  const state = useMemo<CommunityState>(
    () => ({
      discussions,
      categories,
      events,
      selectedCategory,
      searchQuery,
      sortBy,
      isLoading,
      isLoadingMore,
      hasMore,
      isConnected,
      error,
      categoriesError,
      eventsError,
      loadMoreRef,
    }),
    [
      discussions,
      categories,
      events,
      selectedCategory,
      searchQuery,
      sortBy,
      isLoading,
      isLoadingMore,
      hasMore,
      isConnected,
      error,
      categoriesError,
      eventsError,
    ]
  );

  return (
    <CommunityStateContext.Provider value={state}>
      <CommunityActionsContext.Provider value={actions}>
        {children}
      </CommunityActionsContext.Provider>
    </CommunityStateContext.Provider>
  );
}

/** Read community state. Must be used inside a `CommunityProvider`. */
export function useCommunityState(): CommunityState {
  const context = useContext(CommunityStateContext);
  if (!context) {
    throw new Error("useCommunityState must be used within a CommunityProvider");
  }
  return context;
}

/** Read community actions. Must be used inside a `CommunityProvider`. */
export function useCommunityActions(): CommunityActions {
  const context = useContext(CommunityActionsContext);
  if (!context) {
    throw new Error(
      "useCommunityActions must be used within a CommunityProvider"
    );
  }
  return context;
}

/** Read both community state and actions in one call. */
export function useCommunity(): CommunityState & CommunityActions {
  return { ...useCommunityState(), ...useCommunityActions() };
}
