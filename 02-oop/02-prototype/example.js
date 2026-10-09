/**
 * ==============================================================================
 * MATERI 02: PROTOTYPE INHERITANCE (RANTAI PROTOTIPE & EFISIENSI MEMORI)
 * ==============================================================================
 *
 * File ini mendemonstrasikan secara komprehensif:
 * 1. Definisi Method Bersama pada Constructor.prototype & Bukti Efisiensi RAM
 * 2. Prototype Chain (Instance -> Person.prototype -> Object.prototype -> null)
 * 3. Property Shadowing (Penimpaan Properti Lokal terhadap Prototype)
 * 4. Penambahan Method Dinamis & Dampak ke Instance Lawas
 * 5. Jebakan Menimpa Seluruh Objek Prototype & Cara Restore constructor
 * 6. Inspeksi Prototype: isPrototypeOf, getPrototypeOf, & Object.hasOwn
 *
 * Eksekusi: node 02-oop/02-prototype/example.js
 * ==============================================================================
 */

// ==============================================================================
// 1. METHOD BERSAMA PADA PROTOTYPE & BUKTI EFISIENSI RAM
// ==============================================================================
console.log('--- 1. METHOD BERSAMA PADA PROTOTYPE ---');

function Person(firstName, lastName) {
  // Hanya simpan data unik pada masing-masing instance
  this.firstName = firstName;
  this.lastName = lastName;
}

// Pasang method pada Prototype (hanya disimpan 1 KALI di memori bersama)
Person.prototype.sayHello = function (partnerName) {
  return `Halo ${partnerName}, nama saya ${this.firstName} ${this.lastName}`;
};

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

const joko = new Person('Joko', 'Santoso');
const samsul = new Person('Samsul', 'Arifin');

console.log('joko.sayHello("Budi")   :', joko.sayHello('Budi'));
console.log('samsul.sayHello("Budi") :', samsul.sayHello('Budi'));

// BUKTI EFISIENSI MEMORI:
// Keduanya merujuk ke blok memori fungsi yang sama persis!
console.log('Apakah method identik?  :', joko.sayHello === samsul.sayHello); // true ✅

// ==============================================================================
// 2. PROTOTYPE CHAIN (RANTAI PROTOTIPE)
// ==============================================================================
console.log('\n--- 2. PROTOTYPE CHAIN (RANTAI PROTOTIPE) ---');

// joko -> Person.prototype -> Object.prototype -> null
const protoLevel1 = Object.getPrototypeOf(joko);
const protoLevel2 = Object.getPrototypeOf(protoLevel1);
const protoLevel3 = Object.getPrototypeOf(protoLevel2);

console.log('Level 1 (joko proto)       :', protoLevel1 === Person.prototype); // true
console.log('Level 2 (Person.prototype) :', protoLevel2 === Object.prototype); // true
console.log('Level 3 (Object.prototype) :', protoLevel3); // null (ujung akhir rantai)

// Memanggil method warisan dari Object.prototype:
console.log('joko.toString() warisan    :', joko.toString()); // "[object Object]"

// ==============================================================================
// 3. PROPERTY SHADOWING (MENUTUPI PROPERTI PROTOTYPE)
// ==============================================================================
console.log('\n--- 3. PROPERTY SHADOWING ---');

// Berikan properti default pada prototype
Person.prototype.kewarganegaraan = 'WNI';

console.log('Kewarganegaraan joko (default proto)   :', joko.kewarganegaraan); // "WNI"
console.log('Kewarganegaraan samsul (default proto) :', samsul.kewarganegaraan); // "WNI"

// Shadowing: Joko menetapkan properti sendiri dengan nama yang sama
joko.kewarganegaraan = 'WNA';

console.log('Kewarganegaraan joko (setelah di-shadow):', joko.kewarganegaraan); // "WNA" (milik joko sendiri)
console.log('Kewarganegaraan samsul (tetap proto)   :', samsul.kewarganegaraan); // "WNI" (proto tidak terpengaruh)
console.log(
  'Kewarganegaraan di Person.prototype    :',
  Person.prototype.kewarganegaraan,
); // "WNI"

// ==============================================================================
// 4. PENAMBAHAN METHOD DINAMIS SETELAH INSTANSIASI
// ==============================================================================
console.log('\n--- 4. PENAMBAHAN METHOD DINAMIS ---');

// Instance 'joko' sudah dibuat di awal script.
// Tambahkan method baru ke Person.prototype sekarang:
Person.prototype.tidur = function () {
  return `${this.firstName} sedang tidur... zzz`;
};

// Instance lawas otomatis dapat mengaksesnya seketika karena lookup bersifat dinamis!
console.log('Panggil method tidur pada instance lawas:', joko.tidur());

// ==============================================================================
// 5. JEBAKAN MENIMPA SELURUH OBJEK PROTOTYPE & RESTORE CONSTRUCTOR
// ==============================================================================
console.log('\n--- 5. JEBAKAN MENIMPA OBJEK PROTOTYPE ---');

function Mobil(merk) {
  this.merk = merk;
}

// ❌ JEBAKAN: Menimpa prototype dengan objek baru tanpa properti constructor
Mobil.prototype = {
  maju() {
    return `${this.merk} melaju kencang!`;
  },
};

const m1 = new Mobil('Toyota');
console.log('m1.constructor setelah ditimpa polos :', m1.constructor.name); // "Object" ❌ (putus referensi!)

// ✅ CARA YANG BENAR: Sertakan 'constructor: Mobil' secara eksplisit
function Motor(merk) {
  this.merk = merk;
}

Motor.prototype = {
  constructor: Motor, // Wajib restore referensi constructor asli!
  gas() {
    return `${this.merk} digas!`;
  },
};

const m2 = new Motor('Yamaha');
console.log('m2.constructor setelah direstore     :', m2.constructor.name); // "Motor" ✅

// ==============================================================================
// 6. INSPEKSI PROTOTYPE: isPrototypeOf & Object.hasOwn
// ==============================================================================
console.log('\n--- 6. INSPEKSI PROTOTYPE ---');

console.log(
  'Person.prototype.isPrototypeOf(joko) :',
  Person.prototype.isPrototypeOf(joko),
); // true
console.log(
  'Array.prototype.isPrototypeOf(joko)  :',
  Array.prototype.isPrototypeOf(joko),
); // false

// Membedakan properti milik sendiri vs properti yang diwarisi dari prototype
console.log(
  "Object.hasOwn(joko, 'firstName')     :",
  Object.hasOwn(joko, 'firstName'),
); // true (milik sendiri)
console.log(
  "Object.hasOwn(joko, 'sayHello')      :",
  Object.hasOwn(joko, 'sayHello'),
); // false (warisan prototype)
console.log(
  "Object.hasOwn(joko, 'kewarganegaraan'):",
  Object.hasOwn(joko, 'kewarganegaraan'),
); // true (karena sudah di-shadow)
console.log(
  "Object.hasOwn(samsul, 'kewarganegaraan'):",
  Object.hasOwn(samsul, 'kewarganegaraan'),
); // false (masih dari prototype)
