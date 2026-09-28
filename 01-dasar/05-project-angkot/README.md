# 05 - Project Simulasi Angkot

## Tujuan Belajar
- Mengintegrasikan perulangan (`for`) dan multi-percabangan (`if`, `else if`, `else`).
- Menggabungkan beberapa kondisi menggunakan operator logika `&&` (AND) dan `||` (OR).
- Melatih kemampuan berpikir komputasional (*computational thinking*) untuk studi kasus nyata.

## Penjelasan Konsep
Kasus Angkot mensimulasikan armada angkot sebanyak 10 unit dengan berbagai kondisi operasional:
1. Angkot no 1 sampai 6 beroperasi normal, **kecuali** angkot no 5.
2. Angkot no 5, 8, dan 10 berstatus **lembur**.
3. Sisa angkot lainnya berstatus **tidak beroperasi** (rusak).

Operator yang digunakan:
- `&&` (AND): Bernilai `true` hanya jika **kedua sisi** bernilai `true`.
- `||` (OR): Bernilai `true` jika **salah satu atau kedua sisi** bernilai `true`.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Project Simulasi Angkot (Tahap Final: kombinasi for, if, else-if, else)
var jmlAngkot = 10;
var angkotBeroprasi = 6;

for (var noAngkot = 1; noAngkot <= jmlAngkot; noAngkot++) {
  if (noAngkot <= angkotBeroprasi && noAngkot !== 5) {
    console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
  } else if (noAngkot === 8 || noAngkot === 10 || noAngkot === 5) {
    console.log("Angkot No. " + noAngkot + " sedang lembur.");
  } else {
    console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
  }
}
```

### Output
```text
Angkot No. 1 beroprasi dengan baik.
Angkot No. 2 beroprasi dengan baik.
Angkot No. 3 beroprasi dengan baik.
Angkot No. 4 beroprasi dengan baik.
Angkot No. 5 sedang lembur.
Angkot No. 6 beroprasi dengan baik.
Angkot No. 7 sedang tidak beroprasi
Angkot No. 8 sedang lembur.
Angkot No. 9 sedang tidak beroprasi
Angkot No. 10 sedang lembur.
```

## Penjelasan Tambahan
- **Evolusi Logika (Step-by-Step)**:
  - *Tahap 1*: Hanya pakai `while` (semua angkot jalan).
  - *Tahap 2*: Pakai `while` untuk angkot jalan (1-6) dan `for` untuk angkot rusak (7-10).
  - *Tahap 3*: Satu loop `for` yang membagi status jalan dan rusak dengan `if...else`.
  - *Tahap 4*: Penambahan status lembur acak menggunakan kombinasi operator majemuk `&&` dan `||`.
- **Best Practice Refactoring**:
  Ketika syarat logika bertambah, menggabungkan kondisi ke dalam ekspresi boolean yang jelas (`noAngkot <= 6 && noAngkot !== 5`) membuat kode tetap ringkas tanpa perlu membuat loop terpisah.

## Latihan
1. Ubah aturan agar angkot no 2 dan 3 juga berstatus lembur bersama angkot no 5, 8, dan 10.
2. Tambahkan variabel baru `angkotCadangan` untuk nomor angkot 9, lalu cetak pesan "sedang dalam perbaikan ringan" untuk angkot tersebut.

## Ringkasan Poin Penting
- Masalah kompleks diselesaikan secara bertahap dari sederhana ke rumit.
- Operator `&&` membatasi kondisi; operator `||` memperluas pilihan kondisi.

---
[⬅️ Materi Sebelumnya: 04.2 - Pengkondisian Else If](../04-pengkondisian/02-else-if/README.md) | [Materi Selanjutnya: 06.1 - Function Intro ➡️](../06-function/01-intro/README.md)
