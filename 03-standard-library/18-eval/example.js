// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log(
  '--- 1. Cara Kerja Dasar eval() (Hanya untuk Demonstrasi Teori) ---'
);
const a = 15;
const b = 5;

// eval mengevaluasi string sebagai kode
const hasilKalkulasi = eval('a * b + 10');
console.log("Hasil evaluasi string 'a * b + 10':", hasilKalkulasi);

console.log('\n--- 2. Simulasi Bahaya Keamanan Code Injection ---');
// Bayangkan input ini berasal dari kolom form input website Anda:
const inputJahatDariHacker =
  "a + b; console.warn('[BAHAYA]: Akun Anda berhasil diretas oleh penyerang!');";

console.log('Mengeksekusi input pengguna tidak terpercaya:');
eval(inputJahatDariHacker);

console.log('\n--- 3. Alternatif Aman: Kamus Operasi (Lookup Table) ---');
// Alih-alih eval(angka1 + operator + angka2), buat fungsi pemetaan yang aman:
const operasiAman = {
  tambah: (x, y) => x + y,
  kurang: (x, y) => x - y,
  kali: (x, y) => x * y,
  bagi: (x, y) => (y !== 0 ? x / y : 'Error: Pembagian nol'),
};

function hitungAman(x, y, tipeOperasi) {
  const aksi = operasiAman[tipeOperasi];
  if (!aksi) {
    throw new Error(`Operasi '${tipeOperasi}' tidak dikenal dan ditolak!`);
  }
  return aksi(x, y);
}

console.log('Hitung Aman (tambah) :', hitungAman(50, 25, 'tambah'));
console.log('Hitung Aman (kali)   :', hitungAman(10, 4, 'kali'));

console.log('\n--- 4. Alternatif Aman untuk Parsing Data: JSON.parse ---');
// JANGAN PERNAH gunakan eval('(' + jsonStr + ')')!
const jsonStr = '{"status": "sukses", "kode": 200}';
const dataObj = JSON.parse(jsonStr); // 100% aman dari eksekusi kode jahat
console.log('Hasil parse JSON aman:', dataObj.status);
