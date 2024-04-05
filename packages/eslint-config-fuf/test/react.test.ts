import { expect, it } from 'vitest';

import { lintFixture } from './helper';

it('enforces component arrow-function definition', async () => {
  const { fixedContent } = await lintFixture(
    'react-function-component-definition.tsx',
    'react.config.js',
  );
  expect(fixedContent).toMatchSnapshot();
});
