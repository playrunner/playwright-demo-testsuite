# Playwright demo test suite

This branch contains a deterministic suite for exercising Playrunner's
Playwright sharding and merged-report workflow. Its 128 fully-parallel tests
produce four useful shards even when a Playrunner node uses 10 workers, and it
includes one intentional failure so the final merged report demonstrates both
successful and failed tests.

## Run it in Playrunner

Configure a Playwright node with:

- Repository: `playrunner/playwright-demo-testsuite`
- Branch: `demo/sharding-report-merge`
- Folder: `/`
- Runtime: TypeScript
- CPU: 1 per shard
- Memory: 1 GB per shard
- Workers: 1 per shard
- Sharding: Manual with 4 shards

The authored Playwright node should expand into test discovery, four shard
children, and a final report-merge child. The parent is expected to finish in a
failed state because `tests/failing.spec.ts` is deliberately red, while still
providing the merged HTML report. Shard 1 is expected to fail and shards 2–4
are expected to pass.

Local sharding is capacity-aware. The default 4 GB memory setting permits only
one shard on an 8 GB Docker runtime, so the 1 GB setting above is required for
this four-shard demo.

## Reproduce the shard workflow manually

Install dependencies and browsers:

```bash
npm ci
npx playwright install chromium
```

Run each command independently. One shard is expected to exit non-zero because
of the intentional failing test.

```bash
CI=1 PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-report-1 npx playwright test --shard=1/4
CI=1 PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-report-2 npx playwright test --shard=2/4
CI=1 PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-report-3 npx playwright test --shard=3/4
CI=1 PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-report-4 npx playwright test --shard=4/4
```

Collect the four zip files into `all-blob-reports`, then merge them:

```bash
mkdir -p all-blob-reports
cp blob-report-*/*.zip all-blob-reports/
PLAYWRIGHT_HTML_OPEN=never npx playwright merge-reports --reporter=html ./all-blob-reports
```
