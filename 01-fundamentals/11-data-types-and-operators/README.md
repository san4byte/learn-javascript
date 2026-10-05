# 11 - Tipe Data Lanjutan, Operator in, typeof, dan Falsy Truthy

## Tujuan Belajar
- Membedakan konsep `null` dan `undefined`.
- Menggunakan operator `typeof` untuk tipe data checking.
- Menggunakan operator `in` untuk mengecek properti objek atau indeks array.
- Memahami konsep nilai *Truthy* dan *Falsy* di JavaScript.

## Penjelasan Konsep
1. **`undefined` vs `null`**: `undefined` berarti variabel telah dibuat namun belum diberikan nilai. Sedangkan `null` adalah nilai eksplisit yang menandakan objek/data sengaja dikosongkan.
2. **Operator `in`**: Memeriksa apakah suatu properti atau atribut ada di dalam sebuah objek atau apakah suatu indeks tersedia pada array.
3. **Truthy & Falsy**: Dalam evaluasi kondisi logika (`if`), JavaScript melakukan *type coercion*. Hanya ada beberapa nilai yang bernilai falsy: `false`, `0`, `-0`, `""` (string kosong), `null`, `undefined`, dan `NaN`. Selebihnya bernilai truthy (termasuk array kosong `[]` dan objek kosong `{}`).

## Cara Menjalankan
```bash
node 01-fundamentals/11-data-types-and-operators/example.js
```

---
[⬅️ Sebelumnya: 10 - Mini Games](../10-mini-games/01-suit-jawa/README.md) | [Selanjutnya: 12 - Advanced Syntax ➡️](../12-advanced-syntax/README.md)
