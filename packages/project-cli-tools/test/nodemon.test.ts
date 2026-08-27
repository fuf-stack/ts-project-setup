import { expect, it } from 'vitest';

import { binaryPath, run, versionOutputPattern } from './test-utils.js';

it('starts the bundled Nodemon executable', async () => {
  const result = await run(binaryPath('nodemon'), ['--version']);

  expect(result.stdout.trim()).toMatch(versionOutputPattern);
});
