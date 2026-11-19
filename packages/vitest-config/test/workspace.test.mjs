import { expect, test } from 'vitest';

import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const execFileAsync = promisify(execFile);

// Fresh processes exercise published exports without module-cache or env leakage.
const loadConfig = async (preset, environment) => {
  const { stdout } = await execFileAsync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import config from '@fuf-stack/vitest-config/${preset}';
       console.log(JSON.stringify(config));`,
    ],
    {
      cwd: packageRoot,
      encoding: 'utf8',
      env: {
        ...process.env,
        GITLAB_CI: 'false',
        GITHUB_ACTIONS: 'false',
        ...environment,
      },
    },
  );

  return JSON.parse(stdout);
};

test.each([
  ['local', {}, ['text-summary']],
  ['GitLab', { GITLAB_CI: 'true' }, ['text-summary', 'lcovonly', 'cobertura']],
  [
    'GitHub',
    { GITHUB_ACTIONS: 'true' },
    ['text-summary', 'lcovonly', 'json-summary'],
  ],
  ['generic CI', { CI: 'true' }, ['text-summary']],
  [
    'GitLab precedence when both provider flags are set',
    { GITLAB_CI: 'true', GITHUB_ACTIONS: 'true' },
    ['text-summary', 'lcovonly', 'cobertura'],
  ],
])(
  'selects workspace reporters for %s',
  async (_name, environment, reporters) => {
    const config = await loadConfig('workspace', environment);

    expect(config.test.coverage.reporter).toEqual(reporters);
    expect(config.test.coverage.enabled).toBeUndefined();
    expect(config.test.projects).toEqual([
      'apps/*',
      'packages/!(config)',
      'packages/config/*',
    ]);
  },
);

test.each([
  ['workspace/gitlab', { GITHUB_ACTIONS: 'true' }, 'cobertura'],
  ['workspace/github', { GITLAB_CI: 'true' }, 'json-summary'],
])(
  'keeps explicit %s independent of the host environment',
  async (preset, env, reporter) => {
    const config = await loadConfig(preset, env);

    expect(config.test.coverage.reporter).toEqual([
      'text-summary',
      'lcovonly',
      reporter,
    ]);
    expect(config.test.coverage.enabled).toBeUndefined();
  },
);
