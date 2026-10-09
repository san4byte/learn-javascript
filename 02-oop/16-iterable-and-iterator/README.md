# 16 - Iterable dan Iterator Protocol

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Standar protokol antarmuka (_iteration protocols_) di JavaScript yang memungkinkan class atau objek kustom dapat dilalui menggunakan loop `for...of`, diurai dengan _spread operator_ (`...`), dan didekonstruksi (_destructured_).
> - **Kapan Digunakan**: Mengembangkan koleksi data kustom (_custom collections_), pemrosesan data bervolume besar secara bertahap (_lazy evaluation_ / streaming), atau paginasi feed data.
> - **Aturan Praktis**: Implementasikan method `[Symbol.iterator]()` yang mengembalikan objek dengan method `next() -> { value, done }`, atau gunakan _generator method_ `*[Symbol.iterator]() { yield ... }`.

---

## 1. 🎯 Tujuan Belajar

- Memahami arsitektur dua kontrak inti JavaScript: **Iterable Protocol** dan **Iterator Protocol**.
- Menguasai implementasi method khusus **`[Symbol.iterator]()`** pada class.
- Memahami struktur respons method **`next()`** yang mengembalikan objek `{ value, done }`.
- Mengetahui berbagai fitur JavaScript modern yang menjadi konsumen protokol iterasi (`for...of`, `...spread`, destructuring, `Array.from()`, `new Set()`).
- Membangun koleksi kustom terenkapsulasi yang ramah perulangan tanpa membongkar struktur array internal.
- Menguasai teknik modern penulisan iterator menggunakan **Generator Method** (`*` dan `yield`).
- Memahami konsep komputasi tunda (**Lazy Evaluation**) untuk menghasilkan deret data tak hingga tanpa kehabisan memori RAM.
- Memahami metode pembersihan opsional **`return()`** saat perulangan dihentikan di tengah jalan (_break/throw_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **mesin dispenser tiket antrean di bank**: Mesin dispenser adalah objek _Iterable_. Tombol merah di dispenser adalah objek _Iterator_. Setiap kali seorang nasabah datang dan menekan tombol (`next()`), dispenser mengeluarkan selembar tiket berisi nomor giliran (_`value`_) dan indikator apakah kuota antrean hari itu masih ada atau sudah habis (_`done: false / true`_). Mesin tidak perlu mencetak 1.000 lembar tiket di awal sekaligus, melainkan hanya saat tombol ditekan.

---

### 1. Tabel Ringkasan Fitur Protokol Iterasi (Cheat-Sheet)

| Komponen / Protokol     | Nama Method / Kunci    | Format Kembalian                | Peran Utama                                            |
| :---------------------- | :--------------------- | :------------------------------ | :----------------------------------------------------- |
| **Iterable Contract**   | `[Symbol.iterator]()`  | Objek Iterator                  | Gerbang masuk perulangan JavaScript.                   |
| **Iterator Contract**   | `next()`               | `{ value: any, done: boolean }` | Menghasilkan elemen berikutnya satu per satu.          |
| **Konsumen `for...of`** | Loop perulangan        | Otomatis membaca `.value`       | Melakukan iterasi hingga `done === true`.              |
| **Spread Operator**     | `[...customIterable]`  | Array hasil iterasi             | Membongkar seluruh elemen ke dalam array.              |
| **Generator Method**    | `*[Symbol.iterator]()` | Iterable Iterator               | Otomatis membuat objek iterator via `yield`.           |
| **Iterator Cleanup**    | `return()` (opsional)  | `{ value, done: true }`         | Dipicu saat loop dihentikan oleh `break` atau `throw`. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja protokol iterasi beserta skenario kasusnya:

---

#### 1. Kontrak Protokol Iterable: `[Symbol.iterator]()`

Sebuah objek atau class resmi menjadi _Iterable_ jika memiliki method dengan nama properti terhitung `[Symbol.iterator]`:

```javascript
class AngkaSatuDuaTiga {
  [Symbol.iterator]() {
    let n = 1;
    return {
      next() {
        if (n <= 3) return { value: n++, done: false };
        return { value: undefined, done: true };
      },
    };
  }
}

for (const x of new AngkaSatuDuaTiga()) {
  console.log(x); // Mencetak 1, lalu 2, lalu 3
}
```

---

#### 2. Kontrak Protokol Iterator: `next() -> { value, done }`

Method `next()` dipanggil berulang kali oleh runtime JavaScript. Setiap panggilan harus mengembalikan objek dengan dua properti:

- `value`: Data elemen yang sedang dievaluasi pada langkah saat ini.
- `done`: `false` jika masih ada elemen tersisa, atau `true` jika perulangan telah usai.

```javascript
const iterator = new AngkaSatuDuaTiga()[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

---

#### 3. Konsumen Protokol Iterasi di JavaScript

Semua fitur modern berikut otomatis memanfaatkan `[Symbol.iterator]()`:

```javascript
const deret = new AngkaSatuDuaTiga();

// 1. Spread Operator
const array = [...deret]; // [1, 2, 3]

// 2. Destructuring
const [pertama, kedua] = deret; // pertama = 1, kedua = 2

// 3. Array.from & Set
const set = new Set(deret); // Set { 1, 2, 3 }
```

---

#### 4. Enkapsulasi Koleksi Kustom (Custom Collection Pattern)

Alih-alih mengekspos array internal privat ke publik, kita bisa menerapkan protokol iterasi agar pengguna class dapat melakukan looping secara langsung:

```javascript
class KatalogToko {
  #barang = [];

  tambah(nama) {
    this.#barang.push(nama);
  }

  [Symbol.iterator]() {
    let index = 0;
    const items = this.#barang;
    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}
```

---

#### 5. Implementasi Modern dengan Generator Method (`*` & `yield`)

Di lingkungan industri modern, menulis objek `{ next() ... }` manual terasa panjang. Anda cukup menggunakan tanda bintang generator `*` dan kata kunci `yield`:

```javascript
class RakBuku {
  #buku = ['Clean Code', 'Refactoring'];

  // Generator method otomatis memenuhi kontrak Iterable dan Iterator:
  *[Symbol.iterator]() {
    for (const judul of this.#buku) {
      yield judul; // yield membungkus nilai ke { value, done: false }
    }
  }
}

for (const buku of new RakBuku()) {
  console.log(buku);
}
```

---

#### 6. Lazy Evaluation dan Penanganan Deret Tak Hingga

Iterator hanya menghitung data berikutnya saat diminta. Ini memungkinkan representasi deret matematika tak hingga tanpa memakan kuota RAM:

```javascript
class BilanganAsli {
  *[Symbol.iterator]() {
    let i = 1;
    while (true) {
      yield i++; // Menghasilkan angka baru on-demand selamanya
    }
  }
}

for (const n of new BilanganAsli()) {
  console.log(n);
  if (n >= 5) break; // Berhenti dengan aman tanpa out-of-memory crash!
}
```

---

#### 7. Pembersihan Resource Saat Berhenti Dini (`return()` Method)

Jika loop `for...of` dihentikan sebelum mencapai akhir (misal karena `break` atau `throw`), JavaScript akan memicu method `return()` pada iterator untuk menutup koneksi atau membersihkan resource:

```javascript
class SensorStream {
  [Symbol.iterator]() {
    return {
      next() {
        return { value: Math.random(), done: false };
      },
      return() {
        console.log('Koneksi sensor ditutup dengan aman.');
        return { value: undefined, done: true };
      },
    };
  }
}

for (const data of new SensorStream()) {
  if (data > 0.5) break; // Otomatis memicu method return() di atas
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep iterasi protokol di atas—mulai dari implementasi manual method `next()`, konsumsi via `for...of` & spread operator, enkapsulasi katalog belanja, generator method modern dengan `yield`, evaluasi deret Fibonacci tak hingga, hingga metode _cleanup_ `return()`—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/16-iterable-and-iterator/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Streaming Data & Paginasi Otomatis**: Mengambil baris data dari database atau API secara bertahap (_batching_) setiap kali iterasi meminta data baru tanpa membebani memori server.
2. **Koleksi Struktur Data Kustom**: Mengimplementasikan class `LinkedList`, `BinaryTree`, atau `Graph` yang dapat dijelajahi dengan sintaks elegan `for (const node of tree)`.
3. **Pembangkit ID Unik (Sequence ID Generator)**: Membuat generator nomor resi pengiriman atau order ID berurutan tanpa batas.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Infinite Loop pada Spread Operator**: Mencoba melakukan spread operator `[...infiniteSequence]` pada generator tak hingga akan langsung membuat aplikasi _hang_ dan crash (_JavaScript out of memory_).
- **Lupa Menandai `done: true`**: Jika kondisi akhir tidak mengembalikan `done: true`, loop `for...of` tidak akan pernah berhenti.
- **Memanggil `[Symbol.iterator]()` Tanpa Kurung Siku**: Menulis `Symbol.iterator() { ... }` tanpa tanda kurung siku `[...]` akan mendefinisikan string method biasa, bukan implementasi Symbol resmi.

### 🌟 Best Practice

- Gunakan _Generator Method_ (`*[Symbol.iterator]() { yield item; }`) untuk implementasi bersih, ringkas, dan minim kesalahan di kode produksi.
- Selalu sediakan proteksi `return()` jika iterator membuka resource eksternal seperti file descriptor, web socket, atau database cursor.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `Rentang(awal, akhir, langkah)` yang mengimplementasikan protokol iterable sehingga `for (const x of new Rentang(0, 10, 2))` mencetak angka genap `0, 2, 4, 6, 8, 10`.
2. Gunakan _spread operator_ `[...new Rentang(1, 5, 1)]` dan periksa apakah output array-nya bernilai `[1, 2, 3, 4, 5]`.
3. Tulis ulang class `Rentang` tersebut menggunakan sintaks _Generator Method_ (`*[Symbol.iterator]()`) dan bandingkan efisiensi jumlah baris kodenya.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [15 - Custom Error Class](../15-custom-error/README.md)
- ➡️ **Selanjutnya:** [01 - Modul 03 (Standard Library)](../../03-standard-library/01-number/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
