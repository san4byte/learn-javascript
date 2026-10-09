// =============================================================================
// MODUL 01 - FUNDAMENTALS: 04.1 - WHILE & DO-WHILE LOOPS
// =============================================================================

console.log('=== 1. PERULANGAN WHILE STANDAR DENGAN COUNTER ===');
let noAngkot = 1;
const totalAngkot = 5;

while (noAngkot <= totalAngkot) {
  console.log(`Angkot No. ${noAngkot} beroperasi dengan baik.`);
  noAngkot++; // Pembaruan kondisi (increment) untuk mencegah infinite loop
}

console.log('\n=== 2. HITUNG MUNDUR (DECREMENT WHILE) ===');
let hitungMundur = 3;
while (hitungMundur > 0) {
  console.log(`Peluncuran dalam: ${hitungMundur}...`);
  hitungMundur--;
}
console.log('Roket meluncur! 🚀');

console.log('\n=== 3. PERULANGAN DO-WHILE (MINIMAL 1X EKSEKUSI) ===');
let counterUji = 10;
// Meskipun kondisi (counterUji < 5) bernilai false sejak awal,
// badan do...while dijamin dieksekusi minimal 1 kali:
do {
  console.log(
    `Nilai dalam do-while: ${counterUji} (dieksekusi sebelum evaluasi kondisi)`,
  );
  counterUji++;
} while (counterUji < 5);

console.log('\n=== 4. KONTROL PERULANGAN: BREAK & CONTINUE ===');
let angka = 0;
while (angka < 10) {
  angka++;

  // Lewati angka genap (continue)
  if (angka % 2 === 0) {
    continue;
  }

  // Berhenti ketika mencapai angka 7 (break)
  if (angka > 7) {
    console.log(`Loop dihentikan secara paksa oleh break pada angka ${angka}`);
    break;
  }

  console.log(`Angka ganjil diproses: ${angka}`);
}

console.log('\n=== 5. STUDI KASUS: PEMROSESAN ANTREAN (QUEUE DRAIN) ===');
const antreanPesanan = ['Pesanan #001', 'Pesanan #002', 'Pesanan #003'];

while (antreanPesanan.length > 0) {
  const pesananSaatIni = antreanPesanan.shift(); // Ambil elemen terdepan
  console.log(
    `Memproses: ${pesananSaatIni}. Sisa antrean: ${antreanPesanan.length}`,
  );
}
console.log('Semua antrean pesanan selesai diproses!');
