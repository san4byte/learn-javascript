/**
 * ==============================================================================
 * MATERI 15: REFLECT (13 OPERASI REFLEKSI LENGKAP & REAKTIVITAS PROXY)
 * ==============================================================================
 *
 * File ini mendemonstrasikan secara komprehensif ke-13 method statis Reflect:
 * 1. Reflect.get & Reflect.set (beserta parameter receiver)
 * 2. Reflect.has & Reflect.deleteProperty
 * 3. Reflect.ownKeys (String + Symbol keys)
 * 4. Reflect.apply & Reflect.construct
 * 5. Reflect.defineProperty & Reflect.getOwnPropertyDescriptor
 * 6. Reflect.getPrototypeOf & Reflect.setPrototypeOf
 * 7. Reflect.isExtensible & Reflect.preventExtensions
 * 8. Studi Kasus Reaktif: Urutan Eksekusi Reflect.set (OmniStore Pro)
 *
 * Eksekusi: node 03-standard-library/15-reflect/example.js
 * ==============================================================================
 */

// ==============================================================================
// 1. REFLECT.GET & REFLECT.SET (BESERTA RECEIVER)
// ==============================================================================
console.log('--- 1. REFLECT.GET & REFLECT.SET ---');

const user = { nama: 'Joko', umur: 25 };

// Membaca properti
console.log("Reflect.get(user, 'nama') :", Reflect.get(user, 'nama')); // "Joko"

// Menulis properti (mengembalikan boolean)
const suksesSet = Reflect.set(user, 'umur', 26);
console.log('Reflect.set status sukses :', suksesSet); // true
console.log('Umur setelah di-set       :', user.umur); // 26

// Parameter Receiver untuk Getter/Setter
const induk = {
  _nama: 'Induk',
  get nama() {
    return this._nama;
  },
};
const anak = { _nama: 'Anak' };

// Tanpa receiver: 'this' merujuk ke induk
console.log('Reflect.get tanpa receiver :', Reflect.get(induk, 'nama')); // "Induk"
// Dengan receiver anak: 'this' dialihkan ke anak
console.log('Reflect.get dengan receiver:', Reflect.get(induk, 'nama', anak)); // "Anak"

// ==============================================================================
// 2. REFLECT.HAS & REFLECT.DELETEPROPERTY
// ==============================================================================
console.log('\n--- 2. REFLECT.HAS & REFLECT.DELETEPROPERTY ---');

const produk = { id: 'P01', nama: 'Sepatu', harga: 250000 };

// Pengganti operator 'prop' in obj
console.log("Reflect.has(produk, 'nama')     :", Reflect.has(produk, 'nama')); // true
console.log("Reflect.has(produk, 'diskon')   :", Reflect.has(produk, 'diskon')); // false

// Pengganti operator delete obj.prop (mengembalikan boolean aman)
const suksesHapus = Reflect.deleteProperty(produk, 'harga');
console.log('Reflect.deleteProperty sukses   :', suksesHapus); // true
console.log('Objek setelah properti dihapus  :', produk);

// ==============================================================================
// 3. REFLECT.OWNKEYS (STRING & SYMBOL KEYS)
// ==============================================================================
console.log('\n--- 3. REFLECT.OWNKEYS ---');

const ID_SYM = Symbol('id_rahasia');
const dataPegawai = {
  nama: 'Budi Santoso',
  divisi: 'Teknologi',
  [ID_SYM]: 'EMP-998',
};

// Mengambil SEMUA kunci (string dan Symbol) sekaligus dalam 1 array
const semuaKunci = Reflect.ownKeys(dataPegawai);
console.log('Reflect.ownKeys():', semuaKunci); // ['nama', 'divisi', Symbol(id_rahasia)]

// ==============================================================================
// 4. REFLECT.APPLY & REFLECT.CONSTRUCT
// ==============================================================================
console.log('\n--- 4. REFLECT.APPLY & REFLECT.CONSTRUCT ---');

// Reflect.apply: Memanggil fungsi dengan thisArg dan array parameter
function sapa(waktu, tandaSeru) {
  return `Selamat ${waktu}, ${this.gelar} ${this.nama}${tandaSeru}`;
}

const orang = { gelar: 'Dr.', nama: 'Siti' };
const salam = Reflect.apply(sapa, orang, ['Pagi', '!']);
console.log('Reflect.apply() hasil :', salam); // "Selamat Pagi, Dr. Siti!"

// Reflect.construct: Memanggil class constructor dengan array argumen
class Rekening {
  constructor(nomor, saldo) {
    this.nomor = nomor;
    this.saldo = saldo;
  }
}

const rekBaru = Reflect.construct(Rekening, ['112-001', 5000000]);
console.log('Reflect.construct()   :', rekBaru); // Rekening { nomor: '112-001', saldo: 5000000 }

// ==============================================================================
// 5. REFLECT.DEFINEPROPERTY & GETOWNPROPERTYDESCRIPTOR
// ==============================================================================
console.log('\n--- 5. REFLECT.DEFINEPROPERTY & GETOWNPROPERTYDESCRIPTOR ---');

const config = {};

// Mendefinisikan properti aman (mengembalikan boolean, tidak melempar throw error)
const suksesDef = Reflect.defineProperty(config, 'VERSION', {
  value: '1.0.0',
  writable: false,
  enumerable: true,
  configurable: false,
});
console.log('Reflect.defineProperty sukses :', suksesDef); // true

// Membaca descriptor properti
const descriptor = Reflect.getOwnPropertyDescriptor(config, 'VERSION');
console.log('Reflect.getOwnPropertyDescriptor:', descriptor);

// Uji coba pada objek beku (tidak crash, hanya mengembalikan false)
const objekBeku = Object.freeze({ status: 'active' });
const gagalDef = Reflect.defineProperty(objekBeku, 'token', { value: 'xyz' });
console.log('Reflect.defineProperty pd beku  :', gagalDef); // false ✅

// ==============================================================================
// 6. REFLECT.GETPROTOTYPEOF & REFLECT.SETPROTOTYPEOF
// ==============================================================================
console.log('\n--- 6. REFLECT.GETPROTOTYPEOF & REFLECT.SETPROTOTYPEOF ---');

const hewan = { bernapas: true };
const kucing = { mengeong: true };

// Reflect.setPrototypeOf: Mengubah prototype dan me-return boolean sukses
const suksesProto = Reflect.setPrototypeOf(kucing, hewan);
console.log('Reflect.setPrototypeOf sukses :', suksesProto); // true

// Reflect.getPrototypeOf: Membaca prototype objek
const protoKucing = Reflect.getPrototypeOf(kucing);
console.log('Reflect.getPrototypeOf        :', protoKucing); // { bernapas: true }
console.log('Apakah kucing bisa bernapas?  :', kucing.bernapas); // true (diwarisi via prototype)

// ==============================================================================
// 7. REFLECT.ISEXTENSIBLE & REFLECT.PREVENTEXTENSIONS
// ==============================================================================
console.log('\n--- 7. REFLECT.ISEXTENSIBLE & REFLECT.PREVENTEXTENSIONS ---');

const koper = { baju: 3 };

console.log('Awal isExtensible       :', Reflect.isExtensible(koper)); // true

// Mengunci agar tidak bisa ditambah properti baru
const suksesKunci = Reflect.preventExtensions(koper);
console.log('Reflect.preventExtensions:', suksesKunci); // true
console.log('Sesudah isExtensible    :', Reflect.isExtensible(koper)); // false

// Percobaan menambah properti diabaikan / mengembalikan false
const cobaTambah = Reflect.set(koper, 'celana', 2);
console.log('Coba tambah properti    :', cobaTambah); // false
console.log('Isi koper tetap         :', koper); // { baju: 3 }

// ==============================================================================
// 8. STUDI KASUS REAKTIF OMNISTORE PRO: URUTAN EKSEKUSI REFLECT.SET
// ==============================================================================
console.log('\n--- 8. STUDI KASUS OMNISTORE PRO: URUTAN REFLECT.SET ---');

const rawState = { cart: ['Laptop'] };
const listeners = [];

const reactiveState = new Proxy(rawState, {
  set(target, prop, value, receiver) {
    // 1. Eksekusi pengubahan data di AWAL (Post-processing)
    const success = Reflect.set(target, prop, value, receiver);

    if (success) {
      // 2. Beri notifikasi ke listener menggunakan data yang SUDAH BARU
      console.log(
        `[Store Event]: State '${prop}' diperbarui. Total cart:`,
        target.cart.length,
      );
      listeners.forEach((fn) => fn(target, prop));
    }

    return success;
  },
});

listeners.push((state, prop) => {
  console.log(
    `[UI Re-render]: Keranjang belanja kini memuat: ${state.cart.join(', ')}`,
  );
});

// Update cart
reactiveState.cart = ['Laptop', 'Mouse Gaming', 'Keyboard Mechanical'];
