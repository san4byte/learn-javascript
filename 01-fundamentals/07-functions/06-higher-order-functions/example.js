// Penjelasan lengkap materi ini dapat dilihat di README.md

const daftarProduk = [
  { id: 1, nama: 'Laptop Gaming', harga: 15000000, kategori: 'Elektronik' },
  { id: 2, nama: 'Buku Clean Code', harga: 250000, kategori: 'Buku' },
  { id: 3, nama: 'Mouse Wireless', harga: 300000, kategori: 'Elektronik' },
  { id: 4, nama: 'Kemeja Formal', harga: 450000, kategori: 'Pakaian' },
];

console.log('--- 1. filter() : Ambil Hanya Barang Elektronik ---');
const produkElektronik = daftarProduk.filter(
  (item) => item.kategori === 'Elektronik'
);
console.log(produkElektronik.map((item) => item.nama));

console.log('\n--- 2. map() : Ubah Daftar Menjadi Label Format Rupiah ---');
const labelHarga = daftarProduk.map(
  (item) => `${item.nama}: Rp ${item.harga.toLocaleString('id-ID')}`
);
console.log(labelHarga);

console.log('\n--- 3. reduce() : Hitung Total Nilai Seluruh Inventaris ---');
const totalNilaiInventaris = daftarProduk.reduce((akumulator, item) => {
  return akumulator + item.harga;
}, 0); // 0 adalah nilai awal akumulator
console.log(
  `Total Inventaris: Rp ${totalNilaiInventaris.toLocaleString('id-ID')}`
);

console.log('\n--- 4. Method Chaining (Gabungan Fungsional) ---');
// Skenario: Hitung total biaya HANYA untuk kategori Elektronik
const totalBiayaElektronik = daftarProduk
  .filter((item) => item.kategori === 'Elektronik')
  .map((item) => item.harga)
  .reduce((acc, harga) => acc + harga, 0);

console.log(
  `Total Belanja Elektronik: Rp ${totalBiayaElektronik.toLocaleString('id-ID')}`
);
