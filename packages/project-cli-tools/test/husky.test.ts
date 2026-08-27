import { expect, it } from 'vitest';

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { binaryPath, run, withTemporaryDirectory } from './test-utils.js';

it('initializes hooks in a disposable Git repository', async () => {
  await withTemporaryDirectory('project-cli-tools-husky-', async (root) => {
    await writeFile(
      path.join(root, 'package.json'),
      `${JSON.stringify({ name: 'husky-fixture', private: true }, null, 2)}\n`,
    );
    await run('git', ['init', '--initial-branch=main'], root);

    await run(binaryPath('husky'), ['init'], root);

    await expect(
      readFile(path.join(root, '.husky', 'pre-commit'), 'utf8'),
    ).resolves.toContain('npm test');
  });
});
