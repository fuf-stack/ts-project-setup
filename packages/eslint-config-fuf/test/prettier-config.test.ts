import { describe, expect, it } from 'vitest';

import createPrettierConfig from '../prettier.mjs';

describe('createPrettierConfig', () => {
  it('should create config without tailwind support', () => {
    const config = createPrettierConfig({});
    expect(config.plugins).not.toContain('prettier-plugin-tailwindcss');
    expect(config.tailwindConfig).toBeUndefined();
    expect(config.tailwindStylesheet).toBeUndefined();
  });

  it('should create config with tailwindConfig (v3)', () => {
    const config = createPrettierConfig({
      tailwindConfig: './tailwind.config.ts',
    });
    expect(config.plugins).toContain('prettier-plugin-tailwindcss');
    expect(config.tailwindConfig).toBe('./tailwind.config.ts');
    expect(config.tailwindStylesheet).toBeUndefined();
  });

  it('should create config with tailwindStylesheet (v4)', () => {
    const config = createPrettierConfig({
      tailwindStylesheet: './src/app.css',
    });
    expect(config.plugins).toContain('prettier-plugin-tailwindcss');
    expect(config.tailwindConfig).toBeUndefined();
    expect(config.tailwindStylesheet).toBe('./src/app.css');
  });

  it('should include tailwindFunctions when tailwind is enabled', () => {
    const config = createPrettierConfig({
      tailwindConfig: './tailwind.config.ts',
    });
    expect(config.tailwindFunctions).toContain('cn');
    expect(config.tailwindFunctions).toContain('classNames');
    expect(config.tailwindFunctions).toContain('tv');
  });

  it('should include additional tailwind functions', () => {
    const config = createPrettierConfig({
      tailwindStylesheet: './src/app.css',
      tailwindAdditionalFunctions: ['myCustomFn', 'anotherFn'],
    });
    expect(config.tailwindFunctions).toContain('myCustomFn');
    expect(config.tailwindFunctions).toContain('anotherFn');
  });

  it('should support both tailwindConfig and tailwindStylesheet simultaneously', () => {
    const config = createPrettierConfig({
      tailwindConfig: './tailwind.config.ts',
      tailwindStylesheet: './src/app.css',
    });
    expect(config.plugins).toContain('prettier-plugin-tailwindcss');
    expect(config.tailwindConfig).toBe('./tailwind.config.ts');
    expect(config.tailwindStylesheet).toBe('./src/app.css');
  });

  it('should enable prettier-plugin-astro when enableAstro is true', () => {
    const config = createPrettierConfig({
      enableAstro: true,
    });
    expect(config.plugins).toContain('prettier-plugin-astro');
  });

  it('should enable @prettier/plugin-php when enablePhp is true', () => {
    const config = createPrettierConfig({
      enablePhp: true,
    });
    expect(config.plugins).toContain('@prettier/plugin-php');
  });

  it('should place tailwind plugin last', () => {
    const config = createPrettierConfig({
      enableAstro: true,
      enablePhp: true,
      tailwindConfig: './tailwind.config.ts',
    });
    const plugins = config.plugins as string[];
    expect(plugins[plugins.length - 1]).toBe('prettier-plugin-tailwindcss');
  });
});


