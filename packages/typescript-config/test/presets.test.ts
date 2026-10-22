import { expect, it } from 'vitest';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

const directory = fileURLToPath(new URL('../', import.meta.url));
const presets = ['base', 'eslint', 'react-library', 'react-vite-app'];

const resolvePreset = (preset: string) => {
  const configPath = path.join(directory, `${preset}.json`);
  const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile);
  expect(error).toBeUndefined();
  const parsed = ts.parseJsonConfigFileContent(
    { ...config, files: ['preset-check.ts'], include: [] },
    ts.sys,
    directory,
    undefined,
    configPath,
  );
  expect(parsed.errors).toEqual([]);
  return parsed.options;
};

const compile = (preset: string, source: string) => {
  const options = {
    ...resolvePreset(preset),
    noEmit: true,
    incremental: false,
    // Isolate the preset's libraries from installed @types/node/browser packages.
    types: [],
  };
  const fileName = path.join(directory, 'preset-check.ts');
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (
    name,
    languageVersion,
    onError,
    shouldCreateNewSourceFile,
  ) =>
    name === fileName
      ? ts.createSourceFile(name, source, languageVersion, true)
      : getSourceFile(
          name,
          languageVersion,
          onError,
          shouldCreateNewSourceFile,
        );
  const program = ts.createProgram([fileName], options, host);
  return ts
    .getPreEmitDiagnostics(program)
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
    );
};

it.each(presets)(
  '%s supports ES2022 APIs and inherits the ES2022 target',
  (preset) => {
    expect(resolvePreset(preset).target).toBe(ts.ScriptTarget.ES2022);
    expect(
      compile(
        preset,
        `
    export const last = [1, 2].at(-1);
    export const owns = Object.hasOwn({ value: 1 }, 'value');
    export const error = new Error('failed', { cause: 'reason' });
    export const indices = /value/d.hasIndices;
    // @ts-expect-error ES2023 APIs require explicitly opting into a newer lib.
    export const newer = [1, 2].findLast((value: number) => value > 0);
  `,
      ),
    ).toEqual([]);
  },
);

it.each(['react-library', 'react-vite-app'])(
  '%s includes DOM APIs and iterable DOM collections',
  (preset) => {
    expect(
      compile(
        preset,
        `
      export const elements: Element[] = [...document.querySelectorAll('div')];
      export const entries = [...new FormData().entries()];
      export const browser = window.location.href;
    `,
      ),
    ).toEqual([]);
  },
);

it.each(['base', 'eslint'])('%s excludes browser globals', (preset) => {
  expect(
    compile(
      preset,
      `
    // @ts-expect-error Browser globals require a DOM-enabled preset or lib override.
    export const element = document.createElement('div');
    // @ts-expect-error Browser globals require a DOM-enabled preset or lib override.
    export const browser = window.location.href;
  `,
    ),
  ).toEqual([]);
});
