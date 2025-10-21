import { readdirSync } from 'node:fs';
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

/** list all fixture filenames starting with a given prefix (sync; safe for non-JS like .astro) */
export const getFixtureList = (prefix: string) => {
  const dir = pathJoin(__dirname, 'fixtures');
  // eslint-disable-next-line n/no-sync
  const entries = readdirSync(dir);
  return entries.filter((name) => {
    return (
      name.startsWith(prefix) &&
      !name.endsWith('.snap') &&
      name !== 'tsconfig.json'
    );
  });
};

/** lints a fixture by file name and return eslint results and fixed content */
export const lintFixture = async (
  fixtureName: string,
  config: EslintConfig = 'base.config.mjs',
) => {
  // First, lint WITHOUT fixes to capture error and warning messages
  const eslintCheck = new ESLint({
    fix: false,
    ignore: false,
    // override config file
    overrideConfigFile: pathJoin(__dirname, 'configs', config),
  });
  // Then, lint WITH fixes to obtain the fixed output for snapshotting
  const eslintFix = new ESLint({
    fix: true,
    ignore: false,
    // override config file
    overrideConfigFile: pathJoin(__dirname, 'configs', config),
  });
  const filePath = pathJoin(__dirname, 'fixtures', fixtureName);
  const rawContent = await readFile(filePath, 'utf-8');
  // Normalize by removing BOM and then trimming initial eslint-disable banner and following blank lines
  const contentNoBom = rawContent.replace(/^\uFEFF/, '');
  const lines = contentNoBom.split(/\r?\n/);
  let startIndex = 0;
  // Remove any initial blank lines
  while (startIndex < lines.length && lines[startIndex].trim() === '') {
    startIndex += 1;
  }
  // Remove leading eslint-disable banner even if preceded by blanks
  if (
    startIndex < lines.length &&
    lines[startIndex] &&
    lines[startIndex].trim() === '/* eslint-disable */'
  ) {
    startIndex += 1;
    // And subsequent blank lines after the banner
    while (startIndex < lines.length && lines[startIndex].trim() === '') {
      startIndex += 1;
    }
  }
  const fileContent = lines.slice(startIndex).join('\n');
  const results = await eslintCheck.lintText(fileContent, { filePath });

  // Use fixed output from a separate run with fixes enabled
  const fixResults = await eslintFix.lintText(fileContent, { filePath });

  // Assuming the first result corresponds to our linted text
  // Use the fixed output, or original code if no fixes were made
  const fixedContent = fixResults[0].output ?? fileContent;

  return { fixedContent, results };
};

/** build snapshot paths */
export const snapshotPath = (fixtureName: string) => {
  return `fixtures/${fixtureName}-fixed.snap`;
};

export const errorSnapshotPath = (fixtureName: string) => {
  return `fixtures/${fixtureName}-errors.snap`;
};

/** reduce ESLint results to just ruleId + message for stable error snapshots */
export const errorMessages = (
  results: {
    messages: { message: string; ruleId: string | null }[];
  }[],
) => {
  return results
    .map((r) => {
      return r.messages.map(({ message, ruleId }) => {
        return { message, ruleId };
      });
    })
    .flat();
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
