# 04.1 - Pengkondisian (If Else)

## Tujuan Belajar
- Memahami percabangan dua kondisi menggunakan `if` dan `else`.
- Menerapkan pengkondisian di dalam perulangan.

## Penjelasan Konsep
Struktur `if...else` mengeksekusi blok kode pertama jika kondisi bernilai `true`, dan mengeksekusi blok `else` jika kondisi bernilai `false`.

## Contoh Kode
```javascript
let jmlAngkot = 10;
let angkotBeroprasi = 6;

for (let noAngkot = 1; noAngkot <= jmlAngkot; noAngkot++) {
  if (noAngkot <= angkotBeroprasi) {
    console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
  } else {
    console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
  }
}
```

### Output
```text
Angkot No. 1 beroprasi dengan baik.
...
Angkot No. 6 beroprasi dengan baik.
Angkot No. 7 sedang tidak beroprasi
...
Angkot No. 10 sedang tidak beroprasi
```
