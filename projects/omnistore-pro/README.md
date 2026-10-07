# 🛒 OmniStore Pro — Capstone Project

Aplikasi e-commerce modern berbasis **Multi-Page Application (MPA)** yang dibangun menggunakan **murni Vanilla JavaScript (ES Modules)**, **Tailwind CSS v4**, dan **Vite**, dengan sumber data dari **DummyJSON Products API**.

Projek ini merupakan projek akhir (*Capstone Project*) yang merangkum dan mengintegrasikan seluruh materi pembelajaran dari **Modul 01 hingga Modul 08**.

---

## 🎯 Peta Penerapan Materi Kurikulum (Modul 01 - 08)

| Modul Pembelajaran | Penerapan Nyata di Projek OmniStore Pro |
| :--- | :--- |
| **01 - Fundamentals** | Logika kalkulasi subtotal dan diskon via Higher-Order Function (`reduce`, `map`), destructuring objek, dan template literals untuk merakit UI dinamis. |
| **02 - OOP** | Enkapsulasi *private fields* (`#id`, `#price`, `#stock`) di class `Product`, pewarisan OOP di `ProductDetail extends Product`, implementasi protokol `*[Symbol.iterator]()` pada `Cart` agar bisa di-loop langsung dengan `for..of` dan `[...cart]`, serta custom error `OutOfStockError`. |
| **03 - Standard Library** | `Proxy` & `Reflect` untuk state management otomatis reaktif, `Map` untuk in-memory cache data belanjaan berkecepatan O(1), `Intl.NumberFormat` untuk pemformatan mata uang Rupiah, dan hook `toJSON()` untuk serialisasi data private ke JSON. |
| **04 - Modules** | Pemisahan kode berbasis ES Modules modern (`import`/`export`) yang bersih dan konfigurasi path alias `@/`. |
| **05 - DOM** | Rendering kartu katalog dinamis, interaktivitas galeri thumbnail foto, kontrol slide-over drawer modal, dan Event Delegation pada tombol aksi belanja. |
| **06 - Asynchronous** | Pemanggilan data API produk menggunakan `async/await` dan Fetch API, serta penanganan error jaringan. |
| **07 - Modern Web API** | `localStorage` untuk persistensi keranjang belanja, `URLSearchParams` & Browser History API agar pencarian kebal refresh, `AbortController` untuk mencegah race condition pencarian, serta `IntersectionObserver` untuk Lazy Loading gambar dan Infinite Scroll. |
| **08 - Build Tools** | Pengemasan Multi-Page Application (MPA) 2 rute halaman (`index.html` dan `product-detail/index.html`) menggunakan **Vite** serta integrasi **Tailwind CSS v4**. |

---

## ✨ Fitur-Fitur Utama Aplikasi

### 1. 🔍 Katalog & Live Search Pintar
- **Pencarian Cepat:** Pencarian kata kunci dengan jeda **Debounce (300ms)** untuk menghemat kuota dan request server.
- **Bebas Race Condition:** Didukung **AbortController** yang otomatis membatalkan request lama saat user mengetik huruf baru.
- **Pencarian Kebal Refresh (URL Persistence):** Kata kunci otomatis disimpan ke parameter query URL (`?q=...`). Saat halaman di-refresh (F5) atau user kembali dari halaman detail, pencarian dan hasil produk tidak hilang.

### 2. ⚡ Infinite Scroll & Lazy Loading Gambar
- **Lazy Loading Gambar:** Foto produk hanya di-download saat mendekati layar pengguna, dilengkapi efek transisi halus (*fade-in*).
- **Infinite Scroll Bertahap:** Memuat 10 produk di awal, menambah 10 produk setiap kali menyentuh batas bawah (sentinel), hingga batas maksimal 30 produk atau saat produk di server habis.

### 3. 🛍️ Halaman Detail Produk Dinamis
- Membaca ID produk dari parameter URL (`?id=...`).
- Menampilkan spesifikasi lengkap: nama brand, kategori, rating bintang (★), status ketersediaan stok, persentase diskon, informasi garansi 🛡️, dan info pengiriman 🚚.
- **Galeri Foto Interaktif:** Klik pada thumbnail foto langsung mengganti gambar utama dengan highlight ring hijau.

### 4. 🛒 Keranjang Belanja Reaktif & Persisten
- **Slide-over Drawer Modal:** Tampilan rincian belanjaan modern di sisi kanan layar pada kedua halaman (Katalog dan Detail).
- **Reaktivitas Otomatis:** Perubahan jumlah barang (+/-) atau penghapusan barang langsung memperbarui badge navbar dan total harga via **Proxy State**.
- **Persisten:** Belanjaan otomatis tersimpan ke `localStorage` dan pulih kembali saat browser dibuka ulang (*re-hydration*).
- **Proteksi Stok:** Memberi notifikasi peringatan jika user mencoba menambah barang melebihi stok yang tersedia (`OutOfStockError`).

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
    │   └── render-cart-modal.js  # Komponen render list belanjaan drawer
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
