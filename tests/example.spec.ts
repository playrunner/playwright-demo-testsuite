import { test, expect } from '@playwright/test';

test('basic test - visit example.com and check title', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://example.com');

  // Check that the page title contains "Example"
  await expect(page).toHaveTitle(/Example/);

  // Check that the heading is visible
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Example Domain');
});
