// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Dasar Pembuatan Set & Penolakan Duplikasi ---');
const daftarTag = new Set();

// Mendukung Method Chaining (.add().add())
daftarTag.add('js').add('ts').add('go');

// Coba tambahkan duplikat 'js' dan nilai angka 1
daftarTag.add('js').add(1);

console.log('Isi Set saat ini             :', daftarTag);
console.log('Jumlah elemen unik (size)    :', daftarTag.size); // 4 ('js' duplikat diabaikan)

console.log('\n--- 2. Pengecekan Cepat (has) & Penghapusan (delete) ---');
console.log("Apakah ada tag 'ts'?         :", daftarTag.has('ts')); // true
console.log("Apakah ada tag 'py'?         :", daftarTag.has('py')); // false

daftarTag.delete('js');
console.log("Setelah tag 'js' dihapus     :", daftarTag);
console.log('Ukuran Set setelah dihapus   :', daftarTag.size); // 3

console.log('\n--- 3. Trik Industri: Deduplikasi Array Instan ---');
const kategoriMentah = [
  'frontend',
  'backend',
  'frontend',
  'devops',
  'backend',
  'ui-ux',
];
console.log('Array Mentah (6 data)        :', kategoriMentah);

// Mengubah Array -> Set (duplikat lenyap) -> Spread (...) kembali menjadi Array
const kategoriUnik = [...new Set(kategoriMentah)];
console.log('Array Bersih (Bebas Duplikat):', kategoriUnik);
