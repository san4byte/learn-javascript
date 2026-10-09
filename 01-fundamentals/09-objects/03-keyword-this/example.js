// =============================================================================
// MODUL 01 - FUNDAMENTALS: 09.3 - KEYWORD THIS PADA BERBAGAI KONTEKS
// =============================================================================

console.log('=== 1. IMPLICIT BINDING: METHOD OBJEK ===');
const akunPengguna = {
  nama: 'Joko Santoso',
  saldo: 1500000,
  tampilkanInfo() {
    // 'this' menunjuk ke objek pemanggil di sebelah kiri titik: akunPengguna
    return `Pemilik: ${this.nama} | Saldo: Rp ${this.saldo.toLocaleString('id-ID')}`;
  },
};
console.log(akunPengguna.tampilkanInfo());

console.log('\n=== 2. NEW BINDING: CONSTRUCTOR FUNCTION ===');
function Mobil(merk) {
  // 'this' mengikat ke instance baru yang sedang dibuat
  this.merk = merk;
  this.bunyi = function () {
    return `Mobil ${this.merk} membunyikan klakson!`;
  };
}

const kendaraan = new Mobil('Toyota GR');
console.log(kendaraan.bunyi());

console.log(
  '\n=== 3. KEHILANGAN KONTEKS & EXPLICIT BINDING (CALL, APPLY, BIND) ===',
);
// Saat method dilepas menjadi referensi variabel bebas:
const fungsiLepas = akunPengguna.tampilkanInfo;
// Pemanggilan biasa membuat 'this' menjadi undefined (strict mode) atau global
try {
  console.log('Panggilan fungsiLepas langsung:', fungsiLepas());
} catch (err) {
  console.log('Gagal akses this tanpa binding:', err.message);
}

// a. bind: Membuat fungsi baru dengan 'this' terikat permanen
const fungsiTerikat = fungsiLepas.bind(akunPengguna);
console.log('Hasil via .bind() :', fungsiTerikat());

// b. call: Memanggil langsung dengan this kustom dan argumen individu
function transaksi(jenis, jumlah) {
  return `${this.nama} melakukan ${jenis} sebesar Rp ${jumlah.toLocaleString('id-ID')}`;
}
console.log(
  'Hasil via .call() :',
  transaksi.call(akunPengguna, 'Setor Tunai', 500000),
);

// c. apply: Memanggil langsung dengan this kustom dan argumen array
console.log(
  'Hasil via .apply():',
  transaksi.apply(akunPengguna, ['Tarik Tunai', 200000]),
);

console.log('\n=== 4. LEXICAL THIS PADA ARROW FUNCTION CALLBACK ===');
const manajer = {
  departemen: 'Teknologi Informasi',
  staf: ['Andi', 'Budi'],
  umumkan() {
    // Arrow function mewarisi 'this' dari method umumkan
    this.staf.forEach((nama) => {
      console.log(`- ${nama} bertugas di divisi ${this.departemen}`);
    });
  },
};
manajer.umumkan();
