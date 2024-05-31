import { expect, it } from 'vitest';

import { lintFixture } from './helper';

it('fix should add missing semicolons', async () => {
  const { fixedContent } = await lintFixture('base-missing-semicolons.ts');
  expect(fixedContent).toMatchSnapshot();
});

it('unused variables with leading underscore should be allowed', async () => {
  const { fixedContent } = await lintFixture(
    'base-unused-variables-with-leading-underscore.ts',
  );
  expect(fixedContent).toMatchSnapshot();
});
