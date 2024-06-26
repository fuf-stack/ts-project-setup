module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:prettier/recommended',
    require.resolve('./fuf/fuf-base.js'),
  ],
  plugins: ['import', 'prettier'],
  rules: {},

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
        require.resolve('./fuf/fuf-typescript.js'),
      ],
      rules: {},
    },
  ],
};
