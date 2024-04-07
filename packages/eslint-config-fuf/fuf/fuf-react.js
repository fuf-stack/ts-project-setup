module.exports = {
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

    // define defaultProps as ts defaults in function components
    // see: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md#rule-options
    'react/require-default-props': ['warn', { functions: 'defaultArguments' }],
  },
};
