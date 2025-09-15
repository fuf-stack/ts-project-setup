export default {
  name: 'fuf/react',
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  rules: {
    // Enforce arrow-function function type for function components
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // prefer shorthand fragments
    // see: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
    'react/jsx-fragments': ['warn', 'syntax'],

    // modern JSX transform doesn't require React to be in scope
    'react/react-in-jsx-scope': 'off',

    // define defaultProps as ts defaults in function components
    // see: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md#rule-options
    'react/require-default-props': ['warn', { functions: 'defaultArguments' }],
  },
};
