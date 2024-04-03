module.exports = {
  // eslint-config-fuf-base
  'packages/eslint-config-fuf-base/**/*.{ts}': [
    'eslint',
    'vitest related --run',
  ],
  // config packages
  'packages/**/*.{js,ts}': ['eslint'],
  // other filetypes
  '*.{md,mdx,yaml,yml}': ['prettier --write'],
};
