import type { JsonTestResults } from 'vitest/reporters';

import { execFile } from 'node:child_process';
import { mkdtemp, readFile, realpath, rm, symlink } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execute = promisify(execFile);
const require = createRequire(import.meta.url);
const vitestCli = path.join(
  path.dirname(require.resolve('vitest/package.json')),
  'vitest.mjs',
);
const rootNodeModules = fileURLToPath(
  new URL('../../../node_modules', import.meta.url),
);

export async function withTestProject(
  callback: (root: string) => Promise<void>,
) {
  const root = await realpath(
    await mkdtemp(path.join(tmpdir(), 'vitest-config-')),
  );
  try {
    // Reuse the installed toolchain; fixture projects need no dependency install.
    await symlink(rootNodeModules, path.join(root, 'node_modules'), 'dir');
    await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

export async function runVitest(root: string) {
  const reportPath = path.join(root, 'results.json');
  await execute(
    process.execPath,
    [
      vitestCli,
      'run',
      '--reporter=json',
      `--outputFile=${reportPath}`,
      '--coverage.enabled=false',
    ],
    {
      cwd: root,
      env: { ...process.env, CI: 'true' },
      timeout: 20_000,
    },
  );
  return JSON.parse(await readFile(reportPath, 'utf8')) as JsonTestResults;
}
