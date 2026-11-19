import local from './workspace-base.js';
import github from './workspace-github.js';
import gitlab from './workspace-gitlab.js';

/**
 * Workspace configuration with automatic coverage report selection.
 *
 * GitLab CI gets LCOV and Cobertura; GitHub Actions gets LCOV and JSON summary.
 * Other environments keep the lightweight text summary. Explicit platform
 * presets remain available to reproduce CI reports locally.
 */
const selectWorkspace = () => {
  if (process.env.GITLAB_CI === 'true') {
    return gitlab;
  }
  if (process.env.GITHUB_ACTIONS === 'true') {
    return github;
  }
  return local;
};

export default selectWorkspace();
