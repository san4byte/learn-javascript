// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Instansiasi Tanggal & Pembacaan Komponen (Getter) ---");
// 17 Agustus 2026 pukul 11:00:00 (Bulan Agustus = index 7)
const tanggalMulai = new Date(2026, 7, 17, 11);
console.log("Objek Date Mulai             :", tanggalMulai.toISOString());
console.log("Komponen Tahun (getFullYear) :", tanggalMulai.getFullYear());
console.log("Komponen Bulan (getMonth 0-11):", tanggalMulai.getMonth(), "(7 = Agustus)");
console.log("Komponen Tanggal (getDate)   :", tanggalMulai.getDate());

console.log("\n--- 2. Manipulasi Tanggal dengan Setter (Auto-Rollover) ---");
// Buat salinan tanggal agar tidak memutasi objek asli
const tanggalKadaluarsa = new Date(tanggalMulai);
// Tambahkan 30 hari (otomatis berganti ke bulan September)
tanggalKadaluarsa.setDate(tanggalKadaluarsa.getDate() + 30);

console.log("Format ISO 8601              :", tanggalKadaluarsa.toISOString());
console.log("Format Lokal Indonesia       :", tanggalKadaluarsa.toLocaleDateString("id-ID"));

console.log("\n--- 3. Kalkulasi Selisih Waktu via Epoch Milidetik ---");
const selisihMilidetik = tanggalKadaluarsa.getTime() - tanggalMulai.getTime();
const selisihHari = selisihMilidetik / (1000 * 60 * 60 * 24);

console.log("Selisih Waktu                :", selisihHari, "hari");
