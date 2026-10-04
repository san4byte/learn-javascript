// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Paginasi Halaman dengan Math.ceil() ---");
const totalProduk = 53;
const produkPerHalaman = 10;

// Pembulatan ke atas menjamin item sisa tetap memperoleh lembar halaman tersendiri
const totalHalaman = Math.ceil(totalProduk / produkPerHalaman);
console.log(`Total Halaman (${totalProduk} produk, ${produkPerHalaman}/hal) :`, totalHalaman);

console.log("\n--- 2. Pencarian Nilai Ekstrem (Math.min & Math.max) ---");
const daftarHarga = [150000, 45000, 750000, 20000, 120000];

// Menggunakan spread operator (...) untuk memecah elemen array menjadi argumen
const hargaTermurah = Math.min(...daftarHarga);
const hargaTermahal = Math.max(...daftarHarga);

console.log("Daftar Harga Katalog :", daftarHarga);
console.log("Harga Termurah       : Rp", hargaTermurah.toLocaleString("id-ID"));
console.log("Harga Termahal       : Rp", hargaTermahal.toLocaleString("id-ID"));

console.log("\n--- 3. Generator Angka Acak dalam Rentang (Math.random) ---");
// Rumus angka acak bulat antara min dan max: Math.floor(Math.random() * (max - min + 1)) + min
const diskon = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
console.log(`Voucher Diskon Acak (10% - 50%) : ${diskon}%`);
