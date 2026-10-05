// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Jebakan Fatal: new Boolean(false) ---');
const statusMember = new Boolean(false);
console.log('Tipe data statusMember   :', typeof statusMember);

if (statusMember) {
  console.log('Status percabangan if    : Status dianggap aktif! (karena semua objek bernilai truthy)');
}

console.log('\n--- 2. Konversi Primitif & Shorthand Double Negation (!!) ---');
const username = 'joko_santoso';
console.log('Username asli            :', username);
console.log('Boolean(username)        :', Boolean(username));
console.log('!!username (Shorthand)   :', !!username);

console.log('\n--- 3. Sanitasi Data: Membersihkan Nilai Falsy dengan filter(Boolean) ---');
const dataInput = ['Joko', '', null, 'Admin', undefined, 0, false, 'Aktif'];
console.log('Data Mentah              :', dataInput);

// Menghapus elemen falsy ('', null, undefined, 0, false) secara fungsional
const dataBersih = dataInput.filter(Boolean);
console.log('Data Bersih (Hanya Truthy):', dataBersih);
