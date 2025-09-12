import { expect, it } from 'vitest';

import { lintFixture, prettierFixFixture, snapshotPath } from './helper';

it('enforces indentation', async () => {
  const fixture = 'prettier-indentation.ts';
  const { fixedContent } = await lintFixture(fixture, 'base.config.mjs');
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('formats astro components', async () => {
  const fixture = 'prettier-astro-format.astro';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('formats css', async () => {
  const fixture = 'prettier-css-format.css';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('formats graphql', async () => {
  const fixture = 'prettier-graphql-format.graphql';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('formats html', async () => {
  const fixture = 'prettier-html-format.html';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('formats json', async () => {
  const fixture = 'prettier-json-format.json';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('formats markdown', async () => {
  const fixture = 'prettier-markdown-format.md';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('formats php code', async () => {
  const fixture = 'prettier-php-format.php';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('formats yaml', async () => {
  const fixture = 'prettier-yaml-format.yaml';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('sorts imports in blocks', async () => {
  const fixture = 'prettier-sort-imports.ts';
  const { fixedContent } = await lintFixture(fixture, 'base.config.mjs');
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('sorts tailwind classes', async () => {
  const fixture = 'prettier-tailwind-sort-classes.tsx';
  const { fixedContent } = await lintFixture(fixture, 'base.config.mjs');
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('sorts tailwind classes in astro components', async () => {
  const fixture = 'prettier-tailwind-sort-classes.astro';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});

it('sorts tailwind classes in tailwindAdditionalFunctions from prettier.config.js', async () => {
  const fixture = 'prettier-tailwind-sort-classes-additional-function.ts';
  const { fixedContent } = await prettierFixFixture(fixture);
  await expect(fixedContent).toMatchFileSnapshot(snapshotPath(fixture));
});
