import { configs, rules } from 'eslint-config-airbnb-extended';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import baseConfig from './base.mjs';
import fufStorybook from './fuf/fuf-react-storybook.mjs';
import fufReact from './fuf/fuf-react.mjs';

export default [
  // Base Config
  ...baseConfig,

  // Register React-related plugins explicitly for flat config resolution
  {
    name: 'fuf/react/plugins',
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
  },

  // Airbnb React Recommended Config
  ...configs.react.recommended,
  // Airbnb React TypeScript Config
  ...configs.react.typescript,
  // Strict React Config
  rules.react.strict,

  // FUF React Configs
  fufReact,
  fufStorybook,
];
