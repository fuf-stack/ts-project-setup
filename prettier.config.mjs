import createConfig from '@fuf-stack/eslint-config-fuf/prettier';

export default createConfig({
  projectImportOrderGroups: ['^@fuf-stack/(.*)$'],
  // INFO: just for astro testing
  enableAstro: true,

  // INFO: just for php testing
  enablePhp: true,
  // TODO: maybe set to 'auto' again
  // see: packages/eslint-config-fuf/test/fixtures/prettier-php-parentheses-in-functions.php
  phpVersion: '8.3',

  // INFO: just for tailwind testing
  tailwindAdditionalFunctions: ['additionalTailwindFunction'],
  tailwindStylesheet: 'packages/eslint-config-fuf/test/tailwind-v4.css',
});
