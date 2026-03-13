
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-verification-file',
      apply: 'build',
      writeBundle() {
        const source = resolve(__dirname, 'public/googleb713242fafde5eae.html');
        const dest = resolve(__dirname, 'dist/googleb713242fafde5eae.html');
        if (existsSync(source)) {
          copyFileSync(source, dest);
          console.log('✓ Copied Google verification file to dist');
        }
      }
    }
  ],
  base: './',
  publicDir: 'public',
  define: {
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    }
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react', '@google/genai'],
        },
      },
    },
  }
});
