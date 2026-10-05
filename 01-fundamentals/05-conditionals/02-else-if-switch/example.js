// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Percabangan Rentang Nilai dengan Else If ---');
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

console.log('\n--- 2. Pencocokan Nilai Spesifik dengan Switch Case ---');
const kodePesananMakanan = 'B02';
let rincianMenu;

switch (kodePesananMakanan) {
  case 'A01':
    rincianMenu = 'Paket Nasi Goreng Spesial';
    break;
  case 'B02':
    rincianMenu = 'Paket Ayam Bakar Madu';
    break; // Hentikan evaluasi setelah cocok
  case 'C03':
    rincianMenu = 'Paket Mie Goreng Seafood';
    break;
  default:
    rincianMenu = 'Menu tidak terdaftar dalam sistem';
}

console.log(`Kode Menu: ${kodePesananMakanan} -> Pesanan: ${rincianMenu}`);
