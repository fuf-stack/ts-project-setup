import { expect, it } from 'vitest';

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { binaryPath, run, withTemporaryDirectory } from './test-utils.js';

it('versions a package and renders its conventional changelog', async () => {
  await withTemporaryDirectory('project-cli-tools-lerna-', async (root) => {
    const workspace = path.join(root, 'packages', 'fixture');
    await mkdir(workspace, { recursive: true });
    await writeFile(
      path.join(root, 'package.json'),
      `${JSON.stringify(
        {
          name: 'lerna-release-fixture',
          private: true,
          workspaces: ['packages/*'],
        },
        null,
        2,
      )}\n`,
    );
    await writeFile(
      path.join(root, 'lerna.json'),
      `${JSON.stringify(
        {
          npmClient: 'pnpm',
          packages: ['packages/*'],
          version: '0.0.0',
        },
        null,
        2,
      )}\n`,
    );
    await writeFile(
      path.join(workspace, 'package.json'),
      `${JSON.stringify({ name: 'release-fixture', version: '0.0.0' }, null, 2)}\n`,
    );
    await writeFile(path.join(workspace, 'README.md'), 'Initial fixture.\n');

    await run('git', ['init', '--initial-branch=main'], root);
    await run('git', ['config', 'user.name', 'Release Fixture'], root);
    await run('git', ['config', 'user.email', 'fixture@example.invalid'], root);
    await run('git', ['add', '.'], root);
    await run('git', ['commit', '-m', 'chore: initial fixture'], root);
    await run('git', ['tag', 'v0.0.0'], root);

    await writeFile(
      path.join(workspace, 'README.md'),
      'Release-worthy change.\n',
    );
    await run('git', ['add', '.'], root);
    await run(
      'git',
      ['commit', '-m', 'feat: exercise changelog rendering'],
      root,
    );

    await run(
      binaryPath('lerna'),
      [
        'version',
        '--conventional-commits',
        '--yes',
        '--no-push',
        '--no-git-tag-version',
        '--allow-branch',
        'main',
      ],
      root,
    );

    const manifest = JSON.parse(
      await readFile(path.join(workspace, 'package.json'), 'utf8'),
    ) as { version: string };
    const changelog = await readFile(
      path.join(workspace, 'CHANGELOG.md'),
      'utf8',
    );

    expect(manifest.version).toBe('0.1.0');
    expect(changelog).toContain('Features');
    expect(changelog).toContain('exercise changelog rendering');
  });
});
