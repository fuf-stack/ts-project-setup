import { defineConfig } from 'vitest/config';

/**
 * Workspace-level Vitest configuration for monorepo root
 *
 * Compatible with Vitest 4.0+
 *
 * Use this in your root vitest.config.ts to define:
 * - Projects array (replaces vitest.workspace.ts)
 * - Coverage settings for the entire workspace
 *
 * @example
 * ```ts
 * // vitest.config.ts (root)
 * import config from '@fuf-stack/vitest-config/workspace';
 * export default config;
 * ```
 *
 * @example
 * ```ts
 * // Extend with mergeConfig: arrays (projects, coverage include/exclude)
 * // are appended to the defaults, never replaced.
 * import { mergeConfig } from 'vitest/config';
 * import config from '@fuf-stack/vitest-config/workspace';
 *
 * export default mergeConfig(config, {
 *   test: {
 *     projects: [{ test: { name: 'scripts', include: ['scripts/**\/*.test.mjs'] } }],
 *     coverage: { include: ['scripts/**\/*.mjs'] },
 *   },
 * });
 * ```
 */
export default defineConfig({
  test: {
    // Define projects array (replaces vitest.workspace.ts in Vitest 4.0)
    // packages/config only groups packages; treating it as a project runs their tests twice.
    projects: ['apps/*', 'packages/!(config)', 'packages/config/*'],

    // Coverage configuration
    coverage: {
      // Explicitly include source files for coverage analysis
      // (required in Vitest 4.0 - no longer automatic)
      include: [
        'apps/*/src/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
        'packages/*/src/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      ],

      // Exclude files that shouldn't be included in coverage reports.
      // Patterns are workspace-wide, so extra includes (e.g. `scripts/**`)
      // added via `mergeConfig` don't need their own test excludes.
      exclude: [
        '**/__generated__/**', // Auto-generated code
        '**/__mocks__/**', // Mock implementations
        '**/*.spec.{js,mjs,cjs,jsx,ts,mts,cts,tsx}', // Test files
        '**/*.stories.{js,mjs,jsx,ts,mts,tsx}', // Storybook stories
        '**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}', // Test files
        'packages/config/**', // Configuration packages
      ],

      // Use V8 coverage provider (fast and accurate)
      provider: 'v8',

      // Generate LCOV report for CI tools and coverage services
      reporter: ['lcov'],
    },
  },
});
