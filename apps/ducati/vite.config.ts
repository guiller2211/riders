/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteRequire } from 'vite-require';
import tsconfigPaths from 'vite-tsconfig-paths';
import million from "million/compiler";

export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), tsconfigPaths(), viteRequire()],
});
