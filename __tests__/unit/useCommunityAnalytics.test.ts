/**
 * Unit tests — useCommunityAnalytics hook
 *
 * Run with:  npx vitest run __tests__/unit/useCommunityAnalytics.test.ts
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCommunityAnalytics } from '@/hooks/useCommunityAnalytics';
import * as analyticsModule from '@/lib/analytics/communityAnalytics';

describe('useCommunityAnalytics', () => {
  let trackEventSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    trackEventSpy = vi.spyOn(analyticsModule, 'trackEvent').mockImplementation(() => {});
  });

  afterEach(() => {
    trackEventSpy.mockRestore();
  });

  it('returns all expected tracking functions', () => {
    const { result } = renderHook(() => useCommunityAnalytics());
    expect(typeof result.current.trackDiscussionCreated).toBe('function');
    expect(typeof result.current.trackDiscussionViewed).toBe('function');
    expect(typeof result.current.trackDiscussionLiked).toBe('function');
    expect(typeof result.current.trackDiscussionReplied).toBe('function');
    expect(typeof result.current.trackDiscussionShared).toBe('function');
    expect(typeof result.current.trackDiscussionBookmarked).toBe('function');
    expect(typeof result.current.trackEventRegistered).toBe('function');
  });

  it('trackDiscussionLiked calls trackEvent with correct name', () => {
    const { result } = renderHook(() => useCommunityAnalytics());
    act(() => {
      result.current.trackDiscussionLiked({ discussionId: '1', title: 'Test' });
    });
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'discussion_liked', discussionId: '1' }),
    );
  });

  it('trackDiscussionViewed calls trackEvent with correct name', () => {
    const { result } = renderHook(() => useCommunityAnalytics());
    act(() => {
      result.current.trackDiscussionViewed({ discussionId: '2', title: 'T', category: 'Q' });
    });
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'discussion_viewed', discussionId: '2' }),
    );
  });

  it('trackDiscussionShared passes shareMethod through', () => {
    const { result } = renderHook(() => useCommunityAnalytics());
    act(() => {
      result.current.trackDiscussionShared({
        discussionId: '3',
        title: 'T',
        shareMethod: 'twitter',
      });
    });
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ shareMethod: 'twitter' }),
    );
  });

  it('trackEventRegistered calls trackEvent with correct name', () => {
    const { result } = renderHook(() => useCommunityAnalytics());
    act(() => {
      result.current.trackEventRegistered({ eventId: 'e1', eventTitle: 'AMA' });
    });
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'event_registered', eventId: 'e1' }),
    );
  });

  it('tracking functions are stable across re-renders', () => {
    const { result, rerender } = renderHook(() => useCommunityAnalytics());
    const first = result.current.trackDiscussionLiked;
    rerender();
    expect(result.current.trackDiscussionLiked).toBe(first);
  });
});
