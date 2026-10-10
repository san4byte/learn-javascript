# 🛠️ Modul 08: JavaScript Build Tools & Modern Tooling

Selamat datang di **Modul 08**! Modul ini membahas ekosistem **Build Tools & Tooling** dalam industri pengembangan web JavaScript modern.

Dalam aplikasi web skala nyata, menulis kode di satu file atau mengandalkan tag `<script>` mentah tidak lagi memadai. Kita membutuhkan build tools untuk:
- Mengelola modularitas kode (*ES Modules & Separation of Concerns*).
- Mengompilasi format modern (SCSS ke CSS, TypeScript ke JavaScript, JSX).
- Mengoptimalkan performa (Minifikasi kode, kompresi aset gambar, PurgeCSS).
- Memisahkan bundle vendor (*Code Splitting*) agar waktu muat awal website menjadi sangat cepat.
- Meningkatkan produktivitas pengembang (*Developer Experience*) dengan dev server lokal dan Hot Module Replacement (HMR).

---

## 📚 Daftar Sub-Materi

Modul ini terbagi menjadi 2 sub-materi terpisah berdasarkan pendekatan arsitektur tooling:

1. [01 - Webpack 5 (Tradisional Bundler & Capstone Project)](01-webpack/README.md)
   - Memahami konsep arsitektur *bundle-based*.
   - Konfigurasi Webpack 5 untuk mode *Development* dan *Production*.
   - Konfigurasi Loaders (`sass-loader`, `css-loader`, `html-loader`, asset modules).
   - Optimasi tingkat lanjut: `MiniCssExtractPlugin`, `CssMinimizerPlugin`, `PurgeCSS`, dan `splitChunks`.
   - Sangat penting untuk memahami fondasi ekosistem legacy dan aplikasi enterprise besar yang mengandalkan konfigurasi kustom mendalam.

2. [02 - Vite & Rolldown (Next Generation Frontend Tooling)](02-vite/README.md)
   - Memahami arsitektur modern berbasis *Native ES Modules* di browser (*No-bundling dev server*) dan engine *Rolldown* (Rust).
   - Arsitektur Multi-Page Application (MPA) di Vite (`index.html`, `counter/`, `calculator/`, `jokes/`).
   - Membuat sistem *State Management* reaktif mandiri menggunakan JavaScript `Proxy`.
   - Penerapan *Separation of Concerns* (Services, Utils, Pure Functions) dengan Tailwind CSS v4.
   - Solusi *Anti-FOUC* (*Flash of Unstyled Content*) pada navigasi MPA.
   - Standar baru industri untuk pengembangan frontend modern (Vanilla JS, React, Vue, Svelte).

---

## 🧭 Kapan Menggunakan Webpack vs Vite?

| Kebutuhan Proyek | Pilihan Direkomendasikan | Alasan |
| :--- | :--- | :--- |
| **Proyek Baru / Modern (Greenfield)** | **Vite** | Kecepatan development instan, setup sangat minimal, dan standar industri masa kini. |
| **Proyek Skala Enterprise Kompleks / Legacy** | **Webpack** | Ekosistem plugin yang sangat matang, kustomisasi pipeline kompilasi tak terbatas. |
| **Aplikasi dengan Micro-frontends (Module Federation)** | **Webpack 5** | Memiliki dukungan native Module Federation yang sangat teruji. |
| **Eksplorasi Framework Modern (Vue, React, Svelte)** | **Vite** | Didukung secara resmi dan menjadi default starter toolchain ekosistem frontend modern. |

---

## 🛠️ Cara Menjalankan Sub-Materi

Setiap sub-materi memiliki lingkungan dan dependensi mandiri di foldernya masing-masing:

### 1. Menjalankan Webpack:
```bash
cd 08-build-tools/01-webpack
npm install
npm run serve    # Development server (port 3000)
npm run build    # Build produksi ke dist/
```

### 2. Menjalankan Vite:
```bash
cd 08-build-tools/02-vite
npm install
npm run dev      # Development server instan (port 3000)
npm run build    # Build produksi via Rolldown ke dist/
npm run preview  # Preview hasil build produksi
```

---

## 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [07 - Modern Web API & Real-World JS](../07-modern-web-api/README.md)
- ➡️ **Proyek Akhir (Capstone):** [OmniStore Pro — Modern E-Commerce Storefront](../projects/omnistore-pro/README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../README.md)
