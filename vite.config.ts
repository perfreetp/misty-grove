import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 5180,
    host: true,
  },
});
