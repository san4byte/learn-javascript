// Penjelasan lengkap dapat dibaca pada README.md
// Penggunaan setTimeout dan setInterval

const tes = setTimeout(() => {
  console.log("Timeout selesai setelah 3 detik");
}, 3000);

let counter = 0;
let tesInterval = setInterval(() => {
  counter++;
  console.log("Interval ke-", counter);
  if (counter >= 3) {
    clearInterval(tesInterval);
    console.log("Interval dihentikan");
  }
}, 500);
