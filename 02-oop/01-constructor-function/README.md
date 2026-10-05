# 01 - Constructor Function

## Tujuan Belajar
- Memahami konsep dasar Object-Oriented Programming (OOP) di JavaScript.
- Membuat objek menggunakan Constructor Function (standar sebelum ES6 Class).
- Menggunakan keyword `new` untuk instansiasi objek.
- Mengetahui cara mendefinisikan properti dan method di dalam Constructor Function.

## Penjelasan Konsep
Sebelum ES6 memperkenalkan kata kunci `class`, JavaScript menggunakan **Constructor Function** untuk membuat cetak biru (*blueprint*) objek:
1. **Penamaan**: Konvensi standar nama fungsi diawali huruf kapital (*PascalCase*), contoh: `Person`, `Mahasiswa`.
2. **Keyword `this`**: Menunjuk ke instance objek baru yang sedang dibuat.
3. **Keyword `new`**: Wajib digunakan saat memanggil constructor function. Jika dipanggil tanpa `new`, fungsi tidak mengembalikan objek baru melainkan mengubah variabel global/window.

## Contoh Kode
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

### Output
```text
Person { firstName: 'Joko', lastName: 'Santoso', sayHello: [Function] }
Halo Budi, nama saya Joko Santoso
Person { firstName: 'Samsul', lastName: 'Arifin', sayHello: [Function] }
Halo Budi, nama saya Samsul Arifin
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Constructor Function seperti cetakan kue martabak. Cetakannya sama (`Person`), tetapi tiap adonan kue yang dicetak (`new Person(...)`) memiliki topping atau rasa yang berbeda (Joko, Samsul).
- **Kelemahan Method di dalam Constructor Function**:
  Jika kita membuat method langsung di dalam `this.sayHello = function()`, setiap kali kita membuat objek baru dengan `new`, fungsi tersebut akan disalin ulang ke memori. Jika ada 10.000 objek, maka ada 10.000 salinan fungsi yang sama di RAM! Masalah ini diselesaikan oleh **Prototype** pada materi berikutnya.
- **Kesalahan Umum Pemula**:
  Lupa menulis kata kunci `new` (`const joko = Person("Joko", "Santoso")`). Akibatnya nilai kembaliannya adalah `undefined` dan `this` mencemari variabel global window.

## Latihan
1. Buat Constructor Function `Product(name, price)` dengan method `formatRupiah()` yang mencetak harga dalam format mata uang IDR.
2. Buat Constructor Function `Mobil(merek, warna)` dan buat 2 objek mobil yang berbeda menggunakan keyword `new`.

## Ringkasan Poin Penting
- Constructor Function adalah cetak biru objek klasik di JavaScript.
- Gunakan PascalCase untuk penamaan constructor function.
- Wajib menggunakan kata kunci `new` untuk membuat instance objek baru.

---
[Materi Selanjutnya: 02 - Prototype ➡️](../02-prototype/README.md)
