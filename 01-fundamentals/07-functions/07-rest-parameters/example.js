// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.7 - REST PARAMETER (...ARGS)
// =============================================================================

console.log('=== 1. REST PARAMETER DASAR SEBAGAI ARRAY MURNI ===');
// ...angkaList mengumpulkan seluruh argumen ke dalam Array sejati
function jumlahkanAngka(...angkaList) {
  console.log(
    'Tipe data angkaList:',
    Array.isArray(angkaList) ? 'Array Asli' : 'Objek',
  );
  return angkaList.reduce((total, n) => total + n, 0);
}

console.log('Hasil jumlah 4 angka:', jumlahkanAngka(10, 20, 30, 40));

console.log('\n=== 2. KOMBINASI PARAMETER TETAP DENGAN REST PARAMETER ===');
function catatLog(level, modul, ...rincianPesan) {
  const teksGabungan = rincianPesan.join(' | ');
  console.log(`[${level.toUpperCase()}] [${modul}] -> ${teksGabungan}`);
}

catatLog(
  'info',
  'AuthService',
  'Pengguna login sukses',
  'UserID: 104',
  'IP: 192.168.1.5',
);
catatLog('error', 'Database', 'Koneksi timeout ke cluster database PostgreSQL');

console.log('\n=== 3. REST PARAMETER PADA ARROW FUNCTION ===');
// Arrow function tidak memiliki objek 'arguments', rest parameter adalah solusi wajibnya
const kalikanSemua = (faktor, ...daftarAngka) =>
  daftarAngka.map((n) => n * faktor);
console.log('Hasil pengali 3x:', kalikanSemua(3, 10, 20, 30));

console.log('\n=== 4. PERBEDAAN REST PARAMETER VS SPREAD OPERATOR ===');
// a. Rest: Mengumpulkan elemen individu menjadi array (saat deklarasi fungsi)
function kumpulkan(...items) {
  return items;
}
const arrayHasil = kumpulkan(1, 2, 3);
console.log('Rest (kumpulkan):', arrayHasil);

// b. Spread: Memecah array menjadi argumen individu (saat pemanggilan fungsi)
const angkaUntukMax = [45, 12, 89, 34];
const nilaiTertinggi = Math.max(...angkaUntukMax); // Memecah array dengan spread
console.log('Spread (pecahkan): Math.max =', nilaiTertinggi);
