/**
 * 07 - Getter dan Setter
 *
 * Demonstrasi lengkap getter dan setter di JavaScript Class:
 * 1. Getter & Setter dasar untuk computed property (fullName)
 * 2. Setter dengan validasi data dan perlindungan tipe
 * 3. Menghindari jebakan rekursi tak hingga (Backing Property _field)
 * 4. Read-Only property (Getter tanpa Setter)
 * 5. Static Getter dan Setter pada level kelas
 * 6. Inspeksi Property Descriptor (Object.getOwnPropertyDescriptor)
 */

console.log('=== 1. Getter & Setter Dasar (Computed Property) ===');
class Orang {
  constructor(namaDepan, namaBelakang) {
    this.namaDepan = namaDepan;
    this.namaBelakang = namaBelakang;
  }

  // Getter: Diakses seperti properti biasa tanpa kurung ()
  get namaLengkap() {
    return `${this.namaDepan} ${this.namaBelakang}`.trim();
  }

  // Setter: Dijalankan saat properti diberi nilai baru
  set namaLengkap(nilai) {
    if (typeof nilai !== 'string' || nilai.trim().length === 0) {
      throw new TypeError('Nama lengkap harus berupa string non-kosong!');
    }
    const bagian = nilai.trim().split(' ');
    this.namaDepan = bagian[0];
    this.namaBelakang = bagian.slice(1).join(' ') || '';
  }
}

const user = new Orang('Joko', 'Santoso');
console.log(`Getter dipanggil: ${user.namaLengkap}`);

user.namaLengkap = 'Eko Kurniawan Khannedy'; // Memanggil setter
console.log(`Setelah Setter: ${user.namaLengkap}`);
console.log(
  `namaDepan: ${user.namaDepan}, namaBelakang: ${user.namaBelakang}\n`,
);

console.log('=== 2. Setter dengan Validasi & Transformasi ===');
class RekeningBank {
  constructor(pemilik, saldoAwal = 0) {
    this.pemilik = pemilik;
    this._saldo = saldoAwal; // Backing field dengan konvensi underscore
  }

  get saldo() {
    return this._saldo;
  }

  get saldoFormat() {
    return `Rp${this._saldo.toLocaleString('id-ID')}`;
  }

  set saldo(nilaiBaru) {
    if (typeof nilaiBaru !== 'number' || isNaN(nilaiBaru)) {
      throw new TypeError('Saldo harus berupa angka valid!');
    }
    if (nilaiBaru < 0) {
      throw new RangeError('Saldo tidak boleh negatif!');
    }
    this._saldo = nilaiBaru;
  }
}

const rekening = new RekeningBank('Budi', 500000);
console.log(`Saldo awal: ${rekening.saldoFormat}`);

rekening.saldo = 1250000;
console.log(`Saldo baru: ${rekening.saldoFormat}`);

try {
  rekening.saldo = -100;
} catch (err) {
  console.log(`Validasi ditolak: ${err.message}\n`);
}

console.log('=== 3. Read-Only Property (Getter Saja) ===');
class Lingkaran {
  constructor(radius) {
    this.radius = radius;
  }

  // Luas dihitung secara dinamis, read-only
  get luas() {
    return Math.PI * this.radius * this.radius;
  }

  get keliling() {
    return 2 * Math.PI * this.radius;
  }
}

const bundar = new Lingkaran(7);
console.log(`Radius: ${bundar.radius}`);
console.log(`Luas: ${bundar.luas.toFixed(2)}`);
console.log(`Keliling: ${bundar.keliling.toFixed(2)}`);

// Mencoba menulis ke getter read-only (gagal silently di non-strict, atau TypeError di strict mode)
try {
  bundar.luas = 100; // Tidak akan berpengaruh
} catch (err) {
  console.log(`Tidak bisa mengubah properti read-only: ${err.message}`);
}
console.log(`Luas setelah assignment paksa tetap: ${bundar.luas.toFixed(2)}\n`);

console.log('=== 4. Static Getter dan Setter ===');
class KonfigurasiApp {
  static _mode = 'development';

  static get mode() {
    return this._mode.toUpperCase();
  }

  static set mode(nilai) {
    const opsiValid = ['development', 'staging', 'production'];
    if (!opsiValid.includes(nilai.toLowerCase())) {
      throw new Error(
        `Mode tidak valid: ${nilai}. Pilihan: ${opsiValid.join(', ')}`,
      );
    }
    this._mode = nilai.toLowerCase();
  }
}

console.log(`Mode awal: ${KonfigurasiApp.mode}`);
KonfigurasiApp.mode = 'production';
console.log(`Mode setelah diubah: ${KonfigurasiApp.mode}\n`);

console.log('=== 5. Inspeksi Property Descriptor di Prototype ===');
const descriptor = Object.getOwnPropertyDescriptor(
  Orang.prototype,
  'namaLengkap',
);
console.log('Accessor Descriptor Orang.prototype.namaLengkap:');
console.log(`- Memiliki getter: ${typeof descriptor.get === 'function'}`);
console.log(`- Memiliki setter: ${typeof descriptor.set === 'function'}`);
console.log(`- Enumerable: ${descriptor.enumerable}`);
console.log(`- Configurable: ${descriptor.configurable}`);
