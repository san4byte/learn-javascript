# 07.3 - Variable Scope dan Scope Chain

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengontrol area visibilitas (_accessibility_) dan masa hidup (_lifetime_) dari variabel yang dideklarasikan di dalam program.
> - **Kapan Digunakan**: Mengisolasi state internal fungsi agar tidak terjadi tabrakan nama (_name collision_) dan mencegah kebocoran data sensitif ke ranah publik.
> - **Aturan Praktis**: Perlakukan lingkup global sebagai zona terlarang untuk variabel aplikasi reguler. Manfaatkan _Block Scope_ `{}` dengan `const`/`let` untuk mengurung variabel sedekat mungkin dengan tempat ia digunakan.

---

## 1. 🎯 Tujuan Belajar

- Memahami hierarki 3 tingkatan ruang lingkup variabel: _Global Scope_, _Function Scope_, dan _Block Scope_.
- Menguasai cara kerja algoritma _Scope Chain_ dalam menyelesaikan referensi variabel dari dalam ke luar (_inside-out lookup_).
- Mengetahui fenomena _Variable Shadowing_ (variabel lokal menutupi variabel luar yang bernama identik).
- Mencegah bahaya kebocoran variabel global tanpa sengaja (_accidental global leakage_).
- Memahami relasi antara siklus hidup scope dengan pembersihan memori otomatis (_Garbage Collection_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Scope Chain seperti **kaca film mobil satu arah (_one-way tint glass_)**:
>
> - Orang yang duduk di dalam kabin mobil (**lingkup fungsi lokal**) dapat melihat pemandangan jalan raya dan pohon-pohon di luar mobil dengan sangat jelas (**lingkup global / outer scope**).
> - Sebaliknya, pejalan kaki yang berdiri di jalan raya (**lingkup global**) sama sekali tidak dapat melihat dokumen atau dompet yang diletakkan di dalam kursi mobil (**variabel terisolasi di dalam local scope**).

---

### Tabel Perbandingan Tingkatan Scope

| Tingkatan Scope    | Wilayah Deklarasi                   | Visibilitas Akses                 | Siklus Hidup Variabel                          |
| :----------------- | :---------------------------------- | :-------------------------------- | :--------------------------------------------- |
| **Global Scope**   | Di luar semua fungsi & blok kurawal | Seluruh bagian aplikasi / file    | Tetap hidup selama aplikasi/halaman aktif      |
| **Function Scope** | Di dalam badan `function() {}`      | Hanya di dalam fungsi itu sendiri | Dihancurkan setelah fungsi selesai dieksekusi  |
| **Block Scope**    | Di dalam tanda kurung kurawal `{}`  | Hanya di dalam blok `{}` terdekat | Dihancurkan saat alur keluar dari blok kurawal |

---

### Pembahasan Mendalam Fitur & API

#### 1. Tiga Tingkatan Scope di JavaScript

JavaScript membagi ruang lingkup variabel ke dalam tiga lapisan konsentris:

```javascript
const globalVar = "Dunia"; // Global Scope

function tesFungsi() {
  const localVar = "Kota"; // Function Scope
  if (true) {
    const blockVar = "Rumah"; // Block Scope
  }
}
```

#### 2. Mekanisme Pencarian Variabel: Scope Chain

Saat variabel diakses, JavaScript melakukan pencarian bertingkat dari lapisan paling dalam ke luar (_lexical scope resolution_):

1. Periksa ruang lingkup lokal saat ini.
2. Jika tidak ada, naik satu tingkat ke ruang lingkup induk (_parent function_).
3. Lanjutkan hingga mencapai _Global Scope_.
4. Jika di tingkat global tetap tidak ditemukan, mesin melempar `ReferenceError`.

#### 3. Penutupan Identifier: Variable Shadowing

Ketika variabel di dalam lingkup anak memiliki nama pengenal (_identifier_) yang persis sama dengan variabel di lingkup induk, variabel anak akan "membayangi" atau menutupi variabel induk tanpa mengubah nilai induknya:

```javascript
let tema = "terang";
function gantiTema() {
  let tema = "gelap"; // Shadowing
  console.log(tema); // 'gelap'
}
gantiTema();
console.log(tema); // 'terang' (asli tidak terpengaruh)
```

#### 4. Isolasi Ketat Block Scope pada `let` dan `const`

Setiap kurung kurawal `{}` pada `if`, `for`, `while`, atau sekadar blok terisolasi `{ ... }` mengunci variabel modern:

```javascript
{
  const kunci = "XYZ";
}
// console.log(kunci); // ReferenceError: kunci is not defined
```

#### 5. Bahaya Polusi Global Namespace & Accidental Global

Menetapkan nilai ke variabel yang belum pernah dideklarasikan dengan `const`, `let`, atau `var` akan secara otomatis menjadikannya properti objek global (`window` atau `globalThis`):

```javascript
function bocor() {
  // Tanpa deklarasi (const/let), ini membuat variabel global baru!
  // dataBocor = 123;
}
```

#### 6. Manajemen Garbage Collection & Masa Hidup Variabel

Variabel lokal yang dideklarasikan di dalam fungsi akan otomatis ditandai untuk dihapus dari RAM oleh _Garbage Collector_ segera setelah fungsi tersebut selesai dieksekusi, selama tidak ada _closure_ yang masih mereferensikannya.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi penelusuran 3 tingkat _Scope Chain_, efek _Variable Shadowing_, isolasi _Block Scope_ `{}` terhadap variabel modern, serta pencegahan bahaya kebocoran memori global telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/03-scope/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Enkapsulasi Kunci API Rahasia**: Mengisolasi token otentikasi di dalam fungsi konfigurasi modul agar tidak dapat dibaca atau dimodifikasi oleh skrip injeksi pihak ketiga dari konsol browser.
2. **Penamaan Variabel Looping Independen**: Menggunakan `let i = 0` pada puluhan fungsi berbeda tanpa saling merusak counter iterasi satu sama lain.

### ⚠️ Common Pitfalls

- **Mengira Objek Global Bersih dari Konflik**: Menggunakan variabel global umum seperti `name`, `status`, atau `data` berisiko menimpa properti bawaan peramban (`window.name` sudah ada sejak standar awal web).
- **Shadowing yang Membingungkan Pengembang**: Melakukan shadowing variabel penting yang membuat rekan tim salah mengira variabel mana yang sedang diubah.

### 🌟 Best Practice

- Selalu aktifkan Strict Mode (`'use strict';`) atau gunakan modul ES untuk mencegah pembuatan variabel global yang tidak disengaja.
- Deklarasikan variabel sedekat mungkin dengan baris tempat ia pertama kali dikonsumsi.
- Hindari membuat variabel di ranah global kecuali untuk konfigurasi tingkat aplikasi utama.

---

## 5. ✍️ Latihan Mandiri

1. Analisis alur kode berikut: tentukan apa output yang dicetak oleh masing-masing `console.log()` dan jelaskan mengapa:
   ```javascript
   let angka = 10;
   function kalkulasi() {
     let angka = 20;
     if (true) {
       let angka = 30;
       console.log("Log A:", angka);
     }
     console.log("Log B:", angka);
   }
   kalkulasi();
   console.log("Log C:", angka);
   ```
2. Buat sebuah fungsi yang mendemonstrasikan bahwa variabel yang dibuat di dalam blok perulangan `for (let k = 0; ...)` tidak dapat diakses di baris setelah perulangan tersebut selesai.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.2 - Parameter dan Argumen](../02-parameters-arguments/README.md)
- ➡️ **Selanjutnya:** [07.4 - Closures dan Lexical Scope](../04-closures/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
