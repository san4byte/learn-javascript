// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Rest Parameter Dasar (Array Asli) ---");
function jumlahkanAngka(...angkaList) {
  // angkaList adalah Array sungguhan, bisa langsung pakai reduce!
  return angkaList.reduce((total, n) => total + n, 0);
}

console.log("Hasil penjumlahan:", jumlahkanAngka(10, 20, 30, 40));

console.log("\n--- 2. Menggabungkan Parameter Tetap dengan Rest Parameter ---");
function catatLogAplikasi(level, modul, ...pesanDetail) {
  const gabunganPesan = pesanDetail.join(" | ");
  console.log(`[${level.toUpperCase()}] [${modul}] -> ${gabunganPesan}`);
}

catatLogAplikasi("info", "AuthService", "Pengguna berhasil login", "ID: 42", "IP: 192.168.1.1");
catatLogAplikasi("error", "Database", "Koneksi terputus ke server PostgreSQL");
