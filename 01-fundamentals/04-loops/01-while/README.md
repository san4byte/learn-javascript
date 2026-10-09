# 04.1 - Pengulangan: While Loop & Do-While

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengeksekusi blok kode secara berulang selama ekspresi kondisi bernilai _truthy_ (`while`), atau mengeksekusi minimal satu kali sebelum memeriksa kondisi (`do...while`).
> - **Kapan Digunakan**: Cocok untuk situasi di mana jumlah total iterasi belum diketahui secara pasti di awal (misal: menunggu input pengguna, membaca antrean stream, atau mekanisme coba-ulang/retry).
> - **Aturan Praktis**: Selalu pastikan variabel pembaruan kondisi (_step/increment_) dieksekusi pada setiap putaran untuk menghindari bencana _Infinite Loop_ yang membekukan thread eksekusi.

---

## 1. 🎯 Tujuan Belajar

- Memahami 3 pilar utama struktur perulangan: nilai inisialisasi awal, kondisi terminasi, dan pembaruan variabel (_increment/decrement_).
- Mengetahui perbedaan urutan evaluasi kondisi antara perulangan `while` dan `do...while`.
- Menguasai penggunaan pernyataan kontrol `break` (berhenti total) dan `continue` (lewatkan iterasi saat ini).
- Mampu mengidentifikasi dan mencegah kondisi _Infinite Loop_ yang dapat melumpuhkan CPU.
- Menerapkan pola konsumsi antrean data (_queue draining_) menggunakan `while`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - `while` seperti **pintu perlintasan berbayar**: Penjaga memeriksa tiket Anda **di gerbang masuk**. Jika Anda tidak memiliki tiket sejak awal, Anda dilarang masuk sama sekali (0 kali jalan).
> - `do...while` seperti **makan di restoran prasmanan (_all-you-can-eat_)**: Anda dipersilakan mengambil dan menyantap makanan piring pertama terlebih dahulu (**minimal 1 kali dieksekusi**), baru kemudian pelayan memeriksa tagihan dan menanyakan apakah Anda ingin menambah porsi lagi.

---

### Tabel Perbandingan `while` vs `do...while`

| Fitur                        | `while (kondisi)`                      | `do ... while (kondisi)`                          |
| :--------------------------- | :------------------------------------- | :------------------------------------------------ |
| **Titik Evaluasi Kondisi**   | Di awal (_pre-test loop_)              | Di akhir (_post-test loop_)                       |
| **Minimal Eksekusi**         | **0 kali** (jika kondisi awal `false`) | **1 kali** (pasti dieksekusi sekali)              |
| **Karakteristik Penggunaan** | Kondisi harus valid sejak awal         | Aksi permulaan wajib dijalankan minimal satu kali |
| **Sintaksis Penutup**        | Ditutup kurung kurawal `}`             | Diakhiri titik koma `while (kondisi);`            |

---

### Pembahasan Mendalam Fitur & API

#### 1. Anatomi Perulangan `while`

Pernyataan `while` mengevaluasi ekspresi kondisi dalam tanda kurung. Jika bernilai `true`, blok kode di dalamnya dijalankan, lalu kembali memeriksa kondisi.

```javascript
let counter = 1;
while (counter <= 3) {
  console.log(`Putaran ke-${counter}`);
  counter++;
}
```

#### 2. Kondisi Terminasi & Pencegahan Infinite Loop

Sebuah perulangan memerlukan nilai awal, kondisi batas akhir (terminasi), dan langkah perubahan nilai. Tanpa pembaruan nilai, kondisi akan selamanya bernilai benar (_infinite loop_).

```javascript
let i = 0;
while (i < 5) {
  // Tanpa i++, perulangan ini tidak akan pernah selesai dan membekukan runtime!
  i++;
}
```

#### 3. Eksekusi Minimal Satu Kali: `do...while`

Blok kode di dalam `do` selalu dijalankan terlebih dahulu, baru kemudian kondisi pada `while(...)` diperiksa. Jika kondisi bernilai salah, perulangan berhenti setelah menjalankan satu kali.

```javascript
let angka = 100;
do {
  console.log("Tetap dieksekusi 1 kali meskipun angka > 10");
} while (angka < 10);
```

#### 4. Penghentian Paksa dengan `break`

Kata kunci `break` menghentikan loop seketika dan memindahkan alur program langsung ke baris kode setelah blok perulangan.

```javascript
let hitung = 1;
while (hitung <= 10) {
  if (hitung === 4) {
    break; // Berhenti di angka 4
  }
  hitung++;
}
```

#### 5. Melompati Iterasi dengan `continue`

Kata kunci `continue` menghentikan iterasi yang sedang berlangsung saat itu dan langsung melompat ke pemeriksaan kondisi putaran berikutnya.

```javascript
let n = 0;
while (n < 5) {
  n++;
  if (n === 3) continue; // Lewati angka 3
  console.log(n); // Mencetak 1, 2, 4, 5
}
```

#### 6. Pola Pemrosesan Antrean (_Queue Draining_)

Salah satu penggunaan paling populer untuk `while` di industri adalah menguras elemen dari dalam array antrean hingga habis.

```javascript
const antrean = ["A", "B", "C"];
while (antrean.length > 0) {
  const tugas = antrean.shift();
  console.log(`Memproses tugas: ${tugas}`);
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi perulangan `while` counter angkot, hitung mundur _decrement_, mekanisme garansi 1x jalan pada `do...while`, penggunaan kontrol alur `break` & `continue`, serta pemrosesan antrean _queue drain_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/04-loops/01-while/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Mekanisme Coba Ulang Request Jaringan (Retry Mechanism)**:
   ```javascript
   let percobaan = 0;
   let berhasil = false;
   while (percobaan < 3 && !berhasil) {
     percobaan++;
     console.log(`Mencoba request ke server, percobaan ke-${percobaan}...`);
     berhasil = true; // Anggap berhasil
   }
   ```
2. **Pola Input Berulang Pada Aplikasi CLI / Form**: Menggunakan `do...while` untuk memvalidasi masukan pengguna minimal satu kali sampai input yang dimasukkan sesuai format valid.

### ⚠️ Common Pitfalls

- **Menempatkan `continue` Sebelum Pembaruan Counter**: Jika Anda memanggil `continue` sebelum baris `counter++`, variabel tidak pernah bertambah dan program terjebak dalam _infinite loop_.
- **Kondisi Floating Point Error**: Menggunakan kondisi `while (x !== 1.0)` dengan penambahan pecahan kecil (`x += 0.1`) rawan tidak pernah berhenti karena ketidaktepatan presisi biner IEEE 754.

### 🌟 Best Practice

- Gunakan `for` jika jumlah iterasi sudah diketahui secara pasti (misal: 10 putaran), dan prioritaskan `while` jika kondisinya bergantung pada status eksternal atau proses dinamis.
- Selalu berikan batas pengaman (_timeout_ atau batas iterasi maksimum) jika mengandalkan `while` untuk proses yang menunggu respon jaringan luar.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah program hitung mundur dari angka 10 hingga 1 menggunakan perulangan `while`. Cetak angka secara menurun, lalu cetak teks _"Waktu Habis!"_ setelah perulangan berakhir.
2. Buatlah perulangan `do...while` yang memproses variabel `saldo = 500`. Di setiap putaran, kurangi saldo sebesar `150` dan cetak sisa saldo. Perulangan harus berhenti jika saldo sudah bernilai kurang dari atau sama dengan `0`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Template Literals](../../03-template-literals/README.md)
- ➡️ **Selanjutnya:** [04.2 - Looping: For Loop](../02-for/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
