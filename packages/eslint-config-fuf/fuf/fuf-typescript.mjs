export default {
  name: 'fuf/typescript',
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    // ts rules

    // removed deprecated rules
    camelcase: 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    '@typescript-eslint/no-empty-function': 'off',
    'no-empty-function': 'off',

    '@typescript-eslint/no-use-before-define': 'off',
    'no-use-before-define': 'off',

    // use separate type imports
    '@typescript-eslint/consistent-type-imports': 'error',

    // allow unused variables with _ prefix
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['function', 'variable'],
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
  },
};
