// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Validasi Pola dengan regex.test() ---");
// Pola: Diawali '08', diikuti 9 sampai 11 digit angka
const regexNoHp = /^08\d{9,11}$/;
const noHpBenar = "081234567890";
const noHpSalah = "08123abc45";

console.log(`Apakah '${noHpBenar}' valid? :`, regexNoHp.test(noHpBenar)); // true
console.log(`Apakah '${noHpSalah}' valid? :`, regexNoHp.test(noHpSalah)); // false

console.log("\n--- 2. Ekstraksi Data dengan str.match() ---");
const regexInvoice = /INV-\d{4}-\d+/g;
const pesan = "Pesanan nomor INV-2026-001 dan INV-2026-002 telah berhasil dibayar.";

const daftarInvoice = pesan.match(regexInvoice);
console.log("Nomor Invoice Ditemukan   :", daftarInvoice);

console.log("\n--- 3. Penyensoran Teks dengan str.replace() ---");
const komentar = "Website ini lambat dan jelek sekali, desainnya jelek.";

// Flag /gi: g (global/semua kecocokan) dan i (ignore case)
const komentarBersih = komentar.replace(/jelek/gi, "***");
console.log("Komentar Asli             :", komentar);
console.log("Komentar Disensor         :", komentarBersih);
