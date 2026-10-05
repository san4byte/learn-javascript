// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Default Parameter (Mencegah Nilai Undefined) ---');
function buatPesananKopi(jenisKopi = 'Americano', ukuran = 'Regular', gula = false) {
  return `Pesanan: Kopi ${jenisKopi} | Ukuran: ${ukuran} | Tambah Gula: ${gula ? 'Ya' : 'Tidak'}`;
}

// Memanggil tanpa argumen (menggunakan default penuh)
console.log(buatPesananKopi());

// Memanggil dengan argumen spesifik
console.log(buatPesananKopi('Latte', 'Large', true));

console.log("\n--- 2. Objek 'arguments' (Argumen Dinamis Tradisional) ---");
function jumlahkanSemuaAngka() {
  let total = 0;
  // arguments adalah array-like object yang menampung semua argumen
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log('Jumlah 2 angka :', jumlahkanSemuaAngka(10, 20));
console.log('Jumlah 5 angka :', jumlahkanSemuaAngka(5, 10, 15, 20, 25));
