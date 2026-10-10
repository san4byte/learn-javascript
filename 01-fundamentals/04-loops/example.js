// =============================================================================
// MODUL 01 - FUNDAMENTALS: 04 - PENGULANGAN (LOOPS)
// =============================================================================

// --- 1. WHILE LOOP & DO-WHILE ---
console.log('=== 1. PERULANGAN WHILE & DO-WHILE ===');
let noAngkot = 1;
const totalAngkot = 3;

while (noAngkot <= totalAngkot) {
  console.log(`Angkot No. ${noAngkot} beroperasi dengan baik.`);
  noAngkot++;
}

// Do-While: Dijamin dieksekusi minimal 1 kali meskipun kondisi false sejak awal
let counterUji = 10;
do {
  console.log(
    `Nilai dalam do-while: ${counterUji} (dieksekusi sebelum evaluasi kondisi)`,
  );
  counterUji++;
} while (counterUji < 5);

// Kontrol Alur: Break & Continue pada While
let angka = 0;
while (angka < 6) {
  angka++;
  if (angka === 2) {
    continue; // Lewati angka 2
  }
  if (angka === 5) {
    console.log(`Perulangan dihentikan oleh break pada angka ${angka}`);
    break;
  }
  console.log(`Angka diproses: ${angka}`);
}

// --- 2. FOR LOOP STANDAR & VARIASI ---
console.log('\n=== 2. FOR LOOP STANDAR & VARIASI ===');
// For standar increment
for (let i = 1; i <= 3; i++) {
  console.log(`Tiket antrean ke-${i}`);
}

// Iterasi array menggunakan indeks
const daftarKendaraan = ['Sedan', 'SUV', 'Truk'];
for (let idx = 0; idx < daftarKendaraan.length; idx++) {
  console.log(`Kendaraan indeks [${idx}]: ${daftarKendaraan[idx]}`);
}

// Multiple counters dalam satu header for (Two-pointer dasar)
for (let kiri = 0, kanan = 4; kiri < kanan; kiri++, kanan--) {
  console.log(`Pointer kiri: ${kiri} | Pointer kanan: ${kanan}`);
}

// --- 3. NESTED LOOPS (PERULANGAN BERSARANG) ---
console.log('\n=== 3. NESTED LOOPS (PERULANGAN BERSARANG) ===');
// Matriks dua dimensi
const matriks = [
  [10, 20],
  [30, 40],
];
for (let r = 0; r < matriks.length; r++) {
  for (let c = 0; c < matriks[r].length; c++) {
    console.log(`Matriks [${r}][${c}] = ${matriks[r][c]}`);
  }
}

// Labelled statement dengan break pada nested loop
const target = 30;
let ditemukan = false;
loopBaris: for (let r = 0; r < matriks.length; r++) {
  for (let c = 0; c < matriks[r].length; c++) {
    if (matriks[r][c] === target) {
      console.log(`Target ${target} ditemukan pada koordinat [${r}][${c}]!`);
      ditemukan = true;
      break loopBaris; // Langsung hentikan loop luar
    }
  }
}

// --- 4. FOR..OF (ITERABLE) & FOR..IN (OBJECT PROPERTIES) ---
console.log('\n=== 4. FOR..OF & FOR..IN ===');
const bahasaList = ['JavaScript', 'TypeScript', 'Node.js'];

// for..of pada Array (mengambil nilai langsung)
for (const bahasa of bahasaList) {
  console.log(`Bahasa: ${bahasa}`);
}

// for..of dengan .entries() untuk mendapatkan indeks dan nilai
for (const [idx, bahasa] of bahasaList.entries()) {
  console.log(`Indeks ${idx}: ${bahasa}`);
}

// for..in pada Objek (membaca keys enumerable)
const konfigurasi = { tema: 'gelap', bahasa: 'id', versi: 1 };
for (const key in konfigurasi) {
  if (Object.hasOwn(konfigurasi, key)) {
    console.log(`Konfigurasi [${key}]: ${konfigurasi[key]}`);
  }
}

// Alternatif modern untuk objek: Object.entries() dengan for..of
for (const [kunci, nilai] of Object.entries(konfigurasi)) {
  console.log(`Entry: ${kunci} => ${nilai}`);
}
