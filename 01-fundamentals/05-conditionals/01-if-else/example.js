// =============================================================================
// MODUL 01 - FUNDAMENTALS: 05.1 - IF ELSE & TERNARY OPERATOR
// =============================================================================

console.log('=== 1. STRUKTUR IF-ELSE STANDAR & STRICT EQUALITY ===');
const usiaPengunjung = 18;
const punyaTiket = true;

if (usiaPengunjung >= 17 && punyaTiket === true) {
  console.log('Status: Diizinkan masuk menonton teater dewasa.');
} else {
  console.log(
    'Status: Akses ditolak (usia tidak cukup atau belum punya tiket).',
  );
}

console.log('\n=== 2. EVALUASI TRUTHY DAN FALSY ===');
// 8 Nilai Falsy resmi di JavaScript: false, 0, -0, 0n, "", null, undefined, NaN
const daftarFalsy = [false, 0, -0, 0n, '', null, undefined, NaN];

console.log('Pemeriksaan nilai falsy:');
for (const item of daftarFalsy) {
  if (!item) {
    console.log(`Nilai [${String(item)}] terbukti FALSY`);
  }
}

// Catatan penting: Objek kosong {} dan array kosong [] adalah TRUTHY!
const objekKosong = {};
const arrayKosong = [];
if (objekKosong && arrayKosong) {
  console.log('Objek {} dan Array [] adalah TRUTHY di JavaScript!');
}

console.log('\n=== 3. OPERATOR TERNARY SEBAGAI EKSPRESI PENETAPAN ===');
const nilaiUjian = 82;
const statusKelulusan = nilaiUjian >= 75 ? 'LULUS DENGAN BAIK' : 'REMIDIAL';
console.log(`Nilai Siswa: ${nilaiUjian} -> Status: ${statusKelulusan}`);

console.log('\n=== 4. SHORT-CIRCUIT EVALUATION (&&, ||, ?? ) ===');
// && (Guard): Menjalankan bagian kanan jika bagian kiri truthy
const user = { nama: 'Joko', aktif: true };
user.aktif && console.log(`Pengguna ${user.nama} sedang aktif.`);

// || (Default fallback - falsy check):
const inputKomentar = '';
const fallbackOR = inputKomentar || 'Tidak ada komentar (Fallback ||)';
console.log('Hasil Fallback || (karena string kosong falsy):', fallbackOR);

// ?? (Nullish coalescing - hanya null atau undefined):
const nilaiSkor = 0;
const fallbackNullish = nilaiSkor ?? 100;
console.log(
  'Hasil Fallback ?? pada angka 0 (tetap dipertahankan 0):',
  fallbackNullish,
);
