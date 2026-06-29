'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { SortOption } from '@/components/ui/discussion-sort';

// Types
interface Discussion {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  replies: number;
  likes: number;
  trending: number;
  category: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CommunityState {
  discussions: Discussion[];
  categories: Category[];
  filters: {
    sortBy: SortOption;
    category: string | null;
    searchQuery: string;
  };
  loading: boolean;
  error: string | null;
  recommended: Discussion[];
  statistics: {
    totalMembers: number;
    activeDiscussions: number;
    totalDiscussions: number;
    eventsThisMonth: number;
  };
}

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DISCUSSIONS'; payload: Discussion[] }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'SET_CATEGORY_FILTER'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_RECOMMENDED'; payload: Discussion[] }
  | { type: 'ADD_DISCUSSION'; payload: Discussion }
  | { type: 'UPDATE_DISCUSSION_LIKES'; payload: { id: string; likes: number } }
  | { type: 'UPDATE_DISCUSSION_REPLIES'; payload: { id: string; replies: number } };

// Initial state
const initialDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'How to transition into a career in UX design?',
    author: 'Sarah Johnson',
    createdAt: new Date('2025-06-25'),
    replies: 12,
    likes: 24,
    trending: 85,
    category: 'career-advice'
  },
  {
    id: '2',
    title: 'Best resources for learning cloud computing',
    author: 'Mike Chen',
    createdAt: new Date('2025-06-27'),
    replies: 8,
    likes: 18,
    trending: 72,
    category: 'technical'
  },
  {
    id: '3',
    title: 'Tips for negotiating a salary raise',
    author: 'Emily Rodriguez',
    createdAt: new Date('2025-06-28'),
    replies: 23,
    likes: 31,
    trending: 95,
    category: 'career-advice'
  },
  {
    id: '4',
    title: 'How to build a personal brand as a developer',
    author: 'James Wilson',
    createdAt: new Date('2025-06-26'),
    replies: 15,
    likes: 42,
    trending: 78,
    category: 'personal-branding'
  }
];

const initialCategories: Category[] = [
  { id: 'career-advice', name: 'Career Advice', count: 156 },
  { id: 'technical', name: 'Technical', count: 203 },
  { id: 'personal-branding', name: 'Personal Branding', count: 89 },
  { id: 'networking', name: 'Networking', count: 67 },
  { id: 'leadership', name: 'Leadership', count: 45 }
];

const initialState: CommunityState = {
  discussions: initialDiscussions,
  categories: initialCategories,
  filters: {
    sortBy: 'trending',
    category: null,
    searchQuery: ''
  },
  loading: false,
  error: null,
  recommended: initialDiscussions.slice(0, 2),
  statistics: {
    totalMembers: 1247,
    activeDiscussions: 89,
    totalDiscussions: 542,
    eventsThisMonth: 12
  }
};

// Reducer
function communityReducer(state: CommunityState, action: Action): CommunityState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DISCUSSIONS':
      return { ...state, discussions: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_SORT_BY':
      return {
        ...state,
        filters: { ...state.filters, sortBy: action.payload }
      };
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        filters: { ...state.filters, category: action.payload }
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        filters: { ...state.filters, searchQuery: action.payload }
      };
    case 'SET_RECOMMENDED':
      return { ...state, recommended: action.payload };
    case 'ADD_DISCUSSION':
      return {
        ...state,
        discussions: [action.payload, ...state.discussions],
        statistics: {
          ...state.statistics,
          totalDiscussions: state.statistics.totalDiscussions + 1,
          activeDiscussions: state.statistics.activeDiscussions + 1
        }
      };
    case 'UPDATE_DISCUSSION_LIKES':
      return {
        ...state,
        discussions: state.discussions.map(d =>
          d.id === action.payload.id
            ? { ...d, likes: action.payload.likes }
            : d
        )
      };
    case 'UPDATE_DISCUSSION_REPLIES':
      return {
        ...state,
        discussions: state.discussions.map(d =>
          d.id === action.payload.id
            ? { ...d, replies: action.payload.replies }
            : d
        )
      };
    default:
      return state;
  }
}

// Context
interface CommunityContextType extends CommunityState {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSortBy: (sortBy: SortOption) => void;
  setCategoryFilter: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  addDiscussion: (discussion: Discussion) => void;
  updateDiscussionLikes: (id: string, likes: number) => void;
  updateDiscussionReplies: (id: string, replies: number) => void;
  getFilteredDiscussions: () => Discussion[];
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

// Provider
export function CommunityProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(communityReducer, initialState);

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setSortBy = (sortBy: SortOption) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
  };

  const setCategoryFilter = (category: string | null) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: category });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const addDiscussion = (discussion: Discussion) => {
    dispatch({ type: 'ADD_DISCUSSION', payload: discussion });
  };

  const updateDiscussionLikes = (id: string, likes: number) => {
    dispatch({ type: 'UPDATE_DISCUSSION_LIKES', payload: { id, likes } });
  };

  const updateDiscussionReplies = (id: string, replies: number) => {
    dispatch({ type: 'UPDATE_DISCUSSION_REPLIES', payload: { id, replies } });
  };

  const getFilteredDiscussions = () => {
    let filtered = [...state.discussions];

    // Apply category filter
    if (state.filters.category) {
      filtered = filtered.filter(d => d.category === state.filters.category);
    }

    // Apply search filter
    if (state.filters.searchQuery) {
      const query = state.filters.searchQuery.toLowerCase();
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(query) ||
        d.author.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (state.filters.sortBy) {
      case 'trending':
        return filtered.sort((a, b) => b.trending - a.trending);
      case 'latest':
        return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'most-replies':
        return filtered.sort((a, b) => b.replies - a.replies);
      case 'most-liked':
        return filtered.sort((a, b) => b.likes - a.likes);
      default:
        return filtered;
    }
  };

  return (
    <CommunityContext.Provider
      value={{
        ...state,
        setLoading,
        setError,
        setSortBy,
        setCategoryFilter,
        setSearchQuery,
        addDiscussion,
        updateDiscussionLikes,
        updateDiscussionReplies,
        getFilteredDiscussions
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

// Custom hook
export function useCommunity() {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
}