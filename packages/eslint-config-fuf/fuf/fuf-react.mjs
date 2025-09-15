export default {
  name: 'fuf/react',
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  rules: {
    // Enforce arrow-function function type for function components
    // see: test/fixtures/react-function-component-definition.tsx
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // disable this rule as it conflicts with prettier/prettier
    // see: test/fixtures/react-jsx-disable-wrap-multiline.tsx
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-wrap-multilines': 'off',

    // prefer shorthand fragments
    // see: test/fixtures/react-prefer-shorthand-fragments.tsx
    // see: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
    'react/jsx-fragments': ['warn', 'syntax'],

    // modern JSX transform doesn't require React to be in scope
    'react/react-in-jsx-scope': 'off',

    // define defaultProps as ts defaults in function components
    // see: test/fixtures/react-function-component-default-props.tsx
    // see: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md#rule-options
    'react/require-default-props': ['warn', { functions: 'defaultArguments' }],
  },
};
