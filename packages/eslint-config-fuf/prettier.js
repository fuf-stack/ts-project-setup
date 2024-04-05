/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = (options) => {
  const tailwindConfig = options && options.tailwindConfig;
  const workspacePackagePrefix = options && options.workspacePackagePrefix;

  /** @type {import('prettier').Config} */
  return {
    // prettier base settings
    singleQuote: true,
    trailingComma: 'all',

    // load plugins
    // see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1448996271
    plugins: [
      require.resolve('@ianvs/prettier-plugin-sort-imports'),
      // tailwind MUST come last
      ...(tailwindConfig ? ['prettier-plugin-tailwindcss'] : []),
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

      // septate workspace packages block when workspacePackagePrefix defined
      ...(workspacePackagePrefix
        ? [`^${workspacePackagePrefix}(.*)$`, '']
        : []),

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

    // tailwind configuration
    ...(tailwindConfig
      ? {
          // see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss
          tailwindConfig,
          // see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
          tailwindFunctions: ['classNames', 'tv'],
        }
      : {}),
  };
};
