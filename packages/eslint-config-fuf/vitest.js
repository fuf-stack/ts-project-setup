module.exports = {
  plugins: ['vitest'],
  overrides: [
    // test file rules
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.test.ts', '*.test.tsx'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        // Do not enforce production dependencies in tests
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
