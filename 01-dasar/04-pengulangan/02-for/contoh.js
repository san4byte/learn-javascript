// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Perulangan For Standar ---");
for (let i = 1; i <= 5; i++) {
  console.log(`Tiket antrean ke-${i}`);
}

console.log("\n--- 2. Penggunaan continue dan break ---");
for (let i = 1; i <= 6; i++) {
  if (i === 3) {
    console.log(`[LEWATI]: Antrean ${i} tidak hadir (continue)`);
    continue; // Lewati sisa kode di bawah, langsung lanjut ke i = 4
  }

  if (i === 5) {
    console.log(`[BERHENTI]: Kuota harian habis pada antrean ${i} (break)`);
    break; // Hentikan loop total
  }

  console.log(`Melayani nasabah nomor ${i}`);
}
