# 🛒 OmniStore Pro — Capstone Project

Aplikasi e-commerce modern berbasis **Multi-Page Application (MPA)** yang dibangun menggunakan **murni Vanilla JavaScript (ES Modules)**, **Tailwind CSS v4**, dan **Vite**, dengan sumber data dari **DummyJSON Products API**.

Projek ini merupakan projek akhir (_Capstone Project_) yang merangkum dan mengintegrasikan seluruh materi pembelajaran dari **Modul 01 hingga Modul 08**.

---

## 🎯 Peta Penerapan Materi Kurikulum (Modul 01 - 08)

| Modul Pembelajaran        | Penerapan Nyata di Projek OmniStore Pro                                                                                                                                                                                                                                                    |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01 - Fundamentals**     | Logika kalkulasi subtotal dan diskon via Higher-Order Function (`reduce`, `map`), destructuring objek, dan template literals untuk merakit UI dinamis.                                                                                                                                     |
| **02 - OOP**              | Enkapsulasi _private fields_ (`#id`, `#price`, `#stock`) di class `Product`, pewarisan OOP di `ProductDetail extends Product`, implementasi protokol `*[Symbol.iterator]()` pada `Cart` agar bisa di-loop langsung dengan `for..of` dan `[...cart]`, serta custom error `OutOfStockError`. |
| **03 - Standard Library** | `Proxy` & `Reflect` untuk state management otomatis reaktif, `Map` untuk in-memory cache data belanjaan berkecepatan O(1), `Intl.NumberFormat` untuk pemformatan mata uang Rupiah, dan hook `toJSON()` untuk serialisasi data private ke JSON.                                             |
| **04 - Modules**          | Pemisahan kode berbasis ES Modules modern (`import`/`export`) yang bersih dan konfigurasi path alias `@/`.                                                                                                                                                                                 |
| **05 - DOM**              | Rendering kartu katalog dinamis, interaktivitas galeri thumbnail foto, kontrol slide-over drawer modal, dan Event Delegation pada tombol aksi belanja.                                                                                                                                     |
| **06 - Asynchronous**     | Pemanggilan data API produk menggunakan `async/await` dan Fetch API, serta penanganan error jaringan.                                                                                                                                                                                      |
| **07 - Modern Web API**   | `localStorage` untuk persistensi keranjang belanja, `URLSearchParams` & Browser History API agar pencarian kebal refresh, `AbortController` untuk mencegah race condition pencarian, serta `IntersectionObserver` untuk Lazy Loading gambar dan Infinite Scroll.                           |
| **08 - Build Tools**      | Pengemasan Multi-Page Application (MPA) 2 rute halaman (`index.html` dan `product-detail/index.html`) menggunakan **Vite** serta integrasi **Tailwind CSS v4**.                                                                                                                            |

---

## ✨ Fitur-Fitur Utama Aplikasi

### 1. 🔍 Katalog & Live Search Pintar

- **Pencarian Cepat:** Pencarian kata kunci dengan jeda **Debounce (300ms)** untuk menghemat kuota dan request server.
- **Bebas Race Condition:** Didukung **AbortController** yang otomatis membatalkan request lama saat user mengetik huruf baru.
- **Pencarian Kebal Refresh (URL Persistence):** Kata kunci otomatis disimpan ke parameter query URL (`?q=...`). Saat halaman di-refresh (F5) atau user kembali dari halaman detail, pencarian dan hasil produk tidak hilang.

### 2. ⚡ Infinite Scroll & Lazy Loading Gambar

- **Lazy Loading Gambar:** Foto produk hanya di-download saat mendekati layar pengguna, dilengkapi efek transisi halus (_fade-in_).
- **Infinite Scroll Bertahap:** Memuat 10 produk di awal, menambah 10 produk setiap kali menyentuh batas bawah (sentinel), hingga batas maksimal 30 produk atau saat produk di server habis.

### 3. 🛍️ Halaman Detail Produk Dinamis

- Membaca ID produk dari parameter URL (`?id=...`).
- Menampilkan spesifikasi lengkap: nama brand, kategori, rating bintang (★), status ketersediaan stok, persentase diskon, informasi garansi 🛡️, dan info pengiriman 🚚.
- **Galeri Foto Interaktif:** Klik pada thumbnail foto langsung mengganti gambar utama dengan highlight ring hijau.

### 4. 🛒 Keranjang Belanja Reaktif & Persisten

- **Slide-over Drawer Modal:** Tampilan rincian belanjaan modern di sisi kanan layar pada kedua halaman (Katalog dan Detail).
- **Reaktivitas Otomatis:** Perubahan jumlah barang (+/-) atau penghapusan barang langsung memperbarui badge navbar dan total harga via **Proxy State**.
- **Persisten:** Belanjaan otomatis tersimpan ke `localStorage` dan pulih kembali saat browser dibuka ulang (_re-hydration_).
- **Proteksi Stok:** Memberi notifikasi peringatan jika user mencoba menambah barang melebihi stok yang tersedia (`OutOfStockError`).

---

## ⚡ Arsitektur Reaktivitas: Deep Dive Proxy & Reflect

OmniStore Pro mengimplementasikan manajemen state reaktif modern secara murni menggunakan fitur bawaan JavaScript (**Vanilla JS**) tanpa membutuhkan library eksternal (seperti Redux atau Zustand). Seluruh sistem ini dikelola di dalam file [`src/state/store.js`](src/state/store.js).

### 1. Peran `Proxy` sebagai Sensor Perubahan

Objek asli `rawState` sengaja tidak diekspor keluar. Yang dibagikan ke seluruh aplikasi adalah objek `state` yang telah dibungkus oleh **`Proxy`**.
Setiap kali komponen aplikasi melakukan penugasan nilai (misal: `state.cart = ...` atau `state.searchQuery = 'sepatu'`), operasi tersebut dicegat oleh handler trap `set(target, prop, value, receiver)`.

### 2. Mengapa Menggunakan `Reflect.set` di Awal Trap?

```javascript
const success = Reflect.set(target, prop, value, receiver);

if (success) {
  if (prop === 'cart') {
    saveCart(target.cart.toJSON());
  }
  listeners.forEach((callback) => callback(target, prop));
}
return success;
```

- **Eksekusi Resmi & Integritas Status:** `Reflect.set()` secara standar menulis nilai baru ke objek target dan mengembalikan status boolean (`true`/`false`).
- **Mencegah Bug Timing (Data Lama vs Data Baru):**
  Jika `Reflect.set` ditaruh di akhir trap, maka saat `saveCart()` dan `listeners` dieksekusi, data pada `target.cart` **masih berupa data lama sebelum perubahan**. Akibatnya, `localStorage` menyimpan data usang dan tampilan layar UI terlambat satu langkah. Dengan mengeksekusi `Reflect.set` di awal, data dipastikan **sudah resmi sah masuk ke objek asli**, barulah notifikasi dan backup dilakukan dengan data terkini.
- **Kapan `Reflect.set` di Awal vs di Akhir:**
  - **Di Awal (Post-processing):** Digunakan saat kita butuh mengabari pihak luar (`listeners`) dan menyimpan backup (`saveCart`) dengan data yang **sudah sah diperbarui**.
  - **Di Akhir (Pre-processing):** Digunakan jika kita butuh melakukan validasi atau sanitasi terlebih dahulu (misal: memeriksa hak akses, menolak nilai negatif) sebelum mengizinkan data masuk ke objek asli.

### 3. Trik Pemicu Reaktivitas (`state.cart = state.cart`)

Class `Cart` mengenkapsulasi barang belanjaan di dalam private `Map` (`#items`). Ketika memanggil method mutasi internal seperti `state.cart.addItem(product)`, objek di dalam keranjang berubah, tetapi referensi variabel `state.cart` itu sendiri tidak mengalami penugasan ulang (_re-assignment_).
Oleh karena itu, penugasan ulang `state.cart = state.cart;` digunakan sebagai sinyal penugasan formal agar sensor trap `set()` pada Proxy terpicu, sehingga sinkronisasi `localStorage` dan pembaruan UI dieksekusi secara instan.

### 4. Pola Pub/Sub (`subscribe` & `Set`)

- Menggunakan struktur data `new Set()` untuk menampung fungsi pendengar (_listeners_) agar callback tidak terdaftar duplikat.
- Memisahkan logika manipulasi data (_State_) dengan manipulasi tampilan (_DOM_), sehingga komponen UI di halaman beranda (`main.js`) dan halaman detail (`product-detail.js`) menjadi bersih dan tidak terikat (_loosely coupled_).

---

## 📂 Struktur Direktori Projek

```text
omnistore-pro/
├── index.html                    # Halaman Utama (Katalog & Keranjang)
├── product-detail/
│   └── index.html                # Halaman Detail Produk (?id=...)
├── vite.config.js                # Konfigurasi Vite MPA & Alias @/
├── package.json
├── .prettierrc                   # Konfigurasi standar format Prettier
│
└── src/
    ├── style.css                 # Import Tailwind CSS v4
    ├── main.js                   # Entry point Halaman Katalog
    ├── product-detail.js         # Entry point Halaman Detail
    │
    ├── models/                   # [Modul 02: OOP]
    │   ├── product.model.js      # Class Product (Private fields, getter harga)
    │   ├── product-detail.model.js# Class ProductDetail (OOP Inheritance)
    │   ├── cart.model.js         # Class Cart (Map, Iterable, toJSON)
    │   └── errors.js             # Custom Error (OutOfStockError, NetworkError)
    │
    ├── services/                 # [Modul 06 & 07: Async & Storage]
    │   ├── api.js                # DummyJSON API & AbortController
    │   └── storage.js            # Helper baca/tulis localStorage
    │
    ├── state/                    # [Modul 03: Reactive State]
    │   └── store.js              # State Store berbasis Proxy & Reflect
    │
    ├── ui/                       # [Modul 05: DOM UI Components]
    │   ├── render-products.js    # Komponen render grid kartu produk
    │   ├── render-detail.js      # Komponen render rincian produk & galeri
    │   ├── render-cart-modal.js  # Komponen render list belanjaan drawer
    │   └── cart-drawer.js        # Kontrol terpusat modal keranjang & reaktivitas
    │
    └── utils/                    # [Modul 01, 03, 07: Helper Utilities]
        ├── debounce.js           # Helper debounce untuk input search
        ├── observer.js           # Helper IntersectionObserver (Lazy Load & Scroll)
        └── format-currency.js    # Helper pemformat Rupiah (Intl.NumberFormat)
```

---

## 🚀 Panduan Menjalankan Projek

### 1. Menjalankan Server Pengembangan (Dev Server)

```bash
npm run dev
```

Buka alamat yang tertera di terminal (biasanya `http://localhost:5173`) di browser.

### 2. Membangun Bundel Rilis Produksi (Production Build)

```bash
npm run build
```

Seluruh file HTML, JavaScript, dan CSS akan dioptimasi dan dikemas ke dalam folder `dist/`.

### 3. Meninjau Hasil Produksi (Production Preview)

```bash
npm run preview
```

---

## 🧭 Navigasi

- ⬅️ **Modul Teori Sebelumnya:** [08 - Build Tools & Ecosystem](../../08-build-tools/README.md)
- 🎮 **Koleksi Mini Projects:** [Mini Projects (WPU Series)](../mini-projects/README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
