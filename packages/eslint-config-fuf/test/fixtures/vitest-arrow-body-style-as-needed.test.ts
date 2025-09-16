/* eslint-disable */

import { expect, it } from 'vitest';

it('adds some numbers', () => {
  // should be converted to no braces and no return
  const add = (a: number, b: number) => {
    return a + b;
  };

  expect(add(1, 1)).toBe(2);
});

it('combines a string', () => {
  // braces  and return should be kept
  const createString = (prefix: string, suffix: string) => {
    const combined = `${prefix} ${suffix}`;
    return combined;
  };

  expect(createString('Hello', 'World!')).toBe('Hello World!');
});
