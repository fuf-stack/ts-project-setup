import { mergeConfig } from 'vitest/config';

import workspace from './workspace.js';

/** Workspace coverage files for GitHub Actions summaries and SonarQube analysis. */
export default mergeConfig(workspace, {
  test: {
    coverage: {
      reportsDirectory: 'coverage',
      // mergeConfig appends these to the inherited text-summary reporter.
      reporter: ['lcovonly', 'json-summary'],
    },
  },
});
