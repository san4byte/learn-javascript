// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Anatomi Objek dengan Properti dan Method ---');
const pengguna = {
  // Properti
  id: 101,
  namaLengkap: 'Joko Santoso',
  email: 'joko@example.com',
  isAktif: true,
  keahlian: ['JavaScript', 'Node.js', 'React'],
  alamat: {
    kota: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta'
  },

  // Method (Fungsi di dalam Objek)
  perkenalkanDiri: function () {
    return `Halo, nama saya ${this.namaLengkap} dari ${this.alamat.kota}.`;
  },
  
  // Shorthand Method (ES6)
  hitungTotalKeahlian() {
    return this.keahlian.length;
  }
};

console.log('Akses via Dot Notation     :', pengguna.namaLengkap);
console.log('Akses Nested Object        :', pengguna.alamat.kota);
console.log('Akses Array dalam Objek    :', pengguna.keahlian[0]);
console.log('Memanggil Method           :', pengguna.perkenalkanDiri());
console.log('Memanggil Shorthand Method :', pengguna.hitungTotalKeahlian(), 'keahlian');

console.log('\n--- 2. Bracket Notation Dinamis ---');
const propertiYangDicari = 'email';
console.log('Akses Dinamis:', pengguna[propertiYangDicari]); // pengguna["email"]

// Menambah dan mengubah properti secara dinamis
pengguna.umur = 25;
pengguna.isAktif = false;
console.log('Objek setelah diupdate:', { umur: pengguna.umur, isAktif: pengguna.isAktif });
