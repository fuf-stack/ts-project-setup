import { mergeConfig } from 'vitest/config';

import workspace from './workspace-base.js';

/** Workspace coverage reports for GitLab and downstream SonarQube analysis. */
const gitlab = mergeConfig(workspace, {
  test: {
    coverage: {
      reportsDirectory: 'coverage',
      // mergeConfig appends these to the inherited text-summary reporter.
      reporter: ['lcovonly', 'cobertura'],
    },
  },
});

export default gitlab;
