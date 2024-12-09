/* eslint-disable import/no-extraneous-dependencies */

const prettierConfig = require('@fuf-stack/eslint-config-fuf/prettier');

/** @type {import('prettier').Config} */
module.exports = prettierConfig({
  // INFO: just for testing
  enableAstro: true,
  enablePhp: true,
  tailwindConfig: 'packages/eslint-config-fuf/test/tailwind.config.ts',
  // INFO: just for testing
  tailwindAdditionalFunctions: ['additionalTailwindFunction'],
  workspacePackagePrefix: '@fuf-stack',
});
