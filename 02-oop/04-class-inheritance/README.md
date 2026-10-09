# 04 - Class Inheritance (Pewarisan Kelas dan Kata Kunci extends)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mekanisme pewarisan untuk menurunkan seluruh properti dan method dari kelas induk (_parent / superclass_) ke kelas anak (_child / subclass_) menggunakan kata kunci `extends`.
> - **Kapan Digunakan**: Mengorganisasi model data dengan relasi _is-a_ (misal: `Manager` adalah `Employee`, `Sedan` adalah `Mobil`) dan menghindari duplikasi logika bersama (_DRY - Don't Repeat Yourself_).
> - **Aturan Praktis**: Gunakan sintaks `class Child extends Parent`, jaga kedalaman hierarki tetap dangkal (1–2 tingkat), dan manfaatkan _method overriding_ jika subclass butuh perilaku khusus.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep pilar OOP: **Inheritance (Pewarisan)** dalam paradigma JavaScript.
- Menguasai penggunaan kata kunci **`extends`** untuk menghubungkan Subclass ke Superclass.
- Memahami bagaimana method milik kelas induk otomatis diwariskan dan dapat dipanggil langsung oleh instance kelas anak.
- Menguasai dasar **Method Overriding** (menimpa method induk dengan perilaku khusus pada kelas anak).
- Memahami arsitektur rantai prototipe di balik layar: relasi `Child.prototype` dengan `Parent.prototype` serta pewarisan statis.
- Menguasai pengujian hierarki pewarisan multi-level menggunakan operator `instanceof`.
- Mengetahui kapan harus memilih Inheritance vs Komposisi (_Composition over Inheritance_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **pewarisan DNA dan hak waris dari orang tua ke anak**: Seorang anak mewarisi ciri fisik dasar, struktur biologis, dan nama marga dari orang tuanya (`Employee`). Namun, anak tersebut juga memiliki kebebasan untuk mengembangkan profesi, keahlian khusus (`pimpinRapat`), atau hobi uniknya sendiri (`Manager`) tanpa mengubah identitas dasar orang tuanya.

---

### 1. Tabel Ringkasan Fitur Class Inheritance (Cheat-Sheet)

| Konsep / Sintaks                 | Peran / Hubungan   | Nilai / Dampak                   | Deskripsi Singkat                                                                    |
| :------------------------------- | :----------------- | :------------------------------- | :----------------------------------------------------------------------------------- |
| **`class Child extends Parent`** | Pewarisan          | Menautkan Subclass ke Superclass | Menghubungkan prototype instance dan prototype statis secara otomatis.               |
| **Pewarisan Method**             | Inherited Behavior | Otomatis tersedia di Child       | Seluruh method di prototype Parent dapat dipanggil oleh instance Child.              |
| **Method Overriding**            | Polimorfisme Dasar | Menimpa method lama              | Menulis ulang nama method yang sama di Child dengan perilaku baru.                   |
| **`instanceof` Multi-Level**     | Validasi Tipe      | `boolean` (`true`)               | Instance Child dianggap sah sebagai instance dari Child, Parent, dan Object.         |
| **Static Inheritance**           | Pewarisan Class    | Otomatis diwariskan              | Properti dan method statis Parent dapat diakses langsung via `Child.staticMethod()`. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja pewarisan kelas menggunakan `extends` beserta skenario kasusnya:

---

#### 1. Sintaks Dasar Pewarisan: `extends`

Kata kunci `extends` mendeklarasikan bahwa sebuah class adalah turunan resmi dari class lain:

```javascript
class Kendaraan {
  constructor(merk) {
    this.merk = merk;
  }

  klakson() {
    return `${this.merk}: Tin tin! 📢`;
  }
}

// Mobil mewarisi seluruh kemampuan Kendaraan:
class Mobil extends Kendaraan {
  bukaPintu() {
    return `${this.merk}: Pintu mobil dibuka.`;
  }
}

const avanza = new Mobil('Toyota');
console.log(avanza.klakson()); // "Toyota: Tin tin! 📢" (Method warisan!)
console.log(avanza.bukaPintu()); // "Toyota: Pintu mobil dibuka."
```

---

#### 2. Konsep Relasi "Is-A" (Adalah Suatu)

Pewarisan hanya boleh diterapkan jika entitas anak benar-benar merupakan varian spesifik dari entitas induk:

- ✅ `Manager` is an `Employee` (Manajer adalah Karyawan).
- ✅ `Kucing` is an `Hewan` (Kucing adalah Hewan).
- ❌ `Ban` is a `Mobil` (Salah! Ban bukan mobil, melainkan komponen mobil $\rightarrow$ gunakan **Komposisi**).

---

#### 3. Dasar Method Overriding (Menimpa Perilaku Induk)

Jika kelas anak memerlukan cara kerja yang berbeda untuk suatu method yang sudah ada di kelas induk, kelas anak cukup mendefinisikan ulang method dengan nama yang sama:

```javascript
class Hewan {
  suara() {
    return 'Hewan mengeluarkan suara umum.';
  }
}

class Anjing extends Hewan {
  // Method overriding: Menimpa suara() milik Hewan
  suara() {
    return 'Guk guk! 🐶';
  }
}

const dog = new Anjing();
console.log(dog.suara()); // "Guk guk! 🐶" (Perilaku spesifik anak yang berjalan!)
```

---

#### 4. Rantai Prototype di Balik Layar `extends`

Ketika Anda menulis `class Child extends Parent`, JavaScript secara otomatis menyambungkan dua rantai prototype sekaligus:

1. **Rantai Instance Prototype**:
   `Child.prototype` mewarisi `Parent.prototype`:
   ```javascript
   console.log(Object.getPrototypeOf(Anjing.prototype) === Hewan.prototype); // true ✅
   ```
2. **Rantai Static Prototype (Static Inheritance)**:
   Fungsi constructor `Child` mewarisi fungsi constructor `Parent`:
   ```javascript
   console.log(Object.getPrototypeOf(Anjing) === Hewan); // true ✅
   ```

---

#### 5. Pengujian Hierarki Multi-Level dengan Operator `instanceof`

Operator `instanceof` memindai seluruh rantai pewarisan ke atas hingga mencapai `Object`:

```javascript
console.log(dog instanceof Anjing); // true ✅ (Instance kelasnya sendiri)
console.log(dog instanceof Hewan); // true ✅ (Turunan dari kelas induk)
console.log(dog instanceof Object); // true ✅ (Turunan dari basis Object JavaScript)
```

---

#### 6. Prinsip Desain: Inheritance vs Komposisi

> 💡 **Composition over Inheritance**:
> Hindari membuat pohon pewarisan yang terlalu dalam (lebih dari 2–3 level, misal: `Organisme -> Hewan -> Mamalia -> Karnivora -> Kucing`). Hierarki yang terlalu dalam menciptakan _Fragile Base Class Problem_ (perubahan kecil di kelas paling atas dapat merusak seluruh kelas di bawahnya). Jika kelas anak hanya butuh fitur parsial, lebih baik gunakan komposisi objek.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep pewarisan kelas dengan `extends`, pemanggilan method warisan, method overriding, inspeksi rantai prototype di balik layar, dan pengujian multi-level `instanceof` di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/04-class-inheritance/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Hierarki Komponen UI Framework**: Membuat komponen turunan dari elemen dasar, misal `class PrimaryButton extends BaseButton`.
2. **Klasifikasi Hak Akses Pengguna (RBAC)**: `class AdminUser extends RegularUser` yang memiliki method tambahan `hapusPengguna()` atau `lihatAuditLog()`.
3. **Konektor Adapter Database**: `class PostgresAdapter extends DatabaseAdapter` yang mengimplementasikan protokol koneksi basis data.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Hierarki Terlalu Dalam (_Deep Hierarchy Trap_)**: Membuat turunan kelas hingga 5 lapis membuat pelacakan bug dan refactoring kode menjadi sangat rumit.
- **Menerapkan Inheritance untuk Hubungan "Has-A"**: Menggunakan `extends` untuk hubungan kepemilikan (seperti `Mobil extends Mesin`) adalah kesalahan arsitektur. Gunakan `this.mesin = new Mesin()` di constructor.

### 🌟 Best Practice

- Gunakan `extends` hanya jika ada hubungan _is-a_ yang jelas dan logis.
- Batasi kedalaman inheritance maksimal 1 hingga 2 tingkat saja.
- Manfaatkan _method overriding_ untuk memberikan respons spesifik pada subclass.

---

## 5. ✍️ Latihan Mandiri

1. Buat parent class `Notifikasi` dengan method `kirim(pesan)`. Lalu buat dua subclass: `EmailNotifikasi extends Notifikasi` dan `SMSNotifikasi extends Notifikasi`, masing-masing me-override method `kirim()` dengan format pengiriman yang sesuai.
2. Buat instance dari `EmailNotifikasi` dan buktikan dengan operator `instanceof` bahwa objek tersebut merupakan instance dari `EmailNotifikasi`, `Notifikasi`, dan `Object`.
3. Mengapa kode `class Ban extends Mobil` dianggap sebagai desain OOP yang buruk? Jelaskan bagaimana Anda merefaktornya menggunakan pendekatan komposisi.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Class](../03-class/README.md)
- ➡️ **Selanjutnya:** [05 - Super Constructor](../05-super-constructor/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
