import { expect, it } from 'vitest';

import { lintFixture } from './helper';

it('fix should add missing semicolons', async () => {
  const { fixedContent } = await lintFixture('missing-semicolons.ts');
  expect(fixedContent).toMatchSnapshot();
});
