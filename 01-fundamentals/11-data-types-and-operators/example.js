// =============================================================================
// MODUL 01 - FUNDAMENTALS: 11 - TIPE DATA LANJUTAN & OPERATOR TYPEOF/IN
// =============================================================================

console.log('=== 1. DELAPAN TIPE DATA RESMI JAVASCRIPT ===');
console.log("typeof 'Halo'            :", typeof 'Halo'); // string
console.log('typeof 42                :', typeof 42); // number
console.log('typeof 42n               :', typeof 42n); // bigint
console.log('typeof true              :', typeof true); // boolean
console.log('typeof undefined         :', typeof undefined); // undefined
console.log("typeof Symbol('id')      :", typeof Symbol('id')); // symbol
console.log('typeof null (Quirk Bug)  :', typeof null); // object (quirk historis JS 1995)
console.log('typeof { a: 1 }          :', typeof { a: 1 }); // object
console.log('typeof [1, 2]            :', typeof [1, 2]); // object (Array adalah objek)
console.log('typeof function(){}      :', typeof function () {}); // function (objek callable)

console.log('\n=== 2. UNDEFINED VS NULL SECARA SEMANTIK ===');
let variabelBelumDiisi;
console.log('Variabel tanpa inisialisasi :', variabelBelumDiisi); // undefined

let variabelSengajaDikosongkan = null;
console.log('Variabel disetel sengaja kosong:', variabelSengajaDikosongkan); // null

console.log('Perbandingan null == undefined  :', null == undefined); // true (coercion)
console.log('Perbandingan null === undefined :', null === undefined); // false (strict)

console.log('\n=== 3. OPERATOR IN PADA OBJEK DAN ARRAY ===');
const profil = { nama: 'Joko Santoso', peran: 'Admin' };
console.log("'nama' in profil  :", 'nama' in profil); // true
console.log("'gaji' in profil  :", 'gaji' in profil); // false

const daftarWarna = ['Merah', 'Hijau', 'Biru'];
console.log('0 in daftarWarna (Index 0 ada) :', 0 in daftarWarna); // true
console.log('5 in daftarWarna (Index 5 ada) :', 5 in daftarWarna); // false

console.log('\n=== 4. EVALUASI TRUTHY DAN FALSY ===');
const daftarUji = [
  false,
  0,
  -0,
  0n,
  '',
  null,
  undefined,
  NaN,
  'Ada Teks',
  123,
  [],
  {},
  ' ',
];

daftarUji.forEach((item) => {
  const status = item ? 'TRUTHY' : 'FALSY';
  let label;
  if (typeof item === 'bigint') {
    label = `${item}n`;
  } else if (typeof item === 'symbol') {
    label = item.toString();
  } else {
    label = JSON.stringify(item) ?? String(item);
  }
  console.log(`[${status.padEnd(6)}] -> ${label}`);
});
