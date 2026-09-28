# 04.2 - Pengkondisian (Else If)

## Tujuan Belajar
- Menangani skenario pengambilan keputusan dengan lebih dari dua kemungkinan.
- Memahami sifat evaluasi sekuensial (dari atas ke bawah).
- Menggunakan operator modulo (`%`) untuk menentukan bilangan ganjil/genap.

## Penjelasan Konsep
Ketika suatu kasus memiliki banyak kriteria, `else if` disisipkan di antara `if` dan `else`. JavaScript mengevaluasi cabang dari atas ke bawah. Begitu salah satu kondisi bernilai `true`, blok tersebut langsung dieksekusi dan seluruh cabang berikutnya akan diabaikan.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pengecekan bilangan ganjil atau genap
let angka = prompt("masukkan angka:");
if (angka % 2 == 0) {
  alert(angka + " adalah bilangan GENAP");
} else if (angka % 2 == 1) {
  alert(angka + " adalah bilangan GANJIL");
} else {
  alert("Yang anda masukkan bukan angka!!!");
}
```

### Output
```text
(Jika user memasukkan 8: "8 adalah bilangan GENAP")
(Jika user memasukkan 7: "7 adalah bilangan GANJIL")
(Jika user memasukkan "abc": "Yang anda masukkan bukan angka!!!")
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Sistem penentuan grade nilai ujian sekolah:
  - Jika nilai >= 90 $ightarrow$ Grade A
  - Selain itu jika nilai >= 80 $ightarrow$ Grade B
  - Selain itu jika nilai >= 70 $ightarrow$ Grade C
  - Selain itu $ightarrow$ Grade D
- **Tips Urutan Kondisi**:
  Selalu letakkan kondisi yang paling spesifik di bagian paling atas. Jika Anda meletakkan kondisi yang terlalu umum di atas, cabang di bawahnya mungkin tidak akan pernah tersentuh (*unreachable code*).

## Latihan
1. Buat program konversi nilai angka (0-100) menjadi huruf mutu (A, B, C, D, E) menggunakan struktur `if...else if...else`.
2. Modifikasi pengecekan angka di atas untuk juga memeriksa apakah angka tersebut bernilai negatif atau nol.

## Ringkasan Poin Penting
- `else if` memungkinkan pengujian multi-kondisi berantai.
- Blok `else` terakhir berfungsi sebagai *fallback* jika tidak ada satu pun kondisi yang terpenuhi.

---
[⬅️ Materi Sebelumnya: 04.1 - Pengkondisian If Else](../01-if-else/README.md) | [Materi Selanjutnya: 05 - Project Simulasi Angkot ➡️](../../05-project-angkot/README.md)
