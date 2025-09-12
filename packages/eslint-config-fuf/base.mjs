import { configs } from 'eslint-config-airbnb-extended/legacy';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

import fufBase from './fuf/fuf-base.mjs';
import fufTypescript from './fuf/fuf-typescript.mjs';

export default [
  // Airbnb base + Prettier compatible rules (currently legacy)
  // see: https://eslint-airbnb-extended.nishargshah.dev/config/legacy-config
  ...configs.base.recommended,
  ...configs.react.hooks,
  ...configs.base.typescript,

  // Reset rules that are conflicting with Prettier
  // see https://github.com/prettier/eslint-config-prettier
  eslintConfigPrettier,

  // Fuf base and typescript rules
  fufBase,
  fufTypescript,
];
