import { expect, it } from 'vitest';

import {
  errorMessages,
  errorSnapshotPath,
  getFixtureList,
  lintFixture,
  prettierFixFixture,
  snapshotPath,
} from './helper';

const fixtures = getFixtureList('prettier-');
const isTsFixture = (fixture: string) =>
  fixture.endsWith('.ts') || fixture.endsWith('.tsx');

// TypeScript fixtures are formatted via eslint-plugin-prettier
it.for(fixtures.filter(isTsFixture))('%s', async (fixture) => {
  const result = await lintFixture(fixture, 'base.config.mjs');
  await expect(result.fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
  await expect(errorMessages(result.results)).toMatchFileSnapshot(
    errorSnapshotPath(fixture),
  );
});

// All other fixtures are formatted with prettier directly
it.for(fixtures.filter((fixture) => !isTsFixture(fixture)))(
  '%s',
  async (fixture) => {
    const result = await prettierFixFixture(fixture);
    await expect(result.fixedContent).toMatchFileSnapshot(
      snapshotPath(fixture),
    );
  },
);
