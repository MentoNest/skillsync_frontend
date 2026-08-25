"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { DiscussionMetadata } from "@/lib/community-types";

interface CommunityState {
  discussions: DiscussionMetadata[];
  category: string | null;
  sort: string;
  search: string;
  page: number;
  total: number;
  loading: boolean;
  error: string | null;
}

interface CommunityContextValue extends CommunityState {
  setDiscussions: (d: DiscussionMetadata[]) => void;
  setCategory: (c: string | null) => void;
  setSort: (s: string) => void;
  setSearch: (q: string) => void;
  setPage: (p: number) => void;
  setTotal: (t: number) => void;
  setLoading: (l: boolean) => void;
  setError: (e: string | null) => void;
}

const CommunityContext = createContext<CommunityContextValue | null>(null);

const initialState: CommunityState = {
  discussions: [],
  category: null,
  sort: "latest",
  search: "",
  page: 1,
  total: 0,
  loading: false,
  error: null,
};

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CommunityState>(initialState);

  const setDiscussions = useCallback(
    (discussions: DiscussionMetadata[]) =>
      setState((s) => ({ ...s, discussions })),
    [],
  );
  const setCategory = useCallback(
    (category: string | null) => setState((s) => ({ ...s, category, page: 1 })),
    [],
  );
  const setSort = useCallback(
    (sort: string) => setState((s) => ({ ...s, sort, page: 1 })),
    [],
  );
  const setSearch = useCallback(
    (search: string) => setState((s) => ({ ...s, search, page: 1 })),
    [],
  );
  const setPage = useCallback(
    (page: number) => setState((s) => ({ ...s, page })),
    [],
  );
  const setTotal = useCallback(
    (total: number) => setState((s) => ({ ...s, total })),
    [],
  );
  const setLoading = useCallback(
    (loading: boolean) => setState((s) => ({ ...s, loading })),
    [],
  );
  const setError = useCallback(
    (error: string | null) => setState((s) => ({ ...s, error })),
    [],
  );

  return (
    <CommunityContext.Provider
      value={{
        ...state,
        setDiscussions,
        setCategory,
        setSort,
        setSearch,
        setPage,
        setTotal,
        setLoading,
        setError,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx)
    throw new Error("useCommunity must be used within CommunityProvider");
  return ctx;
}
