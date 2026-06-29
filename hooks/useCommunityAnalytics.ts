'use client';

import { useCallback, useRef } from 'react';

/**
 * Community Analytics Event Types
 *
 * Tracks user engagement across the community module.
 * Each event captures a specific user interaction.
 */
export type CommunityEvent =
  | 'discussion_created'
  | 'discussion_viewed'
  | 'discussion_liked'
  | 'discussion_unliked'
  | 'discussion_replied'
  | 'discussion_shared'
  | 'discussion_bookmarked'
  | 'discussion_unbookmarked'
  | 'event_registered'
  | 'event_unregistered';

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
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ events: batch }),
        });
      } else {
        // Development: log to console for debugging
        if (process.env.NODE_ENV === 'development') {
          console.debug('[CommunityAnalytics] batch:', batch);
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
      options?: { discussionId?: string; category?: string; metadata?: Record<string, string | number | boolean> }
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
    [scheduleFlush]
  );

  return { track, flush };
}
