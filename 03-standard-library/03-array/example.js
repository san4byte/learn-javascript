// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. MUTASI DASAR: STACK, QUEUE, & SPLICE ===');
const angka = [10, 20, 30];

// Stack (LIFO: push & pop)
angka.push(40); // Tambah di belakang
const popItem = angka.pop(); // Ambil dari belakang
console.log('Stack push(40) & pop()          :', popItem, '| Array:', angka); // 40 | [10, 20, 30]

// Queue (FIFO: push & shift) / unshift
angka.unshift(5); // Tambah di depan
const shiftItem = angka.shift(); // Ambil dari depan
console.log('Queue unshift(5) & shift()      :', shiftItem, '| Array:', angka); // 5 | [10, 20, 30]

// splice(start, deleteCount, ...items) -> Mengubah array di tempat
const dihapus = angka.splice(1, 1, 99); // Hapus 1 elemen di indeks 1, sisipkan 99
console.log('splice(1, 1, 99) dihapus        :', dihapus); // [20]
console.log('Array setelah splice            :', angka); // [10, 99, 30]

console.log('\n=== 2. PENCARIAN & VALIDASI KONDISI ===');
const users = [
  { id: 1, nama: 'Budi', poin: 80 },
  { id: 2, nama: 'Andi', poin: 95 },
  { id: 3, nama: 'Siti', poin: 60 },
];

// find & findIndex
const juara = users.find((u) => u.poin > 90);
const indeksJuara = users.findIndex((u) => u.poin > 90);
console.log('find(poin > 90)                 :', juara); // { id: 2, nama: 'Andi', poin: 95 }
console.log('findIndex(poin > 90)            :', indeksJuara); // 1

// some & every
console.log(
  'some(poin < 70) (ada yang < 70?):',
  users.some((u) => u.poin < 70)
); // true
console.log(
  'every(poin >= 60) (semua >= 60?):',
  users.every((u) => u.poin >= 60)
); // true
console.log(
  'every(poin > 70)                :',
  users.every((u) => u.poin > 70)
); // false

// Akses modern dengan at(-1)
console.log('Elemen terakhir (users.at(-1))  :', users.at(-1).nama); // "Siti"

console.log('\n=== 3. TRANSFORMASI: MAP, FILTER, REDUCE, FLAT ===');
// map
const namaSaja = users.map((u) => u.nama.toUpperCase());
console.log('map(u => nama)                  :', namaSaja); // ['BUDI', 'ANDI', 'SITI']

// filter
const lulus = users.filter((u) => u.poin >= 75);
console.log(
  'filter(poin >= 75)              :',
  lulus.map((u) => u.nama)
); // ['Budi', 'Andi']

// reduce: Total Poin (selalu sertakan initialValue!)
const totalPoin = users.reduce((acc, curr) => acc + curr.poin, 0);
console.log('reduce(total poin)              :', totalPoin); // 235

// flat & flatMap
const nested = [1, [2, [3, 4]]];
console.log('flat(1)                         :', nested.flat(1)); // [1, 2, [3, 4]]
console.log('flat(Infinity)                  :', nested.flat(Infinity)); // [1, 2, 3, 4]

const kalimat = ['halo dunia', 'belajar js'];
const kata = kalimat.flatMap((k) => k.split(' '));
console.log('flatMap                         :', kata); // ['halo', 'dunia', 'belajar', 'js']

console.log('\n=== 4. PENGURUTAN: SORT vs IMMUTABLE TOSORTED ===');
const skorAcak = [25, 100, 5, 42];

// Jebakan sort() tanpa fungsi perbandingan:
// [25, 100, 5, 42].sort() => [100, 25, 42, 5] (karena diurutkan sebagai teks!)
// Gunakan compareFn: (a, b) => a - b
const urutAsli = [...skorAcak].sort((a, b) => a - b);
console.log('sort((a, b) => a - b) (mutasi)  :', urutAsli); // [5, 25, 42, 100]

// ES2023 Immutable: toSorted(), toReversed(), with()
const sumber = [3, 1, 2];
const urutImmutable = sumber.toSorted((a, b) => a - b);
const gantiSatuNilai = sumber.with(0, 99); // Ganti indeks 0 tanpa mutasi sumber
console.log('sumber asli (tidak berubah)     :', sumber); // [3, 1, 2]
console.log('toSorted()                      :', urutImmutable); // [1, 2, 3]
console.log('with(0, 99)                     :', gantiSatuNilai); // [99, 1, 2]

console.log('\n=== 5. UTILITAS ARRAY STATIC ===');
console.log('Array.isArray([1, 2])           :', Array.isArray([1, 2])); // true
console.log('Array.isArray({ length: 2 })    :', Array.isArray({ length: 2 })); // false
console.log('Array.from("ABC")               :', Array.from('ABC')); // ['A', 'B', 'C']
console.log('Array.of(10, 20, 30)            :', Array.of(10, 20, 30)); // [10, 20, 30]
console.log(
  "join(' - ')                     :",
  ['ID', '2026', '99'].join(' - ')
); // "ID - 2026 - 99"
