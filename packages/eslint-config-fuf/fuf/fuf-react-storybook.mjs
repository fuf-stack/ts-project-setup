// TODO: use eslint-plugin-storybook rules here perhaps?

export default {
  name: 'fuf/react-storybook',
  rules: {
    // do not enforce production dependencies in stories
    'import-x/no-extraneous-dependencies': 'off',

    // allow prop spreading in stories
    'react/jsx-props-no-spreading': 'off',
  },
};
