"use client";

type AnalyticsEvent =
  | "discussion_created"
  | "discussion_viewed"
  | "discussion_liked"
  | "discussion_replied"
  | "discussion_shared"
  | "discussion_bookmarked"
  | "event_registered";

interface AnalyticsEventData {
  discussionId?: string;
  category?: string;
  [key: string]: unknown;
}

class CommunityAnalytics {
  private static instance: CommunityAnalytics;
  private queue: Array<{ event: AnalyticsEvent; data: AnalyticsEventData }> = [];
  private flushInterval: number | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
      this.startFlushInterval();
    }
  }

  static getInstance(): CommunityAnalytics {
    if (!CommunityAnalytics.instance) {
      CommunityAnalytics.instance = new CommunityAnalytics();
    }
    return CommunityAnalytics.instance;
  }

  track(event: AnalyticsEvent, data: AnalyticsEventData = {}) {
    this.queue.push({ event, data });

    // Flush immediately for important events
    if (event === "discussion_created" || event === "event_registered") {
      this.flush();
    }
  }

  private startFlushInterval() {
    if (this.flushInterval) return;
    this.flushInterval = window.setInterval(() => this.flush(), 30000);
  }

  private async flush() {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      await fetch("/api/community/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events }),
        keepalive: true,
      });
    } catch {
      // Re-queue events on failure
      this.queue = [...events, ...this.queue];
    }
  }

  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    this.flush();
  }
}

export const communityAnalytics = CommunityAnalytics.getInstance();

// Convenience functions
export function trackDiscussionCreated(discussionId: string, category: string) {
  communityAnalytics.track("discussion_created", { discussionId, category });
}

export function trackDiscussionViewed(discussionId: string) {
  communityAnalytics.track("discussion_viewed", { discussionId });
}

export function trackDiscussionLiked(discussionId: string) {
  communityAnalytics.track("discussion_liked", { discussionId });
}

export function trackDiscussionReplied(discussionId: string) {
  communityAnalytics.track("discussion_replied", { discussionId });
}

export function trackDiscussionShared(discussionId: string) {
  communityAnalytics.track("discussion_shared", { discussionId });
}

export function trackDiscussionBookmarked(discussionId: string) {
  communityAnalytics.track("discussion_bookmarked", { discussionId });
}

export function trackEventRegistered(eventId: string) {
  communityAnalytics.track("event_registered", { eventId });
}
