import { readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname as pathDirname, join as pathJoin } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import {
  format as prettierFormat,
  resolveConfig as resolvePrettierConfig,
} from 'prettier';

type EslintConfig =
  'base.config.mjs' | 'react.config.mjs' | 'vitest.config.mjs';

const currentDir = pathDirname(fileURLToPath(import.meta.url));

/** list all fixture filenames starting with a given prefix (sync; safe for non-JS like .astro) */
export const getFixtureList = (prefix: string): string[] => {
  const dir = pathJoin(currentDir, 'fixtures');
  // eslint-disable-next-line n/no-sync
  const entries: string[] = readdirSync(dir, { encoding: 'utf-8' });
  return entries.filter((name: string) => {
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
  const testLinterOverride = {
    linterOptions: {
      // Keep fixture disable comments stable in snapshots across environments.
      reportUnusedDisableDirectives: false,
    },
  };

  // First, lint WITHOUT fixes to capture error and warning messages
  const eslintCheck = new ESLint({
    fix: false,
    ignore: false,
    // override config file
    overrideConfigFile: pathJoin(currentDir, 'configs', config),
    overrideConfig: testLinterOverride,
  });
  // Then, lint WITH fixes to obtain the fixed output for snapshotting
  const eslintFix = new ESLint({
    fix: true,
    ignore: false,
    // override config file
    overrideConfigFile: pathJoin(currentDir, 'configs', config),
    overrideConfig: testLinterOverride,
  });
  const filePath = pathJoin(currentDir, 'fixtures', fixtureName);
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
    lines[startIndex]?.trim() === '/* eslint-disable */'
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
  return `__snapshots__/${fixtureName}-fixed.snap`;
};

export const errorSnapshotPath = (fixtureName: string) => {
  return `__snapshots__/${fixtureName}-errors.snap`;
};

/** reduce ESLint results to just ruleId + message for stable error snapshots */
export const errorMessages = (
  results: {
    messages: { message: string; ruleId: string | null; line?: number }[];
  }[],
) => {
  return results
    .map((r) => {
      return r.messages.map(({ message, ruleId, line }) => {
        return { message, ruleId, line };
      });
    })
    .flat();
};

/** lints a fixture by file name and return eslint results and fixed content */
export const prettierFixFixture = async (fixtureName: string) => {
  const filePath = pathJoin(currentDir, 'fixtures', fixtureName);
  const fileContent = (await readFile(filePath, 'utf-8'))
    // remove prettier disable comment
    .replace('/* prettier-ignore */', '')
    .replace('// prettier-ignore', '')
    .replace('# prettier-ignore', '')
    .replace('<!-- prettier-ignore -->', '')
    .replace('<!-- prettier-ignore-end -->', '')
    .replace('<!-- prettier-ignore-start -->', '');

  const config = await resolvePrettierConfig(filePath);
  const fixedContent = await prettierFormat(fileContent, {
    filepath: filePath,
    ...config,
  });

  return { fixedContent };
};
