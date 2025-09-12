## @fuf-stack/typescript-config

TypeScript config presets for Fröhlich ∧ Frei projects. These JSON configs help standardize compiler options across apps and packages in a monorepo.

### Presets

- **base.json**: Strict defaults for libraries and packages (ESNext modules, Bundler resolution, declarations, strict type checking)
- **eslint.json**: Variant for ESLint parsing (`noEmit`, `allowJs`)
- **react-library.json**: Library-focused React settings (ESNext libs, target ES6, `jsx: react-jsx`)
- **react-vite-app.json**: App-focused React + Vite settings (ES2020 target, DOM libs, `jsx: react-jsx`, `noUnused*` enabled)

### Install

```bash
# pnpm
pnpm add -D @fuf-stack/typescript-config

# npm
npm i -D @fuf-stack/typescript-config

# yarn
yarn add -D @fuf-stack/typescript-config
```

### Usage

Reference a preset from your `tsconfig.json` files.

- Package/library

```json
{
  "extends": "@fuf-stack/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

- React app (Vite)

```json
{
  "extends": "@fuf-stack/typescript-config/react-vite-app.json",
  "include": ["src", "vite.config.ts"]
}
```

- React library

```json
{
  "extends": "@fuf-stack/typescript-config/react-library.json",
  "include": ["src"]
}
```

- ESLint-only config

```json
// tsconfig.eslint.json
{
  "extends": "@fuf-stack/typescript-config/eslint.json",
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".eslintrc.*",
    "prettier.config.*",
    "vite.config.*",
    "vitest.config.*",
    "vitest.workspace.*"
  ]
}
```

### Notes

- Presets use modern options like `module: ESNext` and `moduleResolution: Bundler` by default.
- Adjust `include`, `exclude`, and `paths` as needed per project.

### License

MIT
