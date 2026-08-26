/**
 * Community Analytics
 * -------------------
 * Lightweight, typed event-tracking layer for community engagement.
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics/communityAnalytics';
 *   trackEvent({ name: 'discussion_view', discussionId: '42', title: 'How to…' });
 *
 * In production, replace the `sendToAnalytics` sink with your real provider
 * (e.g. Segment, Mixpanel, PostHog, Google Analytics 4) — the event shapes
 * stay the same regardless of destination.
 */

// ── Event definitions ────────────────────────────────────────────────────────

export type CommunityEventName =
  | 'discussion_created'
  | 'discussion_viewed'
  | 'discussion_liked'
  | 'discussion_replied'
  | 'discussion_shared'
  | 'discussion_bookmarked'
  | 'event_registered';

interface BaseEvent {
  /** ISO-8601 timestamp — set automatically by trackEvent. */
  timestamp?: string;
}

export interface DiscussionCreatedEvent extends BaseEvent {
  name: 'discussion_created';
  discussionId: string;
  title: string;
  category: string;
  authorId?: string;
}

export interface DiscussionViewedEvent extends BaseEvent {
  name: 'discussion_viewed';
  discussionId: string;
  title: string;
  category: string;
}

export interface DiscussionLikedEvent extends BaseEvent {
  name: 'discussion_liked';
  discussionId: string;
  title: string;
}

export interface DiscussionRepliedEvent extends BaseEvent {
  name: 'discussion_replied';
  discussionId: string;
  title: string;
}

export interface DiscussionSharedEvent extends BaseEvent {
  name: 'discussion_shared';
  discussionId: string;
  title: string;
  /** e.g. 'copy_link' | 'twitter' | 'whatsapp' */
  shareMethod?: string;
}

export interface DiscussionBookmarkedEvent extends BaseEvent {
  name: 'discussion_bookmarked';
  discussionId: string;
  title: string;
}

export interface EventRegisteredEvent extends BaseEvent {
  name: 'event_registered';
  eventId: string;
  eventTitle: string;
}

export type CommunityEvent =
  | DiscussionCreatedEvent
  | DiscussionViewedEvent
  | DiscussionLikedEvent
  | DiscussionRepliedEvent
  | DiscussionSharedEvent
  | DiscussionBookmarkedEvent
  | EventRegisteredEvent;

// ── Sink (swap this for your real provider) ──────────────────────────────────

/**
 * sendToAnalytics — the single place to integrate a real analytics provider.
 *
 * Examples:
 *   Segment:   analytics.track(event.name, event);
 *   PostHog:   posthog.capture(event.name, event);
 *   GA4:       gtag('event', event.name, event);
 */
function sendToAnalytics(event: CommunityEvent & { timestamp: string }): void {
  if (process.env.NODE_ENV === 'development') {
    // Visible in the browser console during development for easy verification.
    console.log('[CommunityAnalytics]', event.name, event);
  }
  // TODO: replace with real provider call in production, e.g.:
  // analytics.track(event.name, event);
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * trackEvent — fire a typed community analytics event.
 *
 * Automatically stamps the event with an ISO-8601 timestamp before dispatch.
 * Safe to call from both client and server components (no-ops on the server
 * if the provider is browser-only).
 */
export function trackEvent(event: CommunityEvent): void {
  const stamped = { ...event, timestamp: new Date().toISOString() };
  try {
    sendToAnalytics(stamped);
  } catch (err) {
    // Never let analytics errors surface to the user.
    if (process.env.NODE_ENV === 'development') {
      console.warn('[CommunityAnalytics] Failed to send event:', err);
    }
  }
}
