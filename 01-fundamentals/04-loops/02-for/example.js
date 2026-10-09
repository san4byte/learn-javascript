// =============================================================================
// MODUL 01 - FUNDAMENTALS: 04.2 - FOR LOOP
// =============================================================================

console.log('=== 1. PERULANGAN FOR STANDAR (INCREMENT) ===');
for (let i = 1; i <= 5; i++) {
  console.log(`Tiket antrean ke-${i}`);
}

console.log('\n=== 2. PERULANGAN MUNDUR (DECREMENT) & STEP KUSTOM ===');
console.log('Hitung mundur lompat 2:');
for (let i = 10; i >= 0; i -= 2) {
  process.stdout.write(`${i} `);
}
console.log('\nSelesai!');

console.log('\n=== 3. ITERASI ARRAY MENGGUNAKAN INDEKS ===');
const daftarKendaraan = ['Sedan', 'SUV', 'Truk', 'Bus', 'Motor'];
for (let idx = 0; idx < daftarKendaraan.length; idx++) {
  console.log(`Indeks ${idx}: ${daftarKendaraan[idx]}`);
}

console.log('\n=== 4. KONTROL ALUR: BREAK & CONTINUE ===');
for (let antrean = 1; antrean <= 6; antrean++) {
  if (antrean === 3) {
    console.log(
      `[CONTINUE]: Nasabah no. ${antrean} sedang izin keluar, dilewati.`,
    );
    continue;
  }

  if (antrean === 5) {
    console.log(`[BREAK]: Jam operasional loket tutup pada no. ${antrean}.`);
    break;
  }

  console.log(`Melayani nasabah nomor: ${antrean}`);
}

console.log('\n=== 5. MULTIPLE COUNTER DALAM SATU HEADER FOR ===');
// Dua penunjuk berjalan saling mendekat (Two-pointer pattern dasar)
for (let kiri = 0, kanan = 6; kiri < kanan; kiri++, kanan--) {
  console.log(`Pointer kiri: ${kiri} | Pointer kanan: ${kanan}`);
}
