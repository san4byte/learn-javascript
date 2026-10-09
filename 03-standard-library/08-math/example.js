// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. KONSTANTA MATEMATIKA FUNDAMENTAL ===');
console.log('Math.PI                          :', Math.PI); // 3.141592653589793
console.log('Math.E (Euler)                   :', Math.E); // 2.718281828459045

console.log('\n=== 2. EMPAT TEKNIK PEMBULATAN (POSITIF vs NEGATIF) ===');
// Perhatikan perbedaan perilaku pada angka negatif!
const positif = 4.7;
const negatif = -4.7;

console.log('-- Angka Positif (4.7) --');
console.log('Math.round(4.7) (terdekat)       :', Math.round(positif)); // 5
console.log('Math.floor(4.7) (ke bawah)       :', Math.floor(positif)); // 4
console.log('Math.ceil(4.7)  (ke atas)        :', Math.ceil(positif)); // 5
console.log('Math.trunc(4.7) (potong desimal) :', Math.trunc(positif)); // 4

console.log('\n-- Angka Negatif (-4.7) --');
console.log('Math.round(-4.7) (terdekat)      :', Math.round(negatif)); // -5
console.log('Math.floor(-4.7) (ke bawah)      :', Math.floor(negatif)); // -5 (makin kecil)
console.log('Math.ceil(-4.7)  (ke atas)       :', Math.ceil(negatif)); // -4 (makin besar/dekat 0)
console.log('Math.trunc(-4.7) (potong desimal):', Math.trunc(negatif)); // -4

console.log('\n=== 3. NILAI EKSTREM (MIN & MAX) & JEBAKAN TANPA ARGUMEN ===');
const angkaList = [15, 3, 99, 42, 8];
console.log('Array Asli                       :', angkaList);
console.log('Math.min(...angkaList)           :', Math.min(...angkaList)); // 3
console.log('Math.max(...angkaList)           :', Math.max(...angkaList)); // 99

// Jebakan Pemanggilan Kosong:
console.log('Math.max() tanpa argumen         :', Math.max()); // -Infinity ⚠️
console.log('Math.min() tanpa argumen         :', Math.min()); // Infinity ⚠️

console.log('\n=== 4. KALKULASI ARITMETIKA & GEOMETRI ===');
console.log('Math.abs(-75) (Nilai Mutlak)     :', Math.abs(-75)); // 75
console.log(
  'Math.sign(-50) vs Math.sign(50)  :',
  Math.sign(-50),
  '|',
  Math.sign(50),
); // -1 | 1
console.log('Math.pow(2, 8)                   :', Math.pow(2, 8)); // 256 (setara 2 ** 8)
console.log('Math.sqrt(64) (Akar Kuadrat)     :', Math.sqrt(64)); // 8
console.log('Math.cbrt(27) (Akar Kubik)       :', Math.cbrt(27)); // 3

// Sisi miring segitiga Pythagoras (a^2 + b^2 = c^2)
const alas = 3;
const tinggi = 4;
console.log('Math.hypot(3, 4) (Sisi Miring)   :', Math.hypot(alas, tinggi)); // 5

console.log('\n=== 5. GENERATOR ANGKA ACAK (MATH.RANDOM) ===');
// Math.random() menghasilkan desimal pseudo-acak di rentang [0, 1)
console.log('Acak Murni [0, 1)                :', Math.random());

// Fungsi Helper: Random Integer Inklusif [min, max]
function acakInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log('Dadu Acak (1 s.d. 6)             :', acakInteger(1, 6));
console.log('Persentase Diskon (10 s.d. 50)   :', acakInteger(10, 50) + '%');

console.log('\n=== 6. BATASAN: MATH TIDAK MENDUKUNG BIGINT ===');
try {
  // Math.max(10n, 20n); // ❌ TypeError
  console.log('Math hanya bekerja pada tipe Number (Bukan BigInt).');
} catch (error) {
  console.log('Error BigInt di Math             :', error.message);
}
