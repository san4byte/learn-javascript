// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.1 - PENGENALAN FUNCTION
// =============================================================================

console.log('=== 1. FUNCTION DECLARATION & HOISTING ===');
// Function Declaration dapat dipanggil sebelum baris deklarasi fisiknya:
const hargaAwal = 100000;
const diskon = 10;
const totalAkhir = hitungHargaDiskon(hargaAwal, diskon);
console.log(
  `Harga awal: Rp ${hargaAwal.toLocaleString('id-ID')} | Diskon: ${diskon}%`,
);
console.log(`Total setelah diskon: Rp ${totalAkhir.toLocaleString('id-ID')}`);

function hitungHargaDiskon(harga, persen) {
  const potongan = (harga * persen) / 100;
  return harga - potongan;
}

console.log('\n=== 2. FUNCTION EXPRESSION & ANONYMOUS FUNCTIONS ===');
// Disimpan ke dalam variabel; tidak dapat dipanggil sebelum dideklarasikan
const formatMataUang = function (angka) {
  return `Rp ${angka.toLocaleString('id-ID')}`;
};
console.log('Format hasil:', formatMataUang(75000));

console.log('\n=== 3. SIKLUS HIDUP RETURN & IMPLICIT UNDEFINED ===');
function prosesTanpaReturn() {
  const hitung = 10 * 5;
  // Tanpa keyword return, fungsi secara otomatis mengembalikan undefined
}
console.log('Nilai balik fungsi tanpa return:', prosesTanpaReturn()); // undefined

console.log('\n=== 4. EARLY RETURN PATTERN (GUARD CLAUSES) ===');
function prosesPendaftaran(nama, usia) {
  if (!nama || nama.trim() === '') {
    return 'Gagal: Nama wajib diisi.';
  }
  if (usia < 17) {
    return 'Gagal: Usia minimal adalah 17 tahun.';
  }

  // Alur utama tanpa nested if-else yang dalam
  return `Sukses: Pengguna ${nama} (${usia} thn) berhasil terdaftar!`;
}

console.log(prosesPendaftaran('', 20));
console.log(prosesPendaftaran('Andi', 15));
console.log(prosesPendaftaran('Joko Santoso', 25));

console.log('\n=== 5. FIRST-CLASS CITIZEN: FUNGSI SEBAGAI DATA ===');
// Fungsi dapat dimasukkan ke dalam array atau objek
const pipelineTransformasi = [
  (str) => str.trim(),
  (str) => str.toUpperCase(),
  (str) => `[SISTEM]: ${str}`,
];

let inputTeks = '   pesan notifikasi penting   ';
for (const step of pipelineTransformasi) {
  inputTeks = step(inputTeks);
}
console.log('Hasil pipeline fungsi:', inputTeks);
