/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { join } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  cacheDir: '../../.cache/vite/core',

  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
    }),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
    tsconfigPaths({ root: '../..' }),
  ],

  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'core',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../.cache/vitest/core',
    },
    coverage: {
      provider: 'v8',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
