// =============================================================================
// MODUL 01 - FUNDAMENTALS: 09.1 - DASAR OBJECT (PROPERTI & METHOD)
// =============================================================================

console.log('=== 1. ANATOMI OBJEK, PROPERTI & METHOD SHORTHAND ===');
const pengguna = {
  // Properti primitif dan bersarang
  id: 101,
  namaLengkap: 'Joko Santoso',
  email: 'joko@example.com',
  isAktif: true,
  keahlian: ['JavaScript', 'Node.js', 'React'],
  alamat: {
    kota: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta',
  },

  // Method tradisional
  perkenalkanDiri: function () {
    return `Halo, nama saya ${this.namaLengkap} dari ${this.alamat.kota}.`;
  },

  // Method Shorthand ES6
  hitungTotalKeahlian() {
    return this.keahlian.length;
  },
};

console.log('Dot Notation (nama)        :', pengguna.namaLengkap);
console.log('Nested Access (kota)       :', pengguna.alamat.kota);
console.log('Array in Object (keahlian) :', pengguna.keahlian[0]);
console.log('Panggil Method             :', pengguna.perkenalkanDiri());
console.log(
  'Panggil Method Shorthand   :',
  pengguna.hitungTotalKeahlian(),
  'keahlian',
);

console.log('\n=== 2. BRACKET NOTATION & AKSES DINAMIS ===');
// Wajib pakai bracket notation untuk nama kunci dinamis atau berspasi
const propertiTarget = 'email';
console.log(`Akses Dinamis [${propertiTarget}]:`, pengguna[propertiTarget]);

pengguna['nomor telepon utama'] = '0812-3456-7890';
console.log('Akses Properti Berspasi    :', pengguna['nomor telepon utama']);

console.log('\n=== 3. PENAMBAHAN, MODIFIKASI & OPERATOR DELETE ===');
pengguna.umur = 25; // Menambah properti baru
pengguna.isAktif = false; // Mengubah nilai properti yang ada
console.log('Sebelum delete umur        :', pengguna.umur);

// Menghapus properti secara permanen dari memori
delete pengguna.umur;
console.log('Setelah delete pengguna.umur:', pengguna.umur); // undefined

console.log('\n=== 4. PENGECEKAN KEBERADAAN PROPERTI ===');
console.log("Apakah ada properti 'email' (in)       :", 'email' in pengguna);
console.log("Apakah ada properti 'umur' (in)        :", 'umur' in pengguna);
console.log(
  'Pengecekan Object.hasOwn(pengguna, id) :',
  Object.hasOwn(pengguna, 'id'),
);
