import { expect, it } from 'vitest';

import { lintFixture } from './helper';

it('fixes invalid test title', async () => {
  const { fixedContent } = await lintFixture(
    'vitest-valid-title.test.ts',
    'vitest.config.mjs',
  );
  expect(fixedContent).toMatchSnapshot();
});
