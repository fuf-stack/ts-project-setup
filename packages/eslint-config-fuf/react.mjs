import { configs } from 'eslint-config-airbnb-extended/legacy';

import fufBase from './fuf/fuf-base.mjs';
import fufStorybook from './fuf/fuf-react-storybook.mjs';
import fufReact from './fuf/fuf-react.mjs';
import fufTypescript from './fuf/fuf-typescript.mjs';

export default [
  // Airbnb recommended + hooks + jsx-runtime
  ...configs.react.recommended,
  ...configs.react.hooks,
  fufBase,
  fufReact,
  // TypeScript enhancements
  ...configs.react.typescript,
  fufTypescript,
  {
    files: ['**/*.stories.ts', '**/*.stories.tsx'],
    ...fufStorybook,
  },
];
