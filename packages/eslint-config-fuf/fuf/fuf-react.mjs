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

    // Disable unified-signatures rule due to bug in @typescript-eslint/eslint-plugin@8.46.3
    // The rule crashes with "TypeError: typeParameters.params is not iterable" when processing
    // React functional components with destructured props (e.g., `const Component = ({ prop }: Props) => ...`).
    // This occurs because the rule attempts to iterate over typeParameters.params without checking
    // if it exists or is iterable first. The rule can still work fine for non-React TypeScript code.
    // Bug confirmed to still exist in 8.46.3. No open issues found as of 2025-11-05.
    // Report at: https://github.com/typescript-eslint/typescript-eslint/issues
    '@typescript-eslint/unified-signatures': 'off',
  },
};
