module.exports = {
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ['import', 'prettier'],

  // default rules (js)
  rules: {
    // redwood rules
    // see: https://github.com/redwoodjs/redwood/blob/main/packages/eslint-config/shared.js
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
    'no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],

    // fuf rules
    'comma-dangle': ['error', 'only-multiline'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/named': 'off',
    // we use prettier-plugin-sort-imports
    'import/order': 'off',
    'no-underscore-dangle': 'off',
  },

  overrides: [
    // ts rules
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/ban-types': 'warn',

        '@typescript-eslint/camelcase': 'off',
        camelcase: 'off',

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/indent': 'warn',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-var-requires': 'off',

        '@typescript-eslint/no-empty-function': 'off',
        'no-empty-function': 'off',

        '@typescript-eslint/no-use-before-define': 'off',
        'no-use-before-define': 'off',

        // use separate type imports
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
      },
    },

    // test file rules
    {
      files: ['*.spec.ts', '*.test.ts'],
      // "extends": ["plugin:vitest/recommended"],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
