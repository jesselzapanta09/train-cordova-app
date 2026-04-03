import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // For Cordova, we need to set the base path to the folder where the app will be served from.
  // base: './',
  // for GitHub Pages, we need to set the base path to the repository name.
  base: '/train-cordova-app/',
  build: {
    outDir: path.resolve(__dirname, '../cordova/www'),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
