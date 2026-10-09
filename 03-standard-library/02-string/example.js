// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. AKSES KARAKTER & IMMUTABILITY ===');
const judul = 'JavaScript';

console.log('Panjang string (.length)        :', judul.length); // 10
console.log('Karakter indeks 0 (.charAt)     :', judul.charAt(0)); // "J"
console.log('Karakter terakhir (.at(-1))     :', judul.at(-1)); // "t" (Mendukung indeks negatif)
console.log('Karakter kedua dari belakang    :', judul.at(-2)); // "p"
console.log(
  'Akses di luar batas (.charAt)   :',
  JSON.stringify(judul.charAt(99))
); // "" (string kosong)
console.log('Akses di luar batas (.at)       :', judul.at(99)); // undefined

// Pembuktian Immutability: String tidak bisa diubah langsung di memori
let teks = 'Kopi';
teks[0] = 'T'; // Diabaikan oleh JavaScript
console.log('Bukti Immutability (teks)       :', teks); // Tetap "Kopi"

console.log('\n=== 2. PENCARIAN SUBSTRING (SEARCH) ===');
const kalimat = 'Belajar JavaScript di Dunia Nyata bersama JavaScript';

// includes(search, fromIndex)
console.log(
  "includes('JavaScript')          :",
  kalimat.includes('JavaScript')
); // true
console.log("includes('Python')              :", kalimat.includes('Python')); // false
console.log(
  "includes('Belajar', 5)           :",
  kalimat.includes('Belajar', 5)
); // false (mulai dari index 5)

// startsWith & endsWith
console.log("startsWith('Belajar')           :", kalimat.startsWith('Belajar')); // true
console.log(
  "endsWith('JavaScript')          :",
  kalimat.endsWith('JavaScript')
); // true

// indexOf & lastIndexOf
console.log("indexOf('JavaScript')           :", kalimat.indexOf('JavaScript')); // 8 (kemunculan pertama)
console.log(
  "lastIndexOf('JavaScript')       :",
  kalimat.lastIndexOf('JavaScript')
); // 42 (kemunculan terakhir)
console.log("indexOf('Golang') (tidak ada)   :", kalimat.indexOf('Golang')); // -1

console.log('\n=== 3. EKSTRAKSI & PEMOTONGAN (SLICE vs SUBSTRING) ===');
const kode = 'INV-2026-XYZ';

// slice(start, end) -> Mendukung indeks negatif
console.log('slice(0, 3) (Prefix)            :', kode.slice(0, 3)); // "INV"
console.log('slice(4, 8) (Tahun)             :', kode.slice(4, 8)); // "2026"
console.log('slice(-3) (3 huruf terakhir)    :', kode.slice(-3)); // "XYZ"

// Perbedaan slice vs substring saat indeks terbalik:
// substring(8, 4) otomatis menukar parameter menjadi (4, 8) -> "2026"
console.log('substring(8, 4) (auto-swap)     :', kode.substring(8, 4)); // "2026"
// slice(8, 4) mengembalikan string kosong karena start > end
console.log(
  'slice(8, 4) (tanpa swap)        :',
  JSON.stringify(kode.slice(8, 4))
); // ""

console.log('\n=== 4. PENGGANTIAN TEKS (REPLACE vs REPLACEALL) ===');
const resep = 'kopi tubruk dan kopi susu';

// replace() hanya mengganti KEMUNCULAN PERTAMA
console.log("replace('kopi', 'teh')          :", resep.replace('kopi', 'teh')); // "teh tubruk dan kopi susu"

// replaceAll() mengganti SELURUH KEMUNCULAN
console.log(
  "replaceAll('kopi', 'teh')       :",
  resep.replaceAll('kopi', 'teh')
); // "teh tubruk dan teh susu"

// toUpperCase & toLowerCase
console.log('toUpperCase()                   :', resep.toUpperCase()); // "KOPI TUBRUK DAN KOPI SUSU"
console.log('toLowerCase()                   :', 'HELLO WORLD'.toLowerCase()); // "hello world"

console.log('\n=== 5. SANITASI & PADDING (TRIM, PADSTART, REPEAT) ===');
// Pembersihan Spasi
const kotor = '   halo dunia   ';
console.log('trim()                          :', JSON.stringify(kotor.trim())); // "halo dunia"
console.log(
  'trimStart()                     :',
  JSON.stringify(kotor.trimStart())
); // "halo dunia   "
console.log(
  'trimEnd()                       :',
  JSON.stringify(kotor.trimEnd())
); // "   halo dunia"

// Padding (padStart & padEnd)
const urutan = '42';
console.log("padStart(5, '0')                :", urutan.padStart(5, '0')); // "00042"
console.log("padEnd(5, '.')                  :", urutan.padEnd(5, '.')); // "42..."
console.log("padStart(2, '0') (sudah pas)    :", urutan.padStart(2, '0')); // "42" (tidak dipotong)

// repeat(count)
console.log('repeat(3)                       :', 'Ha! '.repeat(3)); // "Ha! Ha! Ha! "

console.log('\n=== 6. PEMECAHAN STRING (SPLIT) ===');
const csvData = 'Budi,Andi,Siti,Dewi';
const daftarNama = csvData.split(',');
console.log("split(',')                      :", daftarNama); // ['Budi', 'Andi', 'Siti', 'Dewi']
console.log("split(',', 2) (dengan limit)    :", csvData.split(',', 2)); // ['Budi', 'Andi']

// Penanganan Karakter Khusus / Emoji:
const kataEmoji = 'Kopi☕';
console.log("split('')                       :", kataEmoji.split('')); // ['K', 'o', 'p', 'i', '☕']
console.log('Spread operator [...str]        :', [...kataEmoji]); // ['K', 'o', 'p', 'i', '☕']
