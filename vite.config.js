import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/recap/',
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
  },
});

