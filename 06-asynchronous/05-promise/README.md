# 05 - Promise (Konsep Pending, Fulfilled, dan Rejected)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Merepresentasikan nilai atau status keberhasilan/kegagalan dari suatu proses asinkron yang akan diselesaikan di masa depan.
> - **Kapan Digunakan**: Seluruh operasi asinkron modern di browser dan Node.js (Fetch API, database queries, crypto, animasi, timer modular).
> - **Aturan Praktis**: Selalu akhiri rantai pemanggilan `.then()` dengan satu penangan `.catch()` di bagian terbawah untuk menangkap seluruh potensi error yang terjadi di tingkatan rantai mana pun. Gunakan `.finally()` untuk mematikan status _loading_.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep Promise sebagai objek janji nilai masa depan (_future value representation_).
- Menguasai 3 status (_states_) siklus hidup Promise: `pending`, `fulfilled`, dan `rejected`.
- Mampu membuat fungsi asinkron kustom menggunakan konstruktor `new Promise((resolve, reject) => {})`.
- Menguasai teknik perantaian (_Promise Chaining_) dengan `.then()`, `.catch()`, dan `.finally()`.
- Memahami cara membuat Promise instan melalui method statis `Promise.resolve()` dan `Promise.reject()`.
- Mengetahui cara menghindari _anti-pattern_ bersarang di dalam Promise.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan Anda memesan paket makanan di **restoran cepat saji (McD / KFC)**:
>
> - Anda membayar di kasir dan kasir memberikan selembar **struk nomor antrean** (Objek Promise).
> - Status pesanan Anda saat ini adalah **`pending`** (sedang diproses di dapur, Anda bebas duduk di meja santai).
> - Jika ayam dan kentang Anda siap, kasir memanggil nomor Anda: status berubah menjadi **`fulfilled`** dan Anda mengambil makanan Anda (**`.then()`**).
> - Jika stok ayam habis, kasir meminta maaf: status berubah menjadi **`rejected`** dan Anda mengambil opsi pengembalian dana (**`.catch()`**).
> - Apapun hasilnya (kenyang makan atau uang kembali), Anda wajib mengembalikan nampan atau membuang tisu ke tempat sampah (**`.finally()`**).

---

### Diagram Siklus Hidup Status Promise

```text
                       +-------------------+
                       |      PROMISE      |
                       |    (new Promise)  |
                       +---------+---------+
                                 |
                                 v
                       +-------------------+
                       |      PENDING      | (Operasi sedang berjalan)
                       +---------+---------+
                                 |
                 +---------------+---------------+
                 |                               |
    resolve(data)|                   reject(err) |
                 v                               v
       +-------------------+           +-------------------+
       |     FULFILLED     |           |     REJECTED      |
       |      (Sukses)     |           |      (Gagal)      |
       +---------+---------+           +---------+---------+
                 |                               |
                 v                               v
             .then(...)                     .catch(...)
                 |                               |
                 +---------------+---------------+
                                 |
                                 v
                       +-------------------+
                       |      SETTLED      |
                       |    .finally(...)  | (Pasti dijalankan)
                       +-------------------+
```

---

### Tabel Ringkasan Method Instance Promise

| Method Instance       | Menerima Callback | Return Value   | Tujuan Utama                                                              |
| :-------------------- | :---------------- | :------------- | :------------------------------------------------------------------------ |
| `.then(onFulfilled)`  | `(data) => any`   | `Promise` Baru | Menangani nilai sukses dan meneruskannya ke rantai berikutnya.            |
| `.catch(onRejected)`  | `(error) => any`  | `Promise` Baru | Menangkap penolakan (_rejection_) atau error runtime di seluruh rantai.   |
| `.finally(onFinally)` | `() => void`      | `Promise` Baru | Menjalankan kode pembersihan (_cleanup_) tanpa mempedulikan status akhir. |

---

### Pembahasan Mendalam Fitur & API

#### 1. Tiga Status Utama Promise

Objek Promise bersifat _immutable_ setelah statusnya berubah:

1. **`pending`**: Status awal ketika operasi belum selesai.
2. **`fulfilled`**: Operasi berhasil diselesaikan (`resolve(data)` dipanggil).
3. **`rejected`**: Operasi gagal atau melempar eksepsi (`reject(error)` dipanggil).

#### 2. Membuat Objek dengan Konstruktor `new Promise(executor)`

Fungsi executor menerima 2 parameter pengendali: `resolve` dan `reject`.

```javascript
const janji = new Promise((resolve, reject) => {
  const sukses = true;
  if (sukses) resolve("Data berhasil dimuat");
  else reject(new Error("Gagal memuat"));
});
```

#### 3. Fungsi `resolve()` vs `reject()`

- `resolve(nilai)`: Mengubah status dari `pending` ke `fulfilled` dan mengirimkan nilai hasil ke `.then()`.
- `reject(alasan)`: Mengubah status dari `pending` ke `rejected` dan mengirimkan objek error ke `.catch()`.

```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

#### 4. Mengonsumsi Hasil Sukses dengan `.then()`

Callback di dalam `.then()` akan dieksekusi di _Microtask Queue_ segera setelah Promise berstatus `fulfilled`.

```javascript
delay(100).then(() => {
  console.log("100 milidetik telah berlalu!");
});
```

#### 5. Menangkap Error Terpusat dengan `.catch()`

Menyerap error yang terjadi di executor awal atau di dalam salah satu callback `.then()`.

```javascript
Promise.reject(new Error("Akses ditolak"))
  .then((res) => console.log(res))
  .catch((err) => console.error("Pesan error:", err.message));
```

#### 6. Eksekusi Pembersihan Mutlak dengan `.finally()`

Tidak menerima argumen data apa pun, dan pasti dieksekusi di akhir operasi. Sangat ideal untuk menyembunyikan _loading spinner_.

```javascript
ambilData()
  .then(tampilkanKeLayar)
  .catch(tampilkanPesanError)
  .finally(() => {
    loadingSpinner.style.display = "none"; // Selalu dieksekusi
  });
```

#### 7. Pola Rantai Nilai (Promise Chaining)

Nilai yang di-return dari callback `.then()` pertama akan otomatis dibungkus menjadi Promise baru dan diterima sebagai argumen di `.then()` kedua.

```javascript
Promise.resolve(10)
  .then((angka) => angka * 2) // mengembalikan 20
  .then((angka) => angka + 5) // mengembalikan 25
  .then((hasil) => console.log(hasil)); // Output: 25
```

#### 8. Membuat Promise Instan: `Promise.resolve()` dan `Promise.reject()`

Membuat objek Promise yang sudah berstatus terselesaikan tanpa perlu menulis blok konstruktor baru.

```javascript
const suksesInstan = Promise.resolve("Nilai cepat");
const gagalInstan = Promise.reject(new Error("Validasi gagal"));
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi pembuatan Promise kustom dengan verifikasi saldo, perantaian nilai (_Promise Chaining_), penanganan error terpusat pada blok `.catch()`, penggunaan `.finally()`, dan pembuatan Promise instan telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 06-asynchronous/05-promise/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Wrapper Timeout untuk Permintaan Jaringan**:
   ```javascript
   function fetchWithTimeout(url, batasWaktuMs) {
     return new Promise((resolve, reject) => {
       const timer = setTimeout(
         () => reject(new Error("Request Timeout!")),
         batasWaktuMs,
       );
       fetch(url)
         .then((res) => {
           clearTimeout(timer);
           resolve(res);
         })
         .catch((err) => {
           clearTimeout(timer);
           reject(err);
         });
     });
   }
   ```

### ⚠️ Common Pitfalls

- **Promise Hell (Nesting .then di dalam .then)**: Menulis `.then()` bersarang di dalam `.then()` lainnya alih-alih me-return Promise dan merantainya secara horizontal. Ini mengulangi kesalahan Callback Hell.
- **Lupa Menambahkan `.catch()`**: Promise yang ditolak (_rejected_) tanpa penangan `.catch()` akan memicu peringatan berbahaya `UnhandledPromiseRejection` yang pada runtime Node.js modern dapat menghentikan paksa aplikasi (_process crash_).
- **Lupa Return Nilai pada Chaining**: Jika Anda tidak me-return nilai di dalam `.then()`, callback `.then()` berikutnya akan menerima nilai `undefined`.

### 🌟 Best Practice

- Selalu lemparkan objek `Error` asli pada `reject(new Error('pesan'))`, jangan hanya me-reject string mentah `reject('pesan')`, agar informasi jejak baris (_stack trace_) tidak hilang.
- Manfaatkan `.finally()` untuk semua logika pembersihan sumber daya (_resource cleanup_).

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `lemparDadu()` yang mengembalikan Promise. Jika angka acak yang dihasilkan adalah 4, 5, atau 6, lakukan `resolve("Menang: " + angka)`. Jika angka 1, 2, atau 3, lakukan `reject(new Error("Kalah: " + angka))`.
2. Konsumsi fungsi tersebut dengan `.then()`, `.catch()`, dan tambahkan `.finally()` yang mencetak `"Permainan dadu selesai."`.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [04 - AJAX XMLHttpRequest](../04-ajax-xmlhttprequest/README.md)
- ➡️ **Materi Selanjutnya:** [06 - Promise Concurrency](../06-promise-concurrency/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
