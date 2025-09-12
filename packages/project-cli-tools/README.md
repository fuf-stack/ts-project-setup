## @fuf-stack/project-cli-tools

Shared CLI tool bundle commonly used across Fröhlich ∧ Frei monorepos. This package centralizes versions of popular developer CLIs so you can depend on a single package instead of many.

### Included tools

- **commitlint**: Conventional commit linting
- **commitizen**: Guided commit messages
- **husky**: Git hooks management
- **lint-staged**: Run linters on staged files
- **lerna-lite**: Versioning and publishing for monorepos
- **turbo**: High-performance build system
- **nodemon**: File-watching dev runner
- **wait-on**: Wait for files, ports, sockets, http(s)

### Install

```bash
# pnpm
pnpm add -D @fuf-stack/project-cli-tools

# npm
npm i -D @fuf-stack/project-cli-tools

# yarn
yarn add -D @fuf-stack/project-cli-tools
```

This package does not expose its own binaries or config; it aggregates the tools above as dependencies so you can use their CLIs directly.

### Basic setup snippets

- **Husky** (Git hooks)

```bash
pnpm dlx husky init
# creates .husky/pre-commit; example:
echo "pnpm lint-staged" > .husky/pre-commit
```

- **Commitlint** (conventional commits)

```bash
echo "export default { extends: ['@commitlint/config-conventional'] }" > commitlint.config.cjs
```

- **Commitizen** (guided commits)

```bash
# package.json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

- **Lint-staged** (run linters on staged files)

```json
// lint-staged.config.js
export default {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix"],
  "**/*": ["prettier --write"]
};
```

- **Turbo** (build/pipeline)

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "lint": {},
    "test": {}
  }
}
```

Use or adapt these snippets as needed for your project structure.

### License

MIT
