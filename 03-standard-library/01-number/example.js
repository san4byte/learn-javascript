// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. STATIC PROPERTIES & BATAS PRESISI ===');
console.log('Nilai Maksimum (MAX_VALUE)         :', Number.MAX_VALUE);
console.log('Positif Terkecil Dekat 0 (MIN_VALUE):', Number.MIN_VALUE);
console.log('Max Safe Integer (2^53 - 1)        :', Number.MAX_SAFE_INTEGER);
console.log('Min Safe Integer -(2^53 - 1)       :', Number.MIN_SAFE_INTEGER);

// Masalah Floating-Point 0.1 + 0.2 & Number.EPSILON
const hasilAritmetika = 0.1 + 0.2;
console.log('0.1 + 0.2                          :', hasilAritmetika); // 0.30000000000000004
console.log('0.1 + 0.2 === 0.3                  :', hasilAritmetika === 0.3); // false!
const apakahSama = Math.abs(hasilAritmetika - 0.3) < Number.EPSILON;
console.log('Solusi dengan Number.EPSILON       :', apakahSama); // true ✅

console.log('\n=== 2. VALIDASI KETAT vs FUNGSI GLOBAL LAMA ===');
// A. Number.isNaN vs isNaN global
console.log("Global isNaN('halo')               :", isNaN('halo')); // true ❌ (Implicit Coercion ke NaN)
console.log("Number.isNaN('halo')               :", Number.isNaN('halo')); // false ✅ (Ketat: bukan tipe NaN)
console.log('Number.isNaN(0 / 0)                :', Number.isNaN(0 / 0)); // true ✅

// B. Number.isFinite vs isFinite global
console.log("Global isFinite('123')             :", isFinite('123')); // true (Dikonversi dari string)
console.log("Number.isFinite('123')             :", Number.isFinite('123')); // false ✅ (String bukan number)
console.log('Number.isFinite(100 / 0)           :', Number.isFinite(100 / 0)); // false (Infinity)

// C. Number.isInteger & isSafeInteger
console.log('Number.isInteger(42)               :', Number.isInteger(42)); // true
console.log('Number.isInteger(42.0)             :', Number.isInteger(42.0)); // true (Di JS 42.0 identik integer)
console.log('Number.isInteger(42.5)             :', Number.isInteger(42.5)); // false
console.log(
  'Number.isSafeInteger(2 ** 53 - 1)  :',
  Number.isSafeInteger(2 ** 53 - 1)
); // true
console.log(
  'Number.isSafeInteger(2 ** 53)      :',
  Number.isSafeInteger(2 ** 53)
); // false

console.log('\n=== 3. PARSING STRING KE ANGKA ===');
// Number.parseInt(str, radix) - Selalu sertakan radix 10!
console.log(
  "parseInt('42px', 10)               :",
  Number.parseInt('42px', 10)
); // 42 (Membaca hingga non-digit)
console.log("Number('42px')                     :", Number('42px')); // NaN (Ketat, seluruh string harus angka)
console.log(
  "parseInt('   100  ', 10)           :",
  Number.parseInt('   100  ', 10)
); // 100 (Whitespace diabaikan)
console.log("parseInt('FF', 16)                 :", Number.parseInt('FF', 16)); // 255 (Basis Heksadesimal)

// Number.parseFloat(str)
console.log(
  "parseFloat('3.14meter')            :",
  Number.parseFloat('3.14meter')
); // 3.14
console.log("parseFloat('2.5e3')                :", Number.parseFloat('2.5e3')); // 2500 (Notasi Eksponensial)

console.log('\n=== 4. FORMATTING & KONVERSI BASIS BILANGAN ===');
const angkaContoh = 12345.6789;

// toFixed(digits) -> Menghasilkan STRING dengan desimal pasti
console.log('toFixed(2)                         :', angkaContoh.toFixed(2)); // "12345.68" (dibulatkan)
console.log('toFixed(0)                         :', angkaContoh.toFixed(0)); // "12346"

// toPrecision(digits) -> Menghasilkan STRING dengan jumlah total angka signifikan
console.log('toPrecision(4)                     :', angkaContoh.toPrecision(4)); // "1.235e+4"

// toString(radix) -> Konversi basis bilangan
const desimal = 255;
console.log('Basis 2 (Biner)                    :', desimal.toString(2)); // "11111111"
console.log('Basis 8 (Oktal)                    :', desimal.toString(8)); // "377"
console.log('Basis 16 (Heksadesimal)            :', desimal.toString(16)); // "ff"

// toLocaleString(locales, options) -> Format mata uang & pemisah lokal
const harga = 1500000;
const formatIDR = harga.toLocaleString('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});
console.log('Format Rupiah                      :', formatIDR); // "Rp 1.500.000"

console.log('\n=== 5. PERBEDAAN PRIMITIF vs WRAPPER OBJECT ===');
const primitif = 10;
const objekNumber = new Number(10); // ❌ Hindari konstruktor new Number!

console.log('typeof primitif                    :', typeof primitif); // "number"
console.log('typeof objekNumber                 :', typeof objekNumber); // "object"
console.log('Perbandingan (primitif == obj)     :', primitif == objekNumber); // true (coercion)
console.log('Perbandingan ketat (===)           :', primitif === objekNumber); // false
console.log('new Number(0) di dalam if(...)     :', Boolean(new Number(0))); // true! (Objek selalu truthy!)
