module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:prettier/recommended',

    // do not require React to be in scope
    // see: https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports
    'plugin:react/jsx-runtime',

    // add fuf rules
    require.resolve('./fuf/fuf-base.js'),
    require.resolve('./fuf/fuf-react.js'),
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
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        require.resolve('./fuf/fuf-typescript.js'),
      ],
      rules: {},
    },

    // storybook rules
    {
      files: ['*.stories.ts', '*.stories.tsx'],
      extends: [
        'plugin:storybook/recommended',
        require.resolve('./fuf/fuf-react-storybook.js'),
      ],
      rules: {},
    },
  ],
};
