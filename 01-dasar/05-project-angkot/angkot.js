// ! test-1
// ? while
// var jmlAngkot = 10;
// var noAngkot = 1;

// while (noAngkot <= jmlAngkot) {
//   console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
//   noAngkot++;
// }

// ! test-2
// ? for
// var jmlAngkot = 10;
// var angkotBeroprasi = 6;
// var noAngkot = 1;

// while (noAngkot <= angkotBeroprasi) {
//   console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
//   noAngkot++;
// }
// for (noAngkot = angkotBeroprasi + 1; noAngkot <= jmlAngkot; noAngkot++) {
//   console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
// }

// ! test-3
// ? for + if else
// var jmlAngkot = 10;
// var angkotBeroprasi = 6;
// var noAngkot = 1;

// for (var noAngkot = 1; noAngkot <= jmlAngkot; noAngkot++) {
//   if (noAngkot <= angkotBeroprasi) {
//     console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
//   } else {
//     console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
//   }
// }

// ! test-4.1
// ? + else if
// var jmlAngkot = 10;
// var angkotBeroprasi = 6;
// var noAngkot = 1;

// for (var noAngkot = 1; noAngkot <= jmlAngkot; noAngkot++) {
//   if (noAngkot <= angkotBeroprasi) {
//     console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
//   } else if (noAngkot === 8) {
//     console.log("Angkot No. " + noAngkot + " sedang lembur.");
//   } else {
//     console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
//   }
// }

// ! test-4.2
var jmlAngkot = 10;
var angkotBeroprasi = 6;
var noAngkot = 1;

for (var noAngkot = 1; noAngkot <= jmlAngkot; noAngkot++) {
  if (noAngkot <= angkotBeroprasi && noAngkot !== 5) {
    console.log("Angkot No. " + noAngkot + " beroprasi dengan baik.");
  } else if (noAngkot === 8 || noAngkot === 10 || noAngkot === 5) {
    console.log("Angkot No. " + noAngkot + " sedang lembur.");
  } else {
    console.log("Angkot No. " + noAngkot + " sedang tidak beroprasi");
  }
}
