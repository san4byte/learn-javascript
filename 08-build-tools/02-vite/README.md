# ⚡ Modul 08 - Sub 02: Modern Frontend Tooling dengan Vite 8 & Rolldown

Selamat datang di sub-modul **Vite**! Pada materi ini, kita membangun ulang aplikasi modular (*Super App*) dari modul Webpack ke dalam ekosistem modern menggunakan **Vite 8**, bundler generasi baru **Rolldown** (berbasis Rust), dan styling utilitas modern **Tailwind CSS v4**.

---

## 🎯 Capstone Project & Topik Pembelajaran

1. **Arsitektur No-Bundling Dev Server:** Memanfaatkan browser Native ES Modules (`<script type="module">`) sehingga server menyala seketika dan kompilasi modul dilakukan secara *on-demand*.
2. **Multi-Page Application (MPA) di Vite:** Memisahkan setiap layanan aplikasi ke dalam file HTML fisik mandiri (`index.html`, `counter/`, `calculator/`, `jokes/`).
3. **State Management Reaktif Mandiri (`Proxy`):** Membangun konsep reaktivitas mirip React/Vue hanya dengan belasan baris JavaScript murni menggunakan objek bawaan `Proxy`.
4. **Pemisahan Tanggung Jawab (*Separation of Concerns*):** Memisahkan fungsi murni matematika (*Utils*), interaksi DOM form (*CalculatorService*), sistem notifikasi error (*AlertService*), dan konsumsi API asinkron (*JokesService*).
5. **Integrasi Tailwind CSS v4:** Menggunakan `@tailwindcss/vite` resmi tanpa memerlukan file konfigurasi `postcss.config.js` atau `tailwind.config.js`.
6. **Solusi Anti-FOUC (*Flash of Unstyled Content*):** Menghilangkan kedipan layout saat navigasi halaman fisik dengan `<link rel="stylesheet">` di `<head>`.
7. **Kompilasi Produksi dengan Rolldown:** Mengonfigurasi `vite.config.js` multi-input entry point untuk menghasilkan berkas rilis produksi yang terminifikasi dan teroptimasi.

---

## 📁 Struktur Folder Proyek

```text
08-build-tools/02-vite/
├── .env                       # Variabel lingkungan lokal (prefix VITE_)
├── .env.example               # Template environment variables
├── index.html                 # Halaman 1: Dashboard Menu Utama
├── package.json               # Konfigurasi npm ("type": "module")
├── vite.config.js             # Konfigurasi server, alias '@', & rolldownOptions
├── counter/
│   └── index.html             # Halaman 2: Halaman Counter State
├── calculator/
│   └── index.html             # Halaman 3: Halaman Kalkulator Sakti
├── jokes/
│   └── index.html             # Halaman 4: Halaman Jokes Receh (Modal)
└── src/
    ├── main.js                # Entry script Dashboard (animasi 3D logo & env)
    ├── counter-page.js        # Entry script Halaman Counter
    ├── calculator-page.js     # Entry script Halaman Kalkulator
    ├── jokes-page.js          # Entry script Halaman Jokes
    ├── style.css              # @import 'tailwindcss' & styling 3D logo
    ├── services/
    │   ├── alert.service.js   # Class penanganan kotak alert error
    │   ├── calculator.service.js # Class penanganan input form kalkulator & keyboard Enter
    │   └── jokes.service.js   # Class penanganan pop-up modal jokes
    ├── utils/
    │   ├── state-counter.js   # Mini-state reactive helper menggunakan JavaScript Proxy
    │   ├── parse-input.js     # Helper sanitasi string & konversi Number
    │   └── cek-input-valid.js # Helper validasi tipe angka murni
    └── assets/                # Aset gambar & vektor
```

---

## 🧠 Catatan Khusus & Pembahasan Konsep Penting

### 1. State Management Reaktif Menggunakan JavaScript `Proxy`
Di framework seperti React atau Vue, saat nilai data (*state*) diubah, tampilan layar (DOM) otomatis ter-update tanpa kita mengetik `element.innerText` manual. 

Di proyek ini, kita membuktikan bahwa konsep tersebut **bisa dibuat di JavaScript murni** menggunakan objek standar [`Proxy`](file:///home/jokosantoso/code/learn-javascript/03-standard-library/14-proxy/README.md):

```javascript
// src/utils/state-counter.js
export function stateCounter(initialVal, renderFunc) {
  const state = new Proxy(initialVal, {
    set(target, property, value) {
      target[property] = value;
      renderFunc(target); // ⚡ Otomatis render ulang UI saat nilai berubah!
      return true;
    },
  });

  renderFunc(state); // Render pertama saat dibuka
  return state;
}
```

Penggunaannya di [src/counter-page.js](file:///home/jokosantoso/code/learn-javascript/08-build-tools/02-vite/src/counter-page.js):
```javascript
const state = stateCounter({ count: 0 }, (currentState) => {
  button.textContent = `Hitungan: ${currentState.count} (Reaktif!)`;
});

button.addEventListener('click', () => {
  state.count += 1; // Cukup mutasi data, UI otomatis berubah seketika!
});
```

---

### 2. Penanganan Bug Input Parsing: `Number('') === 0`
Di JavaScript murni, terdapat perilaku unik di mana string kosong dikonversi menjadi angka `0`:
```javascript
Number(""); // Hasilnya 0, bukan NaN!
```
Pada implementasi awal Webpack, jika kolom input dikosongkan oleh pengguna, aplikasi keliru menganggapnya sebagai angka `0` (bukan error).

Di proyek ini, kita memperbaiki masalah tersebut di [src/utils/parse-input.js](file:///home/jokosantoso/code/learn-javascript/08-build-tools/02-vite/src/utils/parse-input.js):
```javascript
export const parseInput = (...inputs) => {
  return inputs.map((str) => (str.trim() === '' ? '' : Number(str)));
};
```
Jika input kosong atau hanya berisi spasi, ia tetap dikembalikan sebagai string kosong `''`, sehingga fungsi [src/utils/cek-input-valid.js](file:///home/jokosantoso/code/learn-javascript/08-build-tools/02-vite/src/utils/cek-input-valid.js) akan mendeteksinya sebagai tipe non-number dan memicu pesan error yang tepat: `"Perhatian: (kolom kosong) bukan angka!"`.

---

### 3. Mengatasi FOUC (*Flash of Unstyled Content*) pada MPA
Pada arsitektur Multi-Page Application (MPA), perpindahan antar halaman fisik sempat memicu kedipan (*glitch/white blink*) karena browser merender dokumen HTML sebelum JavaScript di bawah `<body>` selesai menginjeksi CSS.

**Solusinya:**
Vite mendukung pemanggilan stylesheet langsung di dalam `<head>`:
```html
<head>
  <link rel="stylesheet" href="/src/style.css" />
</head>
```
Dengan menaruhnya di `<head>`, berkas CSS Tailwind menjadi *render-blocking*, sehingga browser menjamin antarmuka sudah memiliki gaya sebelum ditampilkan ke layar.

---

### 4. Transisi dari Rollup ke Rolldown di Vite 8
Pada file [vite.config.js](file:///home/jokosantoso/code/learn-javascript/08-build-tools/02-vite/vite.config.js), properti lama `rollupOptions` berstatus `@deprecated` karena tim Vite (Evan You) resmi mengadopsi bundler baru berbasis bahasa Rust bernama **Rolldown**.

Kita mengonfigurasi multi-entry point menggunakan standar terbaru `rolldownOptions.input`:
```javascript
export default defineConfig({
  plugins: [tailwindcss()],
  server: { port: 3000, open: true },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
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
```

---

### 5. Manajemen Variabel Lingkungan (`import.meta.env`)
Vite tidak menggunakan `process.env` milik Node.js:
- Semua variabel klien disimpan di [.env](file:///home/jokosantoso/code/learn-javascript/08-build-tools/02-vite/.env) dan **wajib** diawali dengan `VITE_` demi alasan keamanan.
- Variabel bawaan otomatis: `import.meta.env.MODE`, `import.meta.env.DEV`, dan `import.meta.env.PROD`.

---

## 🚀 Cara Menjalankan Proyek

Pastikan Anda berada di direktori `08-build-tools/02-vite`:

```bash
cd 08-build-tools/02-vite

# 1. Pasang dependensi
npm install

# 2. Jalankan development server lokal (port 3000)
npm run dev

# 3. Bangun berkas bundle rilis produksi (Rolldown)
npm run build

# 4. Preview hasil rilis produksi di server lokal
npm run preview
```

---

## 🧭 Navigasi Materi

- ⬅️ **Sub-Modul Sebelumnya:** [01 - Webpack 5 (Tradisional Bundler)](../01-webpack/README.md)
- 🛠️ **Kembali ke Modul 08:** [08 - Build Tools](../README.md)
- 🏠 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)

