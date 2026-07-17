import { test, expect } from '@playwright/test';

test('deliberately failing test - wrong title assertion', async ({ page }) => {
  await page.goto('https://example.com');

  // This assertion will fail because the actual title is "Example Domain"
  // Commenting this out for this branc because we want the test to pass.
  // await expect(page).toHaveTitle(/This Title Does Not Exist/);
});
