# 16 - Iterable dan Iterator Protocol

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Protokol standar agar objek buatan sendiri dapat diulang dengan loop `for...of` dan disebar via _spread operator_ (`...`).
> - **Kapan Digunakan**: Membuat custom data collection, streaming data, paginasi, dan pengolahan data besar hemat RAM (_lazy evaluation_).
> - **Aturan Praktis**: Implementasikan method `[Symbol.iterator]()` yang mereturn objek Iterator dengan method `next() -> { value, done }`.

## 1. 🎯 Tujuan Belajar

- Memahami konsep dasar **Iteration Protocol** di JavaScript.
- Membedakan antara kontrak **Iterable** dan kontrak **Iterator**.
- Mengetahui cara kerja method spesial **`[Symbol.iterator]()`** dan method **`next()`**.
- Mengerti bagaimana `for...of` dan _Spread Operator_ (`...`) bekerja di balik layar.
- **Memahami penggunaan nyata Iterable & Iterator di proyek industri nyata (Real-World Project)**.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti **mesin dispenser nomor antrean di bank**: Mesin dispenser adalah _Iterable_, tombol tiket adalah _Iterator_, dan setiap kali tombol ditekan (`next()`), selembar kertas antrean `{ value, done }` keluar untuk nasabah.

### 1. Masalah yang Diselesaikan

Di JavaScript, kita bisa dengan mudah melakukan perulangan `for...of` atau _spread operator_ `[...]` pada data bawaan seperti **Array**, **String**, **Set**, dan **Map**:

```javascript
const fruits = ['Apel', 'Jeruk'];
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

---

## 3. 💻 Contoh Kode (`example.js`)

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
  console.info('Nilai counter:', val);
}
```

---

## 4. 🖥️ Output yang Diharapkan

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

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case & Studi Kasus Industri

Kapan developer di industri benar-benar membuat Custom Iterable & Iterator?

#### A. Custom Collection Enkapsulasi (E-Commerce / Library)

Bayangkan Anda membuat modul keranjang belanja (`ShoppingCart`) atau katalog produk (`ProductCatalog`). Alih-alih mengekspos array internal:

```javascript
// Bersih & Profesional berkat protokol Iterable:
for (const item of cart) {
  console.log(item.name, item.price);
}
const daftarBarang = [...cart]; // Otomatis bisa di-spread!
```

#### B. Lazy Evaluation & Hemat Memori (Mengolah Data Raksasa)

Bayangkan Anda butuh deret jutaan data atau streaming log server:

- **Jika pakai Array biasa**: JavaScript mencoba memuat semua data sekaligus ke RAM $\rightarrow$ Browser/Server langsung crash out-of-memory.
- **Dengan Iterator (Lazy Evaluation)**: Data berikutnya **baru dihitung saat `next()` dipanggil**! Alokasi memori tetap minimal.

#### C. Infinite Scroll & Stream Paginasi

Saat user men-scroll feed media sosial, Iterator meminta halaman (_page_) berikutnya ke server secara bertahap saat dibutuhkan, bukan mendownload seluruh database sekaligus.

### 🌟 Pendekatan Modern di Industri: Generator Function (`function*` & `yield`)

Di proyek nyata, menulis class Iterator manual terasa panjang. JavaScript modern menyediakan **Generator Function (`function*`)**:

```javascript
class BookShelf {
  constructor() {
    this.books = ['Clean Code', 'Refactoring'];
  }

  *[Symbol.iterator]() {
    for (const book of this.books) {
      yield book; // yield otomatis membungkus data ke dalam { value, done }!
    }
  }
}

const shelf = new BookShelf();
for (const b of shelf) {
  console.log(b);
}
```

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Infinite Loop Tanpa Batas**: Lupa meng-increment index atau salah mengevaluasi kondisi `done: true` di method `next()` menyebabkan `for...of` berjalan selamanya.
- **Mutasi Properti Tidak Sengaja**: Menjalankan perulangan tanpa mengisolasi state internal iterator.

### 🌟 Best Practice

- Untuk penulisan iterator yang jauh lebih ringkas di industri modern, gunakan Generator Function (`*[Symbol.iterator]() { yield item; }`).
- Manfaatkan protokol ini untuk menjaga enkapsulasi data collection Anda.

---

## 6. ✍️ Latihan Mandiri

1. Buat class `RentangAngka(dari, sampai)` yang mengimplementasikan `[Symbol.iterator]` sehingga bisa menghasilkan angka dari 1 sampai 10 saat di-loop dengan `for...of`.
2. Gunakan _Spread Operator_ `[...rentang]` pada class `RentangAngka` tersebut dan buktikan bahwa hasilnya otomatis menjadi sebuah array `[1, 2, 3, ..., 10]`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [15 - Custom Error Class](../15-custom-error/README.md)
- ➡️ **Selanjutnya:** [01 - Modul 03 (Standard Library)](../../03-standard-library/01-number/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
