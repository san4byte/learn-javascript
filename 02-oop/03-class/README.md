# 03 - Class

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Sintaks modern (*syntactic sugar*) untuk membuat cetak biru objek berbasis prototype secara rapi.
> * **Kapan Digunakan**: Standar utama penulisan Object-Oriented Programming (OOP) di JavaScript modern (ES6+).
> * **Aturan Praktis**: Gunakan kata kunci `class`, inisialisasi properti di `constructor()`, dan tulis method tanpa keyword `function`.

## 1. 🎯 Tujuan Belajar
- Menguasai penulisan cetak biru objek menggunakan sintaks modern ES6 `class`.
- Memahami fungsi method khusus `constructor()`.
- Mengetahui cara mendeklarasikan properti dan method di dalam class.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **denah arsitektur rumah modern**: Alih-alih merakit rumah dari instruksi lisan terpisah-pisah, `class` menyediakan dokumen desain resmi yang rapi, terstruktur, dan mudah dipahami oleh seluruh tim pengembang.

Sejak ECMAScript 2015 (ES6), JavaScript memperkenalkan kata kunci **`class`**:
1. `class` hanyalah *syntactic sugar* (gula sintaks pemanis) di atas Prototype Inheritance agar kodenya lebih rapi, terstruktur, dan mudah dipelajari bagi developer yang terbiasa dengan bahasa OOP seperti Java, C#, atau PHP.
2. **`constructor()`**: Method spesial yang otomatis dijalankan saat objek pertama kali diinstansiasi dengan keyword `new`. Tempat terbaik untuk menginisialisasi properti objek.
3. **Method Class**: Ditulis langsung di dalam badan class tanpa kata kunci `function`. Di balik layar, JavaScript otomatis mendaftarkannya ke dalam `Person.prototype`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pengenalan ES6 Class (Sintaks modern OOP di JavaScript)

class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello(name) {
    console.log(`Halo ${name}, nama saya ${this.name}`);
  }
}

const joko = new Person('Joko Santoso');
console.log(joko);
console.log(joko.name);
joko.sayHello('Budi');

const samsul = new Person('Samsul');
console.log(samsul);
samsul.sayHello('Eko');
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Person { name: 'Joko Santoso' }
Joko Santoso
Halo Budi, nama saya Joko Santoso
Person { name: 'Samsul' }
Halo Eko, nama saya Samsul
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Membuat Entity Data Model (seperti `User`, `Product`, `Transaction`) pada arsitektur aplikasi backend dan frontend.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Bukan Kelas Seperti di Java/C++**: Di balik layar, JavaScript tetap berbasis prototype (*prototypal inheritance*), bukan berbasis kelas murni.
* **Lupa Keyword `new`**: Memanggil class tanpa `new` akan langsung melempar runtime error `TypeError: Class constructor cannot be invoked without 'new'`.

### 🌟 Best Practice
* Gunakan selalu sintaks `class` untuk penulisan OOP modern alih-alih constructor function jadul.
* Pisahkan definisi data di `constructor()` dan perilaku di method.

---

## 6. ✍️ Latihan Mandiri
1. Buat class `Product` dengan constructor yang menerima `id`, `name`, `price`, serta method `showDetail()` yang mencetak informasi lengkap produk tersebut.
2. Buat 2 objek produk elektronik dari class tersebut.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [02 - Prototype Inheritance](../02-prototype/README.md)
- ➡️ **Selanjutnya:** [04 - Class Inheritance](../04-class-inheritance/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
