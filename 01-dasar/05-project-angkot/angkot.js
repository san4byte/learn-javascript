// Penjelasan lengkap dapat dibaca pada README.md
// Project Simulasi Angkot (Tahap Final: kombinasi for, if, else-if, else)
var jmlAngkot = 10;
var angkotBeroprasi = 6;

for (var noAngkot = 1; noAngkot <= jmlAngkot; noAngkot++) {
  if (noAngkot <= angkotBeroprasi && noAngkot !== 5) {
    console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
  } else if (noAngkot === 8 || noAngkot === 10 || noAngkot === 5) {
    console.log("Angkot No. " + noAngkot + " sedang lembur.");
  } else {
    console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
  }
}
