# 02 - Prototype Inheritance

## Tujuan Belajar
- Memahami konsep pewarisan prototipe (*Prototype Inheritance*) di JavaScript.
- Mengetahui cara kerja properti tersembunyi `__proto__` dan objek `.prototype`.
- Mengatasi masalah pemborosan memori method pada constructor function.

## Penjelasan Konsep
JavaScript adalah bahasa berbasis prototipe (*prototype-based language*). Setiap fungsi di JavaScript otomatis memiliki properti objek bernama `prototype`:
1. Saat objek dibuat dengan `new Person(...)`, objek tersebut diam-diam mewarisi seluruh properti dan method dari `Person.prototype`.
2. **Efisiensi Memori**: Method yang ditempelkan di prototype hanya disimpan **1 kali** di memori bersama, bukan disalin berulang-ulang ke tiap instance objek.
3. **Prototype Chain**: Jika properti/method tidak ditemukan pada objek bersangkutan, JavaScript akan otomatis mencarinya ke atas rantai prototipe (`__proto__`) hingga mencapai `Object.prototype`.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Prototype Inheritance (Menyimpan method terpusat untuk menghemat memori)

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Menempelkan method pada prototype
Person.prototype.sayHello = function (name) {
  console.log(`Halo ${name}, nama saya ${this.firstName} ${this.lastName}`);
};

Person.prototype.sayBye = function () {
  console.log(`Sampai jumpa dari ${this.firstName}!`);
};

const joko = new Person("Joko", "Santoso");
const samsul = new Person("Samsul", "Arifin");

joko.sayHello("Budi");
samsul.sayHello("Budi");

joko.sayBye();
samsul.sayBye();
```

### Output
```text
Halo Budi, nama saya Joko Santoso
Halo Budi, nama saya Samsul Arifin
Sampai jumpa dari Joko!
Sampai jumpa dari Samsul!
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti fasilitas kolam renang di sebuah kompleks apartemen: Setiap penghuni kamar tidak perlu membangun kolam renang pribadi di dalam kamarnya (boros tempat & biaya). Cukup ada satu kolam renang di fasilitas umum kompleks (prototype), dan semua penghuni bisa menggunakannya bersama.
- **Mengapa Ini Penting?**:
  Inilah fondasi bagaimana seluruh method bawaan JavaScript (seperti `Array.prototype.push()`, `String.prototype.toUpperCase()`) bekerja di balik layar!

## Latihan
1. Tambahkan method `getFullName()` pada `Person.prototype` yang mereturn gabungan nama depan dan nama belakang.
2. Buktikan bahwa `joko.sayHello === samsul.sayHello` bernilai `true` (mereferensikan fungsi yang sama di memori).

## Ringkasan Poin Penting
- Selalu tempatkan method pada `prototype` saat menggunakan Constructor Function.
- Objek baru terhubung ke prototype melalui rantai prototipe (*Prototype Chain*).

---
[⬅️ Materi Sebelumnya: 01 - Constructor Function](../01-constructor-function/README.md) | [Materi Selanjutnya: 03 - Class ➡️](../03-class/README.md)
