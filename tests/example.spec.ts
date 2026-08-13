import { test, expect } from '@playwright/test';

test('PASS - render a page and check its title', async ({ page }) => {
  await page.setContent(`
    <!doctype html>
    <html>
      <head><title>Example Domain</title></head>
      <body><h1>Example Domain</h1></body>
    </html>
  `);

  await expect(page).toHaveTitle(/Example/);

  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Example Domain');
});
