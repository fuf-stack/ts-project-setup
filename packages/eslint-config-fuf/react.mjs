import { fixupPluginRules } from '@eslint/compat';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';

import baseConfig from './base.mjs';
import fufStorybook from './fuf/fuf-react-storybook.mjs';
import fufReact from './fuf/fuf-react.mjs';

export default [
  // Register React-related plugins explicitly for flat config resolution
  {
    name: 'fuf/react/plugins',

    // TODO:ESLint v10 removed/deprecated parts of the legacy rule context API that some plugin rules
    // still use internally (for example code paths that expect old `context` helpers). Without
    // this compatibility wrapper, those rules can crash at runtime with errors like:
    // `contextOrFilename.getFilename is not a function`.
    //
    // `fixupPluginRules(...)` from `@eslint/compat` patches rule modules to work with the current
    // API shape and lets us keep the existing rule set enabled while upstream plugins complete
    // their native v10 migration.
    //
    // Important in this package: we do not import `eslint-plugin-*` directly anymore. We consume
    // plugin objects exposed by `eslint-config-airbnb-extended`, so our effective compatibility is
    // gated by `eslint-config-airbnb-extended` updates.
    //
    // Version snapshot when introducing this fix (from lockfile):
    // - eslint: 10.3.0
    // - @eslint/compat: 2.1.0
    // - eslint-config-airbnb-extended: 3.1.0
    //
    // Release pages / migration references:
    // - ESLint v10 migration guide: https://eslint.org/docs/latest/use/migrate-to-10.0.0
    // - ESLint releases: https://github.com/eslint/eslint/releases
    // - @eslint/compat releases: https://github.com/eslint/rewrite/releases
    // - Airbnb Extended v3 migration: https://eslint-airbnb-extended.nishargshah.dev/migration/upgrade-to-v3
    //   (plugins are bundled and exposed via `eslint-config-airbnb-extended` exports)
    // - Airbnb Extended releases: https://github.com/eslint-config/airbnb-extended/releases
    //
    // Removal condition: wait for a new `eslint-config-airbnb-extended` release that is compatible
    // with ESLint v10 without this shim. Then remove `fixupPluginRules(...)` and confirm tests pass.
    plugins: {
      react: fixupPluginRules(plugins.react.plugins.react),
      'react-hooks': fixupPluginRules(plugins.reactHooks.plugins['react-hooks']),
      'jsx-a11y': fixupPluginRules(plugins.reactA11y.plugins['jsx-a11y']),
    },
  },

  // Airbnb React Recommended Config
  ...configs.react.recommended,
  // Airbnb React TypeScript Config
  ...configs.react.typescript,
  // Strict React Config
  rules.react.strict,

  // Ensure FUF base rules have final precedence over upstream configs
  ...baseConfig,

  // FUF React Config must come after base to override rules for React files
  fufReact,
  // FUF Storybook Config must come after base to override rules for story files
  fufStorybook,
];
