import { expect, test } from '@playwright/test';

const scenarios = [
  'authentication',
  'project list',
  'workflow editor',
  'environment variables',
  'runner startup',
  'test discovery',
  'shard allocation',
  'parallel execution',
  'trace capture',
  'screenshot capture',
  'video capture',
  'blob upload',
  'checksum validation',
  'report aggregation',
  'report download',
  'workflow completion',
] as const;

for (const [index, scenario] of scenarios.entries()) {
  test(`sharding demo ${String(index + 1).padStart(2, '0')} - ${scenario}`, async ({
    page,
  }, testInfo) => {
    const sequence = index + 1;
    const delayMs = 250 + (index % 4) * 100;

    await page.setContent(`
      <!doctype html>
      <html>
        <head><title>Shard demo ${sequence}</title></head>
        <body>
          <main data-testid="scenario-card" data-sequence="${sequence}">
            <h1>${scenario}</h1>
            <p>Deterministic Playrunner shard fixture</p>
          </main>
        </body>
      </html>
    `);
    await page.waitForTimeout(delayMs);

    const card = page.getByTestId('scenario-card');
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute('data-sequence', String(sequence));
    await expect(card.getByRole('heading')).toHaveText(scenario);
    await expect(page).toHaveTitle(`Shard demo ${sequence}`);

    await testInfo.attach('shard-fixture.json', {
      body: Buffer.from(
        JSON.stringify({ delayMs, scenario, sequence }, null, 2),
      ),
      contentType: 'application/json',
    });
  });
}
