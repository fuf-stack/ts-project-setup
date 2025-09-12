import { expect, it } from 'vitest';

import { lintFixture, snapshotPath } from './helper';

it('fix should add missing semicolons', async () => {
  const fixture = 'base-missing-semicolons.ts';
  const { fixedContent } = await lintFixture(fixture, 'base.config.mjs');
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('unused variables with leading underscore should be allowed', async () => {
  const fixture = 'base-unused-variables-with-leading-underscore.ts';
  const { fixedContent } = await lintFixture(fixture, 'base.config.mjs');
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});
