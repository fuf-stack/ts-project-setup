/* eslint-disable import/no-extraneous-dependencies */

const prettierConfig = require('@fuf-stack/eslint-config-fuf-base/prettier');

/** @type {import('prettier').Config} */
module.exports = prettierConfig({
  // INFO: just for testing
  tailwindConfig: 'packages/eslint-config-fuf-base/test/tailwind.config.js',
  workspacePackagePrefix: '@fuf-stack',
});
