# Migration to @fuf-stack/eslint-config-fuf v1.0.0 (ESLint 9 Flat Config)

This guide explains how to migrate a project to `@fuf-stack/eslint-config-fuf` v1.0.0. This is a breaking release that switches from legacy `.eslintrc*` (ESLint 8) to ESLint 9 flat config.

References:

- Airbnb Extended config docs: https://github.com/NishargShah/eslint-config-airbnb-extended
- Flat config migration: https://eslint.org/docs/latest/use/configure/migration-guide

## 1) Create `eslint.config.mjs`

Pick the preset you need:

- Base (Node/JS/TS)

```js
import base from '@fuf-stack/eslint-config-fuf/base';

export default [
  { ignores: ['dist/**', 'eslint.config.mjs', 'node_modules/**'] },
  ...base,
];
```

- React

```js
import react from '@fuf-stack/eslint-config-fuf/react';

export default [
  { ignores: ['dist/**', 'eslint.config.mjs', 'node_modules/**'] },
  ...react,
];
```

- React + Vitest

```js
import react from '@fuf-stack/eslint-config-fuf/react';
import vitest from '@fuf-stack/eslint-config-fuf/vitest';

export default [
  { ignores: ['dist/**', 'eslint.config.mjs', 'node_modules/**'] },
  ...react,
  ...vitest,
];
```

## 2) Update custom rule names (import → import-x)

If you customized rules previously using `eslint-plugin-import`, rename them to `import-x/*`:

```diff
- 'import/no-unresolved': 'error'
+ 'import-x/no-unresolved': 'error'
```

## 3) Type-aware linting

Use only the root `tsconfig.json` for ESLint type-aware parsing. Move any extra includes there and delete `tsconfig.eslint.json`.

Recommended include entries to add to your root `tsconfig.json`:

- Add package flat-config files: `packages/eslint-config-fuf/**/*.mjs`
- If you use Vitest with ESM config: `vitest.config.mts`
- If you use a workspace Vitest file: `vitest.workspace.ts`

Example include list (root `tsconfig.json`):

```json
{
  "include": [
    "./**/*.ts",
    "./**/*.tsx",
    "vitest.config.mts",
    "vitest.workspace.ts"
  ]
}
```

## 4) Ignoring files

`.eslintignore` is not used by flat config. Add ignores in `eslint.config.mjs` and make sure the config file itself is ignored:

```js
export default [
  {
    ignores: ['dist/**', 'eslint.config.mjs', 'node_modules/**'],
  },
  // ... your configs
];
```

Also remove legacy ignore flags from your package scripts. In flat config, `--ignore-path .gitignore` (and similar) should be dropped so ESLint uses `eslint.config.mjs` only.

Example script change:

```diff
- "lint": "eslint --debug --ignore-path .gitignore ./packages",
+ "lint": "eslint ./packages",
- "fix": "eslint --debug --fix --ext .js --ignore-path .gitignore packages || true && prettier --write \"packages/**/*\"",
+ "fix": "eslint --fix packages && prettier --write \"packages/**/*\"",
```

## 5) Prettier

Prettier usage is unchanged. Generate a config with the helper:

```js
// prettier.config.mjs
import createConfig from '@fuf-stack/eslint-config-fuf/prettier';

export default createConfig({
  tailwindConfig: './tailwind.config.js',
  workspacePackagePrefix: '@your-org',
});
```

Rename your Prettier config if it was CommonJS or plain `.js`:

```diff
- prettier.config.js
+ prettier.config.mjs
```

## 6) React specifics

We disable `react/react-in-jsx-scope` for the modern JSX transform. If you rely on the old behavior, re-enable it in your config.

## 7) Storybook and tests

- Storybook overrides apply to `*.stories.ts(x)` files
- Vitest rules are applied to `*.{spec,test}.ts(x)` files

If you keep your Vitest config as ESM, prefer `.mts` and a flat export:

```ts
// vitest.config.mts
import config from '@fuf-stack/vitest-config';

export default config;
```

## 8) Run

```bash
pnpm eslint .
```

That’s it. See README for usage snippets and details.
