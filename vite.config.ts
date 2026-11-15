import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  server: { port: 5199, host: '127.0.0.1', strictPort: true,
    watch: { ignored: ['**/.smoke/**', '**/dist/**'] },
  },
  build: { target: 'es2020' },
});
