// 02 - Modern Syntax ES2020-ES2023 (Optional Chaining, Nullish Coalescing, Immutability)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

console.log('========================================================');
console.log('📌 DEMONSTRASI SINTAKS MODERN JAVASCRIPT ES2020 - ES2023');
console.log('========================================================\n');

// 1. Optional Chaining (?.)
console.log('--- 1. Optional Chaining (?.) ---');
const responseAPI = {
  status: 200,
  data: {
    user: {
      id: 42,
      profile: {
        name: 'Joko Santoso',
        // address sengaja tidak ada
      },
    },
  },
};

// Akses aman properti bersarang tanpa khawatir TypeError
const userCity = responseAPI?.data?.user?.profile?.address?.city;
console.log('Kota pengguna (properti bersarang) :', userCity); // undefined (tidak crash!)

// Panggilan method opsional
const hitungBonus = responseAPI?.data?.user?.calculateBonus?.();
console.log('Panggilan method opsional         :', hitungBonus); // undefined

// Index array opsional
const itemPertama = responseAPI?.data?.items?.[0];
console.log('Elemen array opsional             :', itemPertama); // undefined

// 2. Nullish Coalescing (??) vs Logical OR (||)
console.log('\n--- 2. Nullish Coalescing (??) vs Logical OR (||) ---');
const konfigurasiUser = {
  volume: 0, // User sengaja menyetel volume 0 (mute)
  namaTampilan: '', // User mengosongkan nama tampilan
  delayDetik: null, // Belum dikonfigurasi
};

console.log('Volume dengan || :', konfigurasiUser.volume || 50); // 50 (SALAH: 0 dianggap falsy!)
console.log('Volume dengan ?? :', konfigurasiUser.volume ?? 50); // 0 (BENAR: angka 0 dipertahankan)

console.log('Nama dengan ||   :', konfigurasiUser.namaTampilan || 'Anonim'); // "Anonim" (string kosong dianggap false)
console.log('Nama dengan ??   :', konfigurasiUser.namaTampilan ?? 'Anonim'); // "" (string kosong dipertahankan)

console.log('Delay dengan ??  :', konfigurasiUser.delayDetik ?? 5); // 5 (karena null)

// 3. Logical Assignment Operators (??=, ||=, &&=)
console.log('\n--- 3. Logical Assignment Operators ---');
let config = { timeout: null };
config.timeout ??= 3000; // diisi 3000 hanya jika null/undefined
console.log('config.timeout setelah ??= :', config.timeout);

// 4. Deep Clone dengan structuredClone()
console.log('\n--- 4. Deep Clone Modern via structuredClone() ---');
const masterProduk = {
  sku: 'PRD-001',
  tags: new Set(['elektronik', 'gadget']),
  spesifikasi: {
    beratGram: 500,
    dimensi: { panjang: 20, lebar: 15 },
  },
};

const klonProduk = structuredClone(masterProduk);
klonProduk.spesifikasi.dimensi.panjang = 99; // Mengubah hasil klon

console.log('Panjang produk asli :', masterProduk.spesifikasi.dimensi.panjang); // Tetap 20
console.log('Panjang produk klon :', klonProduk.spesifikasi.dimensi.panjang); // 99

// 5. Immutable Array Methods (ES2023)
console.log(
  '\n--- 5. ES2023 Immutable Array Methods (toSorted, toReversed, toSpliced, with) ---',
);
const daftarSkor = [85, 92, 78, 95, 60];

const skorUrut = daftarSkor.toSorted((a, b) => a - b);
const skorBalik = daftarSkor.toReversed();
const skorGantiElemen = daftarSkor.with(0, 100); // ganti indeks 0 dengan 100 tanpa merusak asli
const skorSpliced = daftarSkor.toSpliced(1, 2); // hapus 2 elemen mulai indeks 1 secara immutable

console.log('Array Asli         :', daftarSkor);
console.log('Hasil toSorted     :', skorUrut);
console.log('Hasil toReversed   :', skorBalik);
console.log('Hasil .with(0, 100):', skorGantiElemen);
console.log('Hasil toSpliced    :', skorSpliced);
