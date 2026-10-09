# 15 - Custom Error Class

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membuat kelas error khusus yang mewarisi class `Error` bawaan (`class MyError extends Error`) untuk memperkaya konteks kesalahan dengan metadata spesifik aplikasi.
> - **Kapan Digunakan**: Mengklasifikasikan jenis kegagalan domain bisnis (misal `ValidationError`, `NotFoundError`, `UnauthorizedError`) agar dapat ditangani secara terarah dan terstandarisasi.
> - **Aturan Praktis**: Wajib panggil `super(message)`, setel `this.name = this.constructor.name`, dan tambahkan metadata penting seperti `statusCode`.

---

## 1. 🎯 Tujuan Belajar

- Memahami arsitektur pembuatan class error kustom melalui pewarisan (`extends Error`).
- Mengetahui pentingnya memanggil `super(message)` untuk menjaga integritas pesan dan jejak eksekusi (_stack trace_).
- Menyesuaikan properti `this.name` agar mencerminkan nama kelas anak secara otomatis.
- Menambahkan metadata kontekstual pada objek error (seperti kode status HTTP, nama field input, atau timestamp).
- Memahami peran optimasi `Error.captureStackTrace` pada runtime Node.js/V8.
- Membangun hierarki error berlapis (_BaseAppError_ $\rightarrow$ _SpecificError_).
- Mengimplementasikan serialisasi standar JSON (`toJSON()`) untuk format response API RESTful.
- Menguasai perutean (_error routing_) berbasis operator `instanceof` di lapisan penanganan global.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **kode darurat rumah sakit**: Alih-alih pengumuman darurat hanya berbunyi samar "Ada masalah di gedung!", petugas mengumumkan kode spesifik seperti _Code Blue_ (henti napas/jantung, dokter spesialis langsung bergerak), _Code Red_ (kebakaran, petugas damkar evakuasi), atau _Code Silver_ (gangguan keamanan). Informasi spesifik memungkinkan respons cepat dan akurat.

---

### 1. Tabel Ringkasan Fitur Custom Error Class (Cheat-Sheet)

| Komponen / Properti   | Sintaks / Implementasi               | Manfaat Utama                                | Contoh Nilai                      |
| :-------------------- | :----------------------------------- | :------------------------------------------- | :-------------------------------- |
| **Pewarisan Kelas**   | `class MyError extends Error`        | Mewarisi sifat bawaan error JS               | Instance sah dari `Error`.        |
| **Super Constructor** | `super(message)`                     | Membentuk properti `message` & `stack`       | `"Data tidak valid"`.             |
| **Identitas Nama**    | `this.name = this.constructor.name`  | Memperbarui nama error di konsol             | `"ValidationError"`.              |
| **Metadata Khusus**   | `this.statusCode = 404`              | Membawa konteks layer HTTP/Domain            | `404`, `field: "email"`.          |
| **Stack Cleaning**    | `Error.captureStackTrace(this, ...)` | Menghapus constructor dari jejak stack trace | Jejak baris kode bersih.          |
| **Serialisasi API**   | `toJSON() { ... }`                   | Standarisasi respons error JSON              | `{ success: false, error: ... }`. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja custom error class beserta skenario kasusnya:

---

#### 1. Sintaks Dasar: `class MyError extends Error`

Pewarisan langsung dari `Error` memungkinkan objek buatan Anda dikenali oleh mesin JavaScript sebagai exception resmi:

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message); // Memanggil constructor Error bawaan
    this.name = 'ValidationError';
  }
}

const err = new ValidationError('Email tidak valid');
console.log(err instanceof Error); // true ✅
console.log(err instanceof ValidationError); // true ✅
```

---

#### 2. Penyesuaian Nama Otomatis: `this.name = this.constructor.name`

Agar setiap subclass memiliki nama yang sesuai tanpa perlu menuliskannya secara manual di setiap constructor:

```javascript
class BaseAppError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // Otomatis bernilai nama class turunan
  }
}

class DatabaseError extends BaseAppError {}
console.log(new DatabaseError('Koneksi putus').name); // "DatabaseError"
```

---

#### 3. Menambahkan Metadata Kontekstual Aplikasi

Custom error dapat menampung variabel apa pun yang membantu proses debugging atau pembuatan pesan balasan ke pengguna:

```javascript
class FormInputError extends Error {
  constructor(message, field, invalidValue) {
    super(message);
    this.name = 'FormInputError';
    this.field = field;
    this.invalidValue = invalidValue;
  }
}

const err = new FormInputError('Umur harus positif', 'age', -5);
console.log(err.field); // "age"
console.log(err.invalidValue); // -5
```

---

#### 4. Optimalisasi Stack Trace dengan `Error.captureStackTrace`

Pada runtime engine V8 (Node.js dan Chromium), Anda dapat menyembunyikan pemanggilan constructor error itu sendiri dari tampilan log stack trace:

```javascript
class CleanError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
```

---

#### 5. Arsitektur Hierarki Error Bertingkat (Layered Error Hierarchy)

Di aplikasi skala enterprise, bangun satu base class yang kemudian diturunkan ke berbagai varian error spesifik:

```javascript
class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends HttpError {
  constructor(resource) {
    super(`${resource} tidak ditemukan.`, 404);
  }
}

class ForbiddenError extends HttpError {
  constructor() {
    super('Anda tidak memiliki izin akses.', 403);
  }
}
```

---

#### 6. Serialisasi Respon Error ke Format JSON (`toJSON()`)

Menambahkan method `toJSON()` mempermudah framework backend (Express, Fastify, NestJS) mengirim respons error ke klien:

```javascript
class ApiError extends Error {
  constructor(message, code = 500) {
    super(message);
    this.code = code;
  }

  toJSON() {
    return {
      status: 'error',
      code: this.code,
      message: this.message,
    };
  }
}

const res = new ApiError('Akses ditolak', 401);
console.log(res.toJSON()); // { status: 'error', code: 401, message: 'Akses ditolak' }
```

---

#### 7. Perutean Error Berbasis `instanceof` di Global Catch

Pisahkan alur pemulihan error menggunakan percabangan polimorfis `instanceof`:

```javascript
try {
  prosesPembayaran();
} catch (err) {
  if (err instanceof NotFoundError) {
    // Kembalikan HTTP 404
  } else if (err instanceof ValidationError) {
    // Kembalikan HTTP 400 dengan detail field
  } else {
    // Tangani sebagai HTTP 500 Internal Server Error
  }
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep custom error class di atas—mulai dari base error class, subclassing berjenjang, penambahan metadata, optimalisasi stack trace, serialisasi JSON, hingga routing polimorfis di blok `catch`—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/15-custom-error/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **REST API Global Error Middleware**: Middleware terpusat menangkap semua error; jika `err instanceof AppError`, ambil `err.statusCode` dan kirim respons JSON terstruktur.
2. **Form Validation di UI Client**: Komponen formulir menangkap `ValidationError` dan langsung menyorot kolom input merah sesuai `err.field`.
3. **Database Transaction Rollback**: Membedakan `DeadlockError` yang perlu dicoba ulang otomatis (_retry_) dengan `IntegrityViolationError` yang harus dibatalkan langsung.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa `super(message)`**: Menyebabkan properti `.message` bernilai string kosong `""` dan jejak stack trace tidak akurat.
- **Lupa Menimpa `this.name`**: Jika lupa mengeset `this.name`, konsol akan tetap mencetak header `Error: pesan` alih-alih `ValidationError: pesan`.

### 🌟 Best Practice

- Selalu buat `BaseAppError` sebagai fondasi seluruh error kustom di aplikasi Anda.
- Jangan masukkan data rahasia (seperti password atau API key mentah) ke dalam properti metadata error yang berisiko tampil di log atau respons klien.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `NotFoundError extends Error` yang menerima `(namaEntitas, id)`. Format pesannya menjadi `"${namaEntitas} dengan ID ${id} tidak ditemukan"`.
2. Buat class `PembayaranGagalError extends Error` dengan properti tambahan `metodePembayaran` dan `kodeAlasan`.
3. Di dalam blok `try...catch`, lemparkan `PembayaranGagalError` dan buktikan bahwa operator `instanceof` dapat membedakannya dari `Error` biasa.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [14 - Error Handling Class](../14-error-handling-class/README.md)
- ➡️ **Selanjutnya:** [16 - Iterable dan Iterator Protocol](../16-iterable-and-iterator/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
