// =============================================================================
// MODUL 01 - FUNDAMENTALS: 05.2 - ELSE IF & SWITCH CASE
// =============================================================================

console.log('=== 1. PERCABANGAN RENTANG NILAI (ELSE IF) ===');
const skorAkademik = 85;
let predikatHuruf;

if (skorAkademik >= 90) {
  predikatHuruf = 'A (Istimewa)';
} else if (skorAkademik >= 80) {
  predikatHuruf = 'B (Sangat Baik)';
} else if (skorAkademik >= 70) {
  predikatHuruf = 'C (Cukup)';
} else {
  predikatHuruf = 'D (Kurang)';
}
console.log(`Skor: ${skorAkademik} -> Predikat: ${predikatHuruf}`);

console.log('\n=== 2. PENCOCOKAN NILAI PASTI (SWITCH CASE) ===');
const kodePesananMakanan = 'B02';
let rincianMenu;

switch (kodePesananMakanan) {
  case 'A01':
    rincianMenu = 'Paket Nasi Goreng Spesial';
    break;
  case 'B02':
    rincianMenu = 'Paket Ayam Bakar Madu';
    break;
  case 'C03':
    rincianMenu = 'Paket Mie Goreng Seafood';
    break;
  default:
    rincianMenu = 'Menu tidak terdaftar dalam sistem';
}
console.log(`Kode Menu: ${kodePesananMakanan} -> Pesanan: ${rincianMenu}`);

console.log(
  '\n=== 3. SIFAT FALL-THROUGH YANG DISENGAJA (PENGELOMPOKAN CASE) ===',
);
const namaHari = 'Sabtu';
let tipeHari;

switch (namaHari) {
  case 'Senin':
  case 'Selasa':
  case 'Rabu':
  case 'Kamis':
  case 'Jumat':
    tipeHari = 'Hari Kerja (Weekday)';
    break;
  case 'Sabtu':
  case 'Minggu':
    tipeHari = 'Akhir Pekan (Weekend)';
    break;
  default:
    tipeHari = 'Nama hari tidak valid';
}
console.log(`Hari: ${namaHari} -> Kategori: ${tipeHari}`);

console.log('\n=== 4. ALTERNATIF SWITCH: OBJECT LOOKUP TABLE ===');
// Pola idiomatik JavaScript modern menggunakan kamus/lookup object
const kodeStatusHTTP = 404;
const pesanStatusMap = {
  200: 'OK - Berhasil',
  201: 'Created - Data Dibuat',
  400: 'Bad Request - Permintaan Tidak Valid',
  401: 'Unauthorized - Belum Terotentikasi',
  404: 'Not Found - Halaman Tidak Ditemukan',
  500: 'Internal Server Error - Gangguan Server',
};

const respon = pesanStatusMap[kodeStatusHTTP] || 'Status Tidak Dikenal';
console.log(`Status HTTP ${kodeStatusHTTP}: ${respon}`);
