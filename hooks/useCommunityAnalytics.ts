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
}
