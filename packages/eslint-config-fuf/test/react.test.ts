import { expect, it } from 'vitest';

import { lintFixture } from './helper';

it('enforces component arrow-function definition', async () => {
  const { fixedContent } = await lintFixture(
    'react-function-component-definition.tsx',
    'react.config.mjs',
  );
  expect(fixedContent).toMatchSnapshot();
});

it('shows warning when optional props do not have a function default arg', async () => {
  const { results } = await lintFixture(
    'react-function-component-default-props.tsx',
    'react.config.mjs',
  );
  expect(results).toMatchObject([
    {
      messages: [
        {
          ruleId: 'react/require-default-props',
          messageId: 'shouldAssignObjectDefault',
          message:
            'propType "foo" is not required, but has no corresponding default argument value.',
        },
      ],
    },
  ]);
});

it('fixes storybook stories', async () => {
  const { fixedContent } = await lintFixture(
    'react-Button.stories.tsx',
    'react.config.mjs',
  );
  expect(fixedContent).toMatchSnapshot();
});
