// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Destructuring Object, Aliasing & Default Value ---");
const responsServer = {
  id: 88,
  username: "jokosantoso",
  statusAkun: "Aktif"
  // fotoProfil sengaja tidak ada
};

// Ekstrak dengan ganti nama (aliasing) dan beri nilai default
const {
  username: namaUser,
  statusAkun,
  fotoProfil = "default-avatar.png"
} = responsServer;

console.log("Nama Variabel Baru :", namaUser);
console.log("Status             :", statusAkun);
console.log("Foto (Fallback)    :", fotoProfil);

console.log("\n--- 2. Destructuring Parameter Fungsi (Sangat Populer di React) ---");
function kirimEmailSelamatDatang({ namaUser, email = "support@company.com" }) {
  console.log(`Mengirim email selamat datang ke ${namaUser} (${email})...`);
}

kirimEmailSelamatDatang({ namaUser: "Budi Santoso", email: "budi@gmail.com" });

console.log("\n--- 3. Object Spread Operator (Kloning & Menimpa Properti) ---");
const pengaturanDefault = {
  tema: "light",
  notifikasi: true,
  bahasa: "id"
};

// Salin pengaturan default dan timpa tema menjadi dark (immutability)
const pengaturanKustom = {
  ...pengaturanDefault,
  tema: "dark" // Menimpa properti tema
};

console.log("Pengaturan Asli   :", pengaturanDefault);
console.log("Pengaturan Kustom :", pengaturanKustom);
