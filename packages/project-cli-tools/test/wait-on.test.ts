import { expect, it } from 'vitest';

import { binaryPath, run } from './test-utils.js';

it('starts the bundled wait-on executable', async () => {
  const result = await run(binaryPath('wait-on'), ['--help']);

  expect(result.stdout).toContain('Usage: wait-on');
});
