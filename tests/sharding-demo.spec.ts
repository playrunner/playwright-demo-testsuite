import { expect, test } from '@playwright/test';

const namedScenarios = [
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

// Together with example.spec.ts and failing.spec.ts, this produces 128 tests.
// Auto sharding targets four test units per worker, so 128 tests require four
// useful shards even when the Playrunner node is configured with 10 workers.
const scenarios = Array.from(
  { length: 126 },
  (_, index) =>
    namedScenarios[index] ||
    `generated workload ${String(index + 1).padStart(3, '0')}`,
);

for (const [index, scenario] of scenarios.entries()) {
  test(`PASS - sharding demo ${String(index + 1).padStart(2, '0')} - ${scenario}`, async ({
    page,
  }, testInfo) => {
    const sequence = index + 1;
    const delayMs = 25 + (index % 4) * 10;

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
