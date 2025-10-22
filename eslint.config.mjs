/* eslint-disable import-x/no-extraneous-dependencies */

import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';

import react from '@fuf-stack/eslint-config-fuf/react';
import vitest from '@fuf-stack/eslint-config-fuf/vitest';

const gitignorePath = path.resolve('.', '.gitignore');

export default [
  // Ignore .gitignore files/folder in eslint
  includeIgnoreFile(gitignorePath),

  // Project configs
  ...react,
  ...vitest,

  // Fixtures in eslint-config-fuf: do not remove unused eslint-disable comments
  {
    files: ['packages/eslint-config-fuf/test/fixtures/**'],
    linterOptions: { reportUnusedDisableDirectives: 'off' },
  },
];
