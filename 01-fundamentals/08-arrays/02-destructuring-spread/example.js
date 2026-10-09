// =============================================================================
// MODUL 01 - FUNDAMENTALS: 08.2 - DESTRUCTURING ARRAY & SPREAD OPERATOR
// =============================================================================

console.log('=== 1. DESTRUCTURING ARRAY DASAR & DEFAULT VALUE ===');
const koordinatGPS = [-6.2088, 106.8456]; // [lat, lng, tanpa alt]

// Mengekstrak elemen dan memberikan nilai default untuk ketinggian
const [latitude, longitude, altitude = 0] = koordinatGPS;
console.log(
  `Latitude: ${latitude} | Longitude: ${longitude} | Ketinggian: ${altitude}m`,
);

console.log('\n=== 2. SKIPPING ELEMENTS & REST PATTERN ===');
const nilaiUjian = [90, 85, 70, 95, 88];

// Lewati elemen kedua menggunakan koma ganda, kumpulkan sisanya dengan rest
const [tertinggi, , ketiga, ...nilaiLainnya] = nilaiUjian;
console.log(`Tertinggi: ${tertinggi} | Peringkat 3: ${ketiga}`);
console.log('Sisa nilai lainnya:', nilaiLainnya);

console.log('\n=== 3. VARIABLE SWAP (TUKAR NILAI VARIABEL INSTAN) ===');
let pemenang1 = 'Budi';
let pemenang2 = 'Joko';
console.log(`Sebelum swap: Juara 1 = ${pemenang1}, Juara 2 = ${pemenang2}`);

// Swap posisi tanpa memerlukan variabel penampung sementara (temp)
[pemenang1, pemenang2] = [pemenang2, pemenang1];
console.log(`Setelah swap : Juara 1 = ${pemenang1}, Juara 2 = ${pemenang2}`);

console.log('\n=== 4. SPREAD OPERATOR: PENGGABUNGAN & KLONING DANGKAL ===');
const buahLokal = ['Pisang', 'Mangga'];
const buahImpor = ['Apel', 'Jeruk'];

// Menggabungkan beberapa array dengan item sisipan
const semuaBuah = ['Semangka', ...buahLokal, ...buahImpor, 'Melon'];
console.log('Gabungan array buah:', semuaBuah);

// Kloning dangkal (Shallow copy)
const salinanLokal = [...buahLokal];
salinanLokal.push('Durian');
console.log('Array asli utuh    :', buahLokal); // [ 'Pisang', 'Mangga' ]
console.log('Salinan termodifikasi:', salinanLokal); // [ 'Pisang', 'Mangga', 'Durian' ]

console.log('\n=== 5. SHALLOW COPY VS STRUCTUREDCLONE() ===');
const nestedArray = [{ item: 'Meja' }, { item: 'Kursi' }];
const shallow = [...nestedArray];
const deep = structuredClone(nestedArray);

// Mutasi properti objek dalam array
nestedArray[0].item = 'Meja Rusak';
console.log('Hasil Shallow Copy (ikut termutasi):', shallow[0].item);
console.log('Hasil Deep Copy (tetap terlindungi):', deep[0].item);
