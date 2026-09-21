import { expect, it } from 'vitest';

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runVitest, withTestProject } from './test-utils.js';

const workspaceConfig = fileURLToPath(
  new URL('../src/workspace.ts', import.meta.url),
);
it.each([
  {
    name: 'runs app, package and nested config tests once without a config container project',
    additionalProjects: [],
  },
  {
    name: 'adds an external project with mergeConfig while retaining each default project once',
    additionalProjects: ['tools/integration-tests'],
  },
])(
  '$name',
  async ({ additionalProjects }) =>
    withTestProject(async (root) => {
      const projects = [
        'apps/website',
        'packages/library',
        'packages/config/first',
        'packages/config/second',
        ...additionalProjects,
      ];
      await writeFile(
        path.join(root, 'vitest.config.mts'),
        additionalProjects.length === 0
          ? `import config from ${JSON.stringify(workspaceConfig)}; export default config;`
          : `
          import { mergeConfig } from 'vitest/config';
          import config from ${JSON.stringify(workspaceConfig)};
          export default mergeConfig(config, {
            test: { projects: ${JSON.stringify(additionalProjects)} },
          });
        `,
      );
      await Promise.all(
        projects.map(async (project) => {
          const directory = path.join(root, project);
          await mkdir(directory, { recursive: true });
          await writeFile(
            path.join(directory, 'package.json'),
            JSON.stringify({
              name: project.replaceAll('/', '-'),
              type: 'module',
            }),
          );
          await writeFile(
            path.join(directory, 'example.test.ts'),
            'import { expect, it } from "vitest"; it("runs once", () => { expect(true).toBe(true); });',
          );
        }),
      );
      // Cover a nested package with its own config as well as default discovery.
      await writeFile(
        path.join(root, 'packages/config/first/vitest.config.mts'),
        'export default { test: { name: "nested-config" } };',
      );
      const report = await runVitest(root);
      expect(report.success).toBe(true);
      expect(report.numPassedTests).toBe(projects.length);
      expect(
        report.testResults
          .map((result) => path.relative(root, result.name))
          .sort(),
      ).toEqual(projects.map((project) => `${project}/example.test.ts`).sort());
    }),
  30_000,
);
