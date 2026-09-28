// Penjelasan lengkap dapat dibaca pada README.md
// Pengkondisian if else untuk status angkot
let jmlAngkot = 10;
let angkotBeroprasi = 6;

for (let noAngkot = 1; noAngkot <= jmlAngkot; noAngkot++) {
  if (noAngkot <= angkotBeroprasi) {
    console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
  } else {
    console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
  }
}
