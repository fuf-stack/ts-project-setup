import importX from 'eslint-plugin-import-x';
import prettier from 'eslint-plugin-prettier';

export default {
  name: 'fuf/base',
  plugins: {
    prettier,
    'import-x': importX,
  },
  languageOptions: {
    parserOptions: {
      // ensure ESM project handling doesn't trigger legacy parser issues
      sourceType: 'module',
    },
  },
  rules: {
    // default rules (js)

    // redwood rules
    // see: https://github.com/redwoodjs/redwood/blob/main/packages/eslint-config/shared.js
    // redwood-inspired defaults
    'prettier/prettier': 'warn',
    'no-console': 'off',
    'prefer-object-spread': 'warn',
    'prefer-spread': 'warn',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-useless-escape': 'off',
    camelcase: ['warn', { properties: 'never' }],
    'no-new': 'warn',
    'new-cap': ['error', { newIsCap: true, capIsNew: false }],

    // allow unused variables with _ prefix
    'no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],

    // fuf rules
    'comma-dangle': ['error', 'only-multiline'],
    // we use prettier/prettier for indentation
    indent: 'off',
    'import-x/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import-x/named': 'off',
    // we use prettier-plugin-sort-imports
    'import-x/order': 'off',

    // TODO: remove this once we migrate to v1.0.0
    // also turn off legacy import plugin rules if present upstream
    'import/extensions': 'off',
    'import/named': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'import/no-cycle': 'off',
    'no-underscore-dangle': 'off',
  },
};
