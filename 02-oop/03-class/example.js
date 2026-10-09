/**
 * ==============================================================================
 * MATERI 03: ES6 CLASS (SINTAKS MODERN, CONSTRUCTOR, & METHOD PROTOTYPE)
 * ==============================================================================
 *
 * File ini mendemonstrasikan secara komprehensif:
 * 1. Deklarasi Class (Class Declaration vs Class Expression)
 * 2. Peran & Batasan Method Khusus constructor()
 * 3. Instance Methods & Bukti Pendaftaran Otomatis ke Prototype
 * 4. Sifat Non-Enumerable pada Method Class
 * 5. Wajib 'new' & Perlindungan Strict Mode Otomatis
 * 6. Computed Method Names (Nama Method Dinamis)
 *
 * Eksekusi: node 02-oop/03-class/example.js
 * ==============================================================================
 */

// ==============================================================================
// 1. DEKLARASI CLASS & INSTANSIASI
// ==============================================================================
console.log('--- 1. DEKLARASI CLASS & INSTANSIASI ---');

// A. Class Declaration
class User {
  // Method khusus constructor yang dijalankan saat 'new User(...)'
  constructor(username, email, role = 'member') {
    this.username = username;
    this.email = email;
    this.role = role;
  }

  // Instance Method (otomatis terdaftar di User.prototype)
  getProfile() {
    return `[${this.role.toUpperCase()}] ${this.username} (${this.email})`;
  }

  updateEmail(newEmail) {
    this.email = newEmail;
    return `Email berhasil diubah ke ${this.email}`;
  }
}

const user1 = new User('joko_dev', 'joko@mail.com', 'admin');
console.log('Instance user1        :', user1);
console.log('Panggil getProfile()  :', user1.getProfile());

// B. Class Expression (Anonim dan Bernama)
const PaymentGateway = class {
  constructor(provider) {
    this.provider = provider;
  }
  process() {
    return `Memproses transaksi via ${this.provider}`;
  }
};

const pg = new PaymentGateway('Midtrans');
console.log('Class Expression      :', pg.process());

// ==============================================================================
// 2. BUKTI: METHOD CLASS OTOMATIS MENEMPEL PADA PROTOTYPE
// ==============================================================================
console.log('\n--- 2. BUKTI METHOD MENEMPEL PADA PROTOTYPE ---');

const user2 = new User('budi_dev', 'budi@mail.com');

// Kedua instance berbagi referensi method yang sama di Prototype:
console.log(
  'user1.getProfile === user2.getProfile :',
  user1.getProfile === user2.getProfile,
); // true ✅
console.log(
  'getProfile ada di User.prototype      :',
  User.prototype.hasOwnProperty('getProfile'),
); // true ✅

// ==============================================================================
// 3. SIFAT NON-ENUMERABLE PADA METHOD CLASS
// ==============================================================================
console.log('\n--- 3. SIFAT NON-ENUMERABLE PADA METHOD CLASS ---');

// Berbeda dengan constructor function zaman dahulu, method di dalam class
// secara default berstatus non-enumerable (tidak mencemari loop Object.keys):
console.log('Object.keys(user1) (Hanya properti data) :', Object.keys(user1)); // ['username', 'email', 'role']
console.log(
  'Descriptor getProfile (enumerable?)      :',
  Object.getOwnPropertyDescriptor(User.prototype, 'getProfile').enumerable,
); // false ✅

// ==============================================================================
// 4. WAJIB MENGGUNAKAN 'new' (PROTEKSI DARI TYPEERROR)
// ==============================================================================
console.log('\n--- 4. PERLINDUNGAN WAJIB new ---');

try {
  // Memanggil class tanpa 'new' akan langsung dicegat dan melempar TypeError:
  // User('tanpa_new', 'test@mail.com');
  eval("User('tanpa_new', 'test@mail.com')");
} catch (error) {
  console.log('Error pemanggilan tanpa new :', error.name, '-', error.message);
}

// ==============================================================================
// 5. COMPUTED METHOD NAMES (NAMA METHOD DINAMIS)
// ==============================================================================
console.log('\n--- 5. COMPUTED METHOD NAMES ---');

const PREFIX = 'action_';

class Device {
  constructor(name) {
    this.name = name;
  }

  // Nama method dihitung dari ekspresi string:
  [`${PREFIX}restart`]() {
    return `Perangkat ${this.name} sedang di-restart...`;
  }
}

const laptop = new Device('MacBook Pro');
console.log('Panggil dynamic method :', laptop.action_restart());
