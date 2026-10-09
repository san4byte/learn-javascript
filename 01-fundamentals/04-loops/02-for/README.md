# 04.2 - Pengulangan: For Loop

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Melakukan perulangan terstruktur dengan menggabungkan inisialisasi counter, kondisi evaluasi, dan pembaruan langkah (_step_) dalam satu baris deklarasi header.
> - **Kapan Digunakan**: Sangat ideal ketika jumlah total iterasi, batas awal, batas akhir, dan langkah kenaikan/penurunan sudah diketahui secara pasti.
> - **Aturan Praktis**: Gunakan `let` (bukan `var`) untuk mendeklarasikan variabel counter agar terisolasi di dalam _block scope_ setiap iterasi. Hindari _off-by-one error_ dengan memeriksa operator perbandingan (`<` vs `<=`).

---

## 1. 🎯 Tujuan Belajar

- Menguasai anatomi 3 pernyataan pada header perulangan `for`: inisialisasi, kondisi terminasi, dan ekspresi akhir.
- Mampu membuat perulangan maju (_increment_), mundur (_decrement_), dan langkah kustom (_custom step_).
- Menguasai teknik iterasi data koleksi array menggunakan indeks manual `array[i]`.
- Mengendalikan alur iterasi menggunakan kata kunci `break` (keluar dari loop) dan `continue` (lompat ke putaran berikutnya).
- Memahami implementasi multi-counter dalam satu header `for` (dasar pola algoritma _two-pointer_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Perulangan `for` seperti **resep minum obat dari dokter**: Dokter menulis aturan terperinci di satu lembar resep: _"Mulai hari ke-1, minum 1 tablet setiap hari, hingga hari ke-5"_. Anda sudah tahu persis titik awal (hari 1), titik akhir (hari 5), dan frekuensi kenaikan (1 tablet per hari) sebelum obat pertama diminum.

---

### Tabel Anatomi Sintaks Header `for`

| Komponen Header           | Contoh Penulisan | Waktu Eksekusi            | Keterangan                                                  |
| :------------------------ | :--------------- | :------------------------ | :---------------------------------------------------------- |
| **1. Inisialisasi**       | `let i = 0`      | Hanya sekali di awal loop | Mendeklarasikan & menyiapkan counter awal.                  |
| **2. Kondisi Evaluasi**   | `i < 10`         | Di awal setiap iterasi    | Jika `true`, badan loop jalan; jika `false`, loop berakhir. |
| **3. Ekspresi Pembaruan** | `i++` / `i += 2` | Di akhir setiap iterasi   | Memperbarui counter sebelum kondisi dicek kembali.          |

---

### Pembahasan Mendalam Fitur & API

#### 1. Anatomi Tiga Pernyataan `for` Loop

Ketiga bagian ekspresi di dalam kurung header dipisahkan oleh tanda titik koma (`;`). Ketiganya bersifat opsional, namun umumnya selalu ditulis lengkap:

```javascript
for (let counter = 1; counter <= 3; counter++) {
  console.log(`Langkah ke-${counter}`);
}
```

#### 2. Perulangan Maju (_Increment_) dan Mundur (_Decrement_)

Arah perulangan ditentukan oleh operator pembaruan dan kondisi evaluasi:

```javascript
// Maju (Increment)
for (let i = 1; i <= 5; i++) {
  /* 1, 2, 3, 4, 5 */
}

// Mundur (Decrement)
for (let i = 5; i >= 1; i--) {
  /* 5, 4, 3, 2, 1 */
}
```

#### 3. Nilai Langkah Kustom (_Custom Step_)

Pembaruan counter tidak terbatas pada penambahan satu (`++`). Anda bisa menggunakan operator assignment aritmatika apa pun seperti `+=`, `-=`, atau `*=`:

```javascript
for (let genap = 0; genap <= 10; genap += 2) {
  console.log(genap); // 0, 2, 4, 6, 8, 10
}
```

#### 4. Iterasi Array Klasik Berbasis Indeks

Sebelum tersedianya metode fungsional modern (`.forEach()`, `.map()`), perulangan `for` adalah standar utama membaca elemen array melalui indeks numerik:

```javascript
const buah = ["Apel", "Jeruk", "Mangga"];
for (let idx = 0; idx < buah.length; idx++) {
  console.log(`Item ke-${idx}: ${buah[idx]}`);
}
```

#### 5. Pernyataan `break` untuk Terminasi Dini

`break` menghentikan eksekusi loop secara prematur saat kondisi tertentu terpenuhi, menghindari proses yang tidak perlu (_short-circuiting_):

```javascript
for (let i = 1; i <= 100; i++) {
  if (i === 5) break; // Berhenti saat i mencapai 5
}
```

#### 6. Pernyataan `continue` untuk Melewati Iterasi

`continue` mengabaikan sisa baris kode di dalam badan loop untuk iterasi saat ini dan langsung berpindah ke evaluasi iterasi berikutnya:

```javascript
for (let i = 1; i <= 4; i++) {
  if (i === 2) continue; // Angka 2 dilewati
  console.log(i); // Mencetak 1, 3, 4
}
```

#### 7. Pola Multiple Counter (_Two-Pointer Pattern_)

Header `for` dapat mengelola dua variabel sekaligus yang dipisahkan oleh tanda koma (`,`):

```javascript
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(`i: ${i}, j: ${j}`);
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi perulangan `for` terstruktur (maju, mundur, custom step), akses indeks array manual, manipulasi alur `break` & `continue`, serta pola _multiple counter_ dua arah telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/04-loops/02-for/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pencarian Data Pertama (_Find First Match_)**: Menemukan ID target dalam koleksi besar dan segera keluar menghemat sumber daya CPU:
   ```javascript
   function temukanPengguna(users, targetId) {
     for (let i = 0; i < users.length; i++) {
       if (users[i].id === targetId) {
         return users[i]; // Keluar dari fungsi dan loop seketika
       }
     }
     return null;
   }
   ```
2. **Batch Processing / Pagination**: Memproses data dalam potongan ukuran tertentu (_chunking_): `for (let offset = 0; offset < totalData; offset += pageSize)`.

### ⚠️ Common Pitfalls

- **Off-by-One Error**: Kesalahan menentukan batas akhir seperti `i <= array.length` yang mengakibatkan elemen terakhir bernilai `undefined` (karena indeks array berbasis 0, batasnya harus `i < array.length`).
- **Menggunakan `var` pada Counter**: Mendeklarasikan `for (var i = 0; ...)` membuat variabel `i` bocor ke luar loop dan merusak nilai pada operasi asinkron/callback. Selalu gunakan `let`.

### 🌟 Best Practice

- Gunakan nama variabel `i`, `j`, `k` hanya untuk loop pendek satu atau dua baris. Gunakan nama deskriptif seperti `rowIndex` atau `stepCount` pada algoritma kompleks.
- Untuk koleksi array modern, pertimbangkan `for...of` atau metode array tingkat tinggi (`forEach`, `filter`, `map`) jika tidak membutuhkan manipulasi indeks numerik langsung.

---

## 5. ✍️ Latihan Mandiri

1. Buat sebuah perulangan `for` yang mencetak tabel perkalian 7 mulai dari `7 x 1 = 7` hingga `7 x 10 = 70`.
2. Diberikan array angka `const angka = [12, 45, 67, 89, 23, 90, 34]`. Gunakan perulangan `for` dengan `break` untuk mencari angka pertama yang bernilai lebih dari 80, lalu cetak nilai dan indeks angka tersebut.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04.1 - While Loop](../01-while/README.md)
- ➡️ **Selanjutnya:** [04.3 - Pengulangan Bersarang](../03-nested-loops/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
