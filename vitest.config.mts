import { mergeConfig } from 'vitest/config';

import config from '@fuf-stack/vitest-config/workspace';

export default mergeConfig(config, {
  test: {
    coverage: {
      // ESLint presets are published from the package root rather than src/.
      include: [
        'packages/eslint-config-fuf/*.mjs',
        'packages/eslint-config-fuf/fuf/**/*.mjs',
      ],
    },
  },
});
