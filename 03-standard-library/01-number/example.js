// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Static Properties & Batas Presisi Number ---');
console.log('Nilai Terbesar (MAX_VALUE)         :', Number.MAX_VALUE);
console.log('Positif Terkecil Dekat 0 (MIN_VALUE):', Number.MIN_VALUE);
console.log('Max Safe Integer                   :', Number.MAX_SAFE_INTEGER);

console.log('\n--- 2. Validasi Angka: Number.isNaN & isInteger ---');
console.log("Number.isNaN('halo')               :", Number.isNaN('halo')); // false (bukan NaN)
console.log('Number.isNaN(0 / 0)                :', Number.isNaN(0 / 0)); // true (NaN)
console.log('Number.isInteger(42)               :', Number.isInteger(42)); // true
console.log('Number.isInteger(42.5)             :', Number.isInteger(42.5)); // false

console.log('\n--- 3. Studi Kasus Nyata: Fungsi formatHargaProduk() ---');
function formatHargaProduk(harga) {
  // Validasi: tipe harus number, bukan NaN, bilangan bulat, dan tidak negatif
  if (typeof harga !== 'number' || Number.isNaN(harga) || !Number.isInteger(harga) || harga < 0) {
    return 'Input harga tidak valid';
  }

  // Format ke mata uang Rupiah Indonesia tanpa desimal
  return harga.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
}

// Pengujian Kasus Uji:
console.log('Format 500000                      :', formatHargaProduk(500000)); // "Rp 500.000"
console.log('Format 0                           :', formatHargaProduk(0)); // "Rp 0"
console.log('Format pecahan (12500.5)           :', formatHargaProduk(12500.5)); // "Input harga tidak valid"
console.log("Format string ('50000')            :", formatHargaProduk('50000')); // "Input harga tidak valid"
console.log('Format negatif (-1000)             :', formatHargaProduk(-1000)); // "Input harga tidak valid"
console.log('Format NaN                         :', formatHargaProduk(NaN)); // "Input harga tidak valid"
