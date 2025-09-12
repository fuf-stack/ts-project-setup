/* eslint-disable import/no-extraneous-dependencies */

import createConfig from '@fuf-stack/eslint-config-fuf/prettier';

export default createConfig({
  // INFO: just for testing
  enableAstro: true,
  enablePhp: true,
  tailwindConfig: 'packages/eslint-config-fuf/test/tailwind.config.ts',
  // INFO: just for testing
  tailwindAdditionalFunctions: ['additionalTailwindFunction'],
  workspacePackagePrefix: '@fuf-stack',
});
