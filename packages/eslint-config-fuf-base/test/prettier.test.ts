import { expect, it } from 'vitest';

import { lintFixture } from './helper';

it('sorts imports in blocks', async () => {
  const { fixedContent } = await lintFixture('prettier-sort-imports.ts');
  expect(fixedContent).toMatchSnapshot();
});

it('sorts tailwind classes', async () => {
  const { fixedContent } = await lintFixture(
    'prettier-tailwind-sort-classes.tsx',
  );
  expect(fixedContent).toMatchSnapshot();
});
