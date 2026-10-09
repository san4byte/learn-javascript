# 09 - Private Class Field

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengunci dan menyembunyikan properti objek menggunakan awalan simbol pagar (`#`) sehingga variabel hanya dapat dibaca dan dimanipulasi dari dalam badan kelas tempat ia dideklarasikan.
> - **Kapan Digunakan**: Melindungi data sensitif (seperti saldo rekening, kunci rahasia, atau _state internal_) dari campur tangan atau manipulasi ilegal kode luar.
> - **Aturan Praktis**: Deklarasikan field di awal badan class dengan sintaks `#namaField;` atau `#namaField = nilaiAwal;`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep pilar OOP: **Hard Encapsulation (Enkapsulasi Sejati)** di JavaScript modern ES2022.
- Menguasai sintaks deklarasi private field menggunakan simbol pagar (**`#`**).
- Memahami proteksi runtime terhadap akses ilegal dari luar kelas (`SyntaxError`).
- Mengetahui bagaimana private field disembunyikan dari fungsi refleksi (`Object.keys()`, `JSON.stringify()`, dsb).
- Menguasai fitur **Brand Checking** menggunakan operator modern **`#field in object`**.
- Memahami batasan pewarisan: Mengapa subclass _tidak dapat_ mengakses private field milik superclass secara langsung.
- Menguasai pembuatan dan pemanfaatan **Static Private Field** (`static #field`).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **brankas baja di dalam kantor bank**: Petugas kasir melayani nasabah menyetor dan menarik uang melalui loket resmi (_public methods_ `setor()` dan `tarik()`). Namun, nasabah maupun staf luar tidak diperbolehkan dan tidak memiliki akses fisik langsung ke dalam brankas baja (`#saldo`). Siapa pun yang memaksa menerobos brankas dari luar akan langsung diblokir oleh alarm sistem keamanan (_SyntaxError_).

---

### 1. Tabel Ringkasan Fitur Private Class Field (Cheat-Sheet)

| Fitur / Mekanisme          | Sintaks                 | Lingkup Akses (Scope)           | Perilaku Saat Akses Ilegal                                    |
| :------------------------- | :---------------------- | :------------------------------ | :------------------------------------------------------------ |
| **Instance Private Field** | `#namaField = val;`     | Hanya di dalam class deklarator | Memunculkan `SyntaxError` saat parsing kode.                  |
| **Brand Checking**         | `#field in obj`         | Di dalam class deklarator       | Mengembalikan `true` jika instance valid, `false` jika tidak. |
| **Inspeksi Refleksi**      | `Object.keys(obj)`      | Tersembunyi sempurna            | Properti `#` tidak masuk dalam iterasi atau serialisasi.      |
| **Akses Subclass**         | `subInstance.#field`    | Tidak diwariskan                | Ditolak; subclass wajib memakai method/getter induk.          |
| **Static Private Field**   | `static #secret = val;` | Hanya di dalam method class     | Melekat secara privat pada constructor class itu sendiri.     |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja private class field beserta skenario kasusnya:

---

#### 1. Sintaks Deklarasi Private Field (`#field`)

Private field wajib dideklarasikan di dalam badan class sebelum dapat digunakan dengan `this.#field`:

```javascript
class Counter {
  #hitung = 0; // Deklarasi private field

  tambah() {
    this.#hitung++;
  }

  get nilai() {
    return this.#hitung;
  }
}

const c = new Counter();
c.tambah();
console.log(c.nilai); // 1
```

---

#### 2. Enkapsulasi Keras (_Hard Encapsulation_) & Pencegahan Akses Luar

Jika kode di luar class mencoba membaca atau menulis langsung ke `#field`, parser JavaScript akan langsung melempar error:

```javascript
const c = new Counter();

// console.log(c.#hitung);
// 💥 SyntaxError: Private field '#hitung' must be declared in an enclosing class
```

---

#### 3. Proteksi dari Inspeksi Objek & Serialisasi JSON

Private field tidak diperlakukan sebagai properti string biasa, sehingga aman dari inspeksi tidak sengaja:

```javascript
class Akun {
  #pin = 1234;
  pemilik = 'Budi';
}

const a = new Akun();
console.log(Object.keys(a)); // ["pemilik"] (tanpa #pin)
console.log(JSON.stringify(a)); // '{"pemilik":"Budi"}' (tanpa #pin)
```

---

#### 4. Pemeriksaan Identitas (_Brand Checking_) dengan Operator `#field in obj`

Operator `in` dapat digunakan di dalam class untuk memverifikasi apakah suatu objek benar-benar dibuat dari class tersebut tanpa risiko error:

```javascript
class Dompet {
  #saldo = 1000;

  static apakahDompet(obj) {
    return #saldo in obj; // true jika obj memiliki private field #saldo
  }
}

console.log(Dompet.apakahDompet(new Dompet())); // true
console.log(Dompet.apakahDompet({ saldo: 1000 })); // false
```

---

#### 5. Batasan Akses pada Subclass (Inheritance Boundary)

Private field benar-benar privat untuk kelas yang mendefinisikannya. Subclass **tidak dapat** mengakses langsung `#field` milik parent-nya:

```javascript
class Induk {
  #rahasia = 'Kunci';

  getRahasia() {
    return this.#rahasia; // Subclass dapat memanggil method ini
  }
}

class Anak extends Induk {
  uji() {
    // return this.#rahasia; // 💥 SyntaxError! Tidak diizinkan.
    return this.getRahasia(); // ✅ Diizinkan via public method parent
  }
}
```

---

#### 6. Static Private Field (`static #field`)

Class juga dapat memiliki private field pada tingkat statis yang hanya bisa diakses oleh method statis milik class tersebut:

```javascript
class Autentikasi {
  static #TOKEN_RAHASIA = 'KEY-999-SECRET';

  static verifikasi(token) {
    return token === this.#TOKEN_RAHASIA;
  }
}

console.log(Autentikasi.verifikasi('KEY-999-SECRET')); // true
// Autentikasi.#TOKEN_RAHASIA // 💥 SyntaxError di luar class!
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep private class field—mulai dari deklarasi `#field`, uji coba _hard encapsulation_, invisibilitas di `Object.keys()` dan JSON, _brand checking_ dengan `#field in obj`, batas pewarisan subclass, hingga _static private field_—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/09-private-class-field/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Proteksi Saldo Finansial**: Memastikan saldo bank (`#saldo`) hanya bisa bertambah lewat alur transaksi yang valid dan tidak bisa diisi sembarangan dari luar.
2. **Kunci Enkripsi & Token Rahasia**: Menyimpan access token HTTP client (`#authToken`) di dalam memori tanpa risiko bocor saat objek di-_print_ atau di-_serialize_ ke JSON log.
3. **Internal State Machine**: Menyimpan status internal pemutar audio/video (`#posisiBuffer`) yang hanya boleh dikelola oleh algoritma internal pemutar.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencoba Mengakses `#field` di Subclass**: Mengira `extends` mewariskan akses private field. Subclass harus meminta data via getter atau method terproteksi yang disediakan induk.
- **Mengira Objek Biasa Bisa Meniru**: Objek tiruan `{ #saldo: 100 }` adalah syntax error tidak valid; hanya deklarasi class sah yang dapat memiliki private field.
- **Menamai dengan Kurung Siku**: Anda tidak bisa mengakses dynamic private field seperti `obj[#field]` karena private identifier bukan string.

### 🌟 Best Practice

- Selalu gunakan `#` resmi ES2022 alih-alih sekadar `_namaVariabel` jika data memang benar-benar sensitif dan tidak boleh diakses pihak luar.
- Manfaatkan _brand checking_ (`#field in obj`) daripada `instanceof` jika Anda ingin memastikan instance sah tanpa tertipu perubahan prototype chain.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `Brankas` dengan private field `#pin` dan `#isi`. Sediakan method `buka(pinInput)` yang hanya mengembalikan isi brankas jika PIN cocok.
2. Buat method statis `apakahBrankasValid(objek)` yang menggunakan operator `#pin in objek` untuk memverifikasi keaslian objek.
3. Buat subclass `BrankasDigital extends Brankas` dan jelaskan mengapa mencoba mengakses `this.#pin` di dalam subclass memicu `SyntaxError`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08 - Public Class Field](../08-public-class-field/README.md)
- ➡️ **Selanjutnya:** [10 - Private Method](../10-private-method/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
