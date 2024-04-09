module.exports = {
  plugins: ['vitest'],
  overrides: [
    // test file rules
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.test.ts', '*.test.tsx'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
