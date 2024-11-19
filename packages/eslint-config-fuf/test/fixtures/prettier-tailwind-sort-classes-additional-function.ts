/* eslint-disable */

// see: prettier.config.js
const additionalTailwindFunction = () => true;

// tailwindFunctions defined in project prettier.config.js
const config = additionalTailwindFunction({
  some: { object: 'px-4 bg-blue-500 text-base rounded text-white py-2' },
});

export default config;
