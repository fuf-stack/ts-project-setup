import { configs, plugins, rules } from 'eslint-config-airbnb-extended';

import baseConfig from './base.mjs';
import fufStorybook from './fuf/fuf-react-storybook.mjs';
import fufReact from './fuf/fuf-react.mjs';

export default [
  // Base Config
  ...baseConfig,

  // Airbnb Extended React Config
  // React Plugin
  plugins.react,
  // React Hooks Plugin
  plugins.reactHooks,
  // React JSX A11y Plugin
  plugins.reactA11y,
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
