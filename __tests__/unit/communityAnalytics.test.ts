/**
 * Unit tests — communityAnalytics (trackEvent)
 *
 * Run with:  npx vitest run __tests__/unit/communityAnalytics.test.ts
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackEvent, type CommunityEvent } from '@/lib/analytics/communityAnalytics';

describe('trackEvent', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('stamps the event with an ISO-8601 timestamp', () => {
    const event: CommunityEvent = {
      name: 'discussion_liked',
      discussionId: '42',
      title: 'Test discussion',
    };

    trackEvent(event);

    const logged = consoleSpy.mock.calls[0];
    const stamped = logged?.[2] as CommunityEvent & { timestamp: string };
    expect(stamped.timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    );
  });

  it('preserves all event fields', () => {
    const event: CommunityEvent = {
      name: 'discussion_shared',
      discussionId: '7',
      title: 'How to learn TypeScript',
      shareMethod: 'copy_link',
    };

    trackEvent(event);

    const stamped = consoleSpy.mock.calls[0]?.[2] as typeof event & { timestamp: string };
    expect(stamped.name).toBe('discussion_shared');
    expect(stamped.discussionId).toBe('7');
    expect(stamped.title).toBe('How to learn TypeScript');
    expect(stamped.shareMethod).toBe('copy_link');
  });

  it('does not throw when the sink throws', () => {
    consoleSpy.mockImplementation(() => { throw new Error('sink error'); });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(() =>
      trackEvent({ name: 'discussion_bookmarked', discussionId: '1', title: 'Test' }),
    ).not.toThrow();

    warnSpy.mockRestore();
  });

  it.each([
    { name: 'discussion_created', discussionId: '1', title: 'T', category: 'Q' },
    { name: 'discussion_viewed', discussionId: '2', title: 'T', category: 'Q' },
    { name: 'discussion_liked', discussionId: '3', title: 'T' },
    { name: 'discussion_replied', discussionId: '4', title: 'T' },
    { name: 'discussion_shared', discussionId: '5', title: 'T' },
    { name: 'discussion_bookmarked', discussionId: '6', title: 'T' },
    { name: 'event_registered', eventId: 'e1', eventTitle: 'AMA' },
  ] as CommunityEvent[])('tracks $name without throwing', (event) => {
    expect(() => trackEvent(event)).not.toThrow();
  });
});
