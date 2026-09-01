import { test, expect } from '@playwright/test';

test('deliberately failing test - wrong title assertion', async ({ page }) => {
  await page.goto('https://example.com');

  // The assertion below fails because the actual title is "Example Domain".
  // It is commented out on main so that a fresh clone runs green. Switch to a
  // */fail branch (for example 1.61.1/fail) to run the failure scenario.
  // await expect(page).toHaveTitle(/This Title Does Not Exist/);
});
