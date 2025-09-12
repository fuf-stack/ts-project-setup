import { expect, it } from 'vitest';

import { lintFixture, snapshotPath } from './helper';

it('fixes invalid test title', async () => {
  const fixture = 'vitest-valid-title.test.ts';
  const { fixedContent } = await lintFixture(fixture, 'vitest.config.mjs');
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});
