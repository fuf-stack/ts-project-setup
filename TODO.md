# TODO

## TypeScript 7 support (pending)

- Keep TypeScript pinned to the v6 line at the workspace root for now.
- Reason: current `@typescript-eslint/typescript-estree` support is not ready for TS7 in this toolchain and causes lint/test failures (for example `TypeError: Cannot read properties of undefined (reading 'Cjs')`).
- Revisit and enable TS7 once `typescript-eslint` officially supports it in a compatible release.
- Reference: https://github.com/LWCW-Europe/schellingboard/issues/621
