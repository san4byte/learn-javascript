// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Hoisting var vs TDZ let ---');
console.log('Nilai variabelA (var) sebelum deklarasi:', variabelA); // undefined (karena di-hoist)
var variabelA = 'Saya dideklarasikan dengan var';

try {
  // Mengakses variabelB di sini akan melempar ReferenceError (Temporal Dead Zone)
  // console.log(variabelB);
  let variabelB = 'Saya aman dengan let';
  console.log('Nilai variabelB (let):', variabelB);
} catch (err) {
  console.error('TDZ Error:', err.message);
}

console.log('\n--- 2. Block Scope let & const vs Function Scope var ---');
if (true) {
  var bocorKeluar = 'var bisa diakses di luar if blok!';
  let amanDiDalam = 'let terkunci di dalam blok ini saja';
  const jugaAman = 'const juga terkunci di dalam blok ini';
}

console.log('Akses luar:', bocorKeluar); // Berhasil diakses
// console.log(amanDiDalam); // ReferenceError: amanDiDalam is not defined

console.log('\n--- 3. Mutabilitas const pada Objek & Array ---');
// const mengunci referensi memori, BUKAN isi propertinya!
const dataSiswa = {
  nama: 'Joko Santoso',
  angkatan: 2024,
};

// Mengubah isi properti DIPERBOLEHKAN:
dataSiswa.angkatan = 2025;
dataSiswa.jurusan = 'Teknik Informatika';
console.log('Objek setelah dimutasi:', dataSiswa);

const daftarNilai = [80, 90];
daftarNilai.push(95); // Menambahkan elemen DIPERBOLEHKAN
console.log('Array setelah dimutasi :', daftarNilai);

// Yang DILARANG adalah me-reassign referensinya ke objek baru:
// dataSiswa = { nama: "Budi" }; // TypeError: Assignment to constant variable.
