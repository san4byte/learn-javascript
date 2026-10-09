# 14 - Error Handling Class (Error, throw, try..catch..finally)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengendalikan dan memulihkan aplikasi dari kondisi kesalahan (_exceptional states_) secara terstruktur menggunakan blok `try...catch...finally` serta melempar objek instance class `Error`.
> - **Kapan Digunakan**: Memvalidasi argumen yang rusak, menangani kegagalan operasi I/O (jaringan/database/file), dan menjamin pembersihan resource memori (_cleanup_).
> - **Aturan Praktis**: Selalu gunakan `throw new Error("pesan")` (objek instansiasi resmi) daripada melempar tipe data primitif string atau angka.

---

## 1. 🎯 Tujuan Belajar

- Memahami penanganan kesalahan berbasis OOP di JavaScript.
- Memahami anatomi dan properti utama class bawaan **`Error`** (`message`, `name`, `stack`, `cause`).
- Menguasai pelemparan exception menggunakan kata kunci **`throw`**.
- Menguasai penangkapan dan isolasi kegagalan menggunakan blok **`try...catch`** agar aplikasi tidak berhenti (_crash_).
- Mengetahui jaminan eksekusi pada blok **`finally`** untuk operasi pembersihan (_cleanup_).
- Membedakan berbagai subclass error bawaan JavaScript (`TypeError`, `RangeError`, `ReferenceError`, `SyntaxError`, `URIError`).
- Memahami strategi **Error Re-throwing** dan **Error Chaining** menggunakan opsi `{ cause }` (ES2022).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **sistem rem darurat dan pintu keselamatan lift gedung bertingkat**: Jika sensor mendeteksi kabel baja lift putus atau kelebihan beban (`throw new Error`), rem magnetik darurat langsung mencengkeram rel agar kereta lift tidak jatuh bebas ke dasar gedung (`catch`). Baik lift tiba dengan selamat maupun tertahan darurat, lampu penerangan darurat dan pintu evakuasi gedung selalu dibuka untuk menjamin keselamatan penumpang (`finally`).

---

### 1. Tabel Ringkasan Fitur Error Handling (Cheat-Sheet)

| Konstruk / Fitur   | Sintaks                   | Peran / Dampak                                | Kapan Dieksekusi                               |
| :----------------- | :------------------------ | :-------------------------------------------- | :--------------------------------------------- |
| **`throw`**        | `throw new Error(...)`    | Menghentikan alur normal dan memicu exception | Saat kondisi abnormal terdeteksi.              |
| **`try`**          | `try { ... }`             | Membungkus blok kode berisiko                 | Selalu dieksekusi pertama kali.                |
| **`catch (err)`**  | `catch (err) { ... }`     | Mengisolasi error dan menangkap objek error   | Hanya jika terjadi exception di dalam `try`.   |
| **`finally`**      | `finally { ... }`         | Pembersihan resource (_cleanup_)              | **Selalu**, baik sukses maupun error.          |
| **Subclass Error** | `TypeError`, `RangeError` | Spesifikasi kategori error standar            | Sesuai jenis kegagalan tipe data/rentang.      |
| **Error Chaining** | `{ cause: err }`          | Menautkan akar permasalahan (root cause)      | Saat membungkus low-level error ke high-level. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap fitur error handling berbasis class beserta skenario kasusnya:

---

#### 1. Anatomi dan Properti Class `Error`

Objek instansiasi `Error` memiliki tiga properti utama:

- `name`: Nama kelas error (default `"Error"`).
- `message`: Pesan deskripsi kesalahan yang mudah dibaca manusia.
- `stack`: Jejak riwayat pemanggilan fungsi (_stack trace_) untuk memudahkan debugging.

```javascript
const err = new Error('Koneksi gagal');
console.log(err.name); // "Error"
console.log(err.message); // "Koneksi gagal"
console.log(err.stack); // String urutan baris kode sumber
```

---

#### 2. Kata Kunci `throw` untuk Melempar Exception

Kata kunci `throw` menghentikan eksekusi kode saat ini secara instan dan mencari penampung `catch` terdekat:

```javascript
function validasiUmur(umur) {
  if (umur < 0) {
    throw new Error('Umur tidak boleh bernilai negatif!');
  }
  return umur;
}
```

---

#### 3. Struktur Pengawasan Blok `try...catch`

Kode yang berisiko diletakkan di dalam `try`. Jika terjadi error, JavaScript langsung melompat ke blok `catch` tanpa menghentikan aplikasi secara total:

```javascript
try {
  validasiUmur(-5);
  console.log('Baris ini tidak akan pernah dijalankan.');
} catch (error) {
  console.log(`Tertangkap: ${error.message}`); // "Tertangkap: Umur tidak boleh bernilai negatif!"
}

console.log('Aplikasi tetap selamat dan terus berjalan normal!');
```

---

#### 4. Jaminan Pembersihan pada Blok `finally`

Blok `finally` selalu dijalankan dalam kondisi apa pun—bahkan jika blok `try` berhasil, melempar error, atau melakukan `return` di tengah jalan:

```javascript
function ambilData() {
  let fileTerbuka = true;
  try {
    throw new Error('Gagal membaca byte');
  } catch (e) {
    console.log('Penanganan error.');
  } finally {
    fileTerbuka = false; // Dijamin selalu dieksekusi!
    console.log('File berhasil ditutup dengan aman.');
  }
}

ambilData();
```

---

#### 5. Subclass Error Bawaan JavaScript

JavaScript memiliki beberapa kelas error bawaan untuk mengindikasikan jenis kegagalan secara tepat:

- `TypeError`: Tipe data tidak sesuai (misal memanggil non-function).
- `RangeError`: Angka berada di luar jangkauan valid.
- `ReferenceError`: Mengakses variabel yang belum didefinisikan.
- `SyntaxError`: Kesalahan tata bahasa sintaks kode.

```javascript
function parseKapasitas(n) {
  if (typeof n !== 'number') throw new TypeError('Harus berupa number!');
  if (n < 0 || n > 100) throw new RangeError('Harus antara 0 - 100!');
}
```

---

#### 6. Mekanisme Melempar Ulang (_Error Re-throwing_)

Jika suatu blok `catch` mendeteksi bahwa error yang tertangkap bukan wewenang yang bisa ditangani, lemparkan kembali error tersebut ke pemanggil atas:

```javascript
try {
  eksekusiTugas();
} catch (err) {
  if (err instanceof TypeError) {
    console.log('Tangani TypeError lokal.');
  } else {
    // Lempar ulang ke luar agar layer induk tahu
    throw err;
  }
}
```

---

#### 7. Rantai Penyebab Error dengan Opsi `cause` (ES2022)

Anda dapat membungkus error sistem (low-level) ke dalam error domain bisnis tingkat tinggi tanpa kehilangan informasi akar masalah aslinya:

```javascript
try {
  koneksiKeDatabaseServer();
} catch (dbErr) {
  throw new Error('Registrasi Pengguna Gagal', { cause: dbErr });
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep error handling berbasis class di atas—mulai dari anatomi class Error, alur try-catch-finally, berbagai subclass bawaan, re-throwing error, hingga error chaining dengan opsi `cause`—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/14-error-handling-class/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **API Request Pipeline**: Menangkap kegagalan jaringan HTTP atau timeout request, mematikan loader animasi di UI via `finally`, lalu menampilkan pesan ramah pengguna.
2. **Parser Konfigurasi**: Membaca file format JSON/YAML; jika file rusak, melempar pesan kesalahan yang jelas dan mudah dipahami developer.
3. **Pembersihan Resource / Lock**: Melepaskan _lock file_ atau koneksi socket di blok `finally` untuk mencegah _memory leak_ atau _connection leak_.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Menelan Error Tanpa Suara (_Swallowing Errors / Silent Failure_)**: Menulis `catch (e) {}` kosong tanpa mencatat log menyebabkan bug tersembunyi berbulan-bulan tanpa jejak.
- **Melempar Tipe Primitif**: Menggunakan `throw "Terjadi error"` membuat Anda kehilangan properti `.stack` dan kemampuan pengecekan `instanceof Error`.
- **Menimpa Return di `finally`**: Menaruh perintah `return` di dalam blok `finally` akan menimpa seluruh `return` atau `throw` yang terjadi di blok `try` dan `catch`.

### 🌟 Best Practice

- Selalu lemparkan instance turunan dari `Error`.
- Batasi cakupan kode di dalam blok `try` sespesifik mungkin agar mudah mendeteksi baris penyebab masalah.
- Gunakan blok `finally` secara eksklusif untuk logika _cleanup_ (menutup file, mematikan koneksi, reset state).

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `hitungDiskon(harga, persen)` yang melempar `TypeError` jika argumen bukan number, dan melempar `RangeError` jika persen bernilai $< 0$ atau $> 100$.
2. Uji fungsi `hitungDiskon` dalam blok `try...catch` dan pisahkan penanganan error berdasarkan kelas errornya menggunakan `instanceof`.
3. Tunjukkan penggunaan blok `finally` untuk mencatat waktu akhir proses transaksi, terlepas dari apakah transaksi berhasil atau gagal.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [13 - Static Method](../13-static-method/README.md)
- ➡️ **Selanjutnya:** [15 - Custom Error Class](../15-custom-error/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
