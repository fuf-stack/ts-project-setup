## @fuf-stack/vitest-config

Default Vitest configurations for Fröhlich ∧ Frei monorepos. Provides separate configs for workspace-level (root) and project-level (package) setups.

**Compatible with Vitest 4.0+**

### Configs Available

**Workspace Config** (`/workspace`) - For monorepo root:

- Projects array defining workspace structure
- V8 coverage with explicit includes/excludes
- LCOV reporter for CI tools

**Project Config** (`/project`) - For individual packages:

- TypeScript path mapping resolution
- Node environment by default
- Clear mocks between tests

### Install

```bash
# pnpm
pnpm add -D @fuf-stack/vitest-config vitest @vitest/coverage-v8 vite-tsconfig-paths

# npm
npm i -D @fuf-stack/vitest-config vitest @vitest/coverage-v8 vite-tsconfig-paths

# yarn
yarn add -D @fuf-stack/vitest-config vitest @vitest/coverage-v8 vite-tsconfig-paths
```

### Usage

#### Workspace Root Config

Use the workspace config in your monorepo root `vitest.config.ts`:

```ts
// vitest.config.ts (root)
import config from '@fuf-stack/vitest-config/workspace';

export default config;
```

This provides:

- Projects array: `['apps/*', 'packages/*', 'packages/config/*']`
- Coverage configuration with sensible defaults
- LCOV reporter

**Customize if needed:**

```ts
import { defineConfig, mergeConfig } from 'vitest/config';

import workspaceConfig from '@fuf-stack/vitest-config/workspace';

export default mergeConfig(
  workspaceConfig,
  defineConfig({
    test: {
      projects: ['packages/my-specific-package'],
    },
  }),
);
```

#### Package-Level Configs

Use the project config in individual package `vitest.config.ts`:

```ts
// packages/my-package/vitest.config.ts
import config from '@fuf-stack/vitest-config/project';

export default config;
```

This provides:

- TypeScript path mapping resolution (`vite-tsconfig-paths`)
- Node environment (good for libraries, utilities)
- Clear mocks between tests

**For React components (need jsdom):**

```ts
// packages/ui-components/vitest.config.ts
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
3. Remove `vitest.workspace.ts` file
4. Ensure each package uses `defineProject()` (handled by `/project` config)

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
