import { expect, it } from 'vitest';

import { lintFixture, snapshotPath } from './helper';

it('enforces component arrow-function definition', async () => {
  const fixture = 'react-function-component-definition.tsx';
  const { fixedContent } = await lintFixture(fixture, 'react.config.mjs');
  expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('shows warning when optional props do not have a function default arg', async () => {
  const fixture = 'react-function-component-default-props.tsx';
  const { results } = await lintFixture(fixture, 'react.config.mjs');
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
  const fixture = 'react-Button.stories.tsx';
  const { fixedContent } = await lintFixture(fixture, 'react.config.mjs');
  expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});
