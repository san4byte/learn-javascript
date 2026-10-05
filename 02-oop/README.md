# ☕ Modul 02: JavaScript Object-Oriented Programming (PZN)

Selamat datang di **Modul 02**! Pemrograman Berorientasi Objek (_Object-Oriented Programming / OOP_) adalah paradigma pemrograman yang menyusun arsitektur perangkat lunak berbasis objek yang memuat data (_properties/fields_) dan perilaku (_methods_). Modul ini mengikuti silabus mendalam Programmer Zaman Now (PZN).

---

## 📚 Daftar Materi Pembelajaran:

1. [01 - Constructor Function](01-constructor-function/README.md)
   - Membuat objek dengan fungsi konstruktor dan keyword `new`.
2. [02 - Prototype Inheritance](02-prototype/README.md)
   - Pewarisan berbasis prototype, rantai prototype, dan optimasi memori method bersama.
3. [03 - Class](03-class/README.md)
   - Sintaks modern deklarasi class, constructor, dan method.
4. [04 - Class Inheritance](04-class-inheritance/README.md)
   - Pewarisan antar class menggunakan kata kunci `extends`.
5. [05 - Super Constructor](05-super-constructor/README.md)
   - Memanggil constructor class induk menggunakan fungsi `super()`.
6. [06 - Super Method (Method Overriding)](06-super-method/README.md)
   - Menimpa method induk dan memanggil fungsionalitas aslinya via `super.method()`.
7. [07 - Getter dan Setter](07-getter-setter/README.md)
   - Mengontrol akses properti objek menggunakan accessor `get` dan `set`.
8. [08 - Public Class Field](08-public-class-field/README.md)
   - Mendeklarasikan field publik langsung di tubuh class.
9. [09 - Private Class Field (#)](09-private-class-field/README.md)
   - Enkapsulasi data sejati menggunakan tanda pagar `#` yang tidak bisa dibobol dari luar.
10. [10 - Private Method (#)](10-private-method/README.md)
    - Method privat internal untuk logika bantuan class.
11. [11 - Operator instanceof](11-instanceof-operator/README.md)
    - Memeriksa keabsahan tipe instansiasi objek dan rantai pewarisan.
12. [12 - Static Field](12-static-field/README.md)
    - Properti milik class (bukan milik instance).
13. [13 - Static Method](13-static-method/README.md)
    - Method utilitas pembantu independen tanpa perlu instansiasi objek.
14. [14 - Error Handling Class](14-error-handling-class/README.md)
    - Penanganan kesalahan sistematis menggunakan `try`, `catch`, `finally`, dan `throw new Error`.
15. [15 - Custom Error Class](15-custom-error/README.md)
    - Membuat class error kustom yang mewarisi dari class `Error`.
16. [16 - Iterable dan Iterator](16-iterable-and-iterator/README.md)
    - Mengimplementasikan Iteration Protocol (`[Symbol.iterator]()`, `next()`, `{ value, done }`) dan studi kasus nyata e-commerce serta generator `function*`.

---

## 🛠️ Cara Menjalankan
Seluruh materi OOP ini dapat langsung dijalankan di terminal menggunakan Node.js tanpa membutuhkan browser:
```bash
node 02-oop/03-class/example.js
node 02-oop/16-iterable-and-iterator/example.js
```

---

## 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [01 - JavaScript Fundamentals](../01-fundamentals/README.md)
- ➡️ **Modul Selanjutnya:** [03 - JavaScript Standard Library](../03-standard-library/README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../README.md)
