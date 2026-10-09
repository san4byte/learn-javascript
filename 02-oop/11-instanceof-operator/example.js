/**
 * 11 - Operator instanceof
 *
 * Demonstrasi lengkap operator instanceof di JavaScript:
 * 1. Pengecekan hierarki pewarisan multi-level (Parent, Child, Object)
 * 2. Perbandingan mendalam antara 'typeof' vs 'instanceof'
 * 3. Tipe data primitif vs Objek Wrapper (String, Number)
 * 4. Pengecekan pada built-in objects (Array, Date, RegExp, Error)
 * 5. Kustomisasi perilaku dengan Symbol.hasInstance
 * 6. Jebakan Cross-Realm (Iframe/Context) dan solusi Array.isArray()
 */

console.log('=== 1. Hierarki Pewarisan Multi-Level ===');
class Karyawan {}
class Manajer extends Karyawan {}
class Direktur extends Manajer {}

const bos = new Direktur();

console.log('bos instanceof Direktur:', bos instanceof Direktur); // true
console.log('bos instanceof Manajer :', bos instanceof Manajer); // true (karena Direktur extends Manajer)
console.log('bos instanceof Karyawan:', bos instanceof Karyawan); // true (karena Manajer extends Karyawan)
console.log('bos instanceof Object  :', bos instanceof Object); // true (akar prototype chain)
console.log('bos instanceof Array   :', bos instanceof Array); // false
console.log();

console.log("=== 2. Perbandingan 'typeof' vs 'instanceof' ===");
const dataArray = [1, 2, 3];
const dataTanggal = new Date();
const dataRegex = /abc/;

console.log('typeof dataArray  :', typeof dataArray); // "object" (kurang informatif)
console.log('dataArray instanceof Array:', dataArray instanceof Array); // true (presisi)

console.log('typeof dataTanggal:', typeof dataTanggal); // "object"
console.log('dataTanggal instanceof Date:', dataTanggal instanceof Date); // true

console.log('typeof dataRegex  :', typeof dataRegex); // "object"
console.log('dataRegex instanceof RegExp:', dataRegex instanceof RegExp); // true
console.log();

console.log('=== 3. Primitif vs Objek Wrapper ===');
const strPrimitif = 'Halo Dunia';
const strObjek = new String('Halo Dunia');

console.log('strPrimitif instanceof String:', strPrimitif instanceof String); // false (karena primitif)
console.log('strObjek instanceof String    :', strObjek instanceof String); // true (karena objek)
console.log('typeof strPrimitif:', typeof strPrimitif); // "string"
console.log('typeof strObjek   :', typeof strObjek); // "object"
console.log();

console.log('=== 4. Pengecekan Polimorfisme Error ===');
class DatabaseError extends Error {}
class ConnectionTimeoutError extends DatabaseError {}

function tanganiError(err) {
  if (err instanceof ConnectionTimeoutError) {
    console.log(`[Penanganan Khusus]: Re-koneksi jaringan (${err.message})`);
  } else if (err instanceof DatabaseError) {
    console.log(`[Penanganan DB]: Query gagal (${err.message})`);
  } else if (err instanceof Error) {
    console.log(`[Penanganan Umum]: Terjadi error sistem (${err.message})`);
  }
}

tanganiError(new ConnectionTimeoutError('Timeout 5000ms'));
tanganiError(new DatabaseError('Sintaks SQL salah'));
tanganiError(new Error('Error memori'));
console.log();

console.log('=== 5. Kustomisasi dengan Symbol.hasInstance ===');
class BilanganGenap {
  // Mengubah perilaku 'x instanceof BilanganGenap'
  static [Symbol.hasInstance](nilai) {
    return typeof nilai === 'number' && nilai % 2 === 0;
  }
}

console.log('4 instanceof BilanganGenap:', 4 instanceof BilanganGenap); // true!
console.log('7 instanceof BilanganGenap:', 7 instanceof BilanganGenap); // false
console.log("'8' instanceof BilanganGenap:", '8' instanceof BilanganGenap); // false (bukan number)
console.log();

console.log('=== 6. Cara Kerja Prototype Chain di Balik Layar ===');
// 'obj instanceof Class' setara dengan memeriksa apakah Class.prototype
// terdapat di dalam rantai prototype obj: Object.getPrototypeOf(obj)
const protoLevel1 = Object.getPrototypeOf(bos);
console.log(
  'Level 1 (Direktur.prototype):',
  protoLevel1 === Direktur.prototype
); // true
const protoLevel2 = Object.getPrototypeOf(protoLevel1);
console.log('Level 2 (Manajer.prototype) :', protoLevel2 === Manajer.prototype); // true
const protoLevel3 = Object.getPrototypeOf(protoLevel2);
console.log(
  'Level 3 (Karyawan.prototype):',
  protoLevel3 === Karyawan.prototype
); // true
