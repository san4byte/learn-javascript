// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.3 - VARIABLE SCOPE & SCOPE CHAIN
// =============================================================================

console.log('=== 1. DEMONSTRASI TIGA LEVEL SCOPE & SCOPE CHAIN ===');
const levelGlobal = 'Level 1: GLOBAL SCOPE';

function levelFungsiLuar() {
  const levelLokalLuar = 'Level 2: FUNCTION SCOPE (LUAR)';

  function levelFungsiDalam() {
    const levelLokalDalam = 'Level 3: INNER SCOPE (DALAM)';

    // Pencarian Scope Chain naik ke atas (Inside-out lookup):
    console.log(levelLokalDalam);
    console.log(levelLokalLuar); // Ditemukan di parent scope
    console.log(levelGlobal); // Ditemukan di global scope
  }

  levelFungsiDalam();
}

levelFungsiLuar();

console.log('\n=== 2. VARIABLE SHADOWING (PENUTUPAN IDENTIFIER) ===');
let tarifDasar = 5000;

function hitungTarifKhusus() {
  // Variabel lokal membayangi (shadowing) variabel global dengan nama yang sama
  let tarifDasar = 12000;
  console.log(
    `Tarif khusus (Lokal Shadowing): Rp ${tarifDasar.toLocaleString('id-ID')}`,
  );
}

hitungTarifKhusus();
console.log(
  `Tarif reguler (Global Asli)    : Rp ${tarifDasar.toLocaleString('id-ID')}`,
);

console.log('\n=== 3. ISOLASI BLOCK SCOPE ({}) PADA LET & CONST ===');
if (true) {
  const tokenRahasia = 'TOKEN-RAHASIA-BLOK';
  console.log('Token di dalam blok if:', tokenRahasia);
}

try {
  eval('console.log(tokenRahasia)');
} catch (err) {
  console.log('Token tidak bocor ke luar blok if:', err.message);
}

console.log('\n=== 4. BAHAYA ACCIDENTAL GLOBAL LEAK ===');
function prosesTransaksi() {
  // Tanpa deklarasi (const/let), variabel akan bocor menjadi properti global!
  // Di sini kita tunjukkan deklarasi aman vs terisolasi
  const idTransaksi = 'TRX-998811';
  return idTransaksi;
}
prosesTransaksi();
try {
  eval('console.log(idTransaksi)');
} catch (err) {
  console.log(
    'idTransaksi terisolasi dengan aman di dalam fungsi:',
    err.message,
  );
}
