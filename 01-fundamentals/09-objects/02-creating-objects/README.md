# 09.2 - Tiga Cara Membuat Object (Literal, Function, Constructor)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami pembuatan objek menggunakan Object Literal.
> - **Kapan Digunakan**: Memahami pola Function Declaration / Factory Function.
> - **Aturan Praktis**: Gunakan huruf kapital di awal (_PascalCase_) untuk nama Constructor Function agar Anda dan tim selalu ingat untuk menambahkan `new`.

## 1. 🎯 Tujuan Belajar

- Memahami pembuatan objek menggunakan Object Literal.
- Memahami pola Function Declaration / Factory Function.
- Memahami pola Constructor Function dan penggunaan keyword `new`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Object Literal seperti **membuat kue manual dari nol di dapur untuk dimakan sendiri**. Factory Function seperti **alat cetakan kue martabak**: adonan dimasukkan, kue dicetak dan disajikan. Constructor Function seperti **pabrik cetak massal otomatis berlisensi**: setiap produk yang keluar dari pabrik dijamin memiliki stempel resmi (_instanceof_).

Di JavaScript, terdapat 3 pendekatan klasik untuk membuat objek:

### 1. Object Literal `{}`

Cara paling sederhana dan langsung. Cocok untuk objek tunggal yang tidak dibuat berulang-ulang:

```javascript
const user = { nama: 'Joko', umur: 25 };
```

### 2. Function Declaration (Factory Function)

Fungsi biasa yang membuat objek di dalamnya dan me-return objek tersebut. Cocok jika butuh cetakan objek banyak tanpa membingungkan keyword `this`:

```javascript
function buatUser(nama, umur) {
  return { nama, umur };
}
```

### 3. Constructor Function (Keyword `new`)

Pondasi Pemrograman Berorientasi Objek klasik di JavaScript (sebelum sintaks `class` ES6).

- Menggunakan huruf kapital di awal nama fungsi (konvensi).
- Menggunakan keyword `this` untuk menempelkan properti.
- **WAJIB** dipanggil dengan keyword **`new`**.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Object Literal (Satu Objek Spesifik) ---');
const mhs1 = {
  nama: 'Joko Santoso',
  nim: '1012001',
  jurusan: 'Informatika',
};
console.log('Literal:', mhs1.nama);

console.log('\n--- 2. Function Declaration (Factory Function) ---');
function buatMahasiswa(nama, nim, jurusan) {
  const mhs = {};
  mhs.nama = nama;
  mhs.nim = nim;
  mhs.jurusan = jurusan;
  return mhs;
}

const mhs2 = buatMahasiswa('Budi', '1012002', 'Sistem Informasi');
console.log('Factory Function:', mhs2);

console.log('\n--- 3. Constructor Function (Keyword new) ---');
function Mahasiswa(nama, nim, jurusan) {
  // Di balik layar: JavaScript otomatis membuat: let this = Object.create(Mahasiswa.prototype);
  this.nama = nama;
  this.nim = nim;
  this.jurusan = jurusan;
  // Di balik layar: JavaScript otomatis melakukan: return this;
}

const mhs3 = new Mahasiswa('Siti', '1012003', 'Teknik Elektro');
console.log('Constructor:', mhs3);
console.log('Apakah mhs3 instance dari Mahasiswa?', mhs3 instanceof Mahasiswa);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Object Literal (Satu Objek Spesifik) ---
Literal: Joko Santoso

--- 2. Function Declaration (Factory Function) ---
Factory Function: { nama: 'Budi', nim: '1012002', jurusan: 'Sistem Informasi' }

--- 3. Constructor Function (Keyword new) ---
Constructor: Mahasiswa { nama: 'Siti', nim: '1012003', jurusan: 'Teknik Elektro' }
Apakah mhs3 instance dari Mahasiswa? true
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Library & Framework Lama**: Sebelum ES6 Class, hampir seluruh library besar (seperti jQuery, Express, Three.js) dibangun menggunakan Constructor Function.
2. **Object Literal untuk DTO (Data Transfer Object)**: Mengirim paket data payload ringkas antar fungsi.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Keyword `new` pada Constructor Function**: Jika Anda memanggil `Mahasiswa('Budi')` tanpa `new`, fungsi berjalan sebagai fungsi biasa, `this` akan menunjuk ke objek `window/global`, dan fungsi mengembalikan `undefined`!

### 🌟 Best Practice

- Gunakan huruf kapital di awal (_PascalCase_) untuk nama Constructor Function agar Anda dan tim selalu ingat untuk menambahkan `new`.
- Di JavaScript modern, Anda juga bisa menggunakan sintaks `class` (yang telah kita bahas tuntas di Modul 05).

---

## 6. ✍️ Latihan Mandiri

1. Buatlah Constructor Function bernama `Produk(nama, harga, stok)` yang memiliki method `beli(jumlah)` untuk mengurangi stok.
2. Buat dua objek produk baru menggunakan keyword `new`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09.1 - Dasar Object](../01-object-basics/README.md)
- ➡️ **Selanjutnya:** [09.3 - Keyword This](../03-keyword-this/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
