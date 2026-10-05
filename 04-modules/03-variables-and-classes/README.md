# 03 - Variable dan Class di Module

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengekspor dan mengimpor konstanta konfigurasi dan Class OOP dari file modul terpisah.
> - **Kapan Digunakan**: Mengorganisir domain model, entity, dan konfigurasi aplikasi dalam berkas arsitektur terstruktur.
> - **Aturan Praktis**: Tempatkan satu class utama atau domain entity dalam satu file modul yang terfokus (prinsip Single Responsibility).

## 1. 🎯 Tujuan Belajar

- Mengekspor variabel dan class dari module terpisah.
- Menginstansiasi class hasil import di file lain.
- Memahami sifat _live binding / read-only view_ dari variabel hasil import.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti **kotak suku cadang pabrik perakitan mobil**: Divisi mesin membuat komponen `Engine` dan spesifikasi teknis dalam kotak berlabel, lalu divisi perakitan mengimpor komponen tersebut dan merakitnya menjadi mobil baru menggunakan keyword `new`.

Modul ES6 tidak terbatas hanya untuk fungsi biasa:

1. **Export Konstanta**: Kita bisa mengekspor konfigurasi bawaan aplikasi seperti `export const DEFAULT_ROLE = "Software Engineer";`.
2. **Export Class OOP**: Class dapat diekspor langsung dengan menulis `export class Person { ... }`.
3. **Instansiasi Lintas Berkas**: Di file pengimpor, class tersebut dapat langsung diinstansiasi dengan keyword `new` sama persis seperti class lokal.
4. **Read-Only Import**: Variabel yang diimpor tidak bisa diubah nilainya secara langsung dari file pengimpor (bersifat _immutable binding_).

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// person.js
export const DEFAULT_ROLE = 'Software Engineer';

export class Person {
  constructor(name, role = DEFAULT_ROLE) {
    this.name = name;
    this.role = role;
  }

  getInfo() {
    return `${this.name} bekerja sebagai ${this.role}`;
  }
}

// example.js
import { Person, DEFAULT_ROLE } from './person.js';

const programmer = new Person('Joko Santoso');
console.log(programmer.getInfo());
console.log(`Default role: ${DEFAULT_ROLE}`);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
Joko Santoso bekerja sebagai Software Engineer
Default role: Software Engineer
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

Membuat Entity Model arsitektur (seperti `User.js`, `Product.js`, `Order.js`) pada aplikasi skala menengah hingga besar.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencoba Menugaskan Ulang Nilai Import**: Menulis `DEFAULT_ROLE = "Admin"` di `example.js` akan melempar error `TypeError: Assignment to constant variable` karena import bersifat read-only.
- **Circular Dependency antar-Class**: Jika `ClassA` mengimpor `ClassB` dan `ClassB` mengimpor `ClassA`, salah satu class mungkin belum siap saat dieksekusi.

### 🌟 Best Practice

- Beri nama file modul class dengan PascalCase atau kebab-case yang konsisten (misal `Person.js` atau `person.js`).
- Kelompokkan konstanta konfigurasi terkait di dekat definisi class yang menggunakannya.

---

## 6. ✍️ Latihan Mandiri

1. Buat file `mobil.js` yang mengekspor class `Mobil(merek, tahun)` dengan method `jalankan()`.
2. Impor class `Mobil` di `main.js`, buat 2 objek mobil baru, dan cetak hasil pemanggilan method `jalankan()`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [02 - Export dan Import](../02-export-and-import/README.md)
- ➡️ **Selanjutnya:** [04 - Alias](../04-alias/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
