// =============================================================================
// MODUL 01 - FUNDAMENTALS: 02 - VARIABLES & SCOPE
// =============================================================================

console.log('=== 1. HOISTING VAR VS TDZ (TEMPORAL DEAD ZONE) LET & CONST ===');
// var di-hoist dan langsung diinisialisasi dengan undefined
console.log('Nilai variabelA (var) sebelum deklarasi:', variabelA); // undefined
var variabelA = 'Saya dideklarasikan dengan var';
console.log('Nilai variabelA (var) setelah deklarasi :', variabelA);

// let dan const di-hoist tetapi TIDAK diinisialisasi (berada dalam TDZ)
try {
  // Mengakses variabel dalam TDZ akan melempar ReferenceError
  eval("console.log(tdzVar); let tdzVar = 'TDZ'");
} catch (err) {
  console.log('TDZ ReferenceError berhasil ditangkap:', err.message);
}

let variabelB = 'Saya aman dideklarasikan dengan let';
console.log('Nilai variabelB (let):', variabelB);

console.log('\n=== 2. BLOCK SCOPE (LET & CONST) VS FUNCTION SCOPE (VAR) ===');
if (true) {
  var bocorKeluar = 'var bocor ke luar blok if!';
  let amanDiDalam = 'let terkunci di dalam blok';
  const jugaAman = 'const juga terkunci di dalam blok';
}

console.log('Akses di luar blok:', bocorKeluar); // Berhasil
try {
  eval('console.log(amanDiDalam)');
} catch (err) {
  console.log('Blok let tidak dapat diakses di luar:', err.message);
}

function contohFunctionScope() {
  var hanyaDiFungsi = 'var hanya terkunci oleh fungsi';
  return hanyaDiFungsi;
}
contohFunctionScope();
try {
  eval('console.log(hanyaDiFungsi)');
} catch (err) {
  console.log('var tidak bocor keluar dari fungsi:', err.message);
}

console.log('\n=== 3. MUTABILITAS CONST PADA OBJEK & ARRAY ===');
// const mengunci referensi memori (binding), bukan isi struktur datanya
const dataSiswa = {
  nama: 'Joko Santoso',
  angkatan: 2024,
};

dataSiswa.angkatan = 2025; // Diperbolehkan
dataSiswa.jurusan = 'Teknik Informatika'; // Diperbolehkan
console.log('Objek setelah dimutasi:', dataSiswa);

const daftarNilai = [80, 90];
daftarNilai.push(95); // Diperbolehkan
console.log('Array setelah dimutasi :', daftarNilai);

// Untuk membuat objek benar-benar immutable:
const konfigurasiBeku = Object.freeze({
  mode: 'production',
  port: 8080,
});
try {
  // Di strict mode ini akan melempar TypeError, di non-strict diabaikan secara diam-diam
  konfigurasiBeku.port = 9000;
} catch (err) {
  console.log('Gagal mengubah properti beku:', err.message);
}
console.log('Konfigurasi setelah Object.freeze:', konfigurasiBeku);

console.log('\n=== 4. SCOPE LOOPING: VAR VS LET DALAM ASINKRON / CLOSURE ===');
// Demonstrasi perbedaan var vs let pada counter loop
const varResults = [];
for (var i = 0; i < 3; i++) {
  varResults.push(() => i);
}
console.log(
  'Hasil closures dengan var (semua mereferensikan i yang sama):',
  varResults.map((fn) => fn()),
); // [3, 3, 3]

const letResults = [];
for (let j = 0; j < 3; j++) {
  letResults.push(() => j);
}
console.log(
  'Hasil closures dengan let (setiap iterasi memiliki binding baru):',
  letResults.map((fn) => fn()),
); // [0, 1, 2]
