# 09.5 - Object Lanjutan: Prototype Inheritance dan Object.create

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami model pewarisan berbasis prototipe (_Prototype-based Inheritance_) yang menjadi fondasi kerja objek di JavaScript.
> - **Kapan Digunakan**: Menghemat memori RAM dengan berbagi implementasi method pada banyak instans objek serta menelusuri rantai delegasi properti (_Prototype Chain_).
> - **Aturan Praktis**: Sematkan method bersama ke dalam properti `Constructor.prototype` (atau gunakan sintaks ES6 `class`). Jangan pernah memodifikasi prototype bawaan global seperti `Array.prototype` (_Monkey Patching_).

---

## 1. 🎯 Tujuan Belajar

- Memahami arsitektur internal _Prototype-based Inheritance_ di JavaScript.
- Menguasai efisiensi penghematan memori melalui penyematan metode pada `Constructor.prototype`.
- Memahami alur pencarian properti naik ke atas pada _Prototype Chain_ hingga mencapai `Object.prototype` dan `null`.
- Menggunakan metode inspeksi resmi `Object.getPrototypeOf()` dan menghindari properti warisan lama `__proto__`.
- Menguasai pembuatan rantai pewarisan langsung menggunakan `Object.create()`.
- Memahami metode statis utama `Object.keys()`, `Object.values()`, `Object.entries()`, dan `Object.assign()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Prototype seperti **cetak biru spesifikasi umum di kantor pusat pabrik**:
> Pabrik tidak mencetak seluruh mesin dan bengkel di dalam bagasi setiap unit mobil yang diproduksi (**tidak menduplikasi method di dalam tiap objek**). Mobil konsumen hanya membawa buku petunjuk yang mengarah ke cetak biru pusat di pabrik (**referensi prototype**). Jika pemilik mobil ingin melakukan servis berkala, mereka merujuk ke buku manual pusat tersebut bersama-sama dengan seluruh pemilik mobil lainnya.

---

### Diagram Rantai Delegasi (Prototype Chain)

```text
[ Instans Objek 'optimus' ]
        │
        ▼ (mencari jika tidak ditemukan di instans)
[ Robot.prototype ]  -> { bekerja(), isiUlang() }
        │
        ▼ (mencari jika tidak ditemukan di Robot.prototype)
[ Object.prototype ] -> { toString(), hasOwnProperty() }
        │
        ▼
      null           -> (Ujung akhir rantai pencarian)
```

---

### Tabel Perbandingan Deklarasi Method: Constructor vs Prototype

| Kriteria                  | Method di Dalam Constructor             | Method di `Constructor.prototype`         |
| :------------------------ | :-------------------------------------- | :---------------------------------------- |
| **Alokasi Memori**        | Dibuat ulang untuk setiap `new` (Boros) | Hanya dibuat **1 kali di memori** (Hemat) |
| **Akses Variabel Privat** | Bisa membaca variabel lokal constructor | Hanya bisa membaca properti via `this`    |
| **Performa Instansiasi**  | Lebih lambat pada data besar            | Jauh lebih cepat                          |
| **Standar Industri**      | Dihindari untuk method massal           | Standar utama OOP JavaScript              |

---

### Pembahasan Mendalam Fitur & API

#### 1. Mekanisme Prototype-Based Inheritance di Balik Layar

Ketika Anda memanggil `obj.properti`, JavaScript pertama kali memeriksa apakah properti tersebut ada di instans objek itu sendiri. Jika tidak ada, pencarian dilanjutkan ke prototipe yang ditunjuk oleh tautan internal `[[Prototype]]`.

#### 2. Efisiensi Alokasi Memori Melalui Prototype Method

Setiap method yang didefinisikan pada prototipe digunakan bersama oleh seluruh instans objek tanpa memboroskan RAM:

```javascript
function User(nama) {
  this.nama = nama;
}
User.prototype.sapa = function () {
  return `Halo ${this.nama}`;
};
```

#### 3. Rantai Delegasi Properti: Prototype Chain

Pencarian terus berjalan ke atas hingga mencapai `Object.prototype`. Jika sampai ke `null` tetap tidak ditemukan, JavaScript mengembalikan nilai `undefined`.

#### 4. Inspeksi Prototipe dengan `Object.getPrototypeOf()`

Gunakan metode resmi ECMAScript untuk memeriksa prototipe dari suatu instans objek:

```javascript
const proto = Object.getPrototypeOf(obj);
```

#### 5. Pewarisan Objek Murni via `Object.create()`

Membuat objek baru dengan prototipe spesifik tanpa harus menuliskan fungsi konstruktor:

```javascript
const cetakan = { status: "Aktif" };
const anak = Object.create(cetakan);
console.log(anak.status); // 'Aktif' (diambil dari cetakan)
```

#### 6. Metode Statis Inti: `Object.keys`, `values`, `entries`, `assign`

Manipulasi kumpulan pasangan kunci dan nilai objek tingkat tinggi:

```javascript
const data = { a: 1, b: 2 };
Object.keys(data); // ['a', 'b']
Object.values(data); // [1, 2]
Object.entries(data); // [['a', 1], ['b', 2]]
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi pembuatan _Prototype Inheritance_ hemat memori pada konstruktor robot, pembuktian kesamaan referensi fungsi, inspeksi hierarki _Prototype Chain_ via `Object.getPrototypeOf()`, pewarisan murni via `Object.create()`, serta metode statis `Object.keys/values/entries/assign` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/09-objects/05-advanced-objects/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Metode Bawaan Array & Objek JavaScript**: Seluruh metode bawaan seperti `.map()`, `.filter()`, `.slice()` disimpan pada `Array.prototype` sehingga jutaan array di browser tidak menduplikasi kodenya masing-masing.
2. **Pola Mixin / Ekstensi Fitur**: Menggabungkan fitur dari berbagai objek prototipe ke satu entitas menggunakan `Object.assign()`.

### ⚠️ Common Pitfalls

- **Monkey Patching (Memodifikasi Prototype Bawaan)**: Menulis `Array.prototype.kustom = fn` sangat berbahaya karena rentan menimpa pembaruan spesifikasi masa depan ECMAScript dan merusak library lain.
- **Menggunakan Properti Lama `__proto__`**: Properti `__proto__` dianggap usang (_deprecated_). Gunakan `Object.getPrototypeOf()` dan `Object.setPrototypeOf()` untuk standar modern.

### 🌟 Best Practice

- Selalu simpan method bersama di `Constructor.prototype`.
- Di JavaScript modern, gunakan kata kunci `class` dan `extends` yang secara otomatis mengatur penyusunan prototype di balik layar secara aman dan bersih.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah sebuah Constructor Function bernama `Hewan(nama, suara)` dan tambahkan method `bersuara()` pada `Hewan.prototype`. Buat dua instans hewan dan buktikan dengan operator `===` bahwa kedua objek tersebut berbagi method yang sama.
2. Gunakan `Object.entries()` dan perulangan `for...of` untuk mencetak seluruh isi properti objek secara terstruktur.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09.4 - Destructuring & Spread Object](../04-destructuring-spread/README.md)
- ➡️ **Selanjutnya:** [09.6 - Latihan Angkot Berbasis Objek](../06-practice-angkot-object/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
