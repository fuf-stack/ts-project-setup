import { expect, it } from 'vitest';

import { readFile } from 'node:fs/promises';

import { binaryPath, run } from './test-utils.js';

it('starts the bundled Commitizen executable', async () => {
  const result = await run(binaryPath('commitizen'), []);

  expect(result.stdout).toContain('Commitizen has two command line tools');
});

it.each(['cz', 'git-cz'])('links the interactive %s alias', async (alias) => {
  // Running these aliases would open an interactive commit prompt. Comparing
  // the pnpm shim targets verifies the package wiring without hanging CI.
  const shim = await readFile(binaryPath(alias), 'utf8');

  expect(shim).toContain('commitizen/bin/git-cz');
});
