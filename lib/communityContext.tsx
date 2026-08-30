// Community state management via React Context (#886)
"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  likeCount: number;
  replyCount: number;
  postedAt: string;
  isTrending?: boolean;
  isLiked?: boolean;
  isPinned?: boolean;
  isLocked?: boolean;
}

interface CommunityState {
  discussions: Discussion[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: "SET_DISCUSSIONS"; payload: Discussion[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: string };

const initialState: CommunityState = {
  discussions: [],
  categories: ["Career Growth", "Leadership", "Interview Prep", "Networking", "Salary & Compensation", "Work-Life Balance"],
  selectedCategory: "",
  searchQuery: "",
  sortBy: "trending",
  isLoading: false,
  error: null,
};

const reducer = (state: CommunityState, action: Action): CommunityState => {
  switch (action.type) {
    case "SET_DISCUSSIONS": return { ...state, discussions: action.payload };
    case "SET_LOADING":     return { ...state, isLoading: action.payload };
    case "SET_ERROR":       return { ...state, error: action.payload };
    case "SET_CATEGORY":    return { ...state, selectedCategory: action.payload };
    case "SET_SEARCH":      return { ...state, searchQuery: action.payload };
    case "SET_SORT":        return { ...state, sortBy: action.payload };
    default:                return state;
  }
};

const CommunityContext = createContext<{
  state: CommunityState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CommunityContext.Provider value={{ state, dispatch }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used within CommunityProvider");
  return ctx;
};
