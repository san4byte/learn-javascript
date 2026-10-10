// =============================================================================
// MODUL 01 - FUNDAMENTALS: 05 - PENGKONDISIAN (CONDITIONALS)
// =============================================================================

// --- 1. IF, ELSE IF, DAN ELSE STANDAR ---
console.log('=== 1. STRUKTUR IF, ELSE IF, & ELSE ===');
const skorAkademik = 85;
let predikatHuruf;

if (skorAkademik >= 90) {
  predikatHuruf = 'A (Istimewa)';
} else if (skorAkademik >= 80) {
  predikatHuruf = 'B (Sangat Baik)';
} else if (skorAkademik >= 70) {
  predikatHuruf = 'C (Cukup)';
} else {
  predikatHuruf = 'D (Kurang)';
}
console.log(`Skor: ${skorAkademik} -> Predikat: ${predikatHuruf}`);

// --- 2. EVALUASI TRUTHY DAN FALSY ---
console.log('\n=== 2. EVALUASI TRUTHY DAN FALSY ===');
// 8 Nilai Falsy di JavaScript: false, 0, -0, 0n, "", null, undefined, NaN
const daftarFalsy = [false, 0, '', null, undefined, NaN];
for (const item of daftarFalsy) {
  if (!item) {
    console.log(`Nilai [${String(item)}] terbukti FALSY`);
  }
}

// Objek kosong {} dan array kosong [] adalah TRUTHY!
const objekKosong = {};
const arrayKosong = [];
if (objekKosong && arrayKosong) {
  console.log('Objek {} dan Array [] adalah TRUTHY di JavaScript!');
}

// --- 3. OPERATOR TERNARY SEBAGAI EKSPRESI PENETAPAN ---
console.log('\n=== 3. OPERATOR TERNARY ===');
const nilaiUjian = 82;
const statusKelulusan = nilaiUjian >= 75 ? 'LULUS DENGAN BAIK' : 'REMIDIAL';
console.log(`Nilai Siswa: ${nilaiUjian} -> Status: ${statusKelulusan}`);

// --- 4. SHORT-CIRCUIT EVALUATION (&&, ||, ?? ) ---
console.log('\n=== 4. SHORT-CIRCUIT EVALUATION ===');
const user = { nama: 'Joko', aktif: true };
user.aktif && console.log(`Pengguna ${user.nama} sedang aktif.`);

const inputKomentar = '';
const fallbackOR = inputKomentar || 'Komentar bawaan (Fallback ||)';
console.log('Hasil Fallback || (karena string kosong falsy):', fallbackOR);

const nilaiSkor = 0;
const fallbackNullish = nilaiSkor ?? 100;
console.log(
  'Hasil Fallback ?? pada angka 0 (tetap dipertahankan 0):',
  fallbackNullish,
);

// --- 5. SWITCH CASE & INTENTIONAL FALL-THROUGH ---
console.log('\n=== 5. SWITCH CASE & PENGELOMPOKAN CASE ===');
const namaHari = 'Sabtu';
let tipeHari;

switch (namaHari) {
  case 'Senin':
  case 'Selasa':
  case 'Rabu':
  case 'Kamis':
  case 'Jumat':
    tipeHari = 'Hari Kerja (Weekday)';
    break;
  case 'Sabtu':
  case 'Minggu':
    tipeHari = 'Akhir Pekan (Weekend)';
    break;
  default:
    tipeHari = 'Nama hari tidak valid';
}
console.log(`Hari: ${namaHari} -> Kategori: ${tipeHari}`);

// --- 6. ALTERNATIF MODERN: OBJECT LOOKUP TABLE ---
console.log('\n=== 6. OBJECT LOOKUP TABLE (LOOKUP KAMUS) ===');
const kodeStatusHTTP = 404;
const pesanStatusMap = {
  200: 'OK - Berhasil',
  201: 'Created - Data Dibuat',
  400: 'Bad Request - Permintaan Tidak Valid',
  401: 'Unauthorized - Belum Terotentikasi',
  404: 'Not Found - Halaman Tidak Ditemukan',
  500: 'Internal Server Error - Gangguan Server',
};

const respon = pesanStatusMap[kodeStatusHTTP] || 'Status Tidak Dikenal';
console.log(`Status HTTP ${kodeStatusHTTP}: ${respon}`);
