// TODO: migrate to v0.5.0 + (eslint 9)
// see: https://github.com/veritem/eslint-plugin-vitest

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
