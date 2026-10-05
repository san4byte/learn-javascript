// Penjelasan lengkap dapat dibaca pada README.md
// Operator instanceof untuk menguji tipe objek dan rantai pewarisan

class Satu {}

class Dua extends Satu {}

const joko = new Satu();
const widodo = new Dua();

console.info('--- Uji objek joko (instance dari Satu) ---');
console.info(joko instanceof Satu); // true (karena joko dibuat dari class Satu)
console.info(joko instanceof Dua);  // false (Satu bukan turunan dari Dua)

console.info('--- Uji objek widodo (instance dari Dua extends Satu) ---');
console.info(widodo instanceof Satu); // true (karena Dua mewarisi Satu)
console.info(widodo instanceof Dua);  // true (karena widodo dibuat dari class Dua)
console.info(widodo instanceof Object); // true (semua class mewarisi Object)
