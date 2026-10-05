// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Object Literal (Satu Objek Spesifik) ---');
const mhs1 = {
  nama: 'Joko Santoso',
  nim: '1012001',
  jurusan: 'Informatika',
};
console.log('Literal:', mhs1.nama);

console.log('\n--- 2. Function Declaration (Factory Function) ---');
function buatMahasiswa(nama, nim, jurusan) {
  const mhs = {};
  mhs.nama = nama;
  mhs.nim = nim;
  mhs.jurusan = jurusan;
  return mhs;
}

const mhs2 = buatMahasiswa('Budi', '1012002', 'Sistem Informasi');
console.log('Factory Function:', mhs2);

console.log('\n--- 3. Constructor Function (Keyword new) ---');
function Mahasiswa(nama, nim, jurusan) {
  // Di balik layar: JavaScript otomatis membuat: let this = Object.create(Mahasiswa.prototype);
  this.nama = nama;
  this.nim = nim;
  this.jurusan = jurusan;
  // Di balik layar: JavaScript otomatis melakukan: return this;
}

const mhs3 = new Mahasiswa('Siti', '1012003', 'Teknik Elektro');
console.log('Constructor:', mhs3);
console.log('Apakah mhs3 instance dari Mahasiswa?', mhs3 instanceof Mahasiswa);
