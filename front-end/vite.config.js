import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    outDir: 'dist', // The output directory for production build
    assetsDir: 'assets', // Directory for assets relative to the outDir
    rollupOptions: {
      input: './src/main.jsx', // Entry file of your Vite app
      output: {
        entryFileNames: 'main.js', // Output filename for the entry file
        chunkFileNames: 'chunk.js', // Output filename for chunks
        assetFileNames: 'asset.[ext]', // Output filename for assets
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000/", // Backend address for proxying
    },
  },
});
