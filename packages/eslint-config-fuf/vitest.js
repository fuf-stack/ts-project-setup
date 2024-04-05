module.exports = {
  plugins: ['vitest'],
  overrides: [
    // test file rules
    {
      files: ['*.spec.ts', '*.test.ts'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
