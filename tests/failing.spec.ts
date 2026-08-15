import { test, expect } from '@playwright/test';

test('FAIL - deliberate wrong title assertion', async ({ page }) => {
  await page.setContent(`
    <!doctype html>
    <html>
      <head><title>Example Domain</title></head>
      <body><h1>Intentional test failure</h1></body>
    </html>
  `);

  // Keep the failure immediate and deterministic while still exercising the
  // screenshot/video-on-failure configuration.
  expect(await page.title()).toBe('This Title Does Not Exist');
});
