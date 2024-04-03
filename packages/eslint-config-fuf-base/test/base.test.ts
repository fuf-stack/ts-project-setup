import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

import { ESLint } from 'eslint';
import { expect, it } from 'vitest';

const eslint = new ESLint({ fix: true, ignore: false });

it('fix should add missing semicolons', async () => {
  const filePath = pathJoin(__dirname, 'fixtures/missing-semicolons.ts');
  const fileContent = readFileSync(filePath, 'utf-8');
  const results = await eslint.lintText(fileContent, { filePath });

  // Assuming the first result corresponds to our linted text
  const fileContentFixed = results[0].output || fileContent; // Use the fixed output, or original code if no fixes were made

  expect(fileContentFixed).toMatchSnapshot();
});
