# 01 - Webpack 5 (Tradisional Bundler & Capstone Project)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengumpulkan, menyusun graf dependensi (_dependency graph_), mentransformasikan aset non-JavaScript via _loaders_, dan memaketkan modul aplikasi menjadi bundle produksi yang terminifikasi (_code splitting & minification_).
> - **Kapan Digunakan**: Proyek skala enterprise dengan kebutuhan kustomisasi build pipeline tingkat lanjut, integrasi pustaka lama, atau arsitektur _Micro-frontends_ (_Module Federation_).
> - **Aturan Praktis**: Pisahkan konfigurasi ke dalam 3 berkas terstruktur: konfigurasi dasar bersama (`webpack.config.js`), konfigurasi pengembangan (`webpack.dev.js`), dan konfigurasi rilis produksi (`webpack.prod.js`) menggunakan `webpack-merge`.

---

## 1. 🎯 Tujuan Belajar

- Memahami arsitektur _bundle-based build tool_ dan cara kerja pembentukan _Dependency Graph_.
- Menguasai pemisahan berkas konfigurasi menggunakan `webpack-merge` (`base`, `dev`, `prod`).
- Mengonfigurasi rantai pemrosesan _Loaders_ (`sass-loader`, `css-loader`, `html-loader`, dan _Asset Modules_).
- Menerapkan teknik pemisahan bundle vendor (_Code Splitting_) via `optimization.splitChunks`.
- Mengimplementasikan plugin optimasi produksi: `MiniCssExtractPlugin`, `CssMinimizerPlugin`, `PurgeCSSPlugin`, dan _contenthash_ untuk _long-term caching_.
- Menjalankan lingkungan pengembangan interaktif dengan `webpack-dev-server`.

---

## 2. 📖 Penjelasan Konsep & Arsitektur

### 🎭 Analogi Dunia Nyata

> Webpack seperti **pabrik pengemasan kargo logistik terpadu**:
> Berbagai macam barang mentah datang dari berbagai gudang terpisah: dokumen teks (_JS_), kain mentah (_SCSS_), foto (_PNG/JPG_), dan palet barang luar negeri (_vendor libraries_). Webpack memeriksa daftar manifest dependensi, menyortir, mengecilkan ukuran kotak kemasan (_minifikasi_), membuang sampah kain yang tidak terpakai (_PurgeCSS_), lalu mengemas seluruh barang menjadi kontainer rapi bersegel barcode unik (**`[contenthash]`**) yang siap dikirim langsung ke kapal kargo peramban pengguna.

---

### Tabel Perbandingan Pipeline Development vs Production

| Aspek               | Development (`webpack.dev.js`)                  | Production (`webpack.prod.js`)                      |
| :------------------ | :---------------------------------------------- | :-------------------------------------------------- |
| **Tujuan Utama**    | Kecepatan build & kemudahan debugging           | Ukuran berkas sekecil mungkin & performa loading    |
| **Output File**     | `[name].js` biasa tanpa hash                    | `[name].[contenthash].js` untuk cache busting       |
| **Source Maps**     | Evaluasi cepat (`eval-cheap-module-source-map`) | Berkas `.map` terpisah atau dimatikan demi keamanan |
| **CSS Handling**    | Langsung di-serve cepat                         | Di-extract via `MiniCssExtractPlugin` & `PurgeCSS`  |
| **Minifikasi Aset** | Tidak aktif (agar mudah dibaca manusia)         | Aktif penuh (Terser, CSS Minimizer, Squoosh Image)  |

---

### Pembahasan Mendalam Fitur & API

#### 1. Konsep Dependency Graph & Bundling

Webpack memulai analisis dari titik masuk (_entry points_). Setiap kali menemukan pernyataan `import` atau `require()`, Webpack mendaftarkannya ke dalam grafik relasi modul untuk memastikan urutan eksekusi yang tepat tanpa variabel global bocor.

#### 2. Konfigurasi Multi-Entry & Code Splitting (`splitChunks`)

Memisahkan kode aplikasi bisnis (`index.js`) dari pustaka pihak ketiga (`vendor.js` seperti Bootstrap atau Lodash):

```javascript
entry: {
  main: { import: './src/index.js', dependOn: 'shared' },
  vendor: './src/vendor.js',
  shared: 'lodash'
},
optimization: {
  splitChunks: { chunks: 'all' }
}
```

#### 3. Pipa Kompilasi Loaders (Sass, CSS, HTML, Asset Modules)

Loaders dieksekusi dari **urutan kanan ke kiri (bawah ke atas)**:

```javascript
module: {
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // 1. sass -> 2. css -> 3. extract
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: "asset/resource", // Pengganti file-loader di Webpack 5
    },
  ];
}
```

#### 4. Ekstraksi Stylesheet via `MiniCssExtractPlugin`

Mencegah CSS diinjeksi lewat JavaScript tag `<style>` yang rawan memicu _Flash of Unstyled Content_ (FOUC). Plugin ini mengekstrak CSS menjadi berkas terpisah `.css` murni di folder `dist/`.

#### 5. Optimasi Produksi: Contenthash, PurgeCSS & Minimizer

- **`[contenthash]`**: Menghasilkan hash unik berbasis isi berkas. Jika isi berkas tidak berubah, nama berkas tetap sama sehingga browser memanfaatkan _browser cache_ 100%.
- **`PurgeCSSPlugin`**: Memindai seluruh template HTML dan menghapus baris kelas CSS yang tidak pernah dipanggil di tampilan.
- **`CssMinimizerPlugin`**: Menghapus spasi dan komentar pada berkas CSS rilis.

#### 6. Manajemen Development Server (`webpack-dev-server`)

Menyediakan server HTTP lokal dengan kemampuan _Live Reloading_ dan _Hot Module Replacement_ (HMR) saat kode sumber disimpan.

---

## 3. 💻 Struktur Proyek & Panduan Eksekusi

Proyek ini telah dikonfigurasi penuh dengan arsitektur modular di direktori ini:

```text
08-build-tools/01-webpack/
├── package.json           # Dependensi Webpack 5 & skrip build
├── webpack.config.js      # Konfigurasi dasar bersama (Entry, Loaders, Rules)
├── webpack.dev.js         # Konfigurasi server lokal (port 3000)
├── webpack.prod.js        # Konfigurasi build produksi (Minimizer & PurgeCSS)
└── src/
    ├── template.html      # Kerangka HTML utama
    ├── index.js           # Entry point logika aplikasi
    ├── vendor.js          # Bundle pihak ketiga (Bootstrap, Tilt, Lodash)
    └── app/               # Arsitektur modular per-service
```

### Menjalankan Proyek

Masuk ke folder proyek dan jalankan perintah npm:

```bash
cd 08-build-tools/01-webpack

# 1. Menjalankan server development lokal (port 3000)
npm run serve

# 2. Membangun berkas rilis produksi teroptimasi ke dist/
npm run build
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Aplikasi Enterprise Skala Besar (Micro-Frontends)**: Menggunakan fitur _Module Federation_ bawaan Webpack 5 untuk menggabungkan beberapa aplikasi web independen yang dikembangkan oleh tim terpisah ke dalam satu antarmuka terpadu.
2. **Kompilasi Aset Tradisional**: Mengotomatisasi konversi ratusan file `.scss` desain sistem perusahaan menjadi satu bundle produksi yang telah disanitasi oleh PurgeCSS.

### ⚠️ Common Pitfalls

- **Urutan Loaders Terbalik**: Menulis `['sass-loader', 'css-loader']` alih-alih `['css-loader', 'sass-loader']` akan menyebabkan proses gagal karena Webpack membaca array loader dari kanan ke kiri.
- **Lupa `clean: true` pada Output**: Menumpuk berkas build lama yang memiliki nama hash berbeda di folder `dist/` setiap kali menjalankan `npm run build`.

### 🌟 Best Practice

- Selalu gunakan `webpack-merge` untuk memisahkan konfigurasi mode `development` dan `production`.
- Gunakan `[contenthash]` pada nama berkas output produksi agar browser klien otomatis mengunduh berkas baru saat ada perubahan kode (_cache busting_).

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas `webpack.config.js`. Tambahkan sebuah alias jalur (_path alias_) menggunakan properti `resolve.alias` sehingga Anda bisa mengimpor modul di dalam `src/app/` menggunakan simbol `@app/` alih-alih jalur relatif `../../app/`.
2. Jalankan `npm run build` dan periksa folder `dist/`. Perhatikan bagaimana berkas `.js` dan `.css` memiliki akhiran hash unik. Ubah satu baris teks di `src/index.js`, jalankan build ulang, dan amati bahwa hanya hash berkas `main` yang berubah sedangkan berkas `vendor` tetap sama.

---

## 6. 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [05 - Intersection Observer (Modul 07)](../../07-modern-web-api/05-intersection-observer/README.md)
- ➡️ **Materi Selanjutnya:** [02 - Modern Tooling dengan Vite 8 & Rolldown](../02-vite/README.md)
- 🏠 **Daftar Isi Modul 08:** [README Modul 08](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
