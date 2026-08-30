// Community state management via React Context (#886)
"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { trackEvent } from "@/lib/analytics";

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
}

export type ModerationAction = "approve" | "dismiss" | "remove" | "warn";

export interface ModerationItem {
  id: string;
  discussionId: string;
  discussionTitle: string;
  reason: string;
  reportedBy: string;
  createdAt: string;
  status: "pending" | "reviewed" | "dismissed" | "actioned";
}

interface CommunityState {
  discussions: Discussion[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  isLoading: boolean;
  error: string | null;
  moderationQueue: ModerationItem[];
  moderationLoading: boolean;
  viewCounts: Record<string, number>;
}

type Action =
  | { type: "SET_DISCUSSIONS"; payload: Discussion[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: string }
  | { type: "SET_MODERATION_QUEUE"; payload: ModerationItem[] }
  | { type: "SET_MODERATION_LOADING"; payload: boolean }
  | { type: "UPDATE_MODERATION_ITEM"; payload: { id: string; status: string } }
  | { type: "INCREMENT_VIEW_COUNT"; payload: string };

const initialState: CommunityState = {
  discussions: [],
  categories: [
    "Career Growth",
    "Leadership",
    "Interview Prep",
    "Networking",
    "Salary & Compensation",
    "Work-Life Balance",
  ],
  selectedCategory: "",
  searchQuery: "",
  sortBy: "trending",
  isLoading: false,
  error: null,
  moderationQueue: [],
  moderationLoading: false,
  viewCounts: {},
};

const reducer = (state: CommunityState, action: Action): CommunityState => {
  switch (action.type) {
    case "SET_DISCUSSIONS":
      return { ...state, discussions: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_MODERATION_QUEUE":
      return { ...state, moderationQueue: action.payload };
    case "SET_MODERATION_LOADING":
      return { ...state, moderationLoading: action.payload };
    case "UPDATE_MODERATION_ITEM":
      return {
        ...state,
        moderationQueue: state.moderationQueue.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status as ModerationItem["status"] }
            : item
        ),
      };
    case "INCREMENT_VIEW_COUNT":
      return {
        ...state,
        viewCounts: {
          ...state.viewCounts,
          [action.payload]: (state.viewCounts[action.payload] ?? 0) + 1,
        },
      };
    default:
      return state;
  }
};

interface CommunityContextValue {
  state: CommunityState;
  dispatch: React.Dispatch<Action>;
  trackDiscussionView: (discussionId: string) => void;
  trackDiscussionLike: (discussionId: string) => void;
  trackDiscussionPost: (category: string) => void;
  trackModerationAction: (action: string, reportId: string) => void;
}

const CommunityContext = createContext<CommunityContextValue | null>(null);

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const trackDiscussionView = useCallback((discussionId: string) => {
    dispatch({ type: "INCREMENT_VIEW_COUNT", payload: discussionId });
    trackEvent("discussion_view", { discussionId });
  }, []);

  const trackDiscussionLike = useCallback((discussionId: string) => {
    trackEvent("discussion_like", { discussionId });
  }, []);

  const trackDiscussionPost = useCallback((category: string) => {
    trackEvent("discussion_post", { category });
  }, []);

  const trackModerationAction = useCallback((action: string, reportId: string) => {
    trackEvent("moderation_action", { action, reportId });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      trackDiscussionView,
      trackDiscussionLike,
      trackDiscussionPost,
      trackModerationAction,
    }),
    [state, trackDiscussionView, trackDiscussionLike, trackDiscussionPost, trackModerationAction]
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used within CommunityProvider");
  return ctx;
};
