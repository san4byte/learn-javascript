# 03 - Variable dan Class di Module

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mendistribusikan variabel konfigurasi, status aplikasi, serta blueprint Class OOP dari file modul terpisah untuk dikonsumsi di seluruh aplikasi.
> - **Kapan Digunakan**: Mengorganisasi model data (_domain entities_), state reaktif bersama, serta hierarki class lintas modul.
> - **Aturan Praktis**: Impor class untuk diinstansiasi atau diwarisi via `extends`; ingat bahwa variabel hasil impor bersifat _live binding_ namun _read-only_ dari sisi file pengimpor.

---

## 1. 🎯 Tujuan Belajar

- Mengekspor konstanta konfigurasi (`const`) dan variabel (`let`) dari file modul.
- Mengekspor Class OOP lengkap dengan constructor, method, dan static member.
- Menginstansiasi dan mengeksekusi method class hasil import di file lain.
- Memahami teknik pewarisan class lintas modul (_Subclassing across modules_).
- Memahami konsep mendalam **Live Bindings** (variabel yang diimpor selalu mencerminkan nilai terbaru jika dimodifikasi oleh modul asal).
- Mengetahui sifat **Read-Only View** (larangan penugasan ulang nilai langsung di file pengimpor).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **cetak biru arsitektur dan panel speedometer pabrik mobil**: Modul `Person.js` menyediakan cetak biru perakitan (`class Person`) dan indikator kuota produksi (`export let activeCount`). Divisi perakitan (`example.js`) dapat mencetak mobil baru sebanyak mungkin berdasarkan cetak biru tersebut, dan melihat angka pada panel speedometer bergerak secara langsung (_live binding_) tanpa perlu mencetak ulang instrumennya.

---

### 1. Tabel Ringkasan Fitur Variabel dan Class di Module (Cheat-Sheet)

| Elemen / Konsep   | Sintaks Ekspor              | Perilaku di File Pengimpor                                    | Sifat Mutabilitas                                                |
| :---------------- | :-------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------- |
| **Konstanta**     | `export const ROLE = "DEV"` | Dapat dibaca langsung                                         | Tidak dapat diubah.                                              |
| **Variabel Live** | `export let counter = 0`    | Otomatis sinkron saat modul asal mengubahnya (_Live Binding_) | Read-Only bagi file pengimpor; mutasi harus via fungsi pengirim. |
| **Class OOP**     | `export class Person {}`    | Dapat di-`new` atau di-`extends`                              | Instance independen.                                             |
| **Static Member** | `static getInfo() {}`       | Dipanggil via `Person.getInfo()`                              | Melekat pada constructor class impor.                            |
| **Re-assignment** | `ROLE = "NEW"`              | Melempar `TypeError`                                          | Dilarang keras oleh runtime JavaScript.                          |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja variabel dan class di dalam modul beserta skenario kasusnya:

---

#### 1. Mengekspor Variabel dan Konstanta Konfigurasi

Anda dapat mengekspor konfigurasi global atau variabel status aplikasi:

```javascript
// config.js
export const API_BASE_URL = "https://api.domain.com/v1";
export const TIMEOUT_MS = 5000;
```

---

#### 2. Mengekspor Class OOP

Class dapat diekspor langsung di baris deklarasi dengan melampirkan kata kunci `export`:

```javascript
// user.js
export class User {
  constructor(name) {
    this.name = name;
  }

  sapa() {
    return `Halo, saya ${this.name}`;
  }
}
```

---

#### 3. Menginstansiasi Class Hasil Import

Di file pengimpor, class tersebut diperlakukan persis seperti class lokal:

```javascript
// main.js
import { User } from "./user.js";

const budi = new User("Budi");
console.log(budi.sapa()); // "Halo, saya Budi"
```

---

#### 4. Pewarisan Class Lintas Modul (_Cross-Module Subclassing_)

Subclass dapat meng-`extends` class yang berasal dari modul lain secara mulus:

```javascript
// employee.js
import { User } from "./user.js";

export class Employee extends User {
  constructor(name, gaji) {
    super(name);
    this.gaji = gaji;
  }
}
```

---

#### 5. Konsep Live Bindings di ES Modules

Berbeda dengan CommonJS (`require`) yang menyalin nilai statis (_value copy_), ES Modules membuat koneksi referensi hidup (_live binding_). Jika file pengekspor memodifikasi nilai `let`, file pengimpor otomatis membaca nilai baru:

```javascript
// counter.js
export let total = 0;
export function tambah() {
  total++;
}

// app.js
import { total, tambah } from "./counter.js";
console.log(total); // 0
tambah();
console.log(total); // 1 (Nilai terupdate secara otomatis!)
```

---

#### 6. Sifat Read-Only View (Immutable Binding)

Variabel hasil import adalah tampilan baca saja (_read-only view_). File pengimpor tidak boleh menugaskan nilai baru secara langsung:

```javascript
import { total } from "./counter.js";

// total = 10;
// 💥 TypeError: Assignment to constant variable (Ilegal!)
```

> **Solusi**: Jika perlu mengubah nilai, eksporlah fungsi pemutasi (_mutator function_) dari modul asal seperti `tambah()` pada contoh sebelumnya.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep ekspor class OOP, pemanggilan static member, _cross-module subclassing_, demonstrasi _live bindings_, dan pembuktian _read-only view_ telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js) & [`person.js`](./person.js)

```bash
# Jalankan langsung dari terminal:
node 04-modules/03-variables-and-classes/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Domain-Driven Design (DDD)**: Memisahkan domain entities (`Product.js`, `Customer.js`, `Invoice.js`) ke dalam modul masing-masing.
2. **State Management Global Mini**: Mengelola state aplikasi (seperti `currentUser` dan `login()`) di modul auth terpusat dengan memanfaatkan _live bindings_.
3. **Repository Pattern**: Class `UserRepository.js` yang mengimpor model `User.js` untuk memetakan respon basis data menjadi instance objek yang kaya logika bisnis.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencoba Mengubah Nilai Import Secara Langsung**: Lupa bahwa binding impor bersifat _read-only_, berujung pada lemparan runtime `TypeError`.
- **Circular Dependency pada Class**: Jika `Class A extends Class B` di file A, dan `Class B` mengimpor `Class A` di file B, engine dapat melempar `ReferenceError: Cannot access '...' before initialization`.

### 🌟 Best Practice

- Terapkan prinsip _Single Responsibility_: Dedikasikan satu file untuk satu class utama atau satu kesatuan domain entitas.
- Berikan mutator method eksplisit jika mengekspor variabel yang dapat berubah, jangan pernah mengandalkan mutasi liar.

---

## 5. ✍️ Latihan Mandiri

1. Buat file `mobil.js` yang mengekspor class `Mobil(merek, roda)` dan fungsi `cekKelayakan(mobil)`.
2. Impor class `Mobil` di `example.js`, buat class turunan `Truk extends Mobil` dengan properti tambahan `kapasitasTon`.
3. Buat file `counter.js` dengan `export let hitung = 0` dan `export function up()`. Amati nilai `hitung` di file utama sebelum dan sesudah memanggil `up()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [02 - Export dan Import](../02-export-and-import/README.md)
- ➡️ **Selanjutnya:** [04 - Alias](../04-alias/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
