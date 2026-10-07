/**
 * Modul 08: Build Tools - Vite MPA (Multi-Page Application) & Tailwind CSS v4
 * 
 * Konfigurasi bundler Vite untuk:
 * 1. Mengaktifkan plugin Tailwind CSS v4 (@tailwindcss/vite)
 * 2. Menyediakan path alias `@/` yang mengarah ke folder `src/`
 * 3. Menentukan titik masuk (entry points) untuk 2 halaman HTML:
 *    - main: index.html (Halaman Katalog & Keranjang)
 *    - detail: product-detail/index.html (Halaman Rincian Produk)
 */
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        detail: path.resolve(__dirname, 'product-detail/index.html'),
      },
    },
    // Kompatibilitas untuk Vite 8 experimental / Rolldown
    rolldownOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        detail: path.resolve(__dirname, 'product-detail/index.html'),
      },
    },
  },
});
