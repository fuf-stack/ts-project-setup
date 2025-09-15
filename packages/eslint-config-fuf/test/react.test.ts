import { expect, it } from 'vitest';

import {
  errorMessages,
  errorSnapshotPath,
  getFixtureList,
  lintFixture,
  snapshotPath,
} from './helper';

const fixtures = getFixtureList('react-');

it.for(fixtures)('%s', async (fixture) => {
  const { fixedContent, results } = await lintFixture(
    fixture,
    'react.config.mjs',
  );
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
  await expect(errorMessages(results)).toMatchFileSnapshot(
    errorSnapshotPath(fixture),
  );
});
