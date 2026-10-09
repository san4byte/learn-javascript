// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.8 - FUNGSI REKURSIF
// =============================================================================

console.log('=== 1. REKURSI HITUNG MUNDUR (BASE CASE & RECURSIVE STEP) ===');
function hitungMundur(n) {
  // 1. Base Case: Kondisi mutlak untuk berhenti
  if (n <= 0) {
    console.log('Selesai! 🚀');
    return;
  }

  // 2. Aksi
  console.log(`Detik: ${n}`);

  // 3. Recursive Call: Menuju ke arah base case
  hitungMundur(n - 1);
}

hitungMundur(3);

console.log('\n=== 2. KALKULASI FAKTORIAL MATEMATIKA (N!) ===');
function faktorial(n) {
  if (n <= 1) return 1; // Base case: 0! = 1 dan 1! = 1
  return n * faktorial(n - 1);
}

console.log('5! (Faktorial 5) =', faktorial(5)); // 120
console.log('4! (Faktorial 4) =', faktorial(4)); // 24

console.log('\n=== 3. TRAVERSAL STRUKTUR DATA POHON (TREE TRAVERSAL) ===');
const direktoriProyek = {
  nama: 'src',
  berkas: ['index.js'],
  subFolder: [
    {
      nama: 'components',
      berkas: ['Button.js', 'Modal.js'],
      subFolder: [],
    },
    {
      nama: 'utils',
      berkas: ['format.js'],
      subFolder: [
        {
          nama: 'math',
          berkas: ['calc.js'],
          subFolder: [],
        },
      ],
    },
  ],
};

function cetakPohon(folder, kedalaman = 0) {
  const indentasi = '  '.repeat(kedalaman);
  console.log(`${indentasi}📁 [${folder.nama}]`);

  for (const file of folder.berkas) {
    console.log(`${indentasi}  📄 ${file}`);
  }

  for (const sub of folder.subFolder) {
    cetakPohon(sub, kedalaman + 1); // Rekursi menelusuri sub-cabang
  }
}

cetakPohon(direktoriProyek);

console.log('\n=== 4. PENCEGAHAN & PENANGANAN MAXIMUM CALL STACK SIZE ===');
function rekursiTanpaHenti(counter) {
  return rekursiTanpaHenti(counter + 1); // Tidak ada base case!
}

try {
  rekursiTanpaHenti(1);
} catch (err) {
  console.log('Menangkap Stack Overflow Error:', err.name, '-', err.message);
}
