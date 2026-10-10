// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. INISIALISASI & DEDUPLIKASI ARRAY ===');
// A. Inisialisasi dari array (duplikasi langsung tereliminasi otomatis)
const angkaDuplikat = [1, 2, 2, 3, 4, 4, 5];
const angkaUnikSet = new Set(angkaDuplikat);
console.log('Array Asli                       :', angkaDuplikat);
console.log('Set Unik                         :', angkaUnikSet);
console.log('Deduplikasi ke Array [...Set]    :', [...angkaUnikSet]); // [1, 2, 3, 4, 5]

// B. Inisialisasi kosong lalu isi dengan method chaining (.add)
const tags = new Set();
tags.add('javascript').add('nodejs').add('react').add('javascript'); // 'javascript' kedua diabaikan
console.log('Total Tag Unik (.size)           :', tags.size); // 3

console.log('\n=== 2. OPERASI CRUD & PENGECEKAN CEPAT (O(1)) ===');
console.log("Cek keberadaan (.has('nodejs'))  :", tags.has('nodejs')); // true
console.log("Cek keberadaan (.has('python'))  :", tags.has('python')); // false

// Hapus elemen spesifik (.delete)
const statusHapus = tags.delete('react');
console.log('Hapus tag react (.delete)        :', statusHapus); // true
console.log('Ukuran setelah delete            :', tags.size); // 2

// Kosongkan seluruh set (.clear)
const tempSet = new Set(['a', 'b', 'c']);
tempSet.clear();
console.log('Ukuran tempSet setelah .clear()  :', tempSet.size); // 0

console.log('\n=== 3. PERILAKU REFERENSI OBJEK & NILAI NaN ===');
const setObjek = new Set();

// Objek literal terpisah memiliki referensi memori yang berbeda
setObjek.add({ id: 1 });
setObjek.add({ id: 1 }); // Tidak dianggap duplikat karena memori berbeda!
console.log('Set 2 objek literal berbeda      :', setObjek.size); // 2

// Solusi: Gunakan variabel referensi yang sama jika ingin unik
const objekSama = { role: 'admin' };
setObjek.add(objekSama);
setObjek.add(objekSama); // Diabaikan!
console.log('Objek variabel yang sama         :', setObjek.has(objekSama)); // true

// Penanganan NaN di Set (dianggap sama via SameValueZero)
const setNaN = new Set();
setNaN.add(NaN).add(NaN);
console.log('Jumlah NaN di Set                :', setNaN.size); // 1 (tidak diduplikasi)

console.log('\n=== 4. PENELUSURAN & ITERASI ===');
const bahasa = new Set(['JS', 'Python', 'Go']);

// Iterasi dengan for...of
console.log('-- Iterasi for...of --');
for (const item of bahasa) {
  console.log('Bahasa:', item);
}

// Iterasi dengan values() dan entries()
console.log('Array dari values()              :', Array.from(bahasa.values())); // ['JS', 'Python', 'Go']
console.log(
  'entries() pertama                :',
  bahasa.entries().next().value,
); // ['JS', 'JS']

// forEach pada Set: parameter pertama dan kedua bernilai SAMA (val, key)
console.log('\n-- Iterasi forEach --');
bahasa.forEach((value, key) => {
  console.log(`forEach val: ${value} (key identik: ${key})`);
});

console.log('\n=== 5. OPERASI HIMPUNAN MODERN (ES2024 SET METHODS) ===');
const timA = new Set(['Andi', 'Budi', 'Cici']);
const timB = new Set(['Budi', 'Cici', 'Dewi']);

// 1. Union: Gabungan seluruh anggota unik (A U B)
const gabungan = timA.union(timB);
console.log('Union (Gabungan)                 :', [...gabungan]); // ['Andi', 'Budi', 'Cici', 'Dewi']

// 2. Intersection: Anggota yang ada di kedua tim (Irisan A n B)
const irisan = timA.intersection(timB);
console.log('Intersection (Irisan)            :', [...irisan]); // ['Budi', 'Cici']

// 3. Difference: Anggota di tim A yang TIDAK ada di tim B (A - B)
const selisihA = timA.difference(timB);
console.log('Difference (A - B)               :', [...selisihA]); // ['Andi']

// 4. Symmetric Difference: Anggota eksklusif di salah satu tim saja
const bedaSimetris = timA.symmetricDifference(timB);
console.log('Symmetric Difference            :', [...bedaSimetris]); // ['Andi', 'Dewi']

// 5. Subset & Disjoint
const subTim = new Set(['Budi']);
console.log('isSubsetOf (subTim bagian timA?) :', subTim.isSubsetOf(timA)); // true
console.log('isSupersetOf (timA memuat subTim?):', timA.isSupersetOf(subTim)); // true
console.log('isDisjointFrom (timA & timB lepas?):', timA.isDisjointFrom(timB)); // false (ada irisan)

console.log('\n=== 6. KOMPARASI WEAKSET (MENCEGAH MEMORY LEAK) ===');
// A. Inisialisasi WeakSet
const sesiAktif = new WeakSet();

// Objek target (Elemen WAJIB berupa Objek)
let userLogin = { username: 'joko_dev', role: 'editor' };
let userTamu = { username: 'anonim', role: 'guest' };

// B. Menambah elemen (.add)
sesiAktif.add(userLogin);

console.log('Apakah userLogin aktif? (.has)   :', sesiAktif.has(userLogin)); // true
console.log('Apakah userTamu aktif? (.has)    :', sesiAktif.has(userTamu)); // false

// C. Karakteristik khusus WeakSet:
// - Non-iterable: tidak bisa di-loop dengan for..of atau forEach
// - Tidak memiliki properti .size
console.log('Properti .size di WeakSet        :', sesiAktif.size); // undefined

// D. Hapus elemen secara eksplisit (.delete)
const statusHapusSet = sesiAktif.delete(userLogin);
console.log('Hapus sesi userLogin (.delete)   :', statusHapusSet); // true
console.log('Status setelah dihapus (.has)    :', sesiAktif.has(userLogin)); // false

// E. Skenario Keamanan Memori & Garbage Collection:
// Menandai objek untuk validasi tanpa memutasi objek:
const transaksiDiproses = new WeakSet();
let order1 = { orderId: 'TRX-1001', amount: 500000 };

transaksiDiproses.add(order1);
console.log(
  'order1 sudah diproses? (.has)    :',
  transaksiDiproses.has(order1),
); // true

// Jika order1 selesai dan variabel dilepas:
order1 = null;
console.log(
  'order1 dilepas ke GC             : Memori otomatis dibersihkan oleh Garbage Collector!',
);
