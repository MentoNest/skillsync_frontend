/**
 * Integration tests — Discussion workflow
 *
 * Tests the full user journey: viewing, liking, replying, sharing, bookmarking
 * a discussion and registering for a community event.
 *
 * Run with:  npx vitest run __tests__/integration/discussionWorkflow.test.tsx
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as analyticsModule from '@/lib/analytics/communityAnalytics';

// Mock Next.js navigation so the page renders in the test environment.
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

// Lazy import after mocks are in place.
const { default: CommunityPage } = await import(
  '@/app/(dashboard)/community/page'
);

describe('Discussion workflow integration', () => {
  let trackEventSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    trackEventSpy = vi.spyOn(analyticsModule, 'trackEvent').mockImplementation(() => {});
  });

  afterEach(() => {
    trackEventSpy.mockRestore();
    vi.clearAllMocks();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders the community hero banner', () => {
    render(<CommunityPage />);
    expect(
      screen.getByRole('heading', { name: /welcome to the community/i }),
    ).toBeInTheDocument();
  });

  it('renders the discussion feed with all discussion cards', () => {
    render(<CommunityPage />);
    const feed = screen.getByRole('feed', { name: /discussions/i });
    const articles = within(feed).getAllByRole('article');
    expect(articles.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the tab navigation', () => {
    render(<CommunityPage />);
    expect(screen.getByRole('tab', { name: /all discussions/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /questions/i })).toBeInTheDocument();
  });

  it('renders the sidebar with categories, events, and stats', () => {
    render(<CommunityPage />);
    const sidebar = screen.getByRole('complementary', { name: /community sidebar/i });
    expect(within(sidebar).getByText(/browse categories/i)).toBeInTheDocument();
    expect(within(sidebar).getByText(/upcoming events/i)).toBeInTheDocument();
    expect(within(sidebar).getByText(/community stats/i)).toBeInTheDocument();
  });

  // ── Analytics: page view ──────────────────────────────────────────────────

  it('fires discussion_viewed for each visible discussion on mount', () => {
    render(<CommunityPage />);
    const viewedCalls = trackEventSpy.mock.calls.filter(
      ([e]) => e.name === 'discussion_viewed',
    );
    expect(viewedCalls.length).toBeGreaterThanOrEqual(1);
  });

  // ── Analytics: creating a discussion ─────────────────────────────────────

  it('fires discussion_created when "Start a Discussion" is clicked', async () => {
    render(<CommunityPage />);
    await userEvent.click(screen.getByRole('button', { name: /start a discussion/i }));
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'discussion_created' }),
    );
  });

  // ── Analytics: liking ────────────────────────────────────────────────────

  it('fires discussion_liked when a like button is clicked', async () => {
    render(<CommunityPage />);
    const likeButtons = screen.getAllByRole('button', { name: /likes/i });
    await userEvent.click(likeButtons[0]);
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'discussion_liked' }),
    );
  });

  // ── Analytics: commenting / replying ─────────────────────────────────────

  it('fires discussion_replied when a reply button is clicked', async () => {
    render(<CommunityPage />);
    const replyButtons = screen.getAllByRole('button', { name: /replies/i });
    await userEvent.click(replyButtons[0]);
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'discussion_replied' }),
    );
  });

  // ── Analytics: sharing ───────────────────────────────────────────────────

  it('fires discussion_shared when a share button is clicked', async () => {
    render(<CommunityPage />);
    const shareButtons = screen.getAllByRole('button', { name: /share discussion/i });
    await userEvent.click(shareButtons[0]);
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'discussion_shared' }),
    );
  });

  // ── Analytics: bookmarking ────────────────────────────────────────────────

  it('fires discussion_bookmarked when a save/bookmark button is clicked', async () => {
    render(<CommunityPage />);
    const bookmarkButtons = screen.getAllByRole('button', { name: /bookmark discussion/i });
    await userEvent.click(bookmarkButtons[0]);
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'discussion_bookmarked' }),
    );
  });

  // ── Analytics: event registration ────────────────────────────────────────

  it('fires event_registered when Register is clicked on an event', async () => {
    render(<CommunityPage />);
    const registerButtons = screen.getAllByRole('button', { name: /register/i });
    await userEvent.click(registerButtons[0]);
    expect(trackEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'event_registered' }),
    );
  });
});
