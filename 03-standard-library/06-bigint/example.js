// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. INISIALISASI & DEKLARASI BIGINT ===');
// A. Menggunakan literal akhiran 'n'
const angkaBesar1 = 9007199254740995n; // Melebihi Number.MAX_SAFE_INTEGER

// B. Menggunakan fungsi konstruktor BigInt()
const dariString = BigInt('123456789012345678901234567890');
const dariNumber = BigInt(100);

console.log('Literal n                         :', angkaBesar1);
console.log('BigInt dari String                :', dariString);
console.log('typeof BigInt                     :', typeof angkaBesar1); // "bigint"

// C. Format dan Konversi Basis (toString & toLocaleString)
const nilaiUang = 1000000000000n;
console.log('toString(16) (Hexadecimal)        :', nilaiUang.toString(16)); // "e8d4a51000"
console.log(
  'toLocaleString(id-ID)             :',
  nilaiUang.toLocaleString('id-ID')
); // "1.000.000.000.000"

console.log('\n=== 2. OPERASI ARITMETIKA & TRUNCATION DESIMAL ===');
const a = 10n;
const b = 3n;

console.log('Penjumlahan (10n + 3n)            :', a + b); // 13n
console.log('Pengurangan (10n - 3n)            :', a - b); // 7n
console.log('Perkalian (10n * 3n)              :', a * b); // 30n
console.log('Eksponensial (2n ** 64n)          :', 2n ** 64n); // 18446744073709551616n

// Pembagian BigInt selalu membuang angka di belakang koma (integer truncation)
console.log('Pembagian (10n / 3n) (desimal lenyap):', a / b); // 3n (bukan 3.333...)
console.log('Sisa Bagi / Modulo (10n % 3n)     :', a % b); // 1n

console.log('\n=== 3. ATURAN TYPE COERCION (DILARANG CAMPUR NUMBER) ===');
// a + 5; // ❌ TypeError: Cannot mix BigInt and other types, use explicit conversions

// Solusi: Konversi eksplisit kedua belah pihak
const angkaNumber = 5;
const hasilJumlah = a + BigInt(angkaNumber);
console.log('Konversi manual (10n + BigInt(5)) :', hasilJumlah); // 15n

console.log('\n=== 4. PERBANDINGAN & PENGURUTAN ===');
// Perbandingan longgar (==) vs ketat (===)
console.log('10n == 10 (nilai sama)            :', 10n == 10); // true ✅
console.log('10n === 10 (tipe beda)            :', 10n === 10); // false ❌

// Perbandingan komparasi (<, >, <=, >=)
console.log('5n < 10 (komparasi lintas tipe)   :', 5n < 10); // true ✅

// Pengurutan array campuran BigInt dan Number
const campuran = [10n, 5, 20n, 1, 15];
campuran.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
console.log('Array campuran terurut            :', campuran); // [1, 5, 10n, 15, 20n]

console.log('\n=== 5. BITWISE & INTEGER CLAMPING (asIntN & asUintN) ===');
// Menjepit angka ke batas 64-bit signed integer (-2^63 s.d. 2^63 - 1)
const angka64 = 2n ** 63n - 1n;
console.log('asIntN 64-bit maks                :', BigInt.asIntN(64, angka64));
console.log(
  'asIntN 64-bit overflow (overflow negatif):',
  BigInt.asIntN(64, angka64 + 1n)
);

// Menjepit angka ke batas 8-bit unsigned (0 s.d. 255)
console.log('asUintN 8-bit (255n)              :', BigInt.asUintN(8, 255n)); // 255n
console.log('asUintN 8-bit (256n -> wrap ke 0) :', BigInt.asUintN(8, 256n)); // 0n

console.log('\n=== 6. SERIALISASI JSON UNTUK BIGINT ===');
const dataTransaksi = {
  idTransaksi: 9007199254740999n,
  keterangan: 'Top up wallet',
};

// JSON.stringify(dataTransaksi); // ❌ TypeError: Do not know how to serialize a BigInt

// Solusi A: Gunakan Replacer
const jsonAman = JSON.stringify(dataTransaksi, (_, val) =>
  typeof val === 'bigint' ? val.toString() : val
);
console.log('JSON via Replacer                 :', jsonAman);

// Solusi B: Definisi prototype toJSON
BigInt.prototype.toJSON = function () {
  return this.toString();
};
console.log(
  'JSON via BigInt.prototype.toJSON  :',
  JSON.stringify(dataTransaksi)
);
