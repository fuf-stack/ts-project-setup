module.exports = {
  // config packages
  'packages/**/*.{js,ts}': ['eslint'],
  // other filetypes
  '*.{md,mdx,yaml,yml}': ['prettier --write'],
};
