import { expect, test } from 'vitest';

import { dirname as pathDirname, join as pathJoin } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';

import {
  errorMessages,
  errorSnapshotPath,
  getFixtureList,
  lintFixture,
  snapshotPath,
} from './helper';

const currentDir = pathDirname(fileURLToPath(import.meta.url));

const fixtures = getFixtureList('vitest-');

test.for(fixtures)('%s', async (fixture) => {
  const { fixedContent, results } = await lintFixture(
    fixture,
    'vitest.config.mjs',
  );
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
  await expect(errorMessages(results)).toMatchFileSnapshot(
    errorSnapshotPath(fixture),
  );
});

const vitestEslint = new ESLint({
  overrideConfigFile: pathJoin(currentDir, 'configs', 'vitest.config.mjs'),
});

const ruleSeverity = async (filePath: string, rule: string) => {
  const config = await vitestEslint.calculateConfigForFile(filePath);
  return (config.rules?.[rule] as unknown[] | undefined)?.[0];
};

test.for([
  'src/index.test.ts',
  'src/Button.spec.tsx',
  'scripts/dev.test.mjs',
  'scripts/build.test.cjs',
  'src/util.test.mts',
])('applies vitest rules to %s', async (filePath) => {
  expect(await ruleSeverity(filePath, 'vitest/valid-title')).toBe(2);
  expect(
    await ruleSeverity(filePath, 'import-x/no-extraneous-dependencies'),
  ).toBe(0);
});

test.for(['vitest.config.mts', 'packages/foo/vitest.config.ts'])(
  'allows vitest imports in %s',
  async (filePath) => {
    expect(
      await ruleSeverity(filePath, 'import-x/no-extraneous-dependencies'),
    ).toBe(0);
    expect(await ruleSeverity(filePath, 'vitest/valid-title')).toBeUndefined();
  },
);

test('keeps dependency checks for source files', async () => {
  expect(
    await ruleSeverity('src/index.ts', 'import-x/no-extraneous-dependencies'),
  ).toBe(2);
});
