# Package Release Workflow

This repository uses [Release Please](https://github.com/googleapis/release-please) to open and maintain release PRs, and uses `lerna publish from-package` in CI to publish packages to npm.

## Release Please setup

The workflow lives in `.github/workflows/release-please.yml` and runs on pushes to:

- `main`

The `release-please` job uses:

- `googleapis/release-please-action@v5`
- `release-please-config.json`
- `.release-please-manifest.json`

This repository uses a single release stream (no prerelease branch in this workflow).

## End-to-end flow

1. A push to `main` triggers Release Please.
2. Release Please opens/updates release PRs based on conventional commits.
3. When a release PR is merged and `releases_created == 'true'`, publish steps run.
4. CI checks out the repo, runs the shared project setup action, and publishes to npm.

If no release is created, the publish step is skipped.

## Why we publish with Lerna

`pnpm publish` does not currently support npm trusted publishing (OIDC) in the way we need for this workflow, so release publishing is performed with Lerna (Lerna-Lite), which delegates to npm.

## Security and supply chain choices

To reduce supply chain risk in CI, publishing uses the workspace-pinned `@lerna-lite/cli` dependency via:

- `./node_modules/.bin/lerna ...`

We explicitly avoid `npx lerna ...` in release jobs, because `npx` may install packages at runtime and can execute install scripts from newly resolved artifacts.
We also avoid `pnpm exec lerna ...` in this workflow to prevent dependency verification from triggering install behavior before execution.

Pinning `@lerna-lite/cli` in root `devDependencies` gives us:

- deterministic CLI versioning
- lockfile-backed dependency resolution
- no ad-hoc runtime package downloads in the publish step

## Permissions

The release job requires:

- `contents: write`
- `pull-requests: write`
- `id-token: write` (required for npm trusted publishing via OIDC)
