'use client';

/**
 * useCommunityAnalytics
 * ----------------------
 * Convenience hook that exposes stable, pre-bound tracking helpers for every
 * community engagement event. Import this in any client component that needs
 * to fire analytics — no direct imports of trackEvent needed at the call site.
 *
 * @example
 * const { trackDiscussionLiked, trackDiscussionViewed } = useCommunityAnalytics();
 *
 * <button onClick={() => trackDiscussionLiked({ discussionId: '1', title: 'How to…' })}>
 *   Like
 * </button>
 */

import { useCallback } from 'react';
import {
  trackEvent,
  type DiscussionCreatedEvent,
  type DiscussionViewedEvent,
  type DiscussionLikedEvent,
  type DiscussionRepliedEvent,
  type DiscussionSharedEvent,
  type DiscussionBookmarkedEvent,
  type EventRegisteredEvent,
} from '@/lib/analytics/communityAnalytics';

// Strip the `name` discriminant so callers only pass the payload fields.
type Payload<T> = Omit<T, 'name' | 'timestamp'>;

export function useCommunityAnalytics() {
  /** Fired when a user submits a new discussion post. */
  const trackDiscussionCreated = useCallback(
    (payload: Payload<DiscussionCreatedEvent>) =>
      trackEvent({ name: 'discussion_created', ...payload }),
    [],
  );

  /** Fired when a discussion card or detail page comes into view. */
  const trackDiscussionViewed = useCallback(
    (payload: Payload<DiscussionViewedEvent>) =>
      trackEvent({ name: 'discussion_viewed', ...payload }),
    [],
  );

  /** Fired when a user clicks the like / heart button on a discussion. */
  const trackDiscussionLiked = useCallback(
    (payload: Payload<DiscussionLikedEvent>) =>
      trackEvent({ name: 'discussion_liked', ...payload }),
    [],
  );

  /** Fired when a user submits a reply to a discussion. */
  const trackDiscussionReplied = useCallback(
    (payload: Payload<DiscussionRepliedEvent>) =>
      trackEvent({ name: 'discussion_replied', ...payload }),
    [],
  );

  /** Fired when a user shares a discussion via any method. */
  const trackDiscussionShared = useCallback(
    (payload: Payload<DiscussionSharedEvent>) =>
      trackEvent({ name: 'discussion_shared', ...payload }),
    [],
  );

  /** Fired when a user bookmarks a discussion. */
  const trackDiscussionBookmarked = useCallback(
    (payload: Payload<DiscussionBookmarkedEvent>) =>
      trackEvent({ name: 'discussion_bookmarked', ...payload }),
    [],
  );

  /** Fired when a user registers for a community event. */
  const trackEventRegistered = useCallback(
    (payload: Payload<EventRegisteredEvent>) =>
      trackEvent({ name: 'event_registered', ...payload }),
    [],
  );

  return {
    trackDiscussionCreated,
    trackDiscussionViewed,
    trackDiscussionLiked,
    trackDiscussionReplied,
    trackDiscussionShared,
    trackDiscussionBookmarked,
    trackEventRegistered,
  };
"use client";

import { useCallback, useRef } from "react";

/**
 * Community Analytics Event Types
 *
 * Tracks user engagement across the community module.
 * Each event captures a specific user interaction.
 */
export type CommunityEvent =
  | "discussion_created"
  | "discussion_viewed"
  | "discussion_liked"
  | "discussion_unliked"
  | "discussion_replied"
  | "discussion_shared"
  | "discussion_bookmarked"
  | "discussion_unbookmarked"
  | "event_registered"
  | "event_unregistered";

export interface AnalyticsPayload {
  event: CommunityEvent;
  discussionId?: string;
  category?: string;
  timestamp: number;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * useCommunityAnalytics
 *
 * A hook for tracking community engagement events.
 * Batches events and sends them periodically to reduce network overhead.
 *
 * @example
 * ```tsx
 * const { track } = useCommunityAnalytics();
 * track('discussion_viewed', { discussionId: '123', category: 'technical' });
 * ```
 */
export function useCommunityAnalytics() {
  const queueRef = useRef<AnalyticsPayload[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback(async () => {
    if (queueRef.current.length === 0) return;

    const batch = [...queueRef.current];
    queueRef.current = [];

    try {
      // Send batch to analytics endpoint (no-op if endpoint doesn't exist yet)
      if (process.env.NEXT_PUBLIC_ANALYTICS_URL) {
        await fetch(process.env.NEXT_PUBLIC_ANALYTICS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ events: batch }),
        });
      } else {
        // Development: log to console for debugging
        if (process.env.NODE_ENV === "development") {
          console.debug("[CommunityAnalytics] batch:", batch);
        }
      }
    } catch {
      // Re-queue failed events for retry
      queueRef.current = [...batch, ...queueRef.current];
    }
  }, []);

  const scheduleFlush = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      flush();
    }, 2000);
  }, [flush]);

  const track = useCallback(
    (
      event: CommunityEvent,
      options?: {
        discussionId?: string;
        category?: string;
        metadata?: Record<string, string | number | boolean>;
      },
    ) => {
      const payload: AnalyticsPayload = {
        event,
        discussionId: options?.discussionId,
        category: options?.category,
        timestamp: Date.now(),
        metadata: options?.metadata,
      };

      queueRef.current.push(payload);
      scheduleFlush();
    },
    [scheduleFlush],
  );

  return { track, flush };
}
