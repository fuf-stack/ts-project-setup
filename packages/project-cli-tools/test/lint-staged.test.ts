import { expect, it } from 'vitest';

import { binaryPath, run, versionOutputPattern } from './test-utils.js';

it('starts the bundled lint-staged executable', async () => {
  const result = await run(binaryPath('lint-staged'), ['--version']);

  expect(result.stdout.trim()).toMatch(versionOutputPattern);
});
