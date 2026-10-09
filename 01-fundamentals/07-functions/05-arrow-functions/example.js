// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.5 - ARROW FUNCTION & CONTEXT THIS
// =============================================================================

console.log('=== 1. VARIASI SINTAKS ARROW FUNCTION ===');
// a. Satu parameter tanpa tanda kurung & implicit return
const kuadrat = (x) => x * x;
console.log('Kuadrat 7:', kuadrat(7));

// b. Banyak parameter dengan implicit return
const hitungTotal = (qty, harga) => qty * harga;
console.log('Total belanja:', hitungTotal(3, 25000));

// c. Implicit return untuk objek literal (wajib dibungkus tanda kurung bulat ())
const buatPengguna = (id, nama) => ({ id, nama, role: 'User' });
console.log('Objek pengguna:', buatPengguna(101, 'Joko'));

// d. Multi-baris (membutuhkan kurung kurawal {} dan kata kunci return eksplisit)
const tentukanGrade = (nilai) => {
  if (nilai >= 85) return 'A';
  if (nilai >= 70) return 'B';
  return 'C';
};
console.log('Grade nilai 88:', tentukanGrade(88));

console.log('\n=== 2. PERILAKU LEXICAL THIS (WARISAN DARI OUTER SCOPE) ===');
const manajerTim = {
  namaTim: 'Engineering Alpha',
  anggota: ['Citra', 'Dimas', 'Eko'],

  // Regular function sebagai method: memiliki 'this' yang merujuk ke manajerTim
  tampilkanAnggota() {
    console.log(`Daftar tim [${this.namaTim}]:`);

    // Arrow function di dalam forEach mewarisi 'this' leksikal dari tampilkanAnggota
    this.anggota.forEach((nama) => {
      console.log(`- ${nama} (Bagian dari ${this.namaTim})`);
    });
  },
};

manajerTim.tampilkanAnggota();

console.log('\n=== 3. PERBEDAAN THIS PADA METHOD OBJEK (COMMON PITFALL) ===');
const objekMobil = {
  merk: 'Toyota GR',
  // REGULAR METHOD: 'this' terikat ke objekMobil
  infoRegular() {
    return `Mobil: ${this.merk}`;
  },
  // ARROW FUNCTION SEBAGAI METHOD: 'this' mencari ke luar (global/module scope)!
  infoArrow: () => {
    return `Mobil: ${this ? this.merk : undefined}`;
  },
};

console.log('Panggilan infoRegular():', objekMobil.infoRegular());
console.log('Panggilan infoArrow()  :', objekMobil.infoArrow()); // merk menjadi undefined!

console.log('\n=== 4. KETIADAAN CONSTRUCTOR PADA ARROW FUNCTION ===');
try {
  const KonstruktorPanah = () => {};
  new KonstruktorPanah();
} catch (err) {
  console.log('Arrow function tidak bisa dipanggil dengan new:', err.message);
}
