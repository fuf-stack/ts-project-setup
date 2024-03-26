/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

/** @type {import('prettier').Config} */
module.exports = {
  // prettier base settings
  singleQuote: true,
  trailingComma: 'all',

  // load plugins
  // see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1448996271
  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
  ],
  pluginSearchDirs: false,

  // see: https://github.com/ianvs/prettier-plugin-sort-imports
  importOrder: [
    // type imports
    '<TYPES>',
    '<TYPES>^[./]',
    '',
    // node builtin modules
    '<BUILTIN_MODULES>',
    '',
    // react imports
    '^react',
    '',
    // third party modules
    '<THIRD_PARTY_MODULES>',
    '',
    // workspace packages (example)
    // '^ex-(.*)$',
    // absolute imports from src imports
    '^(?!.*[.](css|jpg|jpeg|json|png|svg)$)src/__generated__/(.*)$',
    '',
    '^(?!.*[.](css|jpg|jpeg|json|png|svg)$)src/(.*)$',
    '',
    // relative imports
    '^(?!.*[.](css|jpg|jpeg|json|png|svg)$)[./].*$',
    '',
    // json imports
    '.json$',
    '',
    // image imports
    '.(jpg|jpeg|png|svg)$',
    '',
    // css imports
    '.css$',
    '',
  ],
  importOrderSortSpecifiers: true,
};
