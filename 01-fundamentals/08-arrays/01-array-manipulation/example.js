// =============================================================================
// MODUL 01 - FUNDAMENTALS: 08.1 - MANIPULASI ARRAY (MUTATOR & ACCESSOR)
// =============================================================================

console.log(
  '=== 1. OPERASI MUTATOR UJUNG ARRAY (PUSH, POP, SHIFT, UNSHIFT) ===',
);
const antreanKlinik = ['Budi', 'Siti'];

// Menambah pasien di akhir (O(1))
antreanKlinik.push('Joko');
console.log("Setelah push('Joko')     :", antreanKlinik);

// Menghapus pasien terakhir
const pasienBatal = antreanKlinik.pop();
console.log(`Pasien terakhir batal    : ${pasienBatal} | Sisa:`, antreanKlinik);

// Menambah pasien darurat di awal antrean (O(N) karena index bergeser)
antreanKlinik.unshift('Pasien Darurat');
console.log('Setelah unshift darurat  :', antreanKlinik);

// Memanggil pasien pertama (O(N))
const pasienDipanggil = antreanKlinik.shift();
console.log(
  `Pasien dipanggil dokter  : ${pasienDipanggil} | Sisa:`,
  antreanKlinik,
);

console.log('\n=== 2. MUTASI TENGAH: SPLICE() VS SALINAN: SLICE() ===');
const daftarKota = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'];

// slice(1, 3): Mengambil elemen dari index 1 hingga sebelum index 3 (IMMUTABLE / ASLI UTUH)
const kotaPilihan = daftarKota.slice(1, 3);
console.log('Hasil slice(1, 3)        :', kotaPilihan);
console.log('Array asal tetap utuh    :', daftarKota);

// splice(2, 1, 'Semarang'): Di index 2, hapus 1 elemen, sisipkan 'Semarang' (MUTASI LANGSUNG)
const kotaDihapus = daftarKota.splice(2, 1, 'Semarang');
console.log('Elemen terhapus splice   :', kotaDihapus);
console.log('Array setelah splice     :', daftarKota);

console.log('\n=== 3. ACCESSOR PENCARIAN & PENGGABUNGAN ===');
// indexOf & includes
console.log("Index kota 'Bandung'     :", daftarKota.indexOf('Bandung'));
console.log("Apakah ada 'Surabaya'?   :", daftarKota.includes('Surabaya'));
console.log("Apakah ada 'Semarang'?   :", daftarKota.includes('Semarang'));

// join
console.log('Rute Perjalanan (join)   :', daftarKota.join(' -> '));

// concat
const kotaTambahan = ['Denpasar', 'Mataram'];
const ruteLengkap = daftarKota.concat(kotaTambahan);
console.log('Rute Gabungan (concat)   :', ruteLengkap);
