import { describe, expect, it } from 'vitest';

import {
  errorMessages,
  errorSnapshotPath,
  getFixtureList,
  lintFixture,
  snapshotPath,
} from './helper';

const fixtures = getFixtureList('jsdoc-strict-');

describe.each([
  'jsdoc-strict.config.mjs',
  'jsdoc-strict-react.config.mjs',
] as const)('%s', (config) => {
  it.for(fixtures)('%s', async (fixture) => {
    const { fixedContent, results } = await lintFixture(fixture, config);
    const snapshotName = `${config}-${fixture}`;
    await expect(fixedContent).toMatchFileSnapshot(snapshotPath(snapshotName));
    await expect(errorMessages(results)).toMatchFileSnapshot(
      errorSnapshotPath(snapshotName),
    );
  });
});
