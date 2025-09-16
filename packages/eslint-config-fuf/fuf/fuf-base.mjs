export default {
  name: 'fuf/base',
  rules: {
    // default rules (js)

    // redwood rules
    // see: https://github.com/redwoodjs/redwood/blob/main/packages/eslint-config/shared.js
    // redwood-inspired defaults
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

    // always use braces and return in arrow functions
    // see: test/fixtures/base-arrow-fn-use-return.ts
    // see: https://eslint.org/docs/latest/rules/arrow-body-style
    'arrow-body-style': ['warn', 'always'],

    'comma-dangle': ['error', 'only-multiline'],

    // always use braces with return
    // see: test/fixtures/base-curly-always.ts
    // see: https://eslint.org/docs/latest/rules/curly
    curly: ['warn', 'all'],

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

    // we use prettier/prettier for formatting
    'prettier/prettier': 'warn',

    // these rules are conflicting with prettier/prettier in some cases,
    // so we turn them off
    'implicit-arrow-linebreak': 'off',
    // we use prettier-plugin-sort-imports
    'import-x/order': 'off',
    indent: 'off',

    // TODO: remove this once we migrate to v1.0.0
    // also turn off legacy import plugin rules if present upstream
    'no-underscore-dangle': 'off',
  },
};
