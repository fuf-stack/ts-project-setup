import { configs } from 'eslint-config-airbnb-extended/legacy';

import fufBase from './fuf/fuf-base.mjs';
import fufTypescript from './fuf/fuf-typescript.mjs';

export default [
  // Airbnb base + Prettier compatible rules
  ...configs.base.recommended,
  // Fuf base rules
  fufBase,
  // TypeScript enhancements
  ...configs.base.typescript,
  // Fuf typescript rules
  fufTypescript,
];
