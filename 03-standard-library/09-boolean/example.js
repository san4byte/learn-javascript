// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. PENGUJIAN LENGKAP NILAI FALSY VS TRUTHY ===');
// Tujuh Nilai Falsy di JavaScript:
console.log('Boolean(false)                   :', Boolean(false)); // false
console.log('Boolean(0) & Boolean(-0)         :', Boolean(0), '|', Boolean(-0)); // false | false
console.log('Boolean(0n) (BigInt nol)         :', Boolean(0n)); // false
console.log("Boolean('') (String kosong)      :", Boolean('')); // false
console.log('Boolean(null)                    :', Boolean(null)); // false
console.log('Boolean(undefined)               :', Boolean(undefined)); // false
console.log('Boolean(NaN)                     :', Boolean(NaN)); // false

// Nilai yang sering DIKIRA falsy padahal TRUTHY:
console.log('\n-- Jebakan Nilai Truthy --');
console.log("Boolean('0') (String '0')        :", Boolean('0')); // true!
console.log("Boolean('false') (String teks)   :", Boolean('false')); // true!
console.log('Boolean([]) (Array kosong)       :', Boolean([])); // true!
console.log('Boolean({}) (Objek kosong)       :', Boolean({})); // true!
console.log(
  'Boolean(() => {}) (Fungsi)       :',
  Boolean(() => {}),
); // true!

console.log(
  '\n=== 2. SHORTHAND KONVERSI: BOOLEAN() vs DOUBLE NEGATION (!!) ===',
);
const namaUser = 'joko_santoso';
const inputKosong = '';

console.log('Boolean(namaUser)                :', Boolean(namaUser)); // true
console.log('!!namaUser (Shorthand)           :', !!namaUser); // true
console.log('!!inputKosong                    :', !!inputKosong); // false

console.log('\n=== 3. JEBAKAN OBJEK PEMBUNGKUS (new Boolean) ===');
const boolObjek = new Boolean(false); // ❌ JANGAN DIGUNAKAN DI PRODUKSI!

console.log('typeof boolObjek                 :', typeof boolObjek); // "object"
console.log('boolObjek == false (coercion)    :', boolObjek == false); // true
console.log('boolObjek === false (ketat)      :', boolObjek === false); // false

// Jebakan Percabangan if (Objek SELALU Truthy):
if (boolObjek) {
  console.log(
    'if (new Boolean(false))          : Dieksekusi! (Karena semua objek adalah truthy)',
  );
}

console.log('\n=== 4. SANITASI DATA: FILTER(BOOLEAN) ===');
const dataMentah = [
  'Joko',
  '',
  null,
  'Admin',
  undefined,
  0,
  false,
  'Aktif',
  NaN,
];
const dataBersih = dataMentah.filter(Boolean);

console.log('Data Mentah                      :', dataMentah);
console.log('Data Bersih (filter(Boolean))    :', dataBersih); // ['Joko', 'Admin', 'Aktif']

console.log('\n=== 5. OPERATOR LOGIKA: &&, ||, vs NULLISH COALESCING (??) ===');
const skorNol = 0;

// OR (||) menganggap 0 sebagai falsy (bisa menimbulkan bug default value):
const hasilOr = skorNol || 100;
console.log('skorNol || 100                   :', hasilOr); // 100 ⚠️ (0 tertimpa!)

// Nullish Coalescing (??) hanya memeriksa null dan undefined:
const hasilNullish = skorNol ?? 100;
console.log('skorNol ?? 100                   :', hasilNullish); // 0 ✅ (0 dipertahankan)

console.log('\n=== 6. INSTANCE METHODS: toString() & valueOf() ===');
const saklar = true;
console.log('toString()                       :', saklar.toString()); // "true" (string)
console.log('valueOf()                        :', boolObjek.valueOf()); // false (ekstrak primitif)
