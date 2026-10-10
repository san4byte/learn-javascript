// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07 - ARRAY (ARRAYS)
// =============================================================================

// --- 1. OPERASI MUTATOR UJUNG ARRAY (PUSH, POP, SHIFT, UNSHIFT) ---
console.log('=== 1. MUTATOR UJUNG ARRAY ===');
const antrean = ['Budi', 'Siti'];

// Push: Tambah di akhir (O(1))
antrean.push('Joko');
console.log("Setelah push('Joko')     :", antrean);

// Pop: Hapus dari akhir (O(1))
const keluar = antrean.pop();
console.log(`Elemen keluar (pop)      : ${keluar} | Sisa:`, antrean);

// Unshift: Tambah di awal (O(N) karena re-indexing)
antrean.unshift('Pasien Darurat');
console.log('Setelah unshift          :', antrean);

// Shift: Hapus dari awal (O(N))
const dipanggil = antrean.shift();
console.log(`Elemen keluar (shift)    : ${dipanggil} | Sisa:`, antrean);

// --- 2. MUTASI TENGAH (SPLICE) VS SALINAN (SLICE) ---
console.log('\n=== 2. SLICE() (IMMUTABLE) VS SPLICE() (MUTASI) ===');
const daftarKota = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'];

// slice(1, 3): Mengambil elemen indeks 1 hingga sebelum indeks 3 (ASLI TIDAK BERUBAH)
const subKota = daftarKota.slice(1, 3);
console.log('Hasil slice(1, 3)        :', subKota);
console.log('Array asli tetap utuh    :', daftarKota);

// splice(2, 1, 'Semarang'): Di indeks 2, hapus 1 item, sisipkan 'Semarang' (MUTASI LANGSUNG)
const dihapus = daftarKota.splice(2, 1, 'Semarang');
console.log('Elemen terhapus (splice) :', dihapus);
console.log('Array setelah splice     :', daftarKota);

// --- 3. ACCESSOR PENCARIAN & PENGGABUNGAN ---
console.log('\n=== 3. ACCESSOR PENCARIAN & PENGGABUNGAN ===');
console.log("Index 'Bandung'          :", daftarKota.indexOf('Bandung'));
console.log("Apakah ada 'Surabaya'?   :", daftarKota.includes('Surabaya'));
console.log("Apakah ada 'Semarang'?   :", daftarKota.includes('Semarang'));
console.log('Rute string (join)       :', daftarKota.join(' -> '));

// Concat
const ruteLengkap = daftarKota.concat(['Denpasar', 'Mataram']);
console.log('Rute gabungan (concat)   :', ruteLengkap);

// --- 4. DESTRUCTURING ARRAY & REST PATTERN ---
console.log('\n=== 4. DESTRUCTURING ARRAY & REST PATTERN ===');
const koordinat = [-6.2088, 106.8456];
const [lat, lng, alt = 0] = koordinat; // alt menggunakan nilai default
console.log(`Lat: ${lat}, Lng: ${lng}, Alt: ${alt}m`);

// Skipping elements & rest
const nilaiList = [95, 88, 70, 60, 50];
const [juara1, , juara3, ...sisa] = nilaiList;
console.log(`Juara 1: ${juara1}, Juara 3: ${juara3}, Sisa:`, sisa);

// Swap variabel tanpa variabel sementara
let a = 'A';
let b = 'B';
[a, b] = [b, a];
console.log(`Swap variabel: a = ${a}, b = ${b}`);

// --- 5. SPREAD OPERATOR & KLONING ---
console.log('\n=== 5. SPREAD OPERATOR & KLONING ===');
const buahA = ['Apel', 'Mangga'];
const buahB = ['Jeruk', 'Pisang'];
const gabunganBuah = [...buahA, 'Melon', ...buahB];
console.log('Gabungan buah:', gabunganBuah);

// Shallow copy vs Deep copy (structuredClone)
const dataKompleks = [{ nama: 'Laptop' }, { nama: 'Mouse' }];
const shallowCopy = [...dataKompleks];
const deepCopy = structuredClone(dataKompleks);

dataKompleks[0].nama = 'Laptop Rusak';
console.log('Shallow copy (ikut termutasi):', shallowCopy[0].nama);
console.log('Deep copy (terlindungi)       :', deepCopy[0].nama);
