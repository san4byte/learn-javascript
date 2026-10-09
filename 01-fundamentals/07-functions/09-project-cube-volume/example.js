// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.9 - PROJECT HITUNG VOLUME KUBUS & MODULARITAS
// =============================================================================

console.log('=== 1. FUNGSI PEMBANTU MURNI (PURE HELPER FUNCTION) ===');
// Fungsi pembantu independen untuk menghitung volume kubus tunggal (s^3)
function hitungVolumeKubus(sisi) {
  if (typeof sisi !== 'number' || sisi <= 0) {
    throw new TypeError(
      `Sisi kubus harus berupa angka positif! Menerima: ${sisi}`,
    );
  }
  return Math.pow(sisi, 3);
}

console.log('Volume kubus sisi 8 cm:', hitungVolumeKubus(8), 'cm³');
console.log('Volume kubus sisi 3 cm:', hitungVolumeKubus(3), 'cm³');

console.log('\n=== 2. KOMPOSISI FUNGSI: JUMLAH DUA KUBUS ===');
function jumlahVolumeDuaKubus(sisiA, sisiB) {
  const volA = hitungVolumeKubus(sisiA);
  const volB = hitungVolumeKubus(sisiB);
  return volA + volB;
}

const totalDuaKubus = jumlahVolumeDuaKubus(8, 3);
console.log(`Total gabungan volume dua kubus (8³ + 3³): ${totalDuaKubus} cm³`);

console.log('\n=== 3. GENERALISASI VARIADIK DENGAN REST PARAMETER ===');
// Menghitung jumlah volume kubus dalam jumlah berapa pun secara fleksibel
function jumlahVolumeBanyakKubus(...daftarSisi) {
  return daftarSisi
    .map((sisi) => hitungVolumeKubus(sisi))
    .reduce((total, vol) => total + vol, 0);
}

const totalEmpatKubus = jumlahVolumeBanyakKubus(2, 3, 4, 5);
console.log(
  'Total volume 4 kubus (2³ + 3³ + 4³ + 5³):',
  totalEmpatKubus,
  'cm³',
);

console.log('\n=== 4. PENGEMBANGAN: FUNGSI VOLUME BALOK ===');
function hitungVolumeBalok(panjang, lebar, tinggi) {
  return panjang * lebar * tinggi;
}
console.log('Volume balok (10 x 5 x 4):', hitungVolumeBalok(10, 5, 4), 'cm³');
