/* eslint-disable */

import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
} from 'vitest';

let value = 0;
beforeAll(() => {
  value = 1;
});
afterAll(() => {
  value = 0;
});
describe('first group', () => {
  beforeEach(() => {
    value += 1;
  });
  afterEach(() => {
    value -= 1;
  });
  it('runs a first test', () => {
    expect(value).toBe(2);
  });
  it('runs a second test', () => {
    expect(value).toBe(2);
  });
});
describe('second group', () => {
  test('runs a third test', () => {
    expect(value).toBe(1);
  });
});
