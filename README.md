# playwright-demo-testsuite

A small Playwright suite used in the [Playrunner](https://playrunner.dev) demos.

It exists so you can reproduce what you saw in a video rather than take our word for it. Each branch is a scenario: one where the suite passes, ones where it deliberately fails, and one that generates enough tests to be worth sharding.

## Branches

| Branch | Playwright | What it does |
|---|---|---|
| `main` | `^1.61.1` | Default. Everything passes — clone it and run |
| `1.61.1/pass` | `^1.61.1` | A green run, pinned to a specific Playwright version |
| `1.61.1/fail` | `^1.61.1` | One test fails on purpose — used in the failure-triage demo |
| `1.59.0/fail` | `^1.59.0` | The same failure on an older Playwright runtime |
| `demo/sharding-report-merge` | `^1.61.1` | 128 tests across 3 files — used in the sharding demo |

Branches are named `<playwright version>/<outcome>` so a Playrunner node can be
pointed at a specific runtime *and* a specific result — useful when you want a
workflow to take its failure path on demand.

## The tests

- **`example.spec.ts`** — visits `example.com`, checks the title and that the `h1` is visible. Passes.
- **`failing.spec.ts`** — visits `example.com` and asserts a title that doesn't match. The assertion is commented out on `main` and on `1.61.1/pass`, and active on the `*/fail` branches, so there is always something real for a failure path to react to.
- **`sharding-demo.spec.ts`** (sharding branch only) — generates 126 scenarios which, with the other two files, makes 128 tests across 3 files. Enough that automatic sharding has a genuine decision to make.

## Run it locally

```bash
npm ci
npx playwright install chromium
npx playwright test
```

Nothing here needs Playrunner. It's an ordinary Playwright project.

## Run it in Playrunner

The point of the branches is that they give a workflow something to branch on.

1. Sign in at [playrunner.cloud](https://playrunner.cloud).
2. Add a **Playwright** node and connect GitHub.
3. Point it at this repository and pick a branch — `1.61.1/fail` to watch a failure path fire, `demo/sharding-report-merge` to watch it shard.
4. Add whatever should happen next: a model to explain the failure, an email, a Slack message, a GitHub issue.

Playrunner is an orchestration layer for the Playwright suite you already have — it decides when and where your tests run and what happens around them. Your tests and config stay as they are.

- Docs: [playrunner.dev/docs/start](https://playrunner.dev/docs/start/)
- Playrunner: [github.com/playrunner/playrunner](https://github.com/playrunner/playrunner)
- Discord: [discord.gg/4zPdBy3DwU](https://discord.gg/4zPdBy3DwU)
