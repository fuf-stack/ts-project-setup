/**
 * createConfig(options)
 *
 * Factory that returns a Prettier configuration aligned with Fröhlich ∧ Frei conventions.
 * It enables opinionated defaults, import sorting, and optional Astro/PHP/Tailwind support.
 *
 * Usage (ESM):
 *   // prettier.config.mjs
 *   import createConfig from '@fuf-stack/eslint-config-fuf/prettier';
 *   export default createConfig({
 *     enableAstro: false,
 *     enablePhp: false,
 *     tailwindConfig: './tailwind.config.ts',
 *     tailwindAdditionalFunctions: ['cn', 'classNames'],
 *     workspacePackagePrefix: '@your-org',
 *   });
 *
 * Parameters:
 * - options.enableAstro: boolean — include prettier-plugin-astro and configure parser for *.astro
 * - options.enablePhp: boolean — include @prettier/plugin-php and configure parser for *.php
 * - options.tailwindConfig: string | undefined — absolute/relative path to Tailwind config
 *   to enable class sorting
 * - options.tailwindAdditionalFunctions: string[] — additional function names that contain
 *   Tailwind class strings
 * - options.workspacePackagePrefix: string | undefined — monorepo scope to group internal
 *   packages in import order
 *
 * Returns:
 * - Prettier Config object (consumable by CLI and editor integrations)
 */
const createPrettierConfig = (options) => {
  const {
    enableAstro,
    enablePhp,
    tailwindConfig,
    tailwindAdditionalFunctions,
    workspacePackagePrefix,
  } = options || {};

  /** @type {import('prettier').Config} */
  return {
    // prettier base settings
    singleQuote: true,
    trailingComma: 'all',

    // load plugins
    // see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1448996271
    plugins: [
      '@ianvs/prettier-plugin-sort-imports',
      ...(enableAstro ? ['prettier-plugin-astro'] : []),
      ...(enablePhp ? ['@prettier/plugin-php'] : []),
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
      // vitest imports (in test files)
      '^vitest',
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

    overrides: [
      // prettier-plugin-astro
      // see: https://github.com/withastro/prettier-plugin-astro#recommended-configuration
      ...(enableAstro
        ? [
            {
              files: '*.astro',
              options: {
                parser: 'astro',
              },
            },
          ]
        : []),
      // @prettier/plugin-php
      // see: https://github.com/prettier/plugin-php#install
      ...(enablePhp
        ? [
            {
              files: '*.php',
              options: {
                parser: 'php',
              },
            },
          ]
        : []),

      {
        files: '*.typoscript',
        options: {
          parser: 'babel',
        },
      },
    ],

    // tailwind configuration
    ...(tailwindConfig
      ? {
          // see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss
          tailwindConfig,
          // see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
          tailwindFunctions: [
            'classNames',
            'cn',
            'tv',
            // additional tailwindAdditionalFunctions from options
            ...(tailwindAdditionalFunctions || []),
          ],
        }
      : {}),
  };
};

export default createPrettierConfig;
