/**
 * ==============================================================================
 * MATERI 04: CLASS INHERITANCE (PEWARISAN KELAS & KATA KUNCI EXTENDS)
 * ==============================================================================
 *
 * File ini mendemonstrasikan secara komprehensif:
 * 1. Pewarisan Dasar Menggunakan Kata Kunci 'extends'
 * 2. Pemanggilan Method Warisan dari Parent Class
 * 3. Penambahan Method Spesifik pada Child Class
 * 4. Pengenalan Dasar Method Overriding (Menimpa Perilaku Induk)
 * 5. Verifikasi Rantai Prototype Antar Class (Object & Static Inheritance)
 * 6. Pengujian Multi-Level dengan Operator instanceof
 *
 * Eksekusi: node 02-oop/04-class-inheritance/example.js
 * ==============================================================================
 */

// ==============================================================================
// 1. PEWARISAN DASAR: PARENT (SUPERCLASS) & CHILD (SUBCLASS)
// ==============================================================================
console.log('--- 1. PEWARISAN DASAR DENGAN EXTENDS ---');

// Parent Class (Superclass)
class Employee {
  constructor(name) {
    this.name = name;
  }

  // Method yang akan diwariskan ke semua turunan
  presensiMasuk() {
    return `${this.name} telah melakukan absensi masuk kantor.`;
  }

  bekerja() {
    return `${this.name} sedang menyelesaikan tugas umum.`;
  }
}

// Child Class (Subclass) mewarisi Employee
class Manager extends Employee {
  // Method tambahan yang hanya dimiliki oleh Manager
  pimpinRapat(topik) {
    return `${this.name} sedang memimpin rapat divisi tentang "${topik}".`;
  }
}

const staf = new Employee('Budi');
const bos = new Manager('Pak Joko');

console.log('Staf presensi      :', staf.presensiMasuk());
console.log('Bos presensi       :', bos.presensiMasuk()); // Method warisan! ✅
console.log('Bos pimpin rapat   :', bos.pimpinRapat('Target Q4'));

// ==============================================================================
// 2. METHOD OVERRIDING DASAR
// ==============================================================================
console.log('\n--- 2. METHOD OVERRIDING DASAR ---');

class Programmer extends Employee {
  // Menimpa (override) method 'bekerja' dari Employee dengan perilaku spesifik:
  bekerja() {
    return `${this.name} sedang menulis kode JavaScript & melakukan debug.`;
  }
}

const coder = new Programmer('Siti');
console.log('Staf biasa bekerja :', staf.bekerja()); // Tugas umum
console.log('Programmer bekerja :', coder.bekerja()); // Kode spesifik programmer (Override!)

// ==============================================================================
// 3. VERIFIKASI RANTAI PROTOTIPE KELAS (UNDER THE HOOD)
// ==============================================================================
console.log('\n--- 3. VERIFIKASI RANTAI PROTOTIPE ANTAR KELAS ---');

// Di balik layar, 'extends' mengatur prototype chain otomatis:
// 1. Prototype instance: Manager.prototype mewarisi Employee.prototype
console.log(
  'Manager.prototype.__proto__ === Employee.prototype :',
  Object.getPrototypeOf(Manager.prototype) === Employee.prototype,
); // true ✅

// 2. Prototype static: Manager mewarisi Employee langsung (Static Inheritance)
console.log(
  'Manager.__proto__ === Employee                     :',
  Object.getPrototypeOf(Manager) === Employee,
); // true ✅

// ==============================================================================
// 4. PENGUJIAN HIERARKI MULTI-LEVEL DENGAN INSTANCEOF
// ==============================================================================
console.log('\n--- 4. PENGUJIAN DENGAN OPERATOR INSTANCEOF ---');

// bos adalah instance dari Manager, Employee, dan Object sekaligus:
console.log('bos instanceof Manager    :', bos instanceof Manager); // true ✅
console.log('bos instanceof Employee   :', bos instanceof Employee); // true ✅
console.log('bos instanceof Object     :', bos instanceof Object); // true ✅
console.log('staf instanceof Manager   :', staf instanceof Manager); // false ❌ (staf bukan manager)
