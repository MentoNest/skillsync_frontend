/**
 * End-to-end tests — Community flows (Playwright)
 *
 * These tests run against a live dev server. Start it first:
 *   npm run dev
 *
 * Then run:
 *   npx playwright test __tests__/e2e/communityFlows.test.ts
 *
 * Setup required (one-time):
 *   npm install -D @playwright/test
 *   npx playwright install chromium
 *
 * Add to playwright.config.ts:
 *   baseURL: 'http://localhost:3000'
 */

import { test, expect, Page } from '@playwright/test';

const COMMUNITY_URL = '/community';

// ── Helpers ──────────────────────────────────────────────────────────────────

async function goToCommunity(page: Page) {
  await page.goto(COMMUNITY_URL);
  // Wait for the hero heading to confirm the page has rendered.
  await page.waitForSelector('h1:has-text("Welcome to the Community")');
}

// ── Tests ─────────────────────────────────────────────────────────────────────

test.describe('Community page', () => {
  test('loads and shows the hero banner', async ({ page }) => {
    await goToCommunity(page);
    await expect(page.getByRole('heading', { name: /welcome to the community/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /start a discussion/i })).toBeVisible();
  });

  test('renders discussion feed with at least one post', async ({ page }) => {
    await goToCommunity(page);
    const feed = page.getByRole('feed', { name: /discussions/i });
    await expect(feed).toBeVisible();
    const posts = feed.getByRole('article');
    await expect(posts).toHaveCount(await posts.count());
    expect(await posts.count()).toBeGreaterThanOrEqual(1);
  });

  test('tab navigation is visible and first tab is active', async ({ page }) => {
    await goToCommunity(page);
    const allTab = page.getByRole('tab', { name: /all discussions/i });
    await expect(allTab).toBeVisible();
    await expect(allTab).toHaveAttribute('aria-selected', 'true');
  });
});

test.describe('Creating a discussion', () => {
  test('"Start a Discussion" button is clickable', async ({ page }) => {
    await goToCommunity(page);
    const btn = page.getByRole('button', { name: /start a discussion/i });
    await expect(btn).toBeEnabled();
    await btn.click();
    // No crash — passes if no exception is thrown
  });
});

test.describe('Liking a discussion', () => {
  test('like button is visible and clickable on first post', async ({ page }) => {
    await goToCommunity(page);
    const feed = page.getByRole('feed', { name: /discussions/i });
    const firstPost = feed.getByRole('article').first();
    const likeBtn = firstPost.getByRole('button', { name: /likes/i });
    await expect(likeBtn).toBeVisible();
    await likeBtn.click();
    // No crash
  });
});

test.describe('Commenting / replying', () => {
  test('reply button is visible and clickable on first post', async ({ page }) => {
    await goToCommunity(page);
    const feed = page.getByRole('feed', { name: /discussions/i });
    const firstPost = feed.getByRole('article').first();
    const replyBtn = firstPost.getByRole('button', { name: /replies/i });
    await expect(replyBtn).toBeVisible();
    await replyBtn.click();
  });
});

test.describe('Bookmarking a discussion', () => {
  test('bookmark/save button is visible and clickable on first post', async ({ page }) => {
    await goToCommunity(page);
    const feed = page.getByRole('feed', { name: /discussions/i });
    const firstPost = feed.getByRole('article').first();
    const saveBtn = firstPost.getByRole('button', { name: /bookmark discussion/i });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();
  });
});

test.describe('Reporting / sharing a discussion', () => {
  test('share button is visible and clickable on first post', async ({ page }) => {
    await goToCommunity(page);
    const feed = page.getByRole('feed', { name: /discussions/i });
    const firstPost = feed.getByRole('article').first();
    const shareBtn = firstPost.getByRole('button', { name: /share discussion/i });
    await expect(shareBtn).toBeVisible();
    await shareBtn.click();
  });
});

test.describe('Event registration', () => {
  test('register button is visible on each event in the sidebar', async ({ page }) => {
    await goToCommunity(page);
    const sidebar = page.getByRole('complementary', { name: /community sidebar/i });
    const registerBtns = sidebar.getByRole('button', { name: /register/i });
    await expect(registerBtns.first()).toBeVisible();
  });

  test('clicking register fires without crashing', async ({ page }) => {
    await goToCommunity(page);
    const sidebar = page.getByRole('complementary', { name: /community sidebar/i });
    await sidebar.getByRole('button', { name: /register/i }).first().click();
    // Verify page is still stable after click
    await expect(page.getByRole('heading', { name: /welcome to the community/i })).toBeVisible();
  });
});

test.describe('Responsive layout', () => {
  test('sidebar stacks below content on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await goToCommunity(page);
    const sidebar = page.getByRole('complementary', { name: /community sidebar/i });
    const feed = page.getByRole('feed', { name: /discussions/i });
    const sidebarBox = await sidebar.boundingBox();
    const feedBox = await feed.boundingBox();
    // On mobile, sidebar should appear below (greater Y position) the feed
    expect(sidebarBox!.y).toBeGreaterThan(feedBox!.y);
  });

  test('sidebar sits beside content on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await goToCommunity(page);
    const sidebar = page.getByRole('complementary', { name: /community sidebar/i });
    const feed = page.getByRole('feed', { name: /discussions/i });
    const sidebarBox = await sidebar.boundingBox();
    const feedBox = await feed.boundingBox();
    // On desktop, sidebar X should be to the right of the feed
    expect(sidebarBox!.x).toBeGreaterThan(feedBox!.x);
  });
});
