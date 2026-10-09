/**
 * 08 - Public Class Field
 *
 * Demonstrasi lengkap Public Class Field (ES2022):
 * 1. Deklarasi field tanpa nilai awal (default undefined) & dengan nilai default
 * 2. Urutan eksekusi inisialisasi field vs constructor
 * 3. Pembuktian field menempel pada instance, bukan pada prototype
 * 4. Dynamic/Computed field names
 * 5. Arrow function sebagai class field (Auto-bound methods) vs prototype methods
 * 6. Pewarisan public field pada subclass
 */

console.log('=== 1. Deklarasi Dasar & Default Values ===');
class Customer {
  // Public field tanpa nilai awal (otomatis undefined)
  firstName;
  lastName;

  // Public field dengan nilai default
  saldo = 0;
  mataUang = 'IDR';
  waktuDibuat = new Date().toLocaleDateString('id-ID');

  constructor(firstName, lastName, saldoAwal) {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (saldoAwal !== undefined) this.saldo = saldoAwal;
  }
}

const joko = new Customer('Joko', 'Santoso', 250_000);
console.log(`Customer: ${joko.firstName} ${joko.lastName}`);
console.log(`Saldo: ${joko.mataUang} ${joko.saldo.toLocaleString('id-ID')}`);
console.log(`Dibuat tanggal: ${joko.waktuDibuat}\n`);

const anon = new Customer();
console.log(`Customer anonim:`, {
  firstName: anon.firstName,
  saldo: anon.saldo,
});
console.log();

console.log('=== 2. Urutan Eksekusi Inisialisasi Field ===');
class UrutanDemo {
  // Field dievaluasi sebelum body constructor berjalan
  angka = (() => {
    console.log("1. Evaluasi field 'angka' dijalankan!");
    return 42;
  })();

  constructor() {
    console.log('2. Badan constructor baru dieksekusi!');
    this.angka = 100; // Menimpa nilai default dari field
  }
}

const demo = new UrutanDemo();
console.log(`Nilai akhir demo.angka: ${demo.angka}\n`);

console.log('=== 3. Lokasi Field: Instance vs Prototype ===');
class Produk {
  kategori = 'Elektronik'; // Public field: menempel di setiap instance

  deskripsi() {
    return 'Deskripsi produk umum';
  } // Method: menempel di prototype
}

const laptop = new Produk();
console.log(
  "laptop memiliki own property 'kategori'?",
  Object.hasOwn(laptop, 'kategori'),
); // true
console.log(
  "laptop memiliki own property 'deskripsi'?",
  Object.hasOwn(laptop, 'deskripsi'),
); // false
console.log(
  "Produk.prototype memiliki 'kategori'?",
  Object.hasOwn(Produk.prototype, 'kategori'),
); // false
console.log(
  "Produk.prototype memiliki 'deskripsi'?",
  Object.hasOwn(Produk.prototype, 'deskripsi'),
); // true
console.log();

console.log('=== 4. Computed Field Names ===');
const PREFIX = 'meta_';
const KEY_ROLE = `${PREFIX}role`;

class AkunSistem {
  [KEY_ROLE] = 'user';
  [`${PREFIX}version`] = '2.1.0';
}

const akun = new AkunSistem();
console.log(
  `meta_role: ${akun.meta_role}, meta_version: ${akun.meta_version}\n`,
);

console.log('=== 5. Arrow Function sebagai Class Field (Auto-Bound) ===');
class TombolUI {
  label = 'Kirim';

  // Arrow function field: 'this' terikat permanen ke instance
  handleClick = () => {
    console.log(`Tombol '${this.label}' diklik!`);
  };

  // Regular method: 'this' bergantung pada konteks pemanggil
  handleClickRegular() {
    console.log(`Tombol '${this?.label || 'tidak dikenal'}' diklik!`);
  }
}

const btn = new TombolUI();
const aksiTersendiri = btn.handleClick;
aksiTersendiri(); // Tetap berhasil mengakses this.label!

const aksiLepas = btn.handleClickRegular;
try {
  aksiLepas(); // TypeError di strict mode jika 'this' undefined
} catch (err) {
  console.log(`Error regular method lepas konteks: ${err.message}`);
}
console.log();

console.log('=== 6. Pewarisan Public Field pada Subclass ===');
class Kendaraan {
  roda = 4;
  bahanBakar = 'Bensin';
}

class MobilListrik extends Kendaraan {
  bahanBakar = 'Baterai EV'; // Menimpa field induk
  kapasitasKwh = 75;
}

const ev = new MobilListrik();
console.log(
  `Mobil Listrik -> Roda: ${ev.roda}, Bahan Bakar: ${ev.bahanBakar}, Kapasitas: ${ev.kapasitasKwh} kWh`,
);
