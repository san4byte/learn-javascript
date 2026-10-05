# 04.3 - Pengulangan Bersarang (Nested Loops)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami cara kerja loop di dalam loop (_Nested Loops_).
> - **Kapan Digunakan**: Mampu membuat pola visual berbasis baris dan kolom (pola bintang, matriks).
> - **Aturan Praktis**: Hindari nesting loop lebih dari 2 tingkat jika tidak benar-benar dibutuhkan.

## 1. 🎯 Tujuan Belajar

- Memahami cara kerja loop di dalam loop (_Nested Loops_).
- Mampu membuat pola visual berbasis baris dan kolom (pola bintang, matriks).
- Memahami dampak performa (Time Complexity $O(n^2)$) dari nested loop.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Nested loop seperti **jarum jam dinding**: jarum jam (loop luar) baru bergeser 1 angka setelah jarum menit (loop dalam) menyelesaikan putaran penuh 60 menit.

**Pengulangan Bersarang (Nested Loop)** adalah perulangan yang diletakkan di dalam perulangan lainnya.

Konsep umumnya adalah:

- **Loop Luar (Outer Loop)**: Mengendalikan **Baris**.
- **Loop Dalam (Inner Loop)**: Mengendalikan **Kolom** yang diselesaikan terlebih dahulu untuk setiap baris.

Jika loop luar berjalan $M$ kali dan loop dalam berjalan $N$ kali, total kode di loop dalam akan dieksekusi sebanyak $M 	imes N$ kali.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Pola Kotak Persegi Bintang (3 x 5) ---');
let hasilKotak = '';

for (let baris = 1; baris <= 3; baris++) {
  let barisTeks = '';
  for (let kolom = 1; kolom <= 5; kolom++) {
    barisTeks += '* ';
  }
  hasilKotak += barisTeks.trim() + '\n';
}

console.log(hasilKotak.trim());

console.log('\n--- 2. Pola Segitiga Siku-Siku Bintang ---');
let hasilSegitiga = '';

for (let i = 1; i <= 4; i++) {
  let bintang = '';
  for (let j = 1; j <= i; j++) {
    bintang += '*';
  }
  hasilSegitiga += bintang + '\n';
}

console.log(hasilSegitiga.trim());
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Pola Kotak Persegi Bintang (3 x 5) ---
* * * * *
* * * * *
* * * * *

--- 2. Pola Segitiga Siku-Siku Bintang ---
*
**
***
****
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pemrosesan Gambar (Pixel 2D)**: Membaca warna setiap pixel pada gambar digital berbasis koordinat $(x, y)$ (baris dan kolom pixel).
2. **Rendering Papan Catur / Grid Game**: Menampilkan baris dan kolom ubin papan permainan seperti catur, tic-tac-toe, atau spreadsheet Excel.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Menggunakan Nama Variabel Counter yang Sama**: Menulis `let i` di loop luar dan tidak sengaja menulis `let i` lagi di loop dalam dapat menyebabkan konflik nilai dan infinite loop. Gunakan `i` untuk luar dan `j` untuk dalam.
- **Masalah Performa ($O(n^2)$)**: Menjalankan nested loop pada 100.000 data array akan memicu $100.000 \times 100.000 = 10.000.000.000$ operasi yang membuat browser/server mati total.

### 🌟 Best Practice

- Hindari nesting loop lebih dari 2 tingkat jika tidak benar-benar dibutuhkan.
- Untuk pencarian data berpasangan di data besar, pertimbangkan menggunakan struktur `Map` atau `Set` untuk menurunkan kompleksitas menjadi $O(n)$.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah pola segitiga bintang terbalik (mulai dari 4 bintang hingga 1 bintang).
2. Buatlah tabel perkalian matematika sederhana dari 1 sampai 3 menggunakan nested loop.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04.2 - Pengulangan For](../02-for/README.md)
- ➡️ **Selanjutnya:** [04.4 - For..of dan For..in](../04-for-of-for-in/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
