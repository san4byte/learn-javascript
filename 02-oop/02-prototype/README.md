# 02 - Prototype Inheritance

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mekanisme pewarisan JavaScript untuk berbagi method antar objek secara hemat memori.
> - **Kapan Digunakan**: Mendefinisikan method bersama untuk semua instance yang dihasilkan constructor function.
> - **Aturan Praktis**: Pasang method pada `ConstructorName.prototype`, bukan di dalam body constructor.

## 1. 🎯 Tujuan Belajar

- Memahami konsep pewarisan prototipe (_Prototype Inheritance_) di JavaScript.
- Mengetahui cara kerja properti tersembunyi `__proto__` dan objek `.prototype`.
- Mengatasi masalah pemborosan memori method pada constructor function.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti fasilitas **kolam renang di kompleks apartemen**: Setiap penghuni kamar tidak perlu membangun kolam renang pribadi di dalam unitnya (boros tempat & biaya). Cukup ada satu kolam renang di fasilitas umum kompleks (`prototype`), dan semua penghuni bisa menggunakannya bersama.

JavaScript adalah bahasa berbasis prototipe (_prototype-based language_). Setiap fungsi di JavaScript otomatis memiliki properti objek bernama `prototype`:

1. Saat objek dibuat dengan `new Person(...)`, objek tersebut diam-diam mewarisi seluruh properti dan method dari `Person.prototype`.
2. **Efisiensi Memori**: Method yang ditempelkan di prototype hanya disimpan **1 kali** di memori bersama, bukan disalin berulang-ulang ke tiap instance objek.
3. **Prototype Chain**: Jika properti/method tidak ditemukan pada objek bersangkutan, JavaScript akan otomatis mencarinya ke atas rantai prototipe (`__proto__`) hingga mencapai `Object.prototype`.

---

## 3. 💻 Contoh Kode (`example.js`)

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

const joko = new Person('Joko', 'Santoso');
const samsul = new Person('Samsul', 'Arifin');

joko.sayHello('Budi');
samsul.sayHello('Budi');

joko.sayBye();
samsul.sayBye();
```

---

## 4. 🖥️ Output yang Diharapkan

```text
Halo Budi, nama saya Joko Santoso
Halo Budi, nama saya Samsul Arifin
Sampai jumpa dari Joko!
Sampai jumpa dari Samsul!
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

Fondasi kerja seluruh method bawaan JavaScript (seperti `Array.prototype.push()`, `String.prototype.toUpperCase()`).

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Prototype Pollution**: Menambahkan atau mengubah properti langsung pada `Object.prototype` berbahaya karena akan berdampak ke seluruh objek di aplikasi.
- **Menimpa Objek Prototype**: Mengganti `Person.prototype = { ... }` secara total dapat memutus referensi constructor asli jika tidak hati-hati.

### 🌟 Best Practice

- Selalu tempatkan method pada `prototype` saat menggunakan Constructor Function.
- Pahami bahwa objek mencari method ke atas melalui rantai prototipe (_Prototype Chain_).

---

## 6. ✍️ Latihan Mandiri

1. Tambahkan method `getFullName()` pada `Person.prototype` yang mereturn gabungan nama depan dan nama belakang.
2. Buktikan bahwa `joko.sayHello === samsul.sayHello` bernilai `true` (mereferensikan fungsi yang sama di memori).

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Constructor Function](../01-constructor-function/README.md)
- ➡️ **Selanjutnya:** [03 - Class](../03-class/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
