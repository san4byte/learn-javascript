# 05 - Project Simulasi Angkot

## Tujuan Belajar
- Mengintegrasikan loop (`while`, `for`) dan pengkondisian (`if`, `else if`, `else`).
- Menerapkan operator logika `&&` (AND) dan `||` (OR).
- Menyelesaikan masalah komputasi dunia nyata secara bertahap.

## Penjelasan Konsep
Project Angkot adalah studi kasus bertingkat:
- Angkot 1: Menggunakan loop `while` dasar untuk 10 angkot beroperasi.
- Angkot 2: Menggabungkan `while` (angkot beroperasi) dan `for` (angkot rusak).
- Angkot 3: Menggunakan `for` dengan `if...else`.
- Angkot 4: Menambahkan kondisi khusus (angkot lembur) dengan operator logika majemuk `&&` dan `||`.

## Contoh Kode
```javascript
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
Status setiap nomor angkot tercetak dengan kondisi lembur pada nomor 5, 8, dan 10.
