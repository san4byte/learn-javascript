// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Keunikan Mutlak Symbol Primitif ---');
const id1 = Symbol('id');
const id2 = Symbol('id');

console.log('Deskripsi id1             :', id1.description);
console.log('Deskripsi id2             :', id2.description);
console.log('Apakah id1 === id2?       :', id1 === id2); // false (selalu unik di memori)

console.log('\n--- 2. Symbol sebagai Kunci Objek Tersembunyi ---');
const TOKEN_SECRET = Symbol('token');

const user = {
  nama: 'Joko Santoso',
  role: 'Developer',
  [TOKEN_SECRET]: 'RAHASIA_12345',
};

console.log('Akses properti biasa      :', user.nama);
console.log('Akses via kunci Symbol    :', user[TOKEN_SECRET]);

console.log('\n--- 3. Kunci Symbol Tersembunyi dari Loop & JSON ---');
console.log('Object.keys(user)         :', Object.keys(user)); // Hanya ['nama', 'role']
console.log('Hasil JSON.stringify      :', JSON.stringify(user)); // TOKEN_SECRET tidak ikut

// Cara resmi mengakses kunci Symbol pada objek:
const simbolObjek = Object.getOwnPropertySymbols(user);
console.log('getOwnPropertySymbols     :', simbolObjek);
console.log('Nilai dari Symbol         :', user[simbolObjek[0]]);

console.log('\n--- 4. Global Symbol Registry (Symbol.for & Symbol.keyFor) ---');
const symGlobal1 = Symbol.for('app.version');
const symGlobal2 = Symbol.for('app.version');

console.log('Apakah symGlobal1 === 2?  :', symGlobal1 === symGlobal2); // true (berbagi registry global)
console.log('Nama kunci via keyFor     :', Symbol.keyFor(symGlobal1)); // "app.version"
console.log('keyFor pada Symbol lokal  :', Symbol.keyFor(id1)); // undefined
