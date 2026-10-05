// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Rekursi Hitung Mundur Sederhana ---');
function hitungMundur(n) {
  // Base case: berhenti saat n mencapai 0
  if (n === 0) {
    console.log('Selesai!');
    return;
  }

  console.log(`Detik: ${n}`);
  hitungMundur(n - 1); // Pemanggilan rekursif dengan nilai yang mengecil
}

hitungMundur(3);

console.log('\n--- 2. Menghitung Nilai Faktorial (n!) ---');
// Contoh: 5! = 5 * 4 * 3 * 2 * 1 = 120
function faktorial(n) {
  if (n <= 1) return 1; // Base case: 1! = 1
  return n * faktorial(n - 1);
}

console.log('5! =', faktorial(5));
console.log('4! =', faktorial(4));

console.log(
  '\n--- 3. Studi Kasus Nyata: Menelusuri Kategori Bersarang (Tree/Folder) ---'
);
const strukturFolder = {
  nama: 'Root',
  subFolder: [
    { nama: 'Dokumen', subFolder: [{ nama: 'Surat.docx', subFolder: [] }] },
    { nama: 'Gambar', subFolder: [{ nama: 'Foto.jpg', subFolder: [] }] },
  ],
};

function cetakPohonFolder(folder, level = 0) {
  const indentasi = '  '.repeat(level);
  console.log(`${indentasi}📁 ${folder.nama}`);

  for (const anak of folder.subFolder) {
    cetakPohonFolder(anak, level + 1); // Rekursi menelusuri sub-folder sedalam apapun
  }
}

cetakPohonFolder(strukturFolder);
