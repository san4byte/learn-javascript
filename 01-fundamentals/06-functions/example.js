// =============================================================================
// MODUL 01 - FUNDAMENTALS: 06 - FUNGSI (FUNCTIONS)
// =============================================================================

// --- 1. FUNCTION DECLARATION VS FUNCTION EXPRESSION ---
console.log('=== 1. DEKLARASI & EKSPRESI FUNGSI ===');
// Function Declaration (Mengalami hoisting penuh)
function sapaPengguna(nama) {
  return `Halo, ${nama}! Selamat datang.`;
}
console.log(sapaPengguna('Joko'));

// Function Expression (Tidak mengalami hoisting nilai variabel)
const hitungLuasPersegi = function (sisi) {
  return sisi * sisi;
};
console.log('Luas Persegi (sisi 5):', hitungLuasPersegi(5));

// --- 2. PARAMETER, ARGUMENT, & DEFAULT PARAMETERS ---
console.log('\n=== 2. PARAMETER, ARGUMEN & DEFAULT PARAMETERS ===');
function buatPesananKopi(
  jenisKopi = 'Americano',
  ukuran = 'Regular',
  gula = false,
) {
  return `Kopi: ${jenisKopi} | Ukuran: ${ukuran} | Gula: ${gula ? 'Ya' : 'Tidak'}`;
}
console.log('Pesanan default :', buatPesananKopi());
console.log('Pesanan kustom  :', buatPesananKopi('Latte', 'Large', true));

// --- 3. VARIABLE SCOPE & SCOPE CHAIN ---
console.log('\n=== 3. VARIABLE SCOPE & SCOPE CHAIN ===');
const levelGlobal = 'GLOBAL SCOPE';

function levelLuar() {
  const levelParent = 'PARENT FUNCTION SCOPE';

  function levelDalam() {
    const levelLokal = 'INNER LOCAL SCOPE';
    console.log(
      `Akses dari dalam: [${levelLokal}], [${levelParent}], [${levelGlobal}]`,
    );
  }
  levelDalam();
}
levelLuar();

// --- 4. CLOSURES & DATA ENKAPSULASI (PRIVATE STATE) ---
console.log('\n=== 4. CLOSURES & DATA ENKAPSULASI ===');
function buatDompet(saldoAwal = 0) {
  let saldo = saldoAwal; // Variabel privat di dalam lexical environment

  return {
    setor(nominal) {
      saldo += nominal;
      return `Setor Rp ${nominal.toLocaleString('id-ID')} -> Saldo: Rp ${saldo.toLocaleString('id-ID')}`;
    },
    cekSaldo() {
      return `Saldo saat ini: Rp ${saldo.toLocaleString('id-ID')}`;
    },
  };
}

const dompetSaya = buatDompet(50000);
console.log(dompetSaya.setor(25000));
console.log(dompetSaya.cekSaldo());

// --- 5. ARROW FUNCTIONS & IMPLICIT RETURN ---
console.log('\n=== 5. ARROW FUNCTIONS ===');
const kuadrat = (x) => x * x;
const tambah = (a, b) => a + b;
const buatUser = (id, username) => ({ id, username, aktif: true }); // Object literal return

console.log('Kuadrat 6:', kuadrat(6));
console.log('Tambah 10 + 25:', tambah(10, 25));
console.log('Buat User:', buatUser(1, 'jokosantoso'));

// --- 6. HIGHER-ORDER FUNCTIONS (FILTER, MAP, REDUCE) ---
console.log('\n=== 6. HIGHER-ORDER FUNCTIONS (HOF) ===');
const produkList = [
  { nama: 'Buku JS', harga: 120000, kategori: 'Buku' },
  { nama: 'Mouse Wireless', harga: 250000, kategori: 'Elektronik' },
  { nama: 'Keyboard Mekanikal', harga: 600000, kategori: 'Elektronik' },
];

// Chaining: Filter barang elektronik -> Ambil harga -> Total harga
const totalBelanjaElektronik = produkList
  .filter((item) => item.kategori === 'Elektronik')
  .map((item) => item.harga)
  .reduce((total, harga) => total + harga, 0);

console.log(
  'Total belanja produk elektronik: Rp',
  totalBelanjaElektronik.toLocaleString('id-ID'),
);

// --- 7. REST PARAMETERS (...ARGS) ---
console.log('\n=== 7. REST PARAMETERS (...ARGS) ===');
function hitungTotalSkor(namaSiswa, ...daftarNilai) {
  const total = daftarNilai.reduce((acc, curr) => acc + curr, 0);
  const rataRata = daftarNilai.length > 0 ? total / daftarNilai.length : 0;
  return `${namaSiswa} -> Total: ${total}, Rata-rata: ${rataRata.toFixed(1)}`;
}
console.log(hitungTotalSkor('Ahmad', 85, 90, 78, 92));

// --- 8. FUNGSI REKURSIF (RECURSION) ---
console.log('\n=== 8. FUNGSI REKURSIF (FAKTORIAL) ===');
function faktorial(n) {
  if (n <= 1) return 1; // Base case
  return n * faktorial(n - 1); // Recursive call
}
console.log('Faktorial 5 (5!):', faktorial(5));

// --- 9. MODULARITAS & PURE FUNCTION DECOMPOSITION ---
console.log('\n=== 9. MODULARITAS FUNGSI (VOLUME DUA KUBUS) ===');
function hitungVolumeKubus(sisi) {
  return Math.pow(sisi, 3);
}

function jumlahVolumeDuaKubus(sisiA, sisiB) {
  return hitungVolumeKubus(sisiA) + hitungVolumeKubus(sisiB);
}

console.log(
  'Jumlah Volume Dua Kubus (sisi 8 dan sisi 3):',
  jumlahVolumeDuaKubus(8, 3),
  'cm³',
);
