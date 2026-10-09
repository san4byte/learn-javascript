# 02 - Modern Frontend Tooling dengan Vite 8 & Rolldown

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Alat perkakas frontend generasi baru (_next-generation tooling_) yang memanfaatkan modul bawaan browser (_Native ES Modules_) untuk startup server seketika dan bundler berbasis Rust (_Rolldown_) untuk kompilasi produksi super cepat.
> - **Kapan Digunakan**: Seluruh proyek web frontend modern berbasis Vanilla JavaScript, React, Vue, Svelte, atau arsitektur Multi-Page Application (MPA).
> - **Aturan Praktis**: Manfaatkan `import.meta.env` dengan awalan `VITE_` untuk variabel lingkungan klien. Letakkan pemanggilan CSS Tailwind di dalam tag `<head>` dokumen HTML untuk mengeliminasi kedipan tampilan (_Anti-FOUC_).

---

## 1. 🎯 Tujuan Belajar

- Memahami arsitektur _No-Bundling Dev Server_ berbasis Native ES Modules pada browser modern.
- Menguasai pembuatan arsitektur _Multi-Page Application_ (MPA) di Vite (`index.html`, `counter/`, `calculator/`, `jokes/`).
- Membangun mekanisme _State Management_ reaktif mandiri menggunakan objek standar JavaScript `Proxy`.
- Menerapkan prinsip _Separation of Concerns_ (pemisahan logika murni matematika, penanganan DOM, alert service, dan asinkron API).
- Mengintegrasikan styling utilitas modern Tailwind CSS v4 via plugin resmi `@tailwindcss/vite`.
- Mengatasi masalah kedipan tampilan halaman (_Flash of Unstyled Content / FOUC_).
- Mengonfigurasi build produksi multi-entry menggunakan standar baru bundler Rust `Rolldown`.

---

## 2. 📖 Penjelasan Konsep & Arsitektur

### 🎭 Analogi Dunia Nyata

> - **Bundler Tradisional (Webpack)** seperti **mencetak dan menjilid seluruh ensiklopedia 1.000 halaman menjadi satu buku tebal sebelum Anda boleh membaca halaman 1**: Pembaca harus menunggu mesin mencetak seluruh bab hingga selesai (_bundling bottleneck_).
> - **Modern Tooling (Vite)** seperti **membaca artikel web digital sesuai permintaan (_on-demand_)**: Pembaca membuka bab yang diinginkan, dan server hanya mengirimkan halaman tersebut saat itu juga tanpa perlu mencetak halaman lain yang belum dibuka.

---

### Tabel Perbandingan Arsitektur: Tradisional Bundler vs Vite

| Fitur                    | Bundler Tradisional (Webpack)           | Modern Tooling (Vite)                                   |
| :----------------------- | :-------------------------------------- | :------------------------------------------------------ |
| **Penyalaan Dev Server** | Mem-bundle seluruh file terlebih dahulu | Instan (_No-bundling_, memanfaatkan browser native ESM) |
| **Pembaruan Kode (HMR)** | Kompilasi ulang graf modul              | Pembaruan instan hanya pada modul yang dimodifikasi     |
| **Kompilasi Produksi**   | Node.js JavaScript bundler              | Engine Rust performa tinggi (_Rolldown_)                |
| **Konfigurasi Awal**     | Ekstensif & membutuhkan banyak loaders  | Sangat minimalis & siap pakai (_Zero-config defaults_)  |
| **Penyajian HTML**       | Ditangani plugin JavaScript             | Berkas `index.html` bertindak sebagai entry point utama |

---

### Pembahasan Mendalam Fitur & API

#### 1. Arsitektur Dev Server No-Bundling Berbasis Native ESM

Vite menyajikan kode sumber langsung ke browser menggunakan `<script type="module">`. Kompilasi modul dilakukan secara dinamis hanya ketika browser meminta modul tersebut (_on-demand compilation_).

#### 2. Multi-Page Application (MPA) di Vite

Setiap halaman web memiliki dokumen HTML fisik mandiri dengan entry script-nya sendiri:

- `index.html` $\rightarrow$ `src/main.js` (Dashboard)
- `counter/index.html` $\rightarrow$ `src/counter-page.js` (State counter)
- `calculator/index.html` $\rightarrow$ `src/calculator-page.js` (Kalkulator)
- `jokes/index.html` $\rightarrow$ `src/jokes-page.js` (Modal jokes)

#### 3. State Management Reaktif Mandiri via `Proxy`

Membuat reaktivitas data mirip React/Vue menggunakan objek bawaan JavaScript [`Proxy`](file:///home/jokosantoso/code/learn-javascript/03-standard-library/14-proxy/README.md):

```javascript
export function stateCounter(initialVal, renderFunc) {
  const state = new Proxy(initialVal, {
    set(target, prop, value) {
      target[prop] = value;
      renderFunc(target); // Otomatis picu re-render DOM saat state dimutasi!
      return true;
    },
  });
  renderFunc(state);
  return state;
}
```

#### 4. Pemisahan Tanggung Jawab (_Separation of Concerns_)

Arsitektur kode dibagi ke dalam lapisan-lapisan independen:

- **`src/utils/`**: Fungsi murni sanitasi input (`parseInput.js`) dan validasi tipe (`cekInputValid.js`).
- **`src/services/`**: Kelas pengendali logika interaksi DOM formulir (`calculator.service.js`) dan request HTTP jokes (`jokes.service.js`).

#### 5. Integrasi Tailwind CSS v4 (`@tailwindcss/vite`)

Menggunakan pustaka resmi `@tailwindcss/vite` tanpa memerlukan berkas konfigurasi lawas `postcss.config.js` atau `tailwind.config.js`. Cukup pasang plugin di `vite.config.js` dan panggil `@import "tailwindcss";` di CSS.

#### 6. Solusi Pencegahan Anti-FOUC pada MPA

Untuk mencegah kedipan layout saat transisi antar halaman fisik di arsitektur MPA, berkas CSS diimpor langsung di dalam tag `<head>`:

```html
<head>
  <link rel="stylesheet" href="/src/style.css" />
</head>
```

#### 7. Kompilasi Produksi dengan Rolldown & Environment Variables

Pada Vite 8, properti `rolldownOptions` menggantikan `rollupOptions` untuk mengatur berkas input multi-halaman:

```javascript
build: {
  rolldownOptions: {
    input: {
      main: path.resolve(__dirname, 'index.html'),
      counter: path.resolve(__dirname, 'counter/index.html'),
      calculator: path.resolve(__dirname, 'calculator/index.html'),
      jokes: path.resolve(__dirname, 'jokes/index.html'),
    }
  }
}
```

Variabel lingkungan dibaca melalui `import.meta.env.VITE_NAMA_VARIABEL`.

---

## 3. 💻 Struktur Proyek & Panduan Eksekusi

Struktur berkas lengkap proyek modern Vite berlokasi di direktori [08-build-tools/02-vite/](file:///home/jokosantoso/code/learn-javascript/08-build-tools/02-vite):

```text
08-build-tools/02-vite/
├── .env                       # Variabel lingkungan (VITE_)
├── index.html                 # Halaman 1: Dashboard Utama
├── package.json               # Konfigurasi npm ("type": "module")
├── vite.config.js             # Konfigurasi server, alias '@', & rolldownOptions
├── counter/index.html         # Halaman 2: State Counter Reaktif
├── calculator/index.html      # Halaman 3: Kalkulator
├── jokes/index.html           # Halaman 4: Modal Jokes Asinkron
└── src/
    ├── main.js                # Entry script Dashboard
    ├── style.css              # Styling Tailwind CSS v4
    ├── services/              # AlertService, CalculatorService, JokesService
    └── utils/                 # stateCounter (Proxy), parseInput, cekInputValid
```

### Menjalankan Proyek

Masuk ke folder proyek dan jalankan perintah npm:

```bash
cd 08-build-tools/02-vite

# 1. Menjalankan development server instan (port 3000)
npm run dev

# 2. Membangun bundle produksi teroptimasi via Rolldown
npm run build

# 3. Meninjau preview hasil rilis produksi lokal
npm run preview
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Dashboard Aplikasi Perusahaan Modern**: Menggunakan arsitektur Multi-Page Application (MPA) di mana setiap modul (Keuangan, Karyawan, Inventaris) memiliki halaman HTML terpisah namun berbagi desain sistem Tailwind CSS yang sama.
2. **Micro-Reactivity Tanpa Framework**: Menggunakan pola `Proxy` untuk membangun antarmuka interaktif yang ringan tanpa harus membebani bundle dengan ukuran React atau Vue (di bawah 10KB total ukuran JavaScript).

### ⚠️ Common Pitfalls

- **Variabel Lingkungan Tanpa Awalan `VITE_`**: Menyimpan variabel seperti `API_KEY` di berkas `.env` tidak akan terbaca di kode browser karena Vite secara sengaja memblokir variabel tanpa awalan `VITE_` demi keamanan.
- **Kesalahan Konversi `Number('') === 0`**: Mengonversi string input kosong langsung dengan `Number(input)` menghasilkan angka `0`, bukan error. Selalu periksa `input.trim() === ''` terlebih dahulu.

### 🌟 Best Practice

- Gunakan path alias `'@'` di `vite.config.js` untuk memudahkan navigasi impor berkas (`import { service } from '@/services/...'`).
- Pasang stylesheet di `<head>` untuk mencegah _Flash of Unstyled Content_ pada aplikasi multi-halaman.

---

## 5. ✍️ Latihan Mandiri

1. Tambahkan sebuah halaman fisik baru `profile/index.html` lengkap dengan file script `src/profile-page.js`. Daftarkan halaman tersebut ke dalam `rolldownOptions.input` di `vite.config.js`.
2. Buat sebuah variabel lingkungan baru di berkas `.env`: `VITE_APP_AUTHOR="Joko Santoso"`. Tampilkan nama pengarang tersebut di halaman dashboard utama menggunakan `import.meta.env.VITE_APP_AUTHOR`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sub-Modul Sebelumnya:** [01 - Webpack 5 (Tradisional Bundler)](../01-webpack/README.md)
- 🛠️ **Kembali ke Modul 08:** [08 - Build Tools](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
