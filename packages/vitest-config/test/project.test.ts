import { expect, it } from 'vitest';

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runVitest, withTestProject } from './test-utils.js';

const projectConfig = fileURLToPath(
  new URL('../src/project.ts', import.meta.url),
);

it.each([
  {
    name: 'provides Node, TypeScript aliases and mock clearing by default',
    customize: false,
  },
  {
    name: 'allows mergeConfig overrides while preserving Node and TypeScript aliases',
    customize: true,
  },
])(
  '$name',
  async ({ customize }) =>
    withTestProject(async (root) => {
      await writeFile(
        path.join(root, 'vitest.config.mts'),
        customize
          ? `
      import { mergeConfig } from 'vitest/config';
      import config from ${JSON.stringify(projectConfig)};
      export default mergeConfig(config, { test: { clearMocks: false } });
    `
          : `import config from ${JSON.stringify(projectConfig)}; export default config;`,
      );
      await writeFile(
        path.join(root, 'tsconfig.json'),
        JSON.stringify({
          compilerOptions: { paths: { '@fixture/*': ['./src/*'] } },
        }),
      );
      await mkdir(path.join(root, 'src'));
      await writeFile(
        path.join(root, 'src/message.ts'),
        'export const message: string = "resolved via tsconfig";',
      );
      await writeFile(
        path.join(root, 'example.test.ts'),
        `
    import { expect, it, vi } from 'vitest';
    import { message } from '@fixture/message';

    const mock = vi.fn();

    it('runs in Node', () => {
      expect(typeof window).toBe('undefined');
      expect(process.versions.node).toBeTruthy();
    });

    it('resolves the TypeScript path alias', () => {
      expect(message).toBe('resolved via tsconfig');
    });

    it('records a mock call', () => {
      mock();
      expect(mock).toHaveBeenCalledTimes(1);
    });

    it('applies mock clearing before the next test', () => {
      expect(mock).toHaveBeenCalledTimes(${customize ? 1 : 0});
    });
  `,
      );
      const report = await runVitest(root);
      expect(report.success).toBe(true);
      expect(report.numPassedTests).toBe(4);
      expect(report.testResults).toHaveLength(1);
    }),
  30_000,
);
