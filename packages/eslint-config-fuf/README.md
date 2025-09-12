# @fuf-stack/eslint-config-fuf

Opinionated Fröhlich ∧ Frei ESLint + Prettier configuration for JavaScript/TypeScript projects, with optional React, Storybook, Vitest and Tailwind CSS integrations.

- **Base**: Airbnb base, ESLint recommended, Prettier and Fröhlich ∧ Frei defaults
- **TypeScript**: `@typescript-eslint` with sensible rules and type-aware parsing
- **React**: Airbnb React + Hooks, JSX runtime, Storybook overrides
- **Vitest**: Linting for test files
- **Prettier**: Import sorting, optional Astro/PHP support, and Tailwind class sorting

## Install

Choose a package manager.

```bash
# pnpm
pnpm add -D @fuf-stack/eslint-config-fuf

# npm
npm i -D @fuf-stack/eslint-config-fuf

# yarn
yarn add -D @fuf-stack/eslint-config-fuf
```

This package bundles the required peer tooling (eslint, prettier, plugins) so you do not need to install them separately.

Migrating to v1.0.0 (ESLint 9 flat config)? See MIGRATION.md in this package.

## Usage

Create an ESLint config that extends one of the provided entry points.

### Base (Node/JS/TS) — Flat config (ESLint 9)

```js
// eslint.config.mjs
import base from '@fuf-stack/eslint-config-fuf/base';

export default [...base];
```

### React (JS/TS + React + Storybook overrides) — Flat config (ESLint 9)

```js
// eslint.config.mjs
import react from '@fuf-stack/eslint-config-fuf/react';

export default [...react];
```

### Vitest (test files only)

If you want Vitest rules for test files, add the vitest config after your base/react config:

```js
// eslint.config.mjs
import react from '@fuf-stack/eslint-config-fuf/react';
import vitest from '@fuf-stack/eslint-config-fuf/vitest';

export default [...react, ...vitest];
```

Notes:

- TypeScript files use `@typescript-eslint/parser` with `parserOptions.project: './tsconfig.eslint.json'`. Create a `tsconfig.eslint.json` that references your main tsconfig.

Example `tsconfig.eslint.json`:

```json
{
  "extends": "@fuf-stack/typescript-config/base.json",
  "include": ["src", "test", "*.config.*"]
}
```

## What’s inside

- `base` composes: Airbnb base via `eslint-config-airbnb-extended` + Fröhlich ∧ Frei base/ts rules ([docs](https://github.com/NishargShah/eslint-config-airbnb-extended))
- `react` composes: Airbnb react + hooks via `eslint-config-airbnb-extended` + jsx-runtime + Fröhlich ∧ Frei base/react/ts rules; Storybook overrides for `*.stories.ts(x)`
- `vitest` extends: `plugin:vitest/recommended` for `*.spec|test.ts(x)` and relaxes `import/no-extraneous-dependencies` in tests
- Fröhlich ∧ Frei rules include:
  - Allow leading underscore for intentionally unused vars
  - Enforce arrow-function components; default props via function default args
  - Consistent type-only imports; import extensions off for ts/tsx/js/jsx (`import-x`)
  - Prettier formatting as the single source of truth

## Prettier configuration helper

This package also exports a small helper to generate a Prettier config with import sorting and optional plugins (Astro, PHP, Tailwind).

Create `prettier.config.mjs` and call the factory (ESM):

```js
// prettier.config.mjs
import createConfig from '@fuf-stack/eslint-config-fuf/prettier';

export default createConfig({
  // Enable Astro support
  enableAstro: false,
  // Enable PHP support
  enablePhp: false,
  // Absolute path to your Tailwind config to enable Tailwind class sorting
  // e.g. './tailwind.config.ts' or './tailwind.config.js'
  tailwindConfig: undefined,
  // Additional function names that contain Tailwind classes (besides classNames, cn, tv)
  tailwindAdditionalFunctions: [],
  // If using a monorepo, group internal packages (e.g. "@acme/") as a separate block in import order
  workspacePackagePrefix: undefined,
});
```

Highlights:

- Import sorting powered by `@ianvs/prettier-plugin-sort-imports` with opinionated groups (types, vitest, builtins, react, third-party, monorepo packages, `src/**`, relative, assets)
- Optional Tailwind class sorting via `prettier-plugin-tailwindcss` (plugin must be last)
- Optional `prettier-plugin-astro` and `@prettier/plugin-php`

## Scripts

Typical scripts:

```json
{
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier . --write"
}
```

### License

MIT
