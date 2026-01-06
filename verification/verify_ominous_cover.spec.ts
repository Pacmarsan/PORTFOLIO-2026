import { test, expect } from '@playwright/test';

test('verify Ominous Chapter 1 cover image', async ({ page }) => {
  // Navigate to the app (ensure server is running on 3000)
  await page.goto('http://localhost:3000');

  // Wait for the app to load
  await page.waitForLoadState('networkidle');

  // Click on the WORLDS SVG to expand the shelf
  // Assuming the WORLDS SVG is identifiable. Based on previous turns, we might need a specific selector.
  // We'll look for text "WORLDS" or similar if identifying via aria-label isn't easy,
  // but looking at previous memories/code, there is an interaction trigger.
  // Let's try to find the "WORLDS" text in the PhaseIllustration or similar.
  // Actually, I can use the same selector strategy as previous verification scripts if available.
  // I will check verify_worlds.py content in a moment if this fails, but let's try a robust guess first.

  // Wait for the WORLDS text or element to appear in the nav/hero area
  const worldsTrigger = page.locator('text=WORLDS');
  await expect(worldsTrigger).toBeVisible();
  await worldsTrigger.click();

  // Wait for the archive to open
  await expect(page.locator('text=ARCHIVE')).toBeVisible();

  // Find the OMINOUS — CHAPTER 1 (PART 1) book
  // It's in the "Released Mangas" row (based on the code I just wrote)
  const book = page.locator('text=OMINOUS — CHAPTER 1 (PART 1)');
  await expect(book).toBeVisible();

  // Click the book to open details
  await book.click();

  // Wait for the detail view
  // The title should be large now
  const detailTitle = page.locator('h2', { hasText: 'OMINOUS — CHAPTER 1 (PART 1)' });
  await expect(detailTitle).toBeVisible();

  // Take a screenshot of the detail view to verify the cover image
  await page.screenshot({ path: 'verification/ominous_chapter1_cover.png' });
});
