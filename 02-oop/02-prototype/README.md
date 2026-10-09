# 02 - Prototype Inheritance (Rantai Prototipe, Efisiensi RAM, dan Property Shadowing)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mekanisme pewarisan bawaan JavaScript untuk berbagi method dan properti antar objek secara hemat memori melalui rantai pewarisan (_prototype chain_).
> - **Kapan Digunakan**: Melekatkan fungsi/method bersama pada seluruh instance objek yang diciptakan oleh Constructor Function.
> - **Aturan Praktis**: Selalu pasang method pada `ConstructorName.prototype`, gunakan `Object.getPrototypeOf()` daripada properti usang `__proto__`, dan pulihkan properti `constructor` jika menimpa objek prototype secara total.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep pemrograman berbasis prototipe (_Prototype-based programming_) di JavaScript.
- Membedakan peran antara properti objek `Constructor.prototype` dan tautan prototipe internal `[[Prototype]]` (`__proto__`).
- Memahami cara kerja penelusuran properti ke atas melalui **Prototype Chain** hingga mencapai `Object.prototype` dan `null`.
- Membuktikan efisiensi alokasi memori RAM ketika method disimpan di dalam prototype dibanding di dalam constructor.
- Menguasai fenomena **Property Shadowing** ketika instance mendefinisikan properti dengan nama yang sama dengan prototype.
- Mengetahui cara menambah method ke prototype secara dinamis saat runtime dan dampaknya ke instance yang sudah dibuat sebelumnya.
- Menghindari jebakan putusnya referensi `constructor` saat menimpa objek prototype serta bahaya _Prototype Pollution_.
- Menguasai metode inspeksi: `isPrototypeOf()`, `Object.getPrototypeOf()`, dan `Object.hasOwn()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti fasilitas **kolam renang di kompleks apartemen mewah**: Setiap penghuni unit apartemen (`instance`) tidak perlu membangun kolam renang pribadi di dalam ruang tamunya (sangat boros tempat & biaya pemeliharaan). Cukup ada satu kolam renang di area fasilitas umum apartemen (`Constructor.prototype`), dan seluruh penghuni unit apartemen dapat mengakses dan berenang di kolam tersebut bersama-sama.

JavaScript adalah bahasa yang tidak memiliki kelas sejati pada masa awalnya; seluruh mekanisme pewarisan diatur melalui rantai objek yang saling bertaut yang disebut **Prototype**.

---

### 1. Tabel Ringkasan Fitur Prototype (Cheat-Sheet)

| Fitur / API                         | Target / Sintaks          | Nilai Kembalian    | Deskripsi Singkat                                                                 |
| :---------------------------------- | :------------------------ | :----------------- | :-------------------------------------------------------------------------------- |
| **`Fn.prototype`**                  | Pada Fungsi / Constructor | `object`           | Objek cetak biru yang akan dijadikan prototipe oleh seluruh instance hasil `new`. |
| **`__proto__`**                     | Pada Instance Objek       | `object`           | Aksesor lama (_legacy_) yang menunjuk ke prototype pembuatnya.                    |
| **`Object.getPrototypeOf(obj)`**    | `obj`                     | `object` \| `null` | Standar resmi modern untuk membaca prototype objek.                               |
| **`Object.setPrototypeOf(obj, p)`** | `obj`, `proto`            | `object`           | Mengubah prototype objek secara dinamis.                                          |
| **`proto.isPrototypeOf(obj)`**      | `obj`                     | `boolean`          | Memeriksa apakah `proto` berada di rantai prototype milik `obj`.                  |
| **`Object.hasOwn(obj, prop)`**      | `obj`, `prop`             | `boolean`          | Memastikan properti adalah milik instance sendiri (bukan warisan prototype).      |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja Prototype Inheritance beserta berbagai kemungkinan kasus (_edge cases_):

---

#### 1. Anatomi Prototype: Perbedaan `.prototype` vs `__proto__`

Banyak pemula bingung membedakan antara properti `prototype` dan tautan `__proto__`:

- **`Constructor.prototype`**: Hanyalah properti objek biasa yang menempel pada sebuah **fungsi**.
- **`instance.__proto__`**: Tautan rahasia internal (`[[Prototype]]`) milik sebuah **objek instance** yang menunjuk balik ke `Constructor.prototype`:

```javascript
function User(nama) {
  this.nama = nama;
}

const joko = new User("Joko");

console.log(User.prototype === Object.getPrototypeOf(joko)); // true ✅
console.log(User.prototype === joko.__proto__); // true (hindari __proto__ di kode modern)
```

---

#### 2. Efisiensi Alokasi Memori: Menempelkan Method pada `prototype`

Dengan menempelkan method pada `User.prototype`, fungsi tersebut hanya dibuat **satu kali** di memori bersama:

```javascript
User.prototype.sapa = function () {
  return `Halo, nama saya ${this.nama}`;
};

const u1 = new User("Andi");
const u2 = new User("Budi");

console.log(u1.sapa === u2.sapa); // true! ✅ (Merujuk ke blok memori yang sama persis)
```

---

#### 3. Penelusuran Properti: Prototype Chain (Rantai Prototipe)

Ketika Anda mengakses sebuah properti atau method (misal `joko.toString()`):

1. JavaScript memeriksa apakah properti tersebut ada di objek `joko` sendiri.
2. Jika tidak ada, JavaScript naik ke `joko.__proto__` (`User.prototype`).
3. Jika tidak ada, JavaScript naik lagi ke `User.prototype.__proto__` (`Object.prototype`).
4. Jika tidak ada, JavaScript naik ke `Object.prototype.__proto__` yang bernilai **`null`**.
5. Jika sampai `null` belum ditemukan, JavaScript mengembalikan **`undefined`** (atau melempar `TypeError` jika dipanggil sebagai fungsi).

```javascript
const proto1 = Object.getPrototypeOf(joko); // User.prototype
const proto2 = Object.getPrototypeOf(proto1); // Object.prototype
const proto3 = Object.getPrototypeOf(proto2); // null (Ujung rantai)

console.log(proto3); // null
```

---

#### 4. Efek Penutupan Properti (_Property Shadowing_)

Jika sebuah instance mendefinisikan properti dengan nama yang sama persis dengan properti di prototype, properti instance akan **menutupi (_shadow_)** properti prototype tanpa merusak prototype aslinya:

```javascript
User.prototype.role = "Member"; // Default untuk semua user

const memberBiasa = new User("Siti");
const adminUser = new User("SuperAdmin");

// Shadowing: Timpa properti hanya untuk adminUser
adminUser.role = "Admin";

console.log(memberBiasa.role); // "Member" (membaca dari prototype)
console.log(adminUser.role); // "Admin"  (membaca properti miliknya sendiri)
console.log(User.prototype.role); // "Member" (prototype tetap utuh)
```

---

#### 5. Penambahan Method Dinamis saat Runtime

Karena pencarian rantai prototype terjadi saat _runtime_, penambahan method ke prototype akan langsung berdampak seketika ke seluruh instance yang sudah dibuat sebelumnya:

```javascript
// Instance u1 dibuat sebelum method ini ada:
User.prototype.logout = function () {
  return `${this.nama} telah logout.`;
};

// u1 langsung bisa memanggilnya:
console.log(u1.logout()); // "Andi telah logout." ✅
```

---

#### 6. Jebakan Menimpa Objek Prototype & Cara Restore `constructor`

Jika Anda menulis ulang seluruh prototype menggunakan objek literal baru:

```javascript
function Produk(nama) {
  this.nama = nama;
}

// ❌ JEBAKAN: Menimpa prototype secara polos
Produk.prototype = {
  getNama() {
    return this.nama;
  },
};

const p = new Produk("Kopi");
console.log(p.constructor === Produk); // false! ❌ (Berubah menjadi Object)

// ✅ CARA YANG BENAR: Sertakan properti constructor secara eksplisit
Produk.prototype = {
  constructor: Produk, // Restore referensi asli
  getNama() {
    return this.nama;
  },
};
```

---

#### 7. Bahaya Fatal _Prototype Pollution_ pada `Object.prototype`

Menambahkan properti ke `Object.prototype` secara sembarangan sangat berbahaya karena properti tersebut akan mencemari **setiap objek** di seluruh aplikasi Anda:

```javascript
// ❌ SANGAT DILARANG:
// Object.prototype.hacked = true;
// const objKosong = {};
// console.log(objKosong.hacked); // true! (Celah keamanan XSS dan logic bug)
```

---

#### 8. Metode Inspeksi: `isPrototypeOf()` vs `Object.hasOwn()`

- **`isPrototypeOf(obj)`**: Memverifikasi apakah suatu prototipe menjadi bagian dari rantai objek.
- **`Object.hasOwn(obj, prop)`**: Memastikan apakah properti berada di instance itu sendiri atau hanya warisan prototype:

```javascript
console.log(User.prototype.isPrototypeOf(u1)); // true ✅

console.log(Object.hasOwn(u1, "nama")); // true  (properti instance sendiri)
console.log(Object.hasOwn(u1, "sapa")); // false (berasal dari prototype)
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep alokasi memori bersama, rantai Prototype Chain, efek Property Shadowing, pemulihan referensi constructor, serta inspeksi `isPrototypeOf` dan `Object.hasOwn` di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/02-prototype/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Arsitektur Standar JavaScript Native**: Seluruh method bawaan seperti `Array.prototype.map()`, `String.prototype.slice()`, dan `Promise.prototype.then()` diimplementasikan di atas sistem prototype ini.
2. **Polyfill Fitur Browser**: Menambahkan fungsionalitas method modern ke browser jadul dengan menyuntikkannya ke `Array.prototype` atau `String.prototype` jika method belum tersedia.
3. **Optimasi Memori Skala Masif**: Saat aplikasi Anda harus menampung ratusan ribu objek entitas dalam memori (seperti game engine atau pemroses grafik data besar).

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengakses `__proto__` di Kode Produksi**: Properti `__proto__` telah didepresiasi demi performa engine V8. Selalu gunakan `Object.getPrototypeOf(obj)`.
- **Lupa Me-restore `constructor`**: Mengakibatkan pemeriksaan `instance.constructor === ClassName` menghasilkan `false` dan membingungkan library serialisasi data.
- **Melakukan Prototype Pollution**: Mengizinkan input JSON eksternal mengubah `__proto__` atau `constructor.prototype` yang dapat melumpuhkan server backend (CVE security vulnerability).

### 🌟 Best Practice

- Selalu pasang method fungsional pada prototype, jangan biarkan method bersarang di dalam constructor.
- Gunakan `Object.hasOwn(obj, prop)` untuk membedakan data milik objek sendiri dari warisan prototype.
- Pahami bahwa sintaks ES6 `class` pada hakikatnya adalah _syntactic sugar_ yang bekerja di atas fondasi Prototype ini (dibahas di materi 03).

---

## 5. ✍️ Latihan Mandiri

1. Buat Constructor Function `Lingkaran(radius)` dan tambahkan method `hitungLuas()` serta `hitungKeliling()` pada `Lingkaran.prototype`. Buat dua objek dan buktikan kedua method memiliki referensi fungsi yang sama.
2. Buat objek `hewan` dengan properti `hidup: true`. Buat objek `kucing` menggunakan `Object.create(hewan)`. Terapkan _property shadowing_ dengan memberikan properti `hidup: false` pada `kucing`, lalu buktikan bahwa nilai pada objek `hewan` tidak berubah.
3. Jelaskan mengapa `Object.getPrototypeOf(Object.prototype)` mengembalikan `null`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Constructor Function](../01-constructor-function/README.md)
- ➡️ **Selanjutnya:** [03 - Class](../03-class/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
