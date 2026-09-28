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
