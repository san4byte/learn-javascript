// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. VALIDASI POLA (TEST) & JEBAKAN LASTINDEX FLAG /g ===');
// A. Validasi format nomor HP Indonesia (08 diikuti 9-11 digit angka)
const regexHp = /^08\d{9,11}$/;
console.log("Validasi '081234567890'          :", regexHp.test('081234567890')); // true
console.log("Validasi '08123abc'              :", regexHp.test('08123abc')); // false

// B. Jebakan fatal lastIndex pada regex.test() ber-flag global (/g)
const regexGlobal = /foo/g;
const teksFoo = 'foo';
console.log('Test ke-1 dengan flag /g         :', regexGlobal.test(teksFoo)); // true (lastIndex pindah ke 3)
console.log('Test ke-2 dengan flag /g         :', regexGlobal.test(teksFoo)); // false! ⚠️ (karena mulai dari index 3)
console.log('Test ke-3 setelah reset          :', regexGlobal.test(teksFoo)); // true (reset ke 0)
// Aturan praktis: HINDARI flag /g jika hanya ingin validasi test()!

// C. regex.exec() untuk ekstraksi mendalam
const execHasil = /ID-(\d+)/.exec('Kode: ID-4592');
console.log(
  'regex.exec() hasil               :',
  execHasil[0],
  '| Grup angka:',
  execHasil[1],
); // ID-4592 | 4592

console.log('\n=== 2. LITERAL vs KONSTRUKTOR DINAMIS ===');
// Literal: Pola statis
const regexLiteral = /\d{4}/;

// Konstruktor: Pola dinamis dari variabel input (Wajib double-backslash \\)
const kataKunci = 'node';
const regexDinamis = new RegExp(`\\b${kataKunci}\\b`, 'i');
console.log(
  "Cari 'node' di 'Belajar NodeJS'  :",
  regexDinamis.test('Belajar NodeJS'),
); // false (batas kata \b)
console.log(
  "Cari 'node' di 'Belajar Node JS' :",
  regexDinamis.test('Belajar Node JS'),
); // true

console.log('\n=== 3. EKSTRAKSI DATA: MATCHALL & NAMED CAPTURING GROUPS ===');
const logTeks = 'User: Joko, Tahun: 2024 | User: Budi, Tahun: 2026';
const regexUser = /User:\s*(?<nama>\w+),\s*Tahun:\s*(?<tahun>\d{4})/g;

console.log('-- Ekstraksi Named Groups via str.matchAll() --');
for (const match of logTeks.matchAll(regexUser)) {
  const { nama, tahun } = match.groups;
  console.log(`Ditemukan: ${nama.padEnd(6)} | Angkatan: ${tahun}`);
}

console.log('\n=== 4. QUANTIFIER: GREEDY vs LAZY ===');
const html = '<b>Teks Tebal</b> dan <i>Teks Miring</i>';

// Greedy (.*): Mengambil sejauh mungkin hingga penutup '>' terakhir
console.log('Greedy /<.*>/                    :', html.match(/<.*>/)[0]); // '<b>Teks Tebal</b> dan <i>Teks Miring</i>'

// Lazy (.*?): Berhenti pada kecocokan '>' pertama
console.log('Lazy /<.*?>/                     :', html.match(/<.*?>/)[0]); // '<b>'

console.log('\n=== 5. PENGGANTIAN TEKS: STR.REPLACE DENGAN CALLBACK ===');
const hargaProduk = 'Apel $5, Jeruk $3, Mangga $10';

// Konversi harga Dollar ke Rupiah (kurs 15.000) menggunakan callback function
const hargaIDR = hargaProduk.replace(/\$(\d+)/g, (_, nominal) => {
  const rupiah = Number(nominal) * 15000;
  return `Rp ${rupiah.toLocaleString('id-ID')}`;
});
console.log('Harga Asli                       :', hargaProduk);
console.log('Harga Terkonversi                :', hargaIDR);

console.log('\n=== 6. PEMECAHAN STRING FLEKSIBEL (SPLIT) ===');
// Split string yang dipisahkan oleh koma, titik koma, atau spasi acak
const dataCampur = 'apel, jeruk ; mangga ,pisang;anggur';
const buahList = dataCampur.split(/\s*[,;]\s*/);
console.log('Split multi-delimiter            :', buahList);
