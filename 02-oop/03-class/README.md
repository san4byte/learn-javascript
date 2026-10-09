# 03 - Class (Sintaks ES6 Modern, Constructor, dan Instance Methods)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Sintaks modern (_syntactic sugar_) untuk mendefinisikan cetak biru objek berbasis prototype secara rapi, jelas, dan deklaratif.
> - **Kapan Digunakan**: Standar utama penulisan Pemrograman Berorientasi Objek (_OOP_) di JavaScript modern (ES6+) untuk membuat model data, servis aplikasi, dan komponen.
> - **Aturan Praktis**: Gunakan kata kunci `class`, inisialisasi state objek di dalam method `constructor()`, tulis method tanpa kata kunci `function`, dan pahami bahwa class wajib dipanggil dengan operator `new`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep ES6 `class` sebagai abstraksi tingkat tinggi di atas Prototype Inheritance.
- Membedakan bentuk penulisan **Class Declaration** dan **Class Expression**.
- Menguasai peran, karakteristik, dan batasan method khusus `constructor()`.
- Mengetahui cara mendefinisikan _instance methods_ dan membuktikan pendaftarannya secara otomatis ke `ClassName.prototype`.
- Memahami sifat _non-enumerable_ bawaan pada seluruh method class.
- Memahami perbedaan fundamental antara ES6 Class vs Constructor Function klasik (tidak ada hoisting, perlindungan strict mode otomatis, dan wajib `new`).
- Menguasai penamaan method dinamis menggunakan _Computed Method Names_.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **denah blueprint arsitektur rumah modern**: Sebelum ada denah standar resmi, para tukang bangunan membangun rumah berdasarkan instruksi lisan terpisah-pisah (sebagian di buku catatan constructor, sebagian di lembar prototype lain). Sintaks `class` menyatukan seluruh instruksi pondasi (`constructor`), tata ruang (`methods`), dan pintu masuk rumah ke dalam satu dokumen arsitektur resmi yang rapi dan terstandarisasi.

Meskipun tampak seperti kelas di bahasa OOP lain (seperti Java atau C#), di balik layar JavaScript tetaplah bahasa berbasis prototipe (_prototypal_). Class hanyalah _syntactic sugar_ yang lebih ramah pengembang.

---

### 1. Tabel Ringkasan Komponen ES6 Class (Cheat-Sheet)

| Komponen / Fitur      | Sintaks                       | Penempatan di Memori | Deskripsi Singkat                                                      |
| :-------------------- | :---------------------------- | :------------------- | :--------------------------------------------------------------------- |
| **Class Declaration** | `class NamaModel { ... }`     | Scope Leksikal       | Deklarasi standar dengan nama kelas PascalCase.                        |
| **Class Expression**  | `const Model = class { ... }` | Variabel             | Mendefinisikan class sebagai nilai ekspresi (anonim / bernama).        |
| **`constructor()`**   | `constructor(...args)`        | Fungsi Inisialisasi  | Method spesial yang dieksekusi otomatis saat `new` dipanggil.          |
| **Instance Method**   | `namaMethod() { ... }`        | `Model.prototype`    | Method yang otomatis melekat pada prototype bersama.                   |
| **Aturan `new`**      | `new NamaModel()`             | Wajib                | Melempar `TypeError` jika dipanggil tanpa operator `new`.              |
| **Sifat Enumerable**  | `Object.keys(instance)`       | Non-enumerable       | Method class tidak mencemari loop enumerasi properti.                  |
| **Strict Mode**       | Otomatis                      | Body Class           | Seluruh kode di dalam class berjalan dalam mode strict secara default. |
| **Computed Name**     | `[ekspresi]() { ... }`        | `Model.prototype`    | Nama method ditentukan secara dinamis dari string/variabel.            |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja sintaks ES6 Class beserta skenario kasusnya:

---

#### 1. Deklarasi Class: Declaration vs Expression

Class dapat dideklarasikan dengan dua cara:

- **A. Class Declaration (Paling Umum)**:

  ```javascript
  class User {
    constructor(nama) {
      this.nama = nama;
    }
  }
  ```

- **B. Class Expression**:
  Berguna jika class ingin dioper sebagai parameter fungsi atau disimpan ke dalam modul dinamis:
  ```javascript
  const Validator = class {
    validasi(email) {
      return email.includes('@');
    }
  };
  ```

---

#### 2. Method Khusus: `constructor()`

Method `constructor()` adalah gerbang utama pembuatan instance:

- Otomatis dipanggil saat objek dibuat via `new ClassName(...)`.
- Tempat terbaik untuk menerima argumen dan menginisialisasi properti pada `this`.
- Hanya boleh ada **maksimal 1 constructor** di dalam sebuah class (menulis dua constructor akan melempar `SyntaxError`).
- Jika tidak ditulis secara eksplisit, JavaScript otomatis menyisipkan constructor kosong bawaan (`constructor() {}`).

```javascript
class Produk {
  constructor(nama, harga = 0) {
    this.nama = nama;
    this.harga = harga;
  }
}

const p = new Produk('Kopi', 20000);
console.log(p.nama, p.harga); // "Kopi" 20000
```

---

#### 3. Instance Methods & Bukti Menempel pada Prototype

Method yang ditulis di dalam class tanpa keyword `function` secara otomatis didaftarkan ke `ClassName.prototype`:

```javascript
class Karyawan {
  constructor(nama) {
    this.nama = nama;
  }

  // Method ini disimpan di Karyawan.prototype:
  bekerja() {
    return `${this.nama} sedang bekerja.`;
  }
}

const k1 = new Karyawan('Andi');
const k2 = new Karyawan('Budi');

console.log(k1.bekerja === k2.bekerja); // true ✅ (Efisiensi memori terjamin!)
console.log(Karyawan.prototype.hasOwnProperty('bekerja')); // true ✅
```

---

#### 4. Sifat Non-Enumerable pada Method Class

Pada Constructor Function jadul, menambahkan method ke `this` atau `prototype` seringkali membuatnya muncul di loop `for...in`. Pada ES6 Class, seluruh method secara otomatis dikonfigurasi berstatus **`enumerable: false`**:

```javascript
// Method 'bekerja' tidak akan muncul saat menginspeksi kunci data:
console.log(Object.keys(k1)); // ['nama'] (bersih dari nama method!)
```

---

#### 5. Empat Perbedaan Kritis: Class vs Constructor Function

1. **Wajib Dipanggil dengan `new`**: Constructor function jadul bisa dipanggil tanpa `new` (berisiko mencemari global scope). Class akan **langsung melempar `TypeError`** jika dipanggil tanpa `new`.
2. **Tidak Mengalami Hoisting Penuh**: Constructor function di-hoist seperti fungsi biasa. Class berada di dalam _Temporal Dead Zone_ (TDZ); Anda tidak bisa menginstansiasi class sebelum baris deklarasinya.
3. **Strict Mode Otomatis**: Seluruh kode di dalam tubuh class dieksekusi dalam `"use strict"` tanpa perlu menuliskannya secara manual.
4. **Method Non-Enumerable**: Seluruh method otomatis tersembunyi dari perulangan data `Object.keys()`.

```javascript
// Memanggil tanpa new memicu error:
// Karyawan('Joko'); // ❌ TypeError: Class constructor Karyawan cannot be invoked without 'new'
```

---

#### 6. Nama Method Dinamis (_Computed Method Names_)

Sama seperti properti objek literal, nama method pada class dapat ditentukan secara dinamis menggunakan tanda kurung siku `[ ... ]`:

```javascript
const ACTION = 'proses_';

class Transaksi {
  constructor(id) {
    this.id = id;
  }

  [`${ACTION}pembayaran`]() {
    return `Transaksi ${this.id} berhasil diproses.`;
  }
}

const t = new Transaksi('TRX-101');
console.log(t.proses_pembayaran()); // "Transaksi TRX-101 berhasil diproses."
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep deklarasi class, pengujian `constructor()`, verifikasi pendaftaran method ke prototype, pembuktian sifat _non-enumerable_, proteksi wajib `new`, dan implementasi _computed method names_ di atas dirangkum ke dalam satu laboratorium kode siap pakai:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/03-class/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Model Entitas Data (ORM / ODM)**: Digunakan secara masif oleh library database modern seperti TypeORM, Prisma, Mongoose, dan Sequelize untuk memetakan tabel database ke objek JavaScript.
2. **Arsitektur Service Layer**: Mengelompokkan fungsionalitas bisnis ke dalam class servis (misalnya `AuthService`, `PaymentService`, `EmailService`).
3. **State Store & Controller**: Membangun pengelola state atau pengontrol logika UI pada aplikasi web modern.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira Class JavaScript Identik dengan Java/C++**: JavaScript tetap tidak memiliki tipe class biner statis; inheritance tetap berjalan melalui rantai prototipe dinamis.
- **Lupa Kata Kunci `this` saat Mengakses Properti**: Menulis `nama` alih-alih `this.nama` di dalam method akan menghasilkan `ReferenceError: nama is not defined`.
- **Mencoba Meng-hoist Pemanggilan Class**: Memanggil `new Mobil()` sebelum baris `class Mobil { ... }` akan melempar `ReferenceError: Cannot access 'Mobil' before initialization`.

### 🌟 Best Practice

- Selalu gunakan sintaks ES6 `class` sebagai standar utama OOP pada proyek modern.
- Gunakan `constructor()` murni untuk inisialisasi state awal; hindari melakukan komputasi berat atau operasi asynchronous di dalamnya.
- Beri nama class menggunakan format **PascalCase** (`UserManager`, `OrderItem`).

---

## 5. ✍️ Latihan Mandiri

1. Buat class `RekeningBank` dengan properti `nomorRekening` dan `saldo` di dalam constructor. Tambahkan method `setor(jumlah)` dan `tarik(jumlah)` dengan validasi bahwa jumlah penarikan tidak boleh melebihi saldo.
2. Buktikan menggunakan `Object.getOwnPropertyDescriptor()` bahwa method `tarik` pada `RekeningBank.prototype` bersifat `enumerable: false`.
3. Buat class `Suhu` yang menerima nilai derajat Celcius di constructor, dan sediakan method `keFahrenheit()` dan `keKelvin()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [02 - Prototype Inheritance](../02-prototype/README.md)
- ➡️ **Selanjutnya:** [04 - Class Inheritance](../04-class-inheritance/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
