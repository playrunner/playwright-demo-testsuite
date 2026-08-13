import { test, expect } from '@playwright/test';

test('deliberately failing test - wrong title assertion', async ({ page }) => {
  await page.setContent(`
    <!doctype html>
    <html>
      <head><title>Example Domain</title></head>
      <body><h1>Intentional report merge failure</h1></body>
    </html>
  `);

  // This assertion will fail because the actual title is "Example Domain"
  await expect(page).toHaveTitle(/This Title Does Not Exist/);
});
