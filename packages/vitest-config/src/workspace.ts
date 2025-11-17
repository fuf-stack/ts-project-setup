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
 */
export default defineConfig({
  test: {
    // Define projects array (replaces vitest.workspace.ts in Vitest 4.0)
    // This tells Vitest to look for test files in packages and apps directories
    projects: ['apps/*', 'packages/*', 'packages/config/*'],

    // Coverage configuration
    coverage: {
      // Explicitly include source files for coverage analysis
      // (required in Vitest 4.0 - no longer automatic)
      include: [
        'apps/*/src/**/*.{js,jsx,ts,tsx}',
        'packages/*/src/**/*.{js,jsx,ts,tsx}',
      ],

      // Exclude files that shouldn't be included in coverage reports
      exclude: [
        '**/__generated__/**', // Auto-generated code
        '**/__mocks__/**', // Mock implementations
        '**/*.spec.{js,ts,tsx}', // Test files
        '**/*.stories.{js,ts,tsx}', // Storybook stories
        '**/*.test.{js,ts,tsx}', // Test files
        'packages/config/**', // Configuration packages
      ],

      // Use V8 coverage provider (fast and accurate)
      provider: 'v8',

      // Generate LCOV report for CI tools and coverage services
      reporter: ['lcov'],
    },
  },
});
