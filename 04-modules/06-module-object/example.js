/**
 * 06 - Module Object (import * as Namespace)
 *
 * Demonstrasi penggunaan Module Namespace Object:
 * 1. Mengimpor seluruh konten modul sekaligus dengan 'import * as'
 * 2. Mengakses named export dan default export via dot notation
 * 3. Mengakses export secara dinamis dengan bracket notation
 * 4. Inspeksi anatomi internal Module Namespace Object (null prototype, sealed)
 * 5. Pembuktian penolakan mutasi properti pada objek modul
 */

import * as Calculator from './calculator.js';

console.log('=== 1. Memanggil Operasi via Dot Notation ===');
console.log('Penjumlahan (10 + 5) :', Calculator.add(10, 5));
console.log('Pengurangan (10 - 5) :', Calculator.sub(10, 5));
console.log('Perkalian   (10 * 5) :', Calculator.mul(10, 5));
console.log('Pembagian   (10 / 5) :', Calculator.div(10, 5));
console.log('Konstanta PI         :', Calculator.PI);
console.log();

console.log('=== 2. Mengakses Default Export via Namespace ===');
// Default export muncul sebagai properti bernama 'default'
console.log('Default export info  :', Calculator.default());
console.log();

console.log('=== 3. Akses Dinamis via Bracket Notation ===');
const operasi = 'mul';
console.log(`Operasi dinamis '${operasi}':`, Calculator[operasi](4, 7)); // 28
console.log();

console.log('=== 4. Anatomi Module Namespace Object ===');
console.log(
  'Tipe Objek             :',
  Object.prototype.toString.call(Calculator),
); // [object Module]
console.log('Prototype Objek        :', Object.getPrototypeOf(Calculator)); // null (tanpa Object.prototype)
console.log('Apakah Extensible?     :', Object.isExtensible(Calculator)); // false (tidak bisa ditambah)
console.log('Daftar Export Tersedia :', Object.keys(Calculator));
console.log();

console.log('=== 5. Pembuktian Immutabilitas Objek Modul ===');
try {
  // Objek modul bersifat read-only / frozen
  Calculator.add = () => 999;
} catch (err) {
  console.log(`Mutasi objek ditolak: [${err.name}] ${err.message}`);
}
