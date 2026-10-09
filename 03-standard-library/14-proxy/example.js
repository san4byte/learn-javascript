/**
 * ==============================================================================
 * MATERI 14: PROXY (13 TRAPS LENGKAP & REAKTIVITAS METAPROGRAMMING)
 * ==============================================================================
 *
 * File ini mendemonstrasikan secara komprehensif seluruh kemampuan Proxy:
 * 1. Trap get & set (Validasi skema & fallback nilai)
 * 2. Trap has & deleteProperty (Pengamanan data sensitif)
 * 3. Trap ownKeys (Filter iterasi Object.keys & for...in)
 * 4. Trap apply (Audit logger pemanggilan fungsi)
 * 5. Trap construct (Mencegat pembuatan instance dengan operator new)
 * 6. Trap defineProperty & getOwnPropertyDescriptor
 * 7. Trap getPrototypeOf & setPrototypeOf
 * 8. Trap isExtensible & preventExtensions
 * 9. Proxy.revocable (Pencabutan izin akses instan)
 *
 * Eksekusi: node 03-standard-library/14-proxy/example.js
 * ==============================================================================
 */

// ==============================================================================
// 1. TRAP GET & SET (VALIDASI & LOGGING)
// ==============================================================================
console.log('--- 1. TRAP GET & SET ---');

const user = { nama: 'Joko', umur: 25 };

const userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    return `[Peringatan: Properti '${String(prop)}' tidak ditemukan!]`;
  },

  set(target, prop, val, receiver) {
    if (prop === 'umur') {
      if (typeof val !== 'number' || val <= 0) {
        throw new TypeError('Umur wajib berupa angka positif lebih dari 0!');
      }
    }
    return Reflect.set(target, prop, val, receiver);
  },
});

console.log('Akses nama (ada)         :', userProxy.nama);
console.log('Akses alamat (tidak ada) :', userProxy.alamat);

userProxy.umur = 26;
console.log('Umur berhasil diupdate   :', userProxy.umur);

try {
  userProxy.umur = -10;
} catch (err) {
  console.log('Validasi gagal dicegah   :', err.message);
}

// ==============================================================================
// 2. TRAP HAS & DELETEPROPERTY
// ==============================================================================
console.log('\n--- 2. TRAP HAS & DELETEPROPERTY ---');

const akunBank = {
  nomorRekening: '123-456-789',
  pinRahasia: '9876',
  saldo: 5000000,
};

const safeBankProxy = new Proxy(akunBank, {
  has(target, prop) {
    if (prop === 'pinRahasia') return false; // Sembunyikan pinRahasia dari operator 'in'
    return Reflect.has(target, prop);
  },

  deleteProperty(target, prop) {
    if (prop === 'saldo' || prop === 'nomorRekening') {
      console.log(`[Ditolak] Properti '${prop}' dilarang dihapus!`);
      return false; // Tolak penghapusan
    }
    return Reflect.deleteProperty(target, prop);
  },
});

console.log("Cek 'pinRahasia' in bank :", 'pinRahasia' in safeBankProxy); // false
console.log("Cek 'saldo' in bank      :", 'saldo' in safeBankProxy); // true
delete safeBankProxy.saldo;
console.log('Saldo setelah delete     :', safeBankProxy.saldo); // 5000000

// ==============================================================================
// 3. TRAP OWNKEYS (FILTER ITERASI LOOP)
// ==============================================================================
console.log('\n--- 3. TRAP OWNKEYS ---');

const rahasiaProxy = new Proxy(akunBank, {
  ownKeys(target) {
    // Sembunyikan 'pinRahasia' dari Object.keys() dan for...in
    return Reflect.ownKeys(target).filter((k) => k !== 'pinRahasia');
  },
});

console.log('Object.keys (pin aman)   :', Object.keys(rahasiaProxy)); // ['nomorRekening', 'saldo']

// ==============================================================================
// 4. TRAP APPLY (AUDIT LOGGER FUNGSI)
// ==============================================================================
console.log('\n--- 4. TRAP APPLY ---');

function hitungTotal(harga, kuantitas) {
  return harga * kuantitas;
}

const hitungProxy = new Proxy(hitungTotal, {
  apply(target, thisArg, argList) {
    console.log('[Audit Logger] Memanggil hitungTotal dengan:', argList);
    return Reflect.apply(target, thisArg, argList);
  },
});

console.log('Hasil kalkulasi          :', hitungProxy(25000, 4));

// ==============================================================================
// 5. TRAP CONSTRUCT (MENCEGAT OPERATOR NEW)
// ==============================================================================
console.log('\n--- 5. TRAP CONSTRUCT ---');

class Mobil {
  constructor(merk) {
    this.merk = merk;
  }
}

const MobilProxy = new Proxy(Mobil, {
  construct(target, argList, newTarget) {
    console.log('[Factory Intercept] Membuat objek mobil merk:', argList[0]);
    const instance = Reflect.construct(target, argList, newTarget);
    instance.createdAt = new Date().getFullYear();
    return instance;
  },
});

const mobil1 = new MobilProxy('Toyota');
console.log('Instance yang dihasilkan :', mobil1); // Mobil { merk: 'Toyota', createdAt: 2026 }

// ==============================================================================
// 6. TRAP DEFINEPROPERTY & GETOWNPROPERTYDESCRIPTOR
// ==============================================================================
console.log('\n--- 6. TRAP DEFINEPROPERTY & GETOWNPROPERTYDESCRIPTOR ---');

const buku = { judul: 'JavaScript' };

const bukuProxy = new Proxy(buku, {
  defineProperty(target, prop, descriptor) {
    console.log(`[Intercept defineProperty]: ${String(prop)}`);
    return Reflect.defineProperty(target, prop, descriptor);
  },
  getOwnPropertyDescriptor(target, prop) {
    console.log(`[Intercept getOwnPropertyDescriptor]: ${String(prop)}`);
    return Reflect.getOwnPropertyDescriptor(target, prop);
  },
});

Object.defineProperty(bukuProxy, 'edisi', { value: 3, enumerable: true });
console.log(
  'Descriptor edisi         :',
  Object.getOwnPropertyDescriptor(bukuProxy, 'edisi'),
);

// ==============================================================================
// 7. TRAP GETPROTOTYPEOF & SETPROTOTYPEOF
// ==============================================================================
console.log('\n--- 7. TRAP GETPROTOTYPEOF & SETPROTOTYPEOF ---');

const hewan = { jenis: 'Fauna' };
const burung = { terbang: true };

const burungProxy = new Proxy(burung, {
  getPrototypeOf(target) {
    console.log('[Intercept getPrototypeOf]');
    return Reflect.getPrototypeOf(target);
  },
  setPrototypeOf(target, proto) {
    console.log('[Intercept setPrototypeOf]');
    return Reflect.setPrototypeOf(target, proto);
  },
});

Reflect.setPrototypeOf(burungProxy, hewan);
console.log('Prototype burung         :', Reflect.getPrototypeOf(burungProxy));
console.log('Apakah fauna?            :', burungProxy.jenis); // "Fauna"

// ==============================================================================
// 8. TRAP ISEXTENSIBLE & PREVENTEXTENSIONS
// ==============================================================================
console.log('\n--- 8. TRAP ISEXTENSIBLE & PREVENTEXTENSIONS ---');

const kotak = { barang: 'buku' };

const kotakProxy = new Proxy(kotak, {
  isExtensible(target) {
    console.log('[Intercept isExtensible]');
    return Reflect.isExtensible(target);
  },
  preventExtensions(target) {
    console.log('[Intercept preventExtensions]');
    return Reflect.preventExtensions(target);
  },
});

console.log('Kotak bisa ditambah?     :', Reflect.isExtensible(kotakProxy));
Reflect.preventExtensions(kotakProxy);
console.log('Kotak setelah dikunci    :', Reflect.isExtensible(kotakProxy));

// ==============================================================================
// 9. PROXY.REVOCABLE (PENCABUTAN IZIN AKSES SEKETIKA)
// ==============================================================================
console.log('\n--- 9. PROXY.REVOCABLE ---');

const dataSensitif = { apiKey: 'SUPER-SECRET-KEY-2026' };
const { proxy: revocableProxy, revoke } = Proxy.revocable(dataSensitif, {});

console.log('Akses sebelum dicabut    :', revocableProxy.apiKey);

// Cabut akses seketika
revoke();
console.log('[Izin Akses Dicabut!]');

try {
  console.log(revocableProxy.apiKey);
} catch (err) {
  console.log('Akses setelah dicabut    :', err.message); // Cannot perform 'get' on a proxy that has been revoked
}
