import { test, expect } from "@playwright/test";

test.describe("Community E2E", () => {
  test("user can view community page", async ({ page }) => {
    await page.goto("/community");

    await expect(page.getByRole("heading", { name: "Community" })).toBeVisible();
    await expect(page.getByText("Connect, share, and learn")).toBeVisible();
  });

  test("user can filter by category", async ({ page }) => {
    await page.goto("/community");

    await page.getByRole("tab", { name: "Technical" }).click();

    // Verify URL or state changed
    await expect(page.getByRole("tab", { name: "Technical" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  test("user can sort discussions", async ({ page }) => {
    await page.goto("/community");

    await page.getByLabel("Sort discussions").selectOption("popular");

    await expect(page.getByLabel("Sort discussions")).toHaveValue("popular");
  });

  test("user can search discussions", async ({ page }) => {
    await page.goto("/community");

    await page.getByLabel("Search discussions").fill("react");

    await expect(page.getByLabel("Search discussions")).toHaveValue("react");
  });

  test("user can view discussion details", async ({ page }) => {
    await page.goto("/community");

    // Wait for discussions to load
    const firstDiscussion = page.locator("article").first();
    await expect(firstDiscussion).toBeVisible();

    // Check discussion card elements
    await expect(firstDiscussion.locator("h3")).toBeVisible();
  });

  test("infinite scroll loads more discussions", async ({ page }) => {
    await page.goto("/community");

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for more content to load
    await page.waitForTimeout(1000);
  });
});
