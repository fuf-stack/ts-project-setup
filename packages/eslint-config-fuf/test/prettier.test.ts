import { expect, it } from 'vitest';

import {
  errorMessages,
  errorSnapshotPath,
  getFixtureList,
  lintFixture,
  prettierFixFixture,
  snapshotPath,
} from './helper';

it.for(getFixtureList('prettier-'))('%s', async (fixture) => {
  const useEslint = fixture.endsWith('.ts') || fixture.endsWith('.tsx');
  const result = useEslint
    ? await lintFixture(fixture, 'base.config.mjs')
    : await prettierFixFixture(fixture);
  await expect(result.fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
  if (useEslint) {
    // @ts-expect-error result.results is present when useEslint is true
    await expect(errorMessages(result.results)).toMatchFileSnapshot(
      errorSnapshotPath(fixture),
    );
  }
});
