import react from '@fuf-stack/eslint-config-fuf/react';
import vitest from '@fuf-stack/eslint-config-fuf/vitest';

export default [
  { ignores: ['dist/**', 'eslint.config.mjs', 'node_modules/**'] },
  ...react,
  ...vitest,
];
