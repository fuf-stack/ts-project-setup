import { expect, it } from 'vitest';

import { binaryPath, run, versionOutputPattern } from './test-utils.js';

it('starts the bundled Commitlint executable', async () => {
  const result = await run(binaryPath('commitlint'), ['--version']);

  expect(result.stdout.trim()).toMatch(versionOutputPattern);
});
