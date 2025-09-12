// see: https://github.com/veritem/eslint-plugin-vitest

import vitest from '@vitest/eslint-plugin';

export default [
  {
    name: 'fuf/vitest',
    plugins: { vitest },

    // configure file patterns for tests
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],

    // test file rules
    rules: {
      // recommended vitest rules
      ...vitest.configs.recommended.rules,

      // Turn off legacy import plugin rules if present upstream
      'import-x/extensions': 'off',
      'import/extensions': 'off',

      // Do not enforce production dependencies in tests
      'import/no-extraneous-dependencies': 'off',
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
];
