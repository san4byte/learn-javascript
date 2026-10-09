# 08 - Dynamic Module Loading (Dynamic Import)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memuat file modul JavaScript secara asinkron tepat saat dibutuhkan (_on-demand / lazy loading_) saat aplikasi sedang berjalan menggunakan fungsi `import(path)`.
> - **Kapan Digunakan**: Mengoptimalkan performa waktu muat awal (_First Contentful Paint_), memecah bundle (_code-splitting_), dan menunda pengunduhan pustaka berukuran besar hingga pengguna berinteraksi (misal menekan tombol buka grafik).
> - **Aturan Praktis**: Fungsi `import(path)` mengembalikan Promise yang me-resolve _Module Namespace Object_; gunakan `const module = await import('./path.js')` di dalam blok `try...catch`.

---

## 1. 🎯 Tujuan Belajar

- Memahami perbedaan arsitektur antara **Static Import** (`import ... from`) dan **Dynamic Import** (`import()`).
- Menguasai pemanggilan fungsi `import(specifier)` berbasis Promise dan sintaks `await`.
- Mengekstraksi _named exports_ dan _default export_ secara elegan menggunakan objek destrukturisasi.
- Mengimplementasikan **Conditional Module Loading** (memuat kode hanya jika fitur diaktifkan atau peran pengguna sesuai).
- Menggunakan jalur modul dinamis (_dynamic path specifier_).
- Menangani potensi kegagalan jaringan atau modul tidak ditemukan menggunakan blok `try...catch`.
- Memahami mekanisme _caching_ internal runtime setelah modul pertama kali diunduh.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **layanan pesan-antar makanan online (_on-demand_)**: Anda tidak perlu menyimpan seluruh 100 menu makanan restoran di dalam kulkas rumah Anda sejak awal (membuat dapur penuh dan listrik boros). Anda cukup membuka aplikasi dan baru memesan makanan tertentu saat perut Anda lapar. Makanan dikirimkan secara instan saat dibutuhkan.

---

### 1. Tabel Ringkasan Fitur Dynamic Module Loading (Cheat-Sheet)

| Aspek / Fitur        | Static Import (`import ... from`)             | Dynamic Import (`import()`)                    | Keuntungan Utama                                     |
| :------------------- | :-------------------------------------------- | :--------------------------------------------- | :--------------------------------------------------- |
| **Waktu Pemuatan**   | Saat inisialisasi awal (_compile/parse time_) | Saat kode dieksekusi (_runtime_)               | Menurunkan ukuran bundle awal secara drastis.        |
| **Lokasi Penulisan** | Wajib di top-level baris paling atas          | Di mana saja (blok `if`, loop, callback event) | Fleksibilitas pemuatan bersyarat.                    |
| **Format Return**    | Variabel terikat statis                       | Mengembalikan Promise                          | Mendukung `await` dan `.then()`.                     |
| **Path String**      | Hanya string literal kaku                     | String literal atau ekspresi variabel dinamis  | Path bisa dihitung saat runtime.                     |
| **Penanganan Error** | Crash fatal sebelum aplikasi jalan            | Ditangkap anggun via `try...catch`             | Aplikasi tidak crash total jika modul gagal diambil. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja dynamic module loading beserta skenario kasusnya:

---

#### 1. Perbedaan Mendasar Static Import vs Dynamic Import

Static import dievaluasi sebelum kode baris pertama dieksekusi dan tidak dapat ditaruh di dalam fungsi. Sebaliknya, dynamic import adalah pemanggilan fungsi biasa yang dapat dipanggil kapan saja:

```javascript
// Static Import (kaku di awal file):
// import { render } from './chart.js';

// Dynamic Import (fleksibel di dalam fungsi):
async function bukaLaporan() {
  const chart = await import("./chart.js");
  chart.render();
}
```

---

#### 2. Sintaks Dynamic Import Berbasis Promise

Fungsi `import(specifier)` mengembalikan sebuah Promise yang resolve ke _Module Namespace Object_:

```javascript
import("./heavy-module.js")
  .then((modul) => {
    console.log("Modul selesai diunduh:", modul);
  })
  .catch((err) => {
    console.error("Gagal mengunduh modul:", err);
  });
```

---

#### 3. Ekstraksi Named dan Default Export Menggunakan Destructuring

Anda dapat langsung membongkar named export dan alias default export dari hasil `await`:

```javascript
const {
  renderChart,
  CHART_VERSION,
  default: config,
} = await import("./heavy-module.js");

console.log("Versi:", CHART_VERSION);
console.log("Tema Default:", config.theme);
renderChart([10, 20, 30]);
```

---

#### 4. Pemuatan Modul Bersyarat (_Conditional / Feature-Flag Loading_)

Modul hanya diunduh dari server jika kondisi bisnis tertentu terpenuhi:

```javascript
if (user.role === "ADMIN") {
  // Hanya admin yang mengunduh modul panel kontrol administrasi:
  const adminPanel = await import("./admin-dashboard.js");
  adminPanel.init();
}
```

---

#### 5. Specifier Jalur Dinamis (_Dynamic Specifier Strings_)

Jalur file target dapat dibentuk secara dinamis menggunakan variabel string (misalnya lokalisasi multi-bahasa):

```javascript
async function muatBahasa(kodeBahasa) {
  // Memuat ./i18n/id.js atau ./i18n/en.js secara dinamis:
  const terjemahan = await import(`./i18n/${kodeBahasa}.js`);
  return terjemahan.default;
}
```

---

#### 6. Penanganan Kesalahan Jaringan via `try...catch`

Karena dynamic import melakukan _fetch_ file baru melalui jaringan internet saat runtime, kegagalan koneksi dapat ditangani tanpa merusak aplikasi:

```javascript
try {
  const payment = await import("./gateway-stripe.js");
  payment.process();
} catch (error) {
  console.log("Koneksi gagal atau file modul tidak ada:", error.message);
  // Tampilkan pesan error ramah pengguna di UI
}
```

---

#### 7. Pemanfaatan Cache Internal Runtime

Engine JavaScript menerapkan mekanisme _singleton cache_: Jika modul yang sama dipanggil ulang lewat `import()`, browser/Node.js tidak akan mengunduhnya kembali melainkan langsung mengembalikan instance dari memori cache:

```javascript
await import("./heavy.js"); // 1. Melakukan network request
await import("./heavy.js"); // 2. Langsung dibaca dari cache memori tanpa unduh ulang!
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep dynamic import di atas—mulai dari eksekusi top-level `await import()`, ekstraksi named dan default export, conditional loading, penanganan error jaringan/file hilang via `try...catch`, hingga listener interaksi browser—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js), [`heavy-module.js`](./heavy-module.js), [`index.html`](./index.html)

```bash
# Jalankan langsung dari terminal:
node 04-modules/08-dynamic-module-loading/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Route-Based Code Splitting**: Pada Single Page Application (SPA / React / Vue), halaman seperti `/dashboard` atau `/pengaturan` hanya diunduh saat pengguna mengunjungi rute URL tersebut.
2. **Heavy Third-Party Libraries**: Mengunduh modul PDF generator (seperti `jspdf`) atau rich text editor hanya saat tombol "Export PDF" atau "Tulis Artikel" ditekan.
3. **Internasionalisasi (i18n)**: Hanya mengunduh berkas kamus bahasa Indonesia (`id.js`) jika pengguna memilih bahasa Indonesia.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Menangani Error Jaringan**: Mengasumsikan `await import()` selalu sukses tanpa blok `try...catch`. Jika internet pengguna putus di tengah jalan, promise akan ter-reject tanpa penanganan (_Unhandled Promise Rejection_).
- **Overusing Dynamic Import untuk Modul Ringan**: Memecah file yang hanya berukuran 2 baris menjadi dynamic import justru memperlambat performa karena menambah overhead HTTP request round-trip.

### 🌟 Best Practice

- Selalu pasang visual feedback (indikator loading spinner atau skeleton loader) di UI saat menunggu proses `import()` selesai.
- Terapkan _prefetching_ atau _preloading_ (`<link rel="modulepreload">`) untuk modul penting yang kemungkinan besar akan segera diklik oleh user.

---

## 5. ✍️ Latihan Mandiri

1. Buat file `kalkulator-pajak.js` dengan fungsi `hitungPajak(nominal)`.
2. Di file `main.js`, gunakan `await import('./kalkulator-pajak.js')` di dalam fungsi async untuk menghitung pajak hanya saat dipicu.
3. Sengaja ketik nama file yang salah di dalam `import("./tidak-ada.js")`, tangkap error-nya menggunakan blok `try...catch`, dan cetak pesan kesalahan yang mudah dipahami ke terminal.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07 - Aggregating Modules](../07-aggregating-modules/README.md)
- ➡️ **Selanjutnya:** [01 - Modul 05 (JavaScript DOM)](../../05-dom/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
