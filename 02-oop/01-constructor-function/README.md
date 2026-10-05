# 01 - Constructor Function

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Membuat cetak biru (*blueprint*) objek sebelum adanya sintaks ES6 `class`.
> * **Kapan Digunakan**: Saat perlu membuat banyak instance objek dengan struktur properti dan method yang seragam.
> * **Aturan Praktis**: Gunakan PascalCase untuk nama fungsi dan selalu panggil menggunakan keyword `new`.

## 1. 🎯 Tujuan Belajar
- Memahami konsep dasar Object-Oriented Programming (OOP) di JavaScript.
- Membuat objek menggunakan Constructor Function (standar sebelum ES6 Class).
- Menggunakan keyword `new` untuk instansiasi objek.
- Mengetahui cara mendefinisikan properti dan method di dalam Constructor Function.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Constructor Function seperti **cetakan kue martabak**: Cetakannya sama (`Person`), tetapi tiap adonan kue yang dicetak (`new Person(...)`) memiliki topping atau rasa yang berbeda (Joko, Samsul).

Sebelum ES6 memperkenalkan kata kunci `class`, JavaScript menggunakan **Constructor Function** untuk membuat cetak biru (*blueprint*) objek:
1. **Penamaan**: Konvensi standar nama fungsi diawali huruf kapital (*PascalCase*), contoh: `Person`, `Mahasiswa`.
2. **Keyword `this`**: Menunjuk ke instance objek baru yang sedang dibuat.
3. **Keyword `new`**: Wajib digunakan saat memanggil constructor function. Jika dipanggil tanpa `new`, fungsi tidak mengembalikan objek baru melainkan mengubah variabel global/window.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pengenalan Constructor Function (Cara membuat cetak biru objek sebelum ES6 Class)

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.sayHello = function (name) {
    console.log(`Halo ${name}, nama saya ${this.firstName} ${this.lastName}`);
  };
}

const joko = new Person("Joko", "Santoso");
const samsul = new Person("Samsul", "Arifin");

console.log(joko);
joko.sayHello("Budi");

console.log(samsul);
samsul.sayHello("Budi");
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Person { firstName: 'Joko', lastName: 'Santoso', sayHello: [Function] }
Halo Budi, nama saya Joko Santoso
Person { firstName: 'Samsul', lastName: 'Arifin', sayHello: [Function] }
Halo Budi, nama saya Samsul Arifin
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Menstandarkan format data model entity pengguna/produk sebelum sistem class modern populer.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Menulis Keyword `new`**: Jika dipanggil tanpa `new` (`const u = Person()`), fungsi mengembalikan `undefined` dan kata kunci `this` mencemari variabel global `window`.
* **Duplikasi Method di RAM**: Menaruh method di dalam `this.methodName = function(){}` membuat fungsi diduplikasi di memori setiap kali `new` dipanggil. Masalah ini dipecahkan oleh Prototype.

### 🌟 Best Practice
* Gunakan PascalCase (huruf kapital di awal) untuk membedakan constructor function dari fungsi biasa.
* Pindahkan method ke `Person.prototype` atau gunakan sintaks ES6 `class` untuk efisiensi memori.

---

## 6. ✍️ Latihan Mandiri
1. Buat Constructor Function `Product(name, price)` dengan method `formatRupiah()` yang mencetak harga dalam format mata uang IDR.
2. Buat Constructor Function `Mobil(merek, warna)` dan buat 2 objek mobil yang berbeda menggunakan keyword `new`.

---

## 7. 🧭 Navigasi
- ➡️ **Selanjutnya:** [02 - Prototype Inheritance](../02-prototype/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
