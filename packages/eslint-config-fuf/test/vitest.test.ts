import { expect, it } from 'vitest';

import {
  errorMessages,
  errorSnapshotPath,
  getFixtureList,
  lintFixture,
  snapshotPath,
} from './helper';

it.for(getFixtureList('vitest-'))('%s', async (fixture) => {
  const { fixedContent, results } = await lintFixture(
    fixture,
    'vitest.config.mjs',
  );
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
  await expect(errorMessages(results)).toMatchFileSnapshot(
    errorSnapshotPath(fixture),
  );
});
