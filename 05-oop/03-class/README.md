# 03 - Class

## Tujuan Belajar
- Menguasai penulisan cetak biru objek menggunakan sintaks modern ES6 `class`.
- Memahami fungsi method khusus `constructor()`.
- Mengetahui cara mendeklarasikan properti dan method di dalam class.

## Penjelasan Konsep
Sejak ECMAScript 2015 (ES6), JavaScript memperkenalkan kata kunci **`class`**:
1. `class` hanyalah *syntactic sugar* (gula sintaks pemanis) di atas Prototype Inheritance agar kodenya lebih rapi, terstruktur, dan mudah dipelajari bagi developer yang terbiasa dengan bahasa OOP seperti Java, C#, atau PHP.
2. **`constructor()`**: Method spesial yang otomatis dijalankan saat objek pertama kali diinstansiasi dengan keyword `new`. Tempat terbaik untuk menginisialisasi properti objek.
3. **Method Class**: Ditulis langsung di dalam badan class tanpa kata kunci `function`. Di balik layar, JavaScript otomatis mendaftarkannya ke dalam `Person.prototype`.

## Contoh Kode
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

const joko = new Person("Joko Santoso");
console.log(joko);
console.log(joko.name);
joko.sayHello("Budi");

const samsul = new Person("Samsul");
console.log(samsul);
samsul.sayHello("Eko");
```

### Output
```text
Person { name: 'Joko Santoso' }
Joko Santoso
Halo Budi, nama saya Joko Santoso
Person { name: 'Samsul' }
Halo Eko, nama saya Samsul
```

## Penjelasan Tambahan
- **Perbedaan dengan Constructor Function Biasa**:
  - Class **tidak bisa dipanggil tanpa keyword `new`**. Memanggil `Person()` tanpa `new` akan langsung menghasilkan `TypeError: Class constructor Person cannot be invoked without 'new'`.
  - Class tidak mengalami hoisting seperti function declaration biasa. Anda harus mendeklarasikan class terlebih dahulu sebelum membuat instance-nya.

## Latihan
1. Buat class `Product` dengan constructor yang menerima `id`, `name`, `price`, serta method `showDetail()` yang mencetak informasi lengkap produk tersebut.
2. Buat 2 objek produk elektronik dari class tersebut.

## Ringkasan Poin Penting
- Sintaks `class` membuat penulisan OOP di JavaScript lebih elegan dan standar.
- Method `constructor` dijalankan otomatis saat `new` dipanggil.
- Method di dalam class otomatis masuk ke prototype.

---
[⬅️ Materi Sebelumnya: 02 - Prototype](../02-prototype/README.md) | [Materi Selanjutnya: 04 - Class Inheritance ➡️](../04-class-inheritance/README.md)
