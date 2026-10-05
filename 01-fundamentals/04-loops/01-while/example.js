// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Perulangan While Standar ---');
let nilaiAwal = 1;

while (nilaiAwal <= 5) {
  console.log(`Angkot No. ${nilaiAwal} beroperasi dengan baik.`);
  nilaiAwal++; // Wajib: agar loop tidak berjalan selamanya (infinite loop)
}

console.log('\n--- 2. Perbedaan dengan Do-While ---');
let angkaUji = 10;

// Meskipun angkaUji sudah > 5 sejak awal, do-while tetap jalan 1 kali:
do {
  console.log(`Nilai dalam do-while: ${angkaUji} (dieksekusi minimal 1x)`);
  angkaUji++;
} while (angkaUji < 5);
