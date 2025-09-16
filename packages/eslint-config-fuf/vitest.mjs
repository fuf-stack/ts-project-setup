// see: https://github.com/veritem/eslint-plugin-vitest

import vitest from '@vitest/eslint-plugin';

import fufVitest from './fuf/fuf-vitest.mjs';

export default [
  // Vitest recommended rules
  {
    name: 'vitest/recommended',
    plugins: { vitest },
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
    rules: vitest.configs.recommended.rules,
  },

  // FUF Vitest Config
  fufVitest,
];
