## @fuf-stack/vitest-config

Default Vitest configuration for Fröhlich ∧ Frei monorepos. Ships an opinionated `defineConfig` with coverage setup suitable for apps and packages.

### What you get

- Sensible `test.coverage` defaults using the V8 provider
- Includes coverage from `apps/*/src/**/*.{js,jsx,ts,tsx}` and `packages/*/src/**/*.{js,jsx,ts,tsx}`
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

Create a `vitest.config.ts` and re-export the preset:

```ts
// vitest.config.ts
import config from '@fuf-stack/vitest-config';

export default config;
```

Or merge with project-specific options:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from '@fuf-stack/vitest-config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      // your overrides here
      reporters: ['default', 'junit'],
    },
  }),
);
```

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
