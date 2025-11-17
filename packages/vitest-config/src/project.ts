import { defineProject } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Project-level Vitest configuration for individual packages
 *
 * Compatible with Vitest 4.0+
 *
 * Provides sensible defaults for individual packages including:
 * - Automatic TypeScript path mapping resolution
 * - Node environment (override with mergeConfig if you need jsdom)
 * - Clear mocks between tests
 *
 * @example
 * ```ts
 * // packages/my-package/vitest.config.ts
 * import config from '@fuf-stack/vitest-config/project';
 * export default config;
 * ```
 *
 * @example
 * ```ts
 * // For React components that need jsdom:
 * import { mergeConfig } from 'vitest/config';
 * import baseConfig from '@fuf-stack/vitest-config/project';
 *
 * export default mergeConfig(baseConfig, {
 *   test: {
 *     environment: 'jsdom',
 *     setupFiles: ['./vitest.setup.ts'],
 *   },
 * });
 * ```
 */
export default defineProject({
  plugins: [
    // Automatically resolve TypeScript path mappings from tsconfig.json
    tsconfigPaths(),
  ],
  test: {
    // Default to Node environment (override for React/browser packages)
    environment: 'node',

    // Clear mocks between tests for better isolation
    clearMocks: true,
  },
});
