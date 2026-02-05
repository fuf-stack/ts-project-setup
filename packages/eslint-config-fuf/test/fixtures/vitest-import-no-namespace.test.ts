/* eslint-disable */

import { describe, expect, it } from 'vitest';

// Namespace imports should be allowed in tests (no warnings)
import * as stories from './support/Button.stories';

describe('Button stories', () => {
  it('should have default export', () => {
    expect(stories.default).toBeDefined();
  });

  it('should have Primary story', () => {
    expect(stories.Primary).toBeDefined();
  });
});
