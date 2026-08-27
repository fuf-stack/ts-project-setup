import { expect, it } from 'vitest';

import { binaryPath, run, versionOutputPattern } from './test-utils.js';

it('starts the bundled Turbo executable', async () => {
  const result = await run(binaryPath('turbo'), ['--version']);

  expect(result.stdout.trim()).toMatch(versionOutputPattern);
});
