"use client";

import { AnalyticsEvent } from "./mentor-types";

const EVENT_NAMES = {
  SEARCH: "mentor_discovery_search",
  FILTER_USAGE: "mentor_discovery_filter_usage",
  SORT_CHANGE: "mentor_discovery_sort_change",
  MENTOR_PROFILE_CLICK: "mentor_discovery_profile_click",
  BOOKMARK_ACTION: "mentor_discovery_bookmark_action",
  COMPARISON_ACTION: "mentor_discovery_comparison_action",
  FILTER_DRAWER_OPEN: "mentor_discovery_filter_drawer_open",
  FILTER_DRAWER_CLOSE: "mentor_discovery_filter_drawer_close",
  FILTER_CLEAR: "mentor_discovery_filter_clear",
  FILTER_APPLY: "mentor_discovery_filter_apply",
} as const;

type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];

interface TrackOptions {
  event: EventName;
  properties: Record<string, unknown>;
}

let eventQueue: AnalyticsEvent[] = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || eventQueue.length === 0) return;
  isProcessing = true;

  const events = [...eventQueue];
  eventQueue = [];

  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events }),
      keepalive: true,
    });
  } catch (error) {
    console.error("Failed to send analytics events:", error);
    eventQueue.unshift(...events);
  } finally {
    isProcessing = false;
    if (eventQueue.length > 0) {
      setTimeout(processQueue, 1000);
    }
  }
};

export const track = ({ event, properties }: TrackOptions) => {
  const analyticsEvent: AnalyticsEvent = {
    event,
    properties: {
      ...properties,
      timestamp: Date.now(),
      url: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    },
    timestamp: Date.now(),
  };

  eventQueue.push(analyticsEvent);

  if (eventQueue.length >= 10) {
    processQueue();
  } else {
    setTimeout(processQueue, 5000);
  }
};

export const trackSearch = (query: string, filtersCount: number) => {
  track({
    event: EVENT_NAMES.SEARCH,
    properties: { query, filtersCount },
  });
};

export const trackFilterUsage = (filterType: string, filterValue: string | string[], action: "add" | "remove") => {
  track({
    event: EVENT_NAMES.FILTER_USAGE,
    properties: { filterType, filterValue, action },
  });
};

export const trackSortChange = (sortBy: string, sortOrder: string) => {
  track({
    event: EVENT_NAMES.SORT_CHANGE,
    properties: { sortBy, sortOrder },
  });
};

export const trackMentorProfileClick = (mentorId: string, mentorName: string, source: string) => {
  track({
    event: EVENT_NAMES.MENTOR_PROFILE_CLICK,
    properties: { mentorId, mentorName, source },
  });
};

export const trackBookmarkAction = (mentorId: string, mentorName: string, action: "add" | "remove") => {
  track({
    event: EVENT_NAMES.BOOKMARK_ACTION,
    properties: { mentorId, mentorName, action },
  });
};

export const trackComparisonAction = (action: "add" | "remove" | "open" | "close", mentorCount: number, mentorIds?: string[]) => {
  track({
    event: EVENT_NAMES.COMPARISON_ACTION,
    properties: { action, mentorCount, mentorIds },
  });
};

export const trackFilterDrawerOpen = () => {
  track({
    event: EVENT_NAMES.FILTER_DRAWER_OPEN,
    properties: {},
  });
};

export const trackFilterDrawerClose = () => {
  track({
    event: EVENT_NAMES.FILTER_DRAWER_CLOSE,
    properties: {},
  });
};

export const trackFilterClear = () => {
  track({
    event: EVENT_NAMES.FILTER_CLEAR,
    properties: {},
  });
};

export const trackFilterApply = (activeFilterCount: number) => {
  track({
    event: EVENT_NAMES.FILTER_APPLY,
    properties: { activeFilterCount },
  });
};

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    if (eventQueue.length > 0) {
      navigator.sendBeacon(
        "/api/analytics",
        JSON.stringify({ events: eventQueue })
      );
      eventQueue = [];
    }
  });
}

export { EVENT_NAMES };