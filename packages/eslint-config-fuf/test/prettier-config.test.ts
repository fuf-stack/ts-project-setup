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

  describe('projectImportOrderGroups', () => {
    it('should add project import order groups', () => {
      const config = createPrettierConfig({
        projectImportOrderGroups: ['^@acme/(.*)$', '^~/(.*)$'],
      });
      const importOrder = config.importOrder as string[];
      
      // Find the index of THIRD_PARTY_MODULES
      const thirdPartyIndex = importOrder.indexOf('<THIRD_PARTY_MODULES>');
      
      // Project groups should appear after third party modules
      expect(importOrder[thirdPartyIndex + 2]).toBe('^@acme/(.*)$');
      expect(importOrder[thirdPartyIndex + 3]).toBe('');
      expect(importOrder[thirdPartyIndex + 4]).toBe('^~/(.*)$');
      expect(importOrder[thirdPartyIndex + 5]).toBe('');
    });

    it('should support single project import order group', () => {
      const config = createPrettierConfig({
        projectImportOrderGroups: ['^@company/(.*)$'],
      });
      const importOrder = config.importOrder as string[];
      expect(importOrder).toContain('^@company/(.*)$');
    });

    it('should support multiple project import order groups', () => {
      const config = createPrettierConfig({
        projectImportOrderGroups: [
          '^@org1/(.*)$',
          '^@org2/(.*)$',
          '^@org3/(.*)$',
        ],
      });
      const importOrder = config.importOrder as string[];
      expect(importOrder).toContain('^@org1/(.*)$');
      expect(importOrder).toContain('^@org2/(.*)$');
      expect(importOrder).toContain('^@org3/(.*)$');
    });

    it('should place project groups before src imports', () => {
      const config = createPrettierConfig({
        projectImportOrderGroups: ['^@custom/(.*)$'],
      });
      const importOrder = config.importOrder as string[];
      
      const customIndex = importOrder.indexOf('^@custom/(.*)$');
      const srcIndex = importOrder.indexOf(
        '^(?!.*[.](css|jpg|jpeg|json|png|svg)$)src/(.*)$',
      );
      
      expect(customIndex).toBeLessThan(srcIndex);
    });
  });

  describe('workspacePackagePrefix (deprecated)', () => {
    it('should support workspacePackagePrefix for backward compatibility', () => {
      const config = createPrettierConfig({
        workspacePackagePrefix: '@fuf-stack',
      });
      const importOrder = config.importOrder as string[];
      expect(importOrder).toContain('^@fuf-stack(.*)$');
    });

    it('should prioritize projectImportOrderGroups over workspacePackagePrefix', () => {
      const config = createPrettierConfig({
        projectImportOrderGroups: ['^@new/(.*)$'],
        workspacePackagePrefix: '@old',
      });
      const importOrder = config.importOrder as string[];
      
      // Should contain the new pattern
      expect(importOrder).toContain('^@new/(.*)$');
      // Should NOT contain the old pattern
      expect(importOrder).not.toContain('^@old(.*)$');
    });

    it('should place workspacePackagePrefix imports after third party', () => {
      const config = createPrettierConfig({
        workspacePackagePrefix: '@workspace',
      });
      const importOrder = config.importOrder as string[];
      
      const thirdPartyIndex = importOrder.indexOf('<THIRD_PARTY_MODULES>');
      const workspaceIndex = importOrder.indexOf('^@workspace(.*)$');
      
      expect(workspaceIndex).toBeGreaterThan(thirdPartyIndex);
    });
  });

  describe('import order structure', () => {
    it('should maintain correct import order structure', () => {
      const config = createPrettierConfig({
        projectImportOrderGroups: ['^@custom/(.*)$'],
      });
      const importOrder = config.importOrder as string[];
      
      // Basic structure check
      expect(importOrder).toContain('<TYPES>');
      expect(importOrder).toContain('<BUILTIN_MODULES>');
      expect(importOrder).toContain('^react');
      expect(importOrder).toContain('<THIRD_PARTY_MODULES>');
      expect(importOrder).toContain('^@custom/(.*)$');
      
      // Order check
      const typesIndex = importOrder.indexOf('<TYPES>');
      const builtinIndex = importOrder.indexOf('<BUILTIN_MODULES>');
      const reactIndex = importOrder.indexOf('^react');
      const thirdPartyIndex = importOrder.indexOf('<THIRD_PARTY_MODULES>');
      const customIndex = importOrder.indexOf('^@custom/(.*)$');
      
      expect(typesIndex).toBeLessThan(builtinIndex);
      expect(builtinIndex).toBeLessThan(reactIndex);
      expect(reactIndex).toBeLessThan(thirdPartyIndex);
      expect(thirdPartyIndex).toBeLessThan(customIndex);
    });
  });
});


