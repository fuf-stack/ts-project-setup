## @fuf-stack/vitest-config

Default Vitest configurations for Fröhlich ∧ Frei monorepos. Provides separate configs for workspace-level (root) and project-level (package) setups.

**Compatible with Vitest 4.0+**

### Configs Available

**Workspace Config** (`/workspace`) - For monorepo root:

- Projects array defining workspace structure
- V8 coverage with explicit includes/excludes
- Automatic coverage reporters: text summary locally, GitLab/GitHub report files in CI

**GitLab Workspace Config** (`/workspace/gitlab`) - Extends the workspace config:

- Text summary for GitLab's job coverage percentage
- LCOV file for SonarQube, without generating HTML
- Cobertura XML for GitLab merge request diff annotations

**GitHub Workspace Config** (`/workspace/github`) - Extends the workspace config:

- Text summary in the job log
- LCOV file for SonarQube, without generating HTML
- JSON summary for GitHub Actions job summaries or other report consumers

**Project Config** (`/project`) - For individual packages:

- TypeScript path mapping resolution
- Node environment by default
- Clear mocks between tests

### Install

```bash
# pnpm
pnpm add -D @fuf-stack/vitest-config vitest @vitest/coverage-v8

# npm
npm i -D @fuf-stack/vitest-config vitest @vitest/coverage-v8

# yarn
yarn add -D @fuf-stack/vitest-config vitest @vitest/coverage-v8
```

### Usage

> **Important:** Use `.mts` extension for config files when importing this ESM-only package. Using `.ts` may cause bundler errors as tooling might attempt to use `require()` instead of `import`.

#### Workspace Root Config

Use the workspace config in your monorepo root `vitest.config.mts`:

```ts
// vitest.config.mts (root)
import config from '@fuf-stack/vitest-config/workspace';

export default config;
```

This provides:

- Projects array: `['apps/*', 'packages/!(config)', 'packages/config/*']`
- Coverage configuration with sensible defaults
- Automatic coverage report selection

No repository-side environment selection is needed:

- Local runs use `text-summary`.
- `GITLAB_CI=true` adds `lcovonly` and `cobertura`.
- `GITHUB_ACTIONS=true` adds `lcovonly` and `json-summary`.

GitLab takes precedence if both provider flags are `true`. A generic `CI=true`
does not select platform reports. Coverage still requires `--coverage` or an
explicit `coverage.enabled` setting.

`packages/config` is a container, not a test project. Its child packages are
included individually so their tests run once under their own package names.

**Customize if needed:**

Use `mergeConfig` to adjust settings while retaining the default project discovery:

```ts
// vitest.config.mts
import { mergeConfig } from 'vitest/config';

import workspaceConfig from '@fuf-stack/vitest-config/workspace';

export default mergeConfig(workspaceConfig, {
  test: {
    testTimeout: 10_000,
  },
});
```

**Add a project outside the default paths:**

For an existing test project in `tools/integration-tests`, add its directory
relative to the workspace root. `mergeConfig` concatenates arrays, so this extends
`projects` while keeping the default app and package projects:

```ts
// vitest.config.mts
import { mergeConfig } from 'vitest/config';

import workspaceConfig from '@fuf-stack/vitest-config/workspace';

export default mergeConfig(workspaceConfig, {
  test: {
    projects: ['tools/integration-tests'],
  },
});
```

The directory can provide its own `vitest.config.mts` for project-specific settings.

**Add inline projects and extra coverage paths:**

The same applies to inline projects and to `coverage.include` / `coverage.exclude`:
your entries are appended to the defaults. Don't spread the base config manually.

```ts
// vitest.config.mts
import { mergeConfig } from 'vitest/config';

import workspaceConfig from '@fuf-stack/vitest-config/workspace';

export default mergeConfig(workspaceConfig, {
  test: {
    projects: [
      {
        test: {
          name: 'scripts',
          include: ['scripts/**/*.test.mjs'],
          environment: 'node',
        },
      },
    ],
    coverage: {
      include: ['scripts/**/*.mjs'],
    },
  },
});
```

The default coverage excludes already match `*.test.*` / `*.spec.*` files of every
JS/TS extension anywhere in the workspace, so extra includes don't need matching
test excludes.

#### GitLab Coverage Reports

The default `/workspace` preset detects GitLab CI automatically. To force GitLab
report files locally or in another environment, use the explicit preset:

```ts
// vitest.config.mts (root)
import config from '@fuf-stack/vitest-config/workspace/gitlab';

export default config;
```

For custom projects, source paths, or exclusions, pass the config to
`mergeConfig` as in the examples above. Package-level `/project` imports stay
unchanged.

Neither preset enables coverage collection. Run `vitest run --coverage` to collect
coverage. Local automatic runs print totals; GitLab reporting additionally writes:

- `coverage/lcov.info` for SonarQube
- `coverage/cobertura-coverage.xml` for GitLab diff annotations

The GitLab preset uses `mergeConfig` to append `lcovonly` and `cobertura` to the
inherited `text-summary` reporter. It does not rerun the tests for each report.

Configure the GitLab test job to consume those outputs (or inherit equivalent
settings from a shared CI template):

```yaml
test:
  extends: .test-pnpm
  coverage: '/Statements\s*:\s*([\d.]+)%/'
  artifacts:
    when: always
    expire_in: 1 week
    paths:
      - coverage/lcov.info
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

Preserve existing artifacts when adding these settings. SonarQube jobs using
explicit `needs` or `dependencies` must download artifacts from the test job.
`when: always` uploads existing files on failure; Vitest needs
`coverage.reportOnFailure: true` to generate coverage reports for failing tests.

**Migration:** v6.0.0 introduced summary-only `/workspace` and explicit CI presets.
From v6.1.0, `/workspace` selects the CI reports automatically, so existing imports
work in local, GitLab and GitHub environments without environment checks in each
repository. Both explicit CI imports remain supported and force their report
formats regardless of environment. Consumers that need a browsable HTML report
can add `html` explicitly.

#### GitHub Actions Coverage Reports

The default `/workspace` preset detects GitHub Actions automatically. To force
GitHub report files locally or in another environment, use the explicit preset:

```ts
// vitest.config.mts (root)
import config from '@fuf-stack/vitest-config/workspace/github';

export default config;
```

Extend the config with `mergeConfig` to preserve repo-specific projects,
source paths and exclusions. For example, Pixels can retain its `ci-scripts`
project and CI test-selection flags while using the automatic workspace preset.
Its existing SonarQube artifact
transfer can continue reading `coverage/lcov.info` unchanged.

With `vitest run --coverage`, this preset inherits `text-summary` and adds
`lcovonly` and `json-summary`, producing:

- `coverage/lcov.info` for SonarQube and other LCOV consumers
- `coverage/coverage-summary.json` with totals and per-file coverage metrics

It does not produce HTML or Cobertura, enable coverage collection, or post PR
comments. GitHub Actions does not automatically display the JSON file: a workflow
step must read it and append Markdown to `GITHUB_STEP_SUMMARY`. See this
repository's `.github/workflows/ci.yml` for a working summary and artifact example.
Neither writing a job summary nor uploading a coverage artifact requires PR write
permissions or an additional coverage service.

Use the preset directly to reproduce its report files locally. Local runs using
`/workspace` remain summary-only. Both CI presets share source discovery,
exclusions and provider settings; their added report formats differ.

#### Package-Level Configs

Use the project config in individual package `vitest.config.mts`:

```ts
// packages/my-package/vitest.config.mts
import config from '@fuf-stack/vitest-config/project';

export default config;
```

This provides:

- TypeScript path mapping resolution (Vite native `resolve.tsconfigPaths`)
- Node environment (good for libraries, utilities)
- Clear mocks between tests

**For React components (need jsdom):**

```ts
// packages/ui-components/vitest.config.mts
import { mergeConfig } from 'vitest/config';

import projectConfig from '@fuf-stack/vitest-config/project';

export default mergeConfig(projectConfig, {
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
```

#### Migration from Vitest 3.x

1. **Root config**: Use `/workspace` import
2. **Package configs**: Use `/project` import (or customize with `mergeConfig`)
3. **Rename config files**: Change `.ts` → `.mts` (required for ESM-only packages)
4. Remove `vitest.workspace.ts` file
5. Ensure each package uses `defineProject()` (handled by `/project` config)

### Why `.mts` Extension?

This package is ESM-only (`"type": "module"`). When Vitest bundles config files:

- `.ts` files are ambiguous - bundlers may try `require()` ❌
- `.mts` explicitly declares ES Module - uses `import` ✅

Using `.ts` may result in errors like:

```
Error: Cannot use import statement outside a module
```

The `.mts` extension tells tooling to treat the file as an ES Module, allowing proper imports of ESM-only dependencies.

### Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

### License

MIT
