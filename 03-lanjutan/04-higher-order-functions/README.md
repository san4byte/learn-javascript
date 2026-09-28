# 04 - Higher-Order Functions (Filter, Map, Reduce)

## Tujuan Belajar
- Memahami paradigma pemrograman fungsional (*functional programming*).
- Mengetahui definisi Higher-Order Function (fungsi yang menerima atau menghasilkan fungsi lain).
- Menguasai method array: `filter()`, `map()`, dan `reduce()`.
- Mengimplementasikan *Method Chaining* (menyambung eksekusi fungsi).

## Penjelasan Konsep
1. **`filter(callback)`**: Menyaring elemen array berdasarkan kriteria boolean. Menghasilkan array baru yang hanya berisi elemen yang lolos seleksi (`true`).
2. **`map(callback)`**: Memetakan/mentransformasi setiap elemen array menjadi bentuk baru. Menghasilkan array baru dengan jumlah elemen yang sama.
3. **`reduce(callback, initialValue)`**: Mengakumulasi seluruh elemen array menjadi satu nilai tunggal (seperti menjumlahkan total angka).
4. **Method Chaining**: Memanggil method secara berantai `array.filter(...).map(...).reduce(...)`.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Higher-Order Functions: filter, map, reduce, dan method chaining

const angka = [-1, 8, 9, 1, 4, -5, -4, 3, 2, 9];

// 1. Filter angka >= 3
const filterAngka = angka.filter((a) => a >= 3);
console.log("Filter >= 3:", filterAngka);

// 2. Map (kalikan 2)
const mapAngka = filterAngka.map((a) => a * 2);
console.log("Map dikalikan 2:", mapAngka);

// 3. Reduce (jumlahkan seluruh elemen)
const reduceAngka = mapAngka.reduce((acc, curr) => acc + curr, 0);
console.log("Total reduce:", reduceAngka);

// 4. Method Chaining (gabungan filter -> map -> reduce)
const hasilChaining = angka
  .filter((a) => a > 5)
  .map((a) => a * 3)
  .reduce((acc, curr) => acc + curr, 0);
console.log("Hasil chaining:", hasilChaining);
```

### Output
```text
Filter >= 3: [ 8, 9, 4, 3, 9 ]
Map dikalikan 2: [ 16, 18, 8, 6, 18 ]
Total reduce: 66
Hasil chaining: 78
```

## Penjelasan Tambahan
- **Mengapa Lebih Disukai daripada Loop `for` Biasa?**:
  Sifatnya **Deklaratif** (menyatakan *apa* yang ingin dicapai) bukan **Imperatif** (mengatur langkah demi langkah counter `i++`, penampung array sementara, dll.). Kode menjadi jauh lebih ringkas, minim bug, dan mudah dibaca.

---
[⬅️ Materi Sebelumnya: 03 - Arrow Function](../03-arrow-function/README.md) | [Materi Selanjutnya: 05 - Template Literals ➡️](../05-template-literals/README.md)
