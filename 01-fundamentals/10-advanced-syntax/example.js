// =============================================================================
// MODUL 01 - FUNDAMENTALS: 10 - SINTAKS MODERN ES2020 - ES2023 & STRICT MODE
// =============================================================================

// --- 1. OPTIONAL CHAINING (?.) PADA PROPERTI, ARRAY & METHOD ---
console.log('=== 1. OPTIONAL CHAINING (?.) ===');
const responseAPI = {
  status: 200,
  data: {
    user: {
      id: 42,
      profile: {
        name: 'Joko Santoso',
      },
    },
    items: ['Buku JS', 'Laptop'],
  },
};

// Akses aman properti bersarang tanpa TypeError
const userCity = responseAPI?.data?.user?.profile?.address?.city;
console.log('Kota pengguna (properti bersarang) :', userCity); // undefined (tidak crash!)

// Panggilan method opsional
const hitungBonus = responseAPI?.data?.user?.calculateBonus?.();
console.log('Panggilan method opsional         :', hitungBonus); // undefined

// Index array opsional
const itemPertama = responseAPI?.data?.items?.[0];
console.log('Elemen array opsional             :', itemPertama); // 'Buku JS'

// --- 2. NULLISH COALESCING (??) VS LOGICAL OR (||) ---
console.log('\n=== 2. NULLISH COALESCING (??) VS LOGICAL OR (||) ===');
const setelanAkun = {
  volume: 0, // User menyetel volume 0 (senyap)
  namaTampilan: '', // User sengaja mengosongkan teks
  delayDetik: null, // Nilai belum disetel
};

// || menganggap 0 dan "" sebagai falsy
console.log('Volume via || (0 keliru ditimpa)  :', setelanAkun.volume || 50); // 50
console.log('Volume via ?? (0 dipertahankan)   :', setelanAkun.volume ?? 50); // 0

console.log(
  'Nama via ||   ("" keliru ditimpa) :',
  setelanAkun.namaTampilan || 'Anonim',
); // "Anonim"
console.log(
  'Nama via ??   ("" dipertahankan)  :',
  setelanAkun.namaTampilan ?? 'Anonim',
); // ""

console.log(
  'Delay via ??  (null diganti default):',
  setelanAkun.delayDetik ?? 5,
); // 5

// --- 3. LOGICAL ASSIGNMENT OPERATORS (??=, ||=, &&=) ---
console.log('\n=== 3. LOGICAL ASSIGNMENT OPERATORS ===');
const config = { host: 'localhost', port: null, debug: true };
config.port ??= 8080; // Diisi hanya jika null/undefined
config.timeout ??= 3000;
config.host ||= '127.0.0.1'; // Diisi jika falsy

console.log('Config setelah penugasan logika:', config);

// --- 4. DEEP CLONE MODERN DENGAN STRUCTUREDCLONE() ---
console.log('\n=== 4. DEEP CLONE VIA STRUCTUREDCLONE() ===');
const dataMaster = {
  id: 'PRD-100',
  tags: new Set(['elektronik', 'audio']),
  detail: { harga: 750000, beratGram: 300 },
};

// Deep copy: salinan mandiri sempurna tanpa saling memutasi
const klonData = structuredClone(dataMaster);
klonData.detail.harga = 900000;

console.log('Harga data master asli :', dataMaster.detail.harga); // 750000 (aman!)
console.log('Harga data klon        :', klonData.detail.harga); // 900000

// --- 5. IMMUTABLE ARRAY METHODS (ES2023) ---
console.log('\n=== 5. IMMUTABLE ARRAY METHODS (ES2023) ===');
const daftarSkor = [85, 92, 78, 95, 60];

const skorUrut = daftarSkor.toSorted((a, b) => a - b);
const skorBalik = daftarSkor.toReversed();
const skorGanti = daftarSkor.with(0, 100); // Ganti indeks 0 dengan 100 secara immutable
const skorSpliced = daftarSkor.toSpliced(1, 2); // Hapus 2 elemen mulai indeks 1 secara immutable

console.log('Array Asli         :', daftarSkor);
console.log('Hasil toSorted     :', skorUrut);
console.log('Hasil toReversed   :', skorBalik);
console.log('Hasil with(0, 100) :', skorGanti);
console.log('Hasil toSpliced    :', skorSpliced);

// --- 6. STRICT MODE ENFORCEMENT ---
console.log('\n=== 6. STRICT MODE ENFORCEMENT ===');
function ujiStrictMode() {
  'use strict';
  try {
    // Variabel tanpa deklarasi (let/const/var) akan melempar ReferenceError
    // eval digunakan untuk menguji penugasan variabel tanpa deklarasi di runtime
    eval('variabelIlegal = 123;');
  } catch (err) {
    console.log('Strict Mode menangkap error penugasan:', err.message);
  }
}
ujiStrictMode();
