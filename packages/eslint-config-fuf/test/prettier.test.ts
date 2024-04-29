import { expect, it } from 'vitest';

import { lintFixture, prettierFixFixture } from './helper';

it('enforces indentation', async () => {
  const { fixedContent } = await lintFixture('prettier-indentation.ts');
  expect(fixedContent).toMatchSnapshot();
});

it('formats astro components', async () => {
  const { fixedContent } = await prettierFixFixture(
    'prettier-astro-format.astro',
  );
  expect(fixedContent).toMatchSnapshot();
});

it('formats css', async () => {
  const { fixedContent } = await prettierFixFixture('prettier-css-format.css');
  expect(fixedContent).toMatchSnapshot();
});

it('formats graphql', async () => {
  const { fixedContent } = await prettierFixFixture(
    'prettier-graphql-format.graphql',
  );
  expect(fixedContent).toMatchSnapshot();
});

it('formats html', async () => {
  const { fixedContent } = await prettierFixFixture(
    'prettier-html-format.html',
  );
  expect(fixedContent).toMatchSnapshot();
});

it('formats json', async () => {
  const { fixedContent } = await prettierFixFixture(
    'prettier-json-format.json',
  );
  expect(fixedContent).toMatchSnapshot();
});

it('formats markdown', async () => {
  const { fixedContent } = await prettierFixFixture(
    'prettier-markdown-format.md',
  );
  expect(fixedContent).toMatchSnapshot();
});

it('formats php code', async () => {
  const { fixedContent } = await prettierFixFixture('prettier-php-format.php');
  expect(fixedContent).toMatchSnapshot();
});

it('formats yaml', async () => {
  const { fixedContent } = await prettierFixFixture(
    'prettier-yaml-format.yaml',
  );
  expect(fixedContent).toMatchSnapshot();
});

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
