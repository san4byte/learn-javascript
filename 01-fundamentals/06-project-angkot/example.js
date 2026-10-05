// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- Simulasi Status Operasional 10 Angkot ---");

const totalAngkot = 10;
const angkotBeroperasiNormal = 6;

for (let noAngkot = 1; noAngkot <= totalAngkot; noAngkot++) {
  // Angkot 8 dan 10 mendapat penugasan lembur khusus
  if (noAngkot === 8 || noAngkot === 10) {
    console.log(`Angkot No. ${noAngkot} sedang lembur.`);
  } else if (noAngkot <= angkotBeroperasiNormal) {
    console.log(`Angkot No. ${noAngkot} beroperasi dengan baik.`);
  } else {
    console.log(`Angkot No. ${noAngkot} sedang tidak beroperasi.`);
  }
}
