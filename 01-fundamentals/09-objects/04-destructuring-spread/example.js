// =============================================================================
// MODUL 01 - FUNDAMENTALS: 09.4 - DESTRUCTURING OBJECT & SPREAD OPERATOR
// =============================================================================

console.log('=== 1. DESTRUCTURING DASAR, ALIASING & DEFAULT VALUE ===');
const responsServer = {
  id: 88,
  username: 'jokosantoso',
  statusAkun: 'Aktif',
  // fotoProfil sengaja diabaikan untuk menguji default fallback
};

// Ekstraksi dengan ganti nama variabel (aliasing) dan nilai default
const {
  username: namaUser,
  statusAkun,
  fotoProfil = 'default-avatar.png',
} = responsServer;

console.log('Nama User (Aliased):', namaUser);
console.log('Status Akun        :', statusAkun);
console.log('Foto Profil Default:', fotoProfil);

console.log('\n=== 2. NESTED DESTRUCTURING & REST PROPERTY ===');
const profilPengguna = {
  nik: '31710001',
  kontak: {
    email: 'joko@dev.id',
    kota: 'Jakarta',
  },
  role: 'Developer',
  skor: 95,
};

// Ekstrak properti bersarang dan kumpulkan sisa properti ke objek baru
const {
  nik,
  kontak: { email, kota },
  ...sisaData
} = profilPengguna;

console.log(`NIK: ${nik} | Email: ${email} | Kota: ${kota}`);
console.log('Sisa data properti (Rest Pattern):', sisaData);

console.log('\n=== 3. DESTRUCTURING PARAMETER FUNGSI ===');
function kirimNotifikasi({ nama, tipe = 'INFO', pesan }) {
  console.log(`[${tipe}] Notifikasi untuk ${nama}: ${pesan}`);
}

kirimNotifikasi({
  nama: 'Budi Santoso',
  pesan: 'Sistem berhasil diperbarui ke versi terbaru.',
});

console.log(
  '\n=== 4. OBJECT SPREAD OPERATOR (KLONING & IMMUTABLE OVERRIDE) ===',
);
const konfigurasiDasar = {
  tema: 'light',
  notifikasi: true,
  bahasa: 'id',
};

// Gabungkan dan timpa properti tanpa merusak konfigurasi dasar
const konfigurasiUser = {
  ...konfigurasiDasar,
  tema: 'dark', // Menimpa (override) properti tema
  fontSize: '16px', // Menambah properti baru
};

console.log('Konfigurasi Asli (Utuh)  :', konfigurasiDasar);
console.log('Konfigurasi Baru (Immut) :', konfigurasiUser);
