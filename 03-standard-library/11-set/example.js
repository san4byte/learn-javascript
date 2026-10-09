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
