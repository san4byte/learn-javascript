// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Inisialisasi & Pengisian Map (.set) ---');
const sesiUser = new Map();

// Kunci pada Map bisa bertipe Number, String, maupun Objek Referensi!
const kunciAdmin = { role: 'admin' };

sesiUser.set(101, 'Joko Santoso');
sesiUser.set('sessionId', 'SESS-XYZ-999');
sesiUser.set(kunciAdmin, 'Akses Penuh Server');

console.log('Akses Key Number (101)      :', sesiUser.get(101));
console.log('Akses Key Objek (kunciAdmin):', sesiUser.get(kunciAdmin));
console.log('Cek Keberadaan Key sessionId:', sesiUser.has('sessionId'));
console.log('Total Pasangan Data (size)  :', sesiUser.size);

console.log('\n--- 2. Iterasi Pasangan Data Map dengan for...of ---');
for (const [kunci, nilai] of sesiUser) {
  console.log('Key :', kunci, '==> Value :', nilai);
}

console.log('\n--- 3. Menghapus Data (.delete) & Cek Ukuran Baru ---');
const statusHapus = sesiUser.delete('sessionId');
console.log('Apakah sessionId terhapus?  :', statusHapus);
console.log('Ukuran Map setelah dihapus  :', sesiUser.size);
