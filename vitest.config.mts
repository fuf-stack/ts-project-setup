/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig, mergeConfig } from 'vitest/config';

import base from '@fuf-stack/vitest-config';

export default mergeConfig(
  base,
  defineConfig({
    // Set global timeout to 30 seconds
    test: { testTimeout: 30000 },
  }),
);
