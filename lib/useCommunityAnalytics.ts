"use client";

import { useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

export function useCommunityAnalytics() {
  const trackView = useCallback((discussionId: string, title?: string) => {
    trackEvent("discussion_view", { discussionId, ...(title ? { title } : {}) });
  }, []);

  const trackLike = useCallback((discussionId: string, liked: boolean) => {
    trackEvent("discussion_like", { discussionId, liked });
  }, []);

  const trackPost = useCallback((category: string) => {
    trackEvent("discussion_post", { category });
  }, []);

  const trackReply = useCallback((discussionId: string) => {
    trackEvent("discussion_reply", { discussionId });
  }, []);

  const trackSearch = useCallback((query: string, resultsCount: number) => {
    trackEvent("discussion_search", { query, resultsCount });
  }, []);

  const trackSortChange = useCallback((sortBy: string) => {
    trackEvent("discussion_sort_changed", { sortBy });
  }, []);

  const trackCategoryFilter = useCallback((category: string) => {
    trackEvent("discussion_category_filter", { category: category || "all" });
  }, []);

  const trackReport = useCallback((discussionId: string, reason: string) => {
    trackEvent("discussion_reported", { discussionId, reason });
  }, []);

  const trackCommunityPageView = useCallback(() => {
    trackEvent("community_page_view", {});
  }, []);

  return {
    trackView,
    trackLike,
    trackPost,
    trackReply,
    trackSearch,
    trackSortChange,
    trackCategoryFilter,
    trackReport,
    trackCommunityPageView,
  };
}
