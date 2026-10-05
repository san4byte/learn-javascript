# 16 - Iterable dan Iterator Protocol

## Tujuan Belajar
- Memahami konsep dasar **Iteration Protocol** di JavaScript.
- Membedakan antara kontrak **Iterable** dan kontrak **Iterator**.
- Mengetahui cara kerja method spesial **`[Symbol.iterator]()`** dan method **`next()`**.
- Mengerti bagaimana `for...of` dan *Spread Operator* (`...`) bekerja di balik layar.
- **Memahami penggunaan nyata Iterable & Iterator di proyek industri nyata (Real-World Project)**.

---

## Penjelasan Konsep

### 1. Masalah yang Diselesaikan
Di JavaScript, kita bisa dengan mudah melakukan perulangan `for...of` atau *spread operator* `[...]` pada data bawaan seperti **Array**, **String**, **Set**, dan **Map**:
```javascript
const fruits = ["Apel", "Jeruk"];
for (const f of fruits) { ... } // Berhasil!
```
Namun, jika kita membuat **Class atau Objek buatan kita sendiri**:
```javascript
class Library { ... }
const myLib = new Library();
for (const item of myLib) { ... } 
// ❌ ERROR: TypeError: myLib is not iterable
```
Objek buatan kita tidak bisa di-`for...of` karena JavaScript tidak tahu bagaimana cara membaca data di dalamnya satu per satu. Agar objek buatan kita bisa diperlakukan seperti Array (bisa di-`for...of` dan di-`spread`), objek kita wajib mematuhi **Protokol Iterasi**!

---

### 2. Dua Kontrak Protokol Iterasi

1. **Kontrak `Iterable`**:
   - Objek apa pun yang memiliki method khusus bernama **`[Symbol.iterator]()`**.
   - Tugas method ini hanya satu: mengembalikan sebuah objek **Iterator**.
2. **Kontrak `Iterator`**:
   - Objek yang memiliki method bernama **`next()`**.
   - Setiap kali `next()` dipanggil, ia wajib mengembalikan objek berformat:
     `{ value: dataSaatIni, done: boolean }`
     - **`value`**: Data elemen saat ini.
     - **`done`**: Bernilai `false` jika data masih ada, atau `true` jika perulangan sudah selesai.

---

### 3. Apa yang Dilakukan `for...of` di Balik Layar?
Saat Anda menulis:
```javascript
for (const item of data) {
  console.log(item);
}
```
JavaScript sebenarnya mengeksekusi langkah-langkah berikut di balik layar:
```javascript
// 1. Minta iterator-nya
const iterator = data[Symbol.iterator]();

// 2. Minta item pertama
let result = iterator.next();

// 3. Ulangi selama done bernilai false
while (!result.done) {
  const item = result.value;
  console.log(item);
  result = iterator.next(); // Ambil item berikutnya
}
```

---

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Iterable dan Iterator Protocol (Implementation + Real World Project Example)

// 1. Objek hasil (Iterator Result)
class CounterIteratorResult {
  constructor(value, done) {
    this.value = value;
    this.done = done;
  }
}

// 2. Iterator: memiliki method next()
class CounterIterator {
  constructor(value, max) {
    this.value = value;
    this.max = max;
  }

  next() {
    try {
      if (this.value > this.max) {
        return new CounterIteratorResult(undefined, true);
      } else {
        return new CounterIteratorResult(this.value, false);
      }
    } finally {
      this.value++;
    }
  }
}

// 3. Iterable: memiliki method [Symbol.iterator]()
class Counter {
  constructor(value, max) {
    this.value = value;
    this.max = max;
  }

  [Symbol.iterator]() {
    return new CounterIterator(this.value, this.max);
  }
}

// Pemanggilan dengan for..of
const counter = new Counter(1, 5);
for (const val of counter) {
  console.info("Nilai counter:", val);
}
```

### Output
```text
--- 1. Loop Counter Iterable ---
Nilai counter: 1
Nilai counter: 2
Nilai counter: 3
Nilai counter: 4
Nilai counter: 5

--- 2. Real Project: E-Commerce Product Catalog ---
Barang: Laptop Gaming | Harga: Rp 15000000
Barang: Mouse Wireless | Harga: Rp 250000
Barang: Mechanical Keyboard | Harga: Rp 800000
Total item katalog via spread: 3

--- 3. Modern Real-World: Generator Function* di Class ---
Buku di rak: Clean Code
Buku di rak: JavaScript: The Good Parts
Buku di rak: Refactoring
```

---

## Penjelasan Tambahan

### 1. Analogi Kehidupan Sehari-hari
- **`Iterable`** = **Mesin Dispenser Nomor Antrean di Bank**.
- **`Iterator`** = **Tombol "Tekan untuk Ambil Nomor"** pada dispenser tersebut.
- **`next()`** = Setiap kali seorang nasabah menekan tombol tersebut, dispenser mengeluarkan secarik kertas antrean:
  - Nasabah 1: `{ value: "Nomor 1", done: false }`
  - Nasabah 2: `{ value: "Nomor 2", done: false }`
  - Saat jam bank tutup dan nomor habis: `{ value: undefined, done: true }`.

---

### 2. Penggunaan di Real Project (Dunia Nyata / Industri)

Kapan developer di industri benar-benar membuat Custom Iterable & Iterator?

#### A. Custom Collection Enkapsulasi (E-Commerce / Library)
Bayangkan Anda membuat modul keranjang belanja (`ShoppingCart`) atau katalog produk (`ProductCatalog`).
Alih-alih memaksa developer lain mengakses array internal yang rentan dirusak:
```javascript
// Cara Buruk (Merusak Enkapsulasi):
for (const item of cart.items.internalList.data) { ... }
```
Dengan membuat class `ShoppingCart` sebagai **Iterable**, developer lain bisa langsung menulis kode yang sangat bersih:
```javascript
// Cara Profesional & Bersih:
for (const item of cart) {
  console.log(item.name, item.price);
}
const daftarBarang = [...cart]; // Otomatis bisa di-spread!
```

#### B. Lazy Evaluation & Hemat Memori (Mengolah Data Raksasa)
Bayangkan Anda butuh deret 10 juta angka atau membaca file log server sebesar 10 GB:
- **Jika pakai Array biasa**: JavaScript akan mencoba memuat 10 juta angka sekaligus ke dalam RAM $
ightarrow$ **Browser / Server langsung Out of Memory (Crash)**.
- **Dengan Iterator (Lazy Evaluation)**: Angka berikutnya **baru dihitung di memori saat method `next()` dipanggil**! Memori yang terpakai tetap sangat kecil (hanya 1 angka yang disimpan di RAM pada satu waktu).

#### C. Infinite Scroll & Stream Paginasi
Saat user men-scroll feed media sosial, Iterator meminta halaman (*page*) berikutnya ke server secara bertahap saat dibutuhkan, bukan mendownload seluruh database sekaligus di awal.

---

### 3. Cara Modern di Industri: Generator Function (`function*` & `yield`)
Di proyek nyata, menulis class Iterator manual dengan class terpisah terasa sangat panjang. JavaScript modern menyediakan fitur **Generator Function (`function*`)** dengan kata kunci **`yield`**:
```javascript
class BookShelf {
  constructor() {
    this.books = ["Clean Code", "Refactoring"];
  }

  // Cukup tambahkan tanda bintang (*) pada [Symbol.iterator]
  *[Symbol.iterator]() {
    for (const book of this.books) {
      yield book; // yield otomatis menghasilkan { value, done } di balik layar!
    }
  }
}

const shelf = new BookShelf();
for (const b of shelf) {
  console.log(b); // Langsung bisa di-loop!
}
```

---

## Latihan
1. Buat class `RentangAngka(dari, sampai)` yang mengimplementasikan `[Symbol.iterator]` sehingga bisa menghasilkan angka dari 1 sampai 10 saat di-loop dengan `for...of`.
2. Gunakan *Spread Operator* `[...rentang]` pada class `RentangAngka` tersebut dan buktikan bahwa hasilnya otomatis menjadi sebuah array `[1, 2, 3, ..., 10]`.

---

## Ringkasan Poin Penting
- **Iterable** memiliki method `[Symbol.iterator]()`.
- **Iterator** memiliki method `next()` yang mereturn `{ value, done }`.
- Protokol inilah yang memungkinkan objek buatan kita bisa digunakan di `for...of` dan *Spread Operator* (`...`).
- Di dunia nyata, konsep ini krusial untuk membuat abstraksi koleksi data yang rapi, pagination, serta *Lazy Evaluation* data besar yang hemat memori.

---
[⬅️ Materi Sebelumnya: 15 - Custom Error](../15-custom-error/README.md) | [Kembali ke Daftar Isi Utama 🏠](../../README.md)
