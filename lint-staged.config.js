module.exports = {
  // eslint-config-fuf
  'packages/eslint-config-fuf/**/*.ts': ['eslint', 'vitest related --run'],
  // config packages
  'packages/**/*.{js,ts}': ['eslint'],
  // other filetypes
  '*.{md,mdx,yaml,yml}': ['prettier --write'],
};
