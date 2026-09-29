// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. setTimeout & clearTimeout ---");
const timerPesan = setTimeout(() => {
  console.log("Pesan ini tidak akan pernah muncul karena di-cancel!");
}, 2000);

// Membatalkan timer sebelum 2 detik tercapai
clearTimeout(timerPesan);
console.log("Timer berhasil dibatalkan sebelum sempat dieksekusi.");

console.log("\n--- 2. setInterval & clearInterval (Simulasi Countdown) ---");
let hitungMundur = 3;

const intervalId = setInterval(() => {
  if (hitungMundur > 0) {
    console.log(`Hitung mundur: ${hitungMundur}...`);
    hitungMundur--;
  } else {
    console.log("🚀 Roket Meluncur!");
    clearInterval(intervalId); // Wajib dihentikan agar tidak berjalan selamanya
  }
}, 300);
