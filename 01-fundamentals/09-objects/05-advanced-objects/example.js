// =============================================================================
// MODUL 01 - FUNDAMENTALS: 09.5 - PROTOTYPE INHERITANCE & OBJECT METODOLOGI
// =============================================================================

console.log('=== 1. PROTOTYPE INHERITANCE KLASIK & MEMORY SHARING ===');
function Robot(nama, energi) {
  this.nama = nama;
  this.energi = energi;
}

// Menempelkan method ke Prototype (Hanya dibuat 1 kali di memori!)
Robot.prototype.bekerja = function (jam) {
  this.energi -= jam * 10;
  console.log(`${this.nama} bekerja ${jam} jam. Sisa energi: ${this.energi}%`);
};

Robot.prototype.isiUlang = function (tambah) {
  this.energi += tambah;
  console.log(`${this.nama} mengisi daya. Energi sekarang: ${this.energi}%`);
};

const optimus = new Robot('Optimus Prime', 100);
const bumblebee = new Robot('Bumblebee', 80);

optimus.bekerja(3);
bumblebee.isiUlang(15);

// Pembuktian efisiensi memori: kedua objek menunjuk ke fungsi memori yang sama persis
console.log(
  'Apakah berbagi referensi method sama?',
  optimus.bekerja === bumblebee.bekerja,
); // true

console.log('\n=== 2. PROTOTYPE CHAIN LOOKUP & OBJECT.GETPROTOTYPEOF ===');
const protoOptimus = Object.getPrototypeOf(optimus);
console.log(
  'Prototype dari optimus adalah Robot.prototype :',
  protoOptimus === Robot.prototype,
);
console.log(
  'Prototype dari Robot.prototype adalah Object.prototype:',
  Object.getPrototypeOf(protoOptimus) === Object.prototype,
);

console.log('\n=== 3. PEWARISAN MURNI DENGAN OBJECT.CREATE() ===');
const cetakanKendaraan = {
  jenis: 'Transportasi',
  klakson() {
    return `Klakson berbunyi dari kendaraan ${this.merk}`;
  },
};

const motor = Object.create(cetakanKendaraan);
motor.merk = 'Yamaha';
console.log('Akses properti objek :', motor.merk);
console.log('Akses method prototype:', motor.klakson());

console.log('\n=== 4. METHOD STATIS UTAMA PADA OBJECT ===');
const spekUnit = { prosesor: 'ARM64', ramGB: 16, status: 'Aktif' };

console.log('Object.keys()   :', Object.keys(spekUnit));
console.log('Object.values() :', Object.values(spekUnit));
console.log('Object.entries():', Object.entries(spekUnit));

// Penggabungan properti objek dengan Object.assign
const gabungObj = Object.assign({}, spekUnit, {
  status: 'Terganti',
  storageGB: 512,
});
console.log('Object.assign() :', gabungObj);
