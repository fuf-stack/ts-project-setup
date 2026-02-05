export default {
  name: 'fuf/vitest',
  files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
  rules: {
    // Enforce body style for arrow functions as needed in tests
    // see: test/fixtures/vitest-arrow-body-style-as-needed.test.ts
    // see: https://eslint.org/docs/latest/rules/arrow-body-style
    'arrow-body-style': ['warn', 'as-needed'],

    // Turn off legacy import plugin rules if present upstream
    'import-x/extensions': 'off',
    'import/extensions': 'off',

    // Do not enforce production dependencies in tests
    'import/no-extraneous-dependencies': 'off',
    'import-x/no-extraneous-dependencies': 'off',

    // Allow namespace imports in tests
    'import-x/no-namespace': 'off',
  },
};
