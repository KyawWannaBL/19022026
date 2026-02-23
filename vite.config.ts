import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // This prevents the ReactDOM is not defined error by bundling core libs together
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});