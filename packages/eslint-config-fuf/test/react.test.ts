import { expect, it } from 'vitest';

import {
  errorMessages,
  errorSnapshotPath,
  getFixtureList,
  lintFixture,
  snapshotPath,
} from './helper';

// Snapshot-based React fixtures (exclude the one that asserts warnings only)
it.for(
  getFixtureList('react-').filter(
    (f) => f !== 'react-function-component-default-props.tsx',
  ),
)('%s', async (fixture) => {
  const { fixedContent, results } = await lintFixture(
    fixture,
    'react.config.mjs',
  );
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
  await expect(errorMessages(results)).toMatchFileSnapshot(
    errorSnapshotPath(fixture),
  );
});
