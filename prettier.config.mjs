/* eslint-disable import/no-extraneous-dependencies */

import createConfig from '@fuf-stack/eslint-config-fuf/prettier';

export default createConfig({
  workspacePackagePrefix: '@fuf-stack',
  // INFO: just for astro and php testing
  enableAstro: true,
  enablePhp: true,
  // INFO: just for tailwind testing
  tailwindAdditionalFunctions: ['additionalTailwindFunction'],
  tailwindStylesheet: 'packages/eslint-config-fuf/test/tailwind-v4.css',
});
