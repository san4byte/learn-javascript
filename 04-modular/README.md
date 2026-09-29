# 04 - JavaScript Modular (Webpack & Build Tools)

## Tujuan Belajar

- Memahami konsep modularitas dan pemisahan logika (_Separation of Concerns_).
- Mengonfigurasi Webpack 5 untuk mode Development dan Production.
- Memahami konfigurasi Loaders (Sass/SCSS, CSS, HTML, Gambar).
- Menggunakan Plugins optimasi: `mini-css-extract-plugin`, `css-minimizer`, `purgecss`, dan `html-webpack-plugin`.
- Memahami pemisahan bundle vendor (_Code Splitting_).

## Penjelasan Konsep

Pada proyek skala besar, menulis seluruh kode di satu file sangat sulit dirawat. Modularitas membagi kode menjadi modul-modul independen menggunakan ES Modules (`import` dan `export`). Webpack bertugas menyatukan modul-modul tersebut, mengompilasi SCSS ke CSS, mengoptimasi aset gambar, dan meminifikasi kode JavaScript menjadi bundle produksi yang siap dideploy.

## Struktur Folder Modular

```text
04-modular/
├── package.json
├── package-lock.json
├── webpack.config.js       # Konfigurasi dasar bersama
├── webpack.dev.js          # Konfigurasi development & dev-server
├── webpack.prod.js         # Konfigurasi build produksi & minimizer
└── src/
    ├── template.html       # Kerangka HTML utama
    ├── index.js            # Entry point aplikasi
    ├── vendor.js           # Bundle library pihak ketiga (Bootstrap, dll)
    ├── hello.js
    ├── style.scss
    ├── img/
    └── app/
        ├── app.js
        ├── alert.service.js
        ├── calculator.service.js
        ├── jokes.service.js
        └── utils/
```

## Cara Menjalankan

Pastikan berada di dalam direktori `04-modular`:

```bash
cd 04-modular
npm install
npm run serve    # Menjalankan webpack-dev-server untuk development
npm run build    # Membangun bundle produksi ke folder dist/
```

---

[⬅️ Materi Sebelumnya: 03 - Asynchronous Async Await](../03-asynchronous/06-async-await/README.md) | [Materi Selanjutnya: 05 - JavaScript OOP ➡️](../05-oop/README.md) | [Kembali ke Daftar Isi Utama 🏠](../README.md)
