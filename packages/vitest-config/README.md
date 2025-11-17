## @fuf-stack/vitest-config

Default Vitest configuration for Fröhlich ∧ Frei monorepos. Ships an opinionated `defineConfig` with coverage setup suitable for apps and packages.

**Compatible with Vitest 4.0+**

### What you get

- Sensible `test.coverage` defaults using the V8 provider
- Explicit coverage includes from `apps/*/src/**/*.{js,jsx,ts,tsx}` and `packages/*/src/**/*.{js,jsx,ts,tsx}`
- Excludes generated, mocks, story files, and test files from coverage
- `lcov` coverage reporter for CI tools

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

#### Monorepo Root Config

For Vitest 4.0, simply import and use the shared config in your root `vitest.config.ts`:

```ts
// vitest.config.ts (root)
import config from '@fuf-stack/vitest-config';

export default config;
```

This gives you:

- Projects array: `['apps/*', 'packages/*', 'packages/config/*']`
- Automatic TypeScript path mapping resolution (`vite-tsconfig-paths`)
- V8 coverage with sensible includes/excludes
- LCOV reporter

**Need to customize?** Use `mergeConfig`:

```ts
// vitest.config.ts (root)
import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from '@fuf-stack/vitest-config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      // Override projects if needed
      projects: ['packages/my-package'],
      // Add additional coverage excludes, etc.
    },
  }),
);
```

#### Package-Level Configs

Each package should use `defineProject()` and specify its own test environment:

```ts
// packages/your-package/vitest.config.ts
import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    clearMocks: true,
    environment: 'node', // or 'jsdom' for React components
    // Add package-specific settings here
  },
});
```

**Note:** In Vitest 4.0, each package must define its own `test.environment`. The root config should not override package-level settings.

#### Migration from Vitest 3.x

If you're upgrading from Vitest 3.x:

1. Remove `vitest.workspace.ts` - replaced by `projects` array in root config
2. Update package configs to use `defineProject()` instead of `defineConfig()`
3. Ensure each package sets its own `test.environment`
4. Coverage patterns are now explicitly defined (no automatic includes)

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
