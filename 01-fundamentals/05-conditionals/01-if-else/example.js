// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Struktur If-Else Standar ---');
const usiaPengunjung = 18;

if (usiaPengunjung >= 17) {
  console.log('Status: Boleh masuk dan menonton film bioskop dewasa.');
} else {
  console.log('Status: Usia belum mencukupi untuk menonton.');
}

console.log('\n--- 2. Evaluasi Truthy dan Falsy ---');
const namaInput = ''; // String kosong adalah Falsy

if (namaInput) {
  console.log(`Selamat datang, ${namaInput}!`);
} else {
  console.log('Peringatan: Nama tidak boleh dikosongkan! (Terdeteksi Falsy)');
}

console.log('\n--- 3. Ternary Operator (Sintaks Ringkas) ---');
const nilaiUjian = 82;
// kondisi ? ekspresi_jika_true : ekspresi_jika_false
const statusKelulusan = nilaiUjian >= 75 ? 'LULUS DENGAN BAIK' : 'REMIDIAL';

console.log(`Nilai Siswa: ${nilaiUjian} -> Hasil: ${statusKelulusan}`);
