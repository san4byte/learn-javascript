# 12 - Sintaks Modern ES Lanjutan (Optional Chaining, Nullish Coalescing & Strict Mode)

## Tujuan Belajar
- Menghindari bug *TypeError: Cannot read properties of undefined* dengan **Optional Chaining (`?.`)**.
- Membedakan operator logika OR (`||`) dengan **Nullish Coalescing Operator (`??`)**.
- Mengaktifkan **Strict Mode (`"use strict"`)** untuk mencegah variabel global tak disengaja.
- Menggunakan kata kunci `debugger` saat mencari bug.

## Penjelasan Konsep
1. **Optional Chaining (`?.`)**: Menghentikan evaluasi dan langsung mengembalikan `undefined` jika referensi bernilai `null` atau `undefined`, mencegah terjadinya runtime exception crash.
2. **Nullish Coalescing (`??`)**: Operator fallback default value yang hanya aktif jika nilai di sisi kiri bernilai `null` atau `undefined`. Berbeda dengan `||` yang juga menganggap `0` dan `""` sebagai nilai palsu.
3. **Strict Mode**: Menghindari error diam-diam (*silent errors*) di JavaScript.

## Cara Menjalankan
```bash
node 01-fundamentals/12-advanced-syntax/example.js
```

---
[⬅️ Sebelumnya: 11 - Tipe Data Lanjutan](../11-data-types-and-operators/README.md) | [Materi Selanjutnya: 02 - JavaScript OOP ➡️](../../02-oop/README.md)
