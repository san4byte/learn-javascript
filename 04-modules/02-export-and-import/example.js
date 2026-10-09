/**
 * 02 - Export dan Import (ES Modules)
 *
 * Demonstrasi mekanisme Named Export dan Import:
 * 1. Mengimpor fungsi dan konstanta dari modul eksternal (say.js)
 * 2. Menggunakan fungsi yang diekspor via export clause
 * 3. Pembuktian modul berjalan dalam 'strict mode' secara otomatis
 * 4. Pembuktian top-level 'this' bernilai undefined di dalam modul
 */

import { sayHello, author, version, sayWithTime } from './say.js';

console.log('=== 1. Memanggil Named Exports ===');
console.log(sayHello('Joko Santoso'));
console.log(`Penulis Modul: ${author}`);
console.log(`Versi Modul  : ${version}`);
console.log();

console.log('=== 2. Memanggil Export Clause dengan Helper Privat ===');
console.log(sayWithTime('Budi'));
console.log();

console.log('=== 3. Karakteristik Lingkungan ES Module ===');
// Di dalam ES Module, top-level 'this' bukan window/global, melainkan undefined
console.log(
  "Nilai top-level 'this' di dalam module:",
  typeof this === 'undefined' ? 'undefined (Sesuai Standar ESM)' : this,
);

// Di dalam ES Module, 'strict mode' aktif secara bawaan:
try {
  // Variabel tanpa let/const/var dilarang di strict mode
  eval('undeclaredVar = 100;');
} catch (err) {
  console.log(`Bukti Strict Mode aktif: [${err.name}] ${err.message}`);
}
