import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// Mendapatkan path direktori saat ini di lingkungan ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dokumentasi Vite merekomendasikan helper 'defineConfig' untuk autocomplete/IntelliSense
export default defineConfig({
  // Plugin
  plugins: [tailwindcss()],

  // Konfigurasi Development Server
  server: {
    port: 3000, // Mengganti port default (5173) menjadi 3000
    open: true, // Otomatis membuka browser saat 'npm run dev' dijalankan
  },

  // Path Alias (mempermudah import file tanpa '../../')
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Konfigurasi Hasil Build Produksi
  build: {
    outDir: 'dist', // Folder keluaran hasil build
    sourcemap: true, // Menghasilkan source map untuk memudahkan debugging di production
    rolldownOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        counter: path.resolve(__dirname, 'counter/index.html'),
        calculator: path.resolve(__dirname, 'calculator/index.html'),
        jokes: path.resolve(__dirname, 'jokes/index.html'),
      },
    },
  },
});
