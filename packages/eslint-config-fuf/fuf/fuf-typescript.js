module.exports = {
  rules: {
    // ts rules

    '@typescript-eslint/ban-types': 'warn',

    '@typescript-eslint/camelcase': 'off',
    camelcase: 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // we use prettier/prettier for indentation fix
    '@typescript-eslint/indent': 'off',

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
};
