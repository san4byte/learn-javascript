/**
 * ==============================================================================
 * MATERI 01: CONSTRUCTOR FUNCTION (BLUEPRINT OBJEK SEBELUM ES6 CLASS)
 * ==============================================================================
 *
 * File ini mendemonstrasikan secara komprehensif:
 * 1. Deklarasi Constructor Function & Keyword 'this'
 * 2. Instansiasi Objek dengan Operator 'new'
 * 3. Deteksi Pemanggilan Tanpa 'new' via new.target & Pola Defensif
 * 4. Perilaku Nilai Kembalian (Return Primitif vs Return Objek)
 * 5. Masalah Duplikasi Method di Memori (Alasan Perlunya Prototype)
 * 6. Inspeksi Properti constructor & Operator instanceof
 *
 * Eksekusi: node 02-oop/01-constructor-function/example.js
 * ==============================================================================
 */

// ==============================================================================
// 1. DEKLARASI & INSTANSIASI DENGAN OPERATOR 'new'
// ==============================================================================
console.log('--- 1. DEKLARASI & INSTANSIASI DENGAN OPERATOR new ---');

function Person(firstName, lastName, age = 0) {
  // 'this' menunjuk ke instance objek baru yang sedang dibuat
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;

  // Method yang didefinisikan langsung di dalam constructor
  this.sayHello = function (partnerName) {
    return `Halo ${partnerName}, nama saya ${this.firstName} ${this.lastName}`;
  };
}

const joko = new Person('Joko', 'Santoso', 25);
const budi = new Person('Budi', 'Pratama', 30);

console.log('Instance joko  :', joko);
console.log('Panggil method :', joko.sayHello('Andi'));
console.log('Instance budi  :', budi);
console.log('Panggil method :', budi.sayHello('Siti'));

// ==============================================================================
// 2. DETEKSI PEMANGGILAN TANPA 'new' (new.target & POLA DEFENSIF)
// ==============================================================================
console.log('\n--- 2. DETEKSI PEMANGGILAN TANPA new (new.target) ---');

// Jika fungsi dipanggil tanpa 'new':
// Di Strict Mode -> this bernilai undefined (TypeError jika menulis this.prop)
// Di Non-strict Mode -> this merujuk ke globalThis / window (pencemaran global scope!)

function SafeUser(username, email) {
  // new.target bernilai fungsi konstruktor jika dipanggil dengan 'new', atau undefined jika tanpa 'new'
  if (!new.target) {
    console.log(
      `[Defensive Warning]: SafeUser dipanggil tanpa 'new'. Otomatis mengonversi ke 'new'!`,
    );
    return new SafeUser(username, email);
  }

  this.username = username;
  this.email = email;
}

// Dipanggil secara normal dengan 'new'
const user1 = new SafeUser('joko_dev', 'joko@mail.com');
console.log('user1 (dengan new) :', user1.username);

// Dipanggil TANPA 'new' (tetap aman berkat new.target!)
const user2 = SafeUser('budi_dev', 'budi@mail.com');
console.log('user2 (tanpa new)  :', user2.username);

// ==============================================================================
// 3. PERILAKU RETURN VALUE PADA CONSTRUCTOR FUNCTION
// ==============================================================================
console.log('\n--- 3. PERILAKU RETURN VALUE (PRIMITIF vs OBJEK) ---');

// Kasus A: Me-return nilai primitif (DIABAIKAN oleh JavaScript, tetap me-return 'this')
function AngkaBox(nilai) {
  this.nilai = nilai;
  return 100; // Nilai primitif ini diabaikan sepenuhnya!
}

const box1 = new AngkaBox(42);
console.log('Box return primitif :', box1); // AngkaBox { nilai: 42 }

// Kasus B: Me-return sebuah Objek secara eksplisit (MENIMPA 'this'!)
function OverrideBox(nilai) {
  this.nilai = nilai;
  return { custom: 'Saya objek pengganti!', status: 'override' }; // Menimpa objek 'this'
}

const box2 = new OverrideBox(42);
console.log('Box return objek    :', box2); // { custom: 'Saya objek pengganti!', status: 'override' }

// ==============================================================================
// 4. MASALAH DUPLIKASI METHOD DI MEMORI (RAM OVERHEAD)
// ==============================================================================
console.log('\n--- 4. MASALAH DUPLIKASI METHOD DI MEMORI ---');

// Method yang ditaruh langsung di 'this' diduplikasi setiap kali 'new' dipanggil
console.log(
  'Apakah sayHello joko dan budi merujuk ke fungsi yang sama di RAM?',
);
console.log(
  'joko.sayHello === budi.sayHello :',
  joko.sayHello === budi.sayHello,
); // false!
// Artinya: Jika ada 10.000 objek Person, akan ada 10.000 fungsi sayHello yang membebani RAM.
// Inilah alasan fundamental mengapa method harus dipindahkan ke Prototype (dibahas di materi 02).

// ==============================================================================
// 5. PROPERTI CONSTRUCTOR & OPERATOR INSTANCEOF
// ==============================================================================
console.log('\n--- 5. PROPERTI CONSTRUCTOR & INSTANCEOF ---');

console.log('joko instanceof Person   :', joko instanceof Person); // true
console.log('joko.constructor         :', joko.constructor.name); // "Person"
console.log('joko.constructor === Person :', joko.constructor === Person); // true
