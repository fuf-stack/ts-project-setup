import { execFile } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execute = promisify(execFile);
const packageDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

export function binaryPath(name: string): string {
  return path.join(packageDirectory, 'node_modules', '.bin', name);
}

// Check CLI contracts without coupling tests to the currently pinned versions.
// Renovate upgrades should pass without requiring mechanical test edits.
export const versionOutputPattern =
  /(?:^|@)v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;

export async function run(
  command: string,
  arguments_: string[],
  cwd = packageDirectory,
) {
  return execute(command, arguments_, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, CI: 'true' },
    timeout: 15_000,
  });
}

export async function withTemporaryDirectory<T>(
  prefix: string,
  callback: (directory: string) => Promise<T>,
): Promise<T> {
  const directory = await mkdtemp(path.join(tmpdir(), prefix));

  try {
    return await callback(directory);
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
}
