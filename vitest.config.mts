import { mergeConfig } from 'vitest/config';

import local from '@fuf-stack/vitest-config/workspace';
import github from '@fuf-stack/vitest-config/workspace/github';

const base = process.env.GITHUB_ACTIONS === 'true' ? github : local;

export default mergeConfig(base, {
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
