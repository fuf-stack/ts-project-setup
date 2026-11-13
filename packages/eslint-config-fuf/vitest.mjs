// see: https://github.com/veritem/eslint-plugin-vitest

import vitest from '@vitest/eslint-plugin';

import fufVitest, { configFiles, testFiles } from './fuf/fuf-vitest.mjs';

export default [
  // Vitest recommended rules
  {
    name: 'vitest/recommended',
    plugins: { vitest },
    files: testFiles,
    rules: vitest.configs.recommended.rules,
  },

  // FUF Vitest Config
  fufVitest,

  // Vitest config files
  {
    name: 'fuf/vitest-config-files',
    files: configFiles,
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
];
