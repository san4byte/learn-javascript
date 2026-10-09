// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log(
  '=== 1. TINGKATAN PROTEKSI OBJEK (SEAL, FREEZE, PREVENTEXTENSIONS) ==='
);
// A. Object.preventExtensions() - Tidak bisa tambah properti baru, tapi bisa ubah & hapus
const objBiasa = { nama: 'Joko', umur: 25 };
Object.preventExtensions(objBiasa);
objBiasa.umur = 26; // ✅ Boleh ubah
delete objBiasa.nama; // ✅ Boleh hapus
objBiasa.kota = 'Jakarta'; // ❌ Tidak bisa tambah properti baru
console.log('preventExtensions()              :', objBiasa); // { umur: 26 }
console.log(
  'isExtensible()                   :',
  Object.isExtensible(objBiasa)
); // false

// B. Object.seal() - Tidak bisa tambah/hapus properti, tapi bisa UBAH nilai yang ada
const profilSealed = { role: 'editor', level: 1 };
Object.seal(profilSealed);
profilSealed.level = 2; // ✅ Boleh ubah
delete profilSealed.role; // ❌ Tidak bisa hapus
profilSealed.gaji = 5000000; // ❌ Tidak bisa tambah
console.log('seal()                           :', profilSealed); // { role: 'editor', level: 2 }
console.log(
  'isSealed()                       :',
  Object.isSealed(profilSealed)
); // true

// C. Object.freeze() - Beku total: tidak bisa tambah, hapus, maupun ubah nilai
const config = { host: 'localhost', port: 3000 };
Object.freeze(config);
config.port = 8080; // ❌ Diabaikan (atau TypeError di strict mode)
console.log('freeze()                         :', config); // { host: 'localhost', port: 3000 }
console.log('isFrozen()                       :', Object.isFrozen(config)); // true

console.log('\n=== 2. JEBAKAN SHALLOW FREEZE & SOLUSI DEEP FREEZE ===');
const appConfig = {
  versi: '1.0.0',
  database: { namaDb: 'toko_online' },
};
Object.freeze(appConfig); // Hanya membekukan tingkat teratas!
appConfig.database.namaDb = 'hacked_db'; // ⚠️ Properti anak masih bisa diubah!
console.log('Hasil Shallow Freeze (Anak)      :', appConfig.database.namaDb); // "hacked_db"

// Solusi: Fungsi Deep Freeze Rekursif
function deepFreeze(obj) {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}

const safeConfig = deepFreeze({
  versi: '2.0.0',
  database: { namaDb: 'database_aman' },
});
safeConfig.database.namaDb = 'coba_ubah'; // ❌ Gagal
console.log('Hasil Deep Freeze (Anak)         :', safeConfig.database.namaDb); // "database_aman"

console.log('\n=== 3. EKSTRAKSI DATA: KEYS, VALUES, ENTRIES, FROMENTRIES ===');
const kurs = { USD: 16000, EUR: 17500, JPY: 105 };

console.log('Object.keys()                    :', Object.keys(kurs)); // ['USD', 'EUR', 'JPY']
console.log('Object.values()                  :', Object.values(kurs)); // [16000, 17500, 105]
console.log('Object.entries()                 :', Object.entries(kurs)); // [['USD', 16000], ...]

// getOwnPropertyNames mengambil semua properti termasuk non-enumerable:
const dataTersembunyi = {};
Object.defineProperty(dataTersembunyi, 'rahasia', {
  value: 123,
  enumerable: false,
});
dataTersembunyi.publik = 'halo';
console.log('Object.keys (enumerable saja)    :', Object.keys(dataTersembunyi)); // ['publik']
console.log(
  'Object.getOwnPropertyNames       :',
  Object.getOwnPropertyNames(dataTersembunyi)
); // ['rahasia', 'publik']

// Transformasi Objek dengan entries -> filter -> fromEntries
const kursTinggi = Object.fromEntries(
  Object.entries(kurs).filter(([_, nilai]) => nilai > 1000)
);
console.log('Filter via fromEntries()         :', kursTinggi); // { USD: 16000, EUR: 17500 }

// Konversi URLSearchParams ke Objek
const queryParams = new URLSearchParams('page=1&limit=10&tab=active');
console.log(
  'URLSearchParams ke Object        :',
  Object.fromEntries(queryParams)
);

console.log('\n=== 4. PENGGABUNGAN & KLONING: OBJECT.ASSIGN ===');
const target = { a: 1 };
const sumber1 = { b: 2 };
const sumber2 = { c: 3, a: 99 }; // Menimpa properti 'a' jika ada benturan

Object.assign(target, sumber1, sumber2);
console.log('Object.assign() hasil            :', target); // { a: 99, b: 2, c: 3 }

console.log('\n=== 5. PENGECEKAN MODERN: HASOWN & OBJECT.IS ===');
// A. Object.hasOwn(obj, prop) - Standar ES2022 (Aman dari prototype polution / null prototype)
const objekPolos = Object.create(null);
objekPolos.status = 'aktif';

// objekPolos.hasOwnProperty('status'); // ❌ TypeError: objekPolos.hasOwnProperty is not a function
console.log(
  'Object.hasOwn(objekPolos)        :',
  Object.hasOwn(objekPolos, 'status')
); // true ✅

// B. Object.is(a, b) - Algoritma kesamaan SameValue
console.log('NaN === NaN                      :', NaN === NaN); // false
console.log('Object.is(NaN, NaN)              :', Object.is(NaN, NaN)); // true ✅
console.log('+0 === -0                        :', +0 === -0); // true
console.log('Object.is(+0, -0)                :', Object.is(+0, -0)); // false ✅

console.log('\n=== 6. PROPERTY DESCRIPTOR & DEFINEPROPERTY ===');
const user = {};
Object.defineProperty(user, 'id', {
  value: 1001,
  writable: false, // Nilai tidak bisa diubah
  enumerable: true, // Terlihat saat di-loop / Object.keys()
  configurable: false, // Tidak bisa dihapus & konfigurasinya tidak bisa diganti
});

user.id = 9999; // ❌ Diabaikan
delete user.id; // ❌ Diabaikan
console.log('User ID setelah dimutasi         :', user.id); // 1001
console.log(
  'Descriptor properti id           :',
  Object.getOwnPropertyDescriptor(user, 'id')
);
