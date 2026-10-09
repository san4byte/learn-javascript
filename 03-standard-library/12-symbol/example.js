// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. KEUNIKAN MUTLAK SYMBOL & PROPERTI DESCRIPTION ===');
const id1 = Symbol('userId');
const id2 = Symbol('userId');

console.log('Deskripsi id1             :', id1.description);
console.log('Deskripsi id2             :', id2.description);
console.log('Apakah id1 === id2?       :', id1 === id2); // false (selalu unik di memori)
console.log('Tipe data Symbol          :', typeof id1); // "symbol"

// Symbol adalah fungsi primitif, BUKAN konstruktor:
// new Symbol('id'); // ❌ TypeError: Symbol is not a constructor

console.log('\n=== 2. KUNCI PROPERTI TERSEMBUNYI (ANTI-COLLISION) ===');
const API_TOKEN = Symbol('tokenInternal');

const user = {
  nama: 'Joko Santoso',
  role: 'Developer',
  [API_TOKEN]: 'SECRET_XYZ_999',
};

console.log('Akses properti biasa      :', user.nama);
console.log('Akses via kunci Symbol    :', user[API_TOKEN]);

// Tersembunyi dari perulangan for...in, Object.keys(), dan JSON.stringify()
console.log('Object.keys(user)         :', Object.keys(user)); // ['nama', 'role']
console.log('JSON.stringify(user)      :', JSON.stringify(user)); // API_TOKEN otomatis disingkirkan

console.log('\n=== 3. CARA INSPEKSI KUNCI SYMBOL PADA OBJEK ===');
// A. Hanya mengambil kunci Symbol
const symbols = Object.getOwnPropertySymbols(user);
console.log('getOwnPropertySymbols     :', symbols); // [ Symbol(tokenInternal) ]
console.log('Nilai properti Symbol     :', user[symbols[0]]);

// B. Mengambil SEMUA kunci (String biasa + Symbol)
const seluruhKunci = Reflect.ownKeys(user);
console.log('Reflect.ownKeys(user)     :', seluruhKunci); // ['nama', 'role', Symbol(tokenInternal)]

console.log('\n=== 4. GLOBAL SYMBOL REGISTRY (Symbol.for & Symbol.keyFor) ===');
// Berbagi Symbol lintas modul atau lintas file
const symGlobal1 = Symbol.for('app.session');
const symGlobal2 = Symbol.for('app.session');

console.log('Apakah symGlobal1 === 2?  :', symGlobal1 === symGlobal2); // true (berbagi registry global)
console.log('Cek nama kunci via keyFor :', Symbol.keyFor(symGlobal1)); // "app.session"
console.log('keyFor pada Symbol lokal  :', Symbol.keyFor(id1)); // undefined (bukan di registry)

console.log('\n=== 5. WELL-KNOWN SYMBOLS DALAM PRAKTIK ===');
// A. Symbol.toStringTag - Mengubah label [object Object]
class LaporanKeuangan {
  get [Symbol.toStringTag]() {
    return 'LaporanKeuanganTahunan';
  }
}
const laporan = new LaporanKeuangan();
console.log(
  'Object.prototype.toString :',
  Object.prototype.toString.call(laporan),
); // "[object LaporanKeuanganTahunan]"

// B. Symbol.iterator - Membuat objek dapat di-loop dengan for...of
const rentangAngka = {
  awal: 1,
  akhir: 3,
  [Symbol.iterator]() {
    let current = this.awal;
    const max = this.akhir;
    return {
      next() {
        if (current <= max) {
          return { value: current++, done: false };
        }
        return { done: true };
      },
    };
  },
};

console.log('-- Custom Iterable via Symbol.iterator --');
for (const angka of rentangAngka) {
  console.log('Angka loop:', angka); // 1, 2, 3
}

console.log('\n=== 6. JEBAKAN COERCION IMPLISIT KE STRING ===');
// 'ID Pengguna: ' + id1; // ❌ TypeError: Cannot convert a Symbol value to a string

// Solusi yang benar:
console.log('Konversi eksplisit String :', String(id1)); // "Symbol(userId)"
console.log('Mengambil description     :', id1.description); // "userId"
