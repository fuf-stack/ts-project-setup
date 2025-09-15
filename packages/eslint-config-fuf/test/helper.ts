import { readFile } from 'node:fs/promises';
import { join as pathJoin } from 'node:path';

import { ESLint } from 'eslint';
import {
  format as prettierFormat,
  resolveConfig as resolvePrettierConfig,
} from 'prettier';

type EslintConfig =
  | 'base.config.mjs'
  | 'react.config.mjs'
  | 'vitest.config.mjs';

/** lints a fixture by file name and return eslint results and fixed content */
export const lintFixture = async (
  fixtureName: string,
  config: EslintConfig = 'base.config.mjs',
) => {
  const eslint = new ESLint({
    fix: true,
    ignore: false,
    // override config file
    overrideConfigFile: pathJoin(__dirname, 'configs', config),
  });
  const filePath = pathJoin(__dirname, 'fixtures', fixtureName);
  const fileContent = (await readFile(filePath, 'utf-8'))
    // remove eslint disable comment
    .replace('/* eslint-disable */', '');
  const results = await eslint.lintText(fileContent, { filePath });

  // Assuming the first result corresponds to our linted text
  // Use the fixed output, or original code if no fixes were made
  const fixedContent = results[0].output || fileContent;

  return { fixedContent, results };
};

/** lints a fixture by file name and return eslint results and fixed content */
export const prettierFixFixture = async (fixtureName: string) => {
  const filePath = pathJoin(__dirname, 'fixtures', fixtureName);
  const fileContent = (await readFile(filePath, 'utf-8'))
    // remove prettier disable comment
    .replace('/* prettier-ignore */', '')
    .replace('# prettier-ignore', '')
    .replace('<!-- prettier-ignore -->', '')
    .replace('<!-- prettier-ignore-start -->', '')
    .replace('<!-- prettier-ignore-end -->', '');

  const config = await resolvePrettierConfig(filePath);
  const fixedContent = await prettierFormat(fileContent, {
    filepath: filePath,
    ...config,
  });

  return { fixedContent };
};

/** build a stable per-fixture snapshot path */
export const snapshotPath = (fixtureName: string) =>
  `fixtures/${fixtureName}-fixed.snap`;
