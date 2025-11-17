import { defineConfig } from 'vitest/config';

/**
 * Default Vitest configuration for Fröhlich ∧ Frei monorepos
 *
 * Compatible with Vitest 4.0+
 *
 * Features:
 * - Projects array for monorepo structure (replaces vitest.workspace.ts)
 * - V8 coverage provider with explicit include patterns
 * - Sensible exclusions for generated files, mocks, and test files
 * - LCOV reporter for CI integration
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
        // Auto-generated code
        '**/__generated__/**',
        // Mock implementations
        '**/__mocks__/**',
         // Test files
        '**/*.spec.{js,ts,tsx}',
        // Storybook stories
        '**/*.stories.{js,ts,tsx}',
        // Test files
        '**/*.test.{js,ts,tsx}',
        // Configuration packages
        'packages/config/**',
      ],

      // Use V8 coverage provider (fast and accurate)
      provider: 'v8',

      // Generate LCOV report for CI tools and coverage services
      reporter: ['lcov'],
    },
  },
});
