# Package Release Workflow

This repository uses Release Please to maintain release PRs and Lerna-Lite to
publish the four public `@fuf-stack/*` packages to npm. The workflow is
`.github/workflows/release-please.yml` and runs on pushes to `main`.

## Release flow

1. `release-please` uses `release-please-config.json` and
   `.release-please-manifest.json` to update release PRs and create releases.
2. When `releases_created == 'true'`, `build-test` checks out the triggering
   `github.sha`, installs from the frozen lockfile without lifecycle scripts,
   builds the packages, and runs the complete test suite.
3. Only after tests pass, the compiled `packages/vitest-config/dist` directory is
   uploaded as an immutable artifact. The other packages ship source/configuration
   directly from the same commit.
4. `publish` requires successful completion of `build-test`, checks out the same
   `github.sha`, and installs the publishing tools with the build disabled. It
   restores the tested build by the artifact ID from this workflow run, then runs
   `./node_modules/.bin/lerna publish from-package --yes --no-verify-access`.

If no release is created, build/test and publication are skipped. A failed build,
failed test, or failed artifact transfer blocks publication. Release runs are queued
without cancellation so their publication steps do not overlap. The existing
release-label conflict/rebase jobs continue to maintain pending release PRs.

## Permissions and credentials

Workflow permissions default to none. Each job declares its own permissions:

- Release PR management: `contents: write` and `pull-requests: write`, with
  `RELEASE_PLEASE_GITHUB_TOKEN` passed only to the Release Please action.
- Build/test: `contents: read`, with no npm OIDC or repository write authority.
- Publication: `contents: read` and `id-token: write` for npm trusted publishing;
  no repository or PR write authority.
- Release-label maintenance: PR write and repository-projects read; the rebase
  action has contents/PR write.

Ordinary branch CI also explicitly uses `contents: read`. Checkouts do not persist
Git credentials. Third-party Actions are pinned to full commit SHAs, with their
major versions retained in comments; Renovate maintains these digest pins.

## Supply chain controls

Setup uses `pnpm install --frozen-lockfile --prefer-offline --ignore-scripts`.
The workspace also disables install lifecycle scripts and applies a public
package release-age policy. Publishing uses the installed, lock-selected Lerna
binary rather than `npx` or a runtime package download.

Publish-time lifecycle scripts are disabled so `prepack` cannot rebuild the tested
output or reinstall dependencies after Lerna rewrites workspace specifiers. The
publishing job reuses the tested compiled artifact instead of rebuilding it.

The shared setup action builds by default; only the publishing job passes
`build: 'false'` to consume that artifact.

## Hosted settings to verify

The source changes do not configure GitHub rulesets, PAT permissions or npm
account settings. Owners should verify required reviews/checks on `main`, narrow
PAT scope/expiry, and each package's trusted-publisher repository/workflow binding.
The workflow filename remains `release-please.yml`; publication now occurs in its
`publish` job. Any hosted policy that restricts the job identity must match it.
