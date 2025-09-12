import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Set global timeout to 20 seconds
    testTimeout: 20000,
    coverage: {
      include: [
        'apps/*/src/**/*.{js,jsx,ts,tsx}',
        'packages/*/src/**/*.{js,jsx,ts,tsx}',
      ],
      exclude: [
        '**/__generated__/**',
        '**/__mocks__/**',
        '**/*.spec.{js,ts,tsx}',
        '**/*.stories.{js,ts,tsx}',
        '**/*.test.{js,ts,tsx}',
        'packages/config/**',
      ],
      provider: 'v8',
      reporter: ['lcov'],
    },
  },
});
