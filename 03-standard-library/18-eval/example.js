/**
 * ==============================================================================
 * MATERI 18: EVAL (EKSEKUSI DINAMIS, RISIKO KEAMANAN, & ALTERNATIF AMAN)
 * ==============================================================================
 *
 * File ini mendemonstrasikan secara komprehensif:
 * 1. Cara Kerja Dasar eval() (Kalkulasi ekspresi dinamis)
 * 2. Pencemaran Scope: Sloppy Mode vs Strict Mode
 * 3. Direct eval vs Indirect eval (Perbedaan Akses Scope Lokal vs Global)
 * 4. Simulasi Serangan Nyata: Code Injection & Pencurian Data
 * 5. Alternatif Aman 1: Deserialisasi Data via JSON.parse()
 * 6. Alternatif Aman 2: Kamus Operasi (Lookup Table / Strategy Pattern)
 * 7. Alternatif Aman 3: new Function() untuk Eksekusi Terisolasi
 *
 * Eksekusi: node 03-standard-library/18-eval/example.js
 * ==============================================================================
 */

// ==============================================================================
// 1. CARA KERJA DASAR eval()
// ==============================================================================
console.log('--- 1. CARA KERJA DASAR eval() ---');

const a = 10;
const b = 25;

// eval() mengevaluasi string seolah-olah kode JS asli yang diketik langsung
const hasilEkspresi = eval('a + b * 2');
console.log("Evaluasi string 'a + b * 2' :", hasilEkspresi);

// eval() juga mengembalikan nilai dari statement terakhir:
const hasilBlok = eval(`
  let temp = 100;
  temp = temp / 2;
  temp + 10;
`);
console.log('Hasil blok multiline       :', hasilBlok);

// ==============================================================================
// 2. PENCEMARAN SCOPE: SLOPPY MODE VS STRICT MODE
// ==============================================================================
console.log('\n--- 2. PENCEMARAN SCOPE: SLOPPY VS STRICT MODE ---');

// A. Di Sloppy Mode (Non-strict):
// eval() dapat mendeklarasikan variabel baru langsung ke dalam scope fungsi pemanggilnya!
function ujiSloppyScope() {
  eval('var variabelSiluman = "Saya menyusup ke scope lokal!";');
  console.log('Sloppy mode variabelSiluman:', variabelSiluman);
}
ujiSloppyScope();

// B. Di Strict Mode:
// eval() membuat lingkup leksikalnya sendiri, sehingga variabel baru tidak bocor keluar.
function ujiStrictScope() {
  'use strict';
  eval('var variabelTerisolasi = "Hanya ada di dalam eval";');
  try {
    // Akan melempar ReferenceError karena variabelTerisolasi tidak bocor keluar
    console.log(variabelTerisolasi);
  } catch (err) {
    console.log('Strict mode berhasil mencegah kebocoran scope:', err.name);
  }
}
ujiStrictScope();

// ==============================================================================
// 3. DIRECT EVAL VS INDIRECT EVAL
// ==============================================================================
console.log('\n--- 3. DIRECT EVAL VS INDIRECT EVAL ---');

globalThis.skupGlobal = 'SCOPE_GLOBAL';

function demonstrasiDirectVsIndirect() {
  const skupLokal = 'SCOPE_LOKAL';

  // Direct eval: Dipanggil langsung sebagai eval(...)
  // Memiliki akses penuh terhadap variabel leksikal LOKAL
  const hasilDirect = eval('skupLokal');

  // Indirect eval: Dipanggil melalui referensi atau operator koma (0, eval)(...)
  // HANYA memiliki akses ke lingkup GLOBAL (tidak dapat membaca variabel lokal)
  const indirectEval = eval;
  const hasilIndirect = indirectEval('globalThis.skupGlobal');
  const hasilComma = (0, eval)('globalThis.skupGlobal');

  console.log('Direct eval   (baca scope lokal)  :', hasilDirect);
  console.log('Indirect eval (baca scope global) :', hasilIndirect);
  console.log('(0, eval)()   (baca scope global) :', hasilComma);

  // Buktikan bahwa indirect eval GAGAL mengakses variabel lokal:
  try {
    indirectEval('skupLokal');
  } catch (err) {
    console.log('Indirect eval tolak baca lokal    :', err.name);
  }
}

demonstrasiDirectVsIndirect();

// ==============================================================================
// 4. SIMULASI SERANGAN NYATA: CODE INJECTION
// ==============================================================================
console.log('\n--- 4. SIMULASI RISIKO KEAMANAN: CODE INJECTION ---');

// Bayangkan ada form input di mana pengguna diminta memasukkan rumus matematika:
// Misalnya aplikasi mengharapkan: "10 * 5"
// Namun hacker memasukkan script berbahaya:
const inputDariPenggunaJahat =
  "10 * 5; globalThis.DATA_SENSITIF_TERCURAS = 'Token Rahasia'; console.warn('[ALERT]: Data berhasil disusupi!')";

// Objek data internal aplikasi
globalThis.DATA_SENSITIF_TERCURAS = 'Aman';

console.log('Status sebelum eval :', globalThis.DATA_SENSITIF_TERCURAS);
console.log('Mengevaluasi input pengguna...');
eval(inputDariPenggunaJahat);
console.log('Status sesudah eval :', globalThis.DATA_SENSITIF_TERCURAS);

// ==============================================================================
// 5. ALTERNATIF AMAN 1: DESERIALISASI DATA VIA JSON.parse()
// ==============================================================================
console.log('\n--- 5. ALTERNATIF AMAN 1: JSON.parse() ---');

// JANGAN PERNAH gunakan eval('(' + payload + ')') untuk membaca data!
// Gunakan selalu JSON.parse():
const rawJson = '{"userId": 101, "role": "admin"}';
const parsedData = JSON.parse(rawJson);
console.log('Parsed JSON aman :', parsedData);

// Jika hacker mencoba menyusupkan kode ke JSON.parse, ia akan melempar SyntaxError murni:
const jsonPenyusup = '{"userId": 101, "inject": console.log("Hacked!")}';
try {
  JSON.parse(jsonPenyusup);
} catch (err) {
  console.log('JSON.parse sukses menggagalkan injeksi:', err.name);
}

// ==============================================================================
// 6. ALTERNATIF AMAN 2: KAMUS OPERASI (LOOKUP TABLE / STRATEGY PATTERN)
// ==============================================================================
console.log('\n--- 6. ALTERNATIF AMAN 2: KAMUS OPERASI (LOOKUP TABLE) ---');

// Alih-alih mengevaluasi string formula "a + b" via eval(),
// Petakan operator ke dalam kamus fungsi aman:
const operasiKalkulator = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => (y !== 0 ? x / y : 'Error: Pembagian dengan Nol'),
  '**': (x, y) => x ** y,
};

function hitungAman(x, y, simbolOperator) {
  const strategi = operasiKalkulator[simbolOperator];
  if (!strategi) {
    throw new Error(
      `Operator '${simbolOperator}' tidak sah dan ditolak demi keamanan!`,
    );
  }
  return strategi(x, y);
}

console.log('5 + 3  =', hitungAman(5, 3, '+'));
console.log('10 * 4 =', hitungAman(10, 4, '*'));
console.log('2 ** 8 =', hitungAman(2, 8, '**'));

try {
  hitungAman(10, 20, 'console.log');
} catch (err) {
  console.log('Upaya injeksi ditolak:', err.message);
}

// ==============================================================================
// 7. ALTERNATIF AMAN 3: new Function() UNTUK KODE DINAMIS
// ==============================================================================
console.log('\n--- 7. ALTERNATIF AMAN 3: new Function() ---');

// Jika Anda benar-benar membutuhkan kompilasi fungsi dinamis (misal templating engine):
// new Function() SELALU berjalan di lingkup global, sehingga TIDAK DAPAT membaca closure lokal.
function ujiNewFunction() {
  const rahasiaLokal = 'super-secret-token';

  // eval() bisa membaca rahasiaLokal:
  console.log('eval() membaca lokal        :', eval('rahasiaLokal'));

  // new Function() TIDAK BISA membaca rahasiaLokal:
  const fungsiDinamis = new Function('x', 'y', 'return x + y;');
  console.log('new Function() tambah       :', fungsiDinamis(15, 35));

  try {
    const pembaca = new Function('return rahasiaLokal;');
    pembaca();
  } catch (err) {
    console.log('new Function gagal baca lokal :', err.name); // ReferenceError
  }
}

ujiNewFunction();
