// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.6 - HIGHER-ORDER FUNCTIONS
// =============================================================================

console.log(
  '=== 1. CUSTOM HIGHER-ORDER FUNCTION (FUNGSI PENERIMA CALLBACK) ===',
);
// Fungsi yang menerima fungsi lain sebagai argumen
function eksekusiOperasi(angka, fungsiTransformasi) {
  return fungsiTransformasi(angka);
}

const ganda = (x) => x * 2;
const kuadrat = (x) => x * x;

console.log('Eksekusi ganda(5)  :', eksekusiOperasi(5, ganda));
console.log('Eksekusi kuadrat(5):', eksekusiOperasi(5, kuadrat));

console.log('\n=== 2. HOF BAWAAN ARRAY: FILTER, MAP & REDUCE ===');
const daftarProduk = [
  { id: 1, nama: 'Laptop Gaming', harga: 15000000, kategori: 'Elektronik' },
  { id: 2, nama: 'Buku Clean Code', harga: 250000, kategori: 'Buku' },
  { id: 3, nama: 'Mouse Wireless', harga: 300000, kategori: 'Elektronik' },
  { id: 4, nama: 'Kemeja Formal', harga: 450000, kategori: 'Pakaian' },
];

// a. filter: Mengambil hanya produk berkategori Elektronik
const produkElektronik = daftarProduk.filter(
  (item) => item.kategori === 'Elektronik',
);
console.log(
  'Produk Elektronik:',
  produkElektronik.map((p) => p.nama),
);

// b. map: Mentransformasikan array produk menjadi label harga siap cetak
const labelHarga = daftarProduk.map(
  (item) => `${item.nama}: Rp ${item.harga.toLocaleString('id-ID')}`,
);
console.log('Daftar Label Harga:', labelHarga);

// c. reduce: Mengakumulasi total nominal inventaris toko
const totalInventaris = daftarProduk.reduce(
  (akumulator, item) => akumulator + item.harga,
  0,
);
console.log(`Total Inventaris: Rp ${totalInventaris.toLocaleString('id-ID')}`);

console.log('\n=== 3. ADVANCED REDUCE: GROUPING DATA KE OBJEK ===');
// Mengelompokkan item berdasarkan kategori menggunakan reduce
const dikelompokkan = daftarProduk.reduce((grup, produk) => {
  const kat = produk.kategori;
  if (!grup[kat]) grup[kat] = [];
  grup[kat].push(produk.nama);
  return grup;
}, {});
console.log('Grouping berdasarkan kategori:', dikelompokkan);

console.log('\n=== 4. METHOD CHAINING FUNGSIONAL (PIPELINE) ===');
// Pipeline data: Ambil Elektronik -> Ambil harganya -> Diskon 10% -> Hitung total belanja
const totalElektronikDiskon = daftarProduk
  .filter((item) => item.kategori === 'Elektronik')
  .map((item) => item.harga * 0.9)
  .reduce((acc, curr) => acc + curr, 0);

console.log(
  `Total Belanja Elektronik (Diskon 10%): Rp ${totalElektronikDiskon.toLocaleString('id-ID')}`,
);
