// =============================================================================
// MODUL 01 - FUNDAMENTALS: 09.2 - TIGA CARA MEMBUAT OBJECT
// =============================================================================

console.log('=== 1. PENDEKATAN 1: OBJECT LITERAL ===');
// Ideal untuk objek tunggal (singleton) atau paket data sementara (DTO)
const mahasiswaLiteral = {
  nama: 'Joko Santoso',
  nim: '1012001',
  jurusan: 'Informatika',
  info() {
    return `${this.nama} (${this.nim}) - ${this.jurusan}`;
  },
};
console.log('Object Literal:', mahasiswaLiteral.info());

console.log('\n=== 2. PENDEKATAN 2: FACTORY FUNCTION ===');
// Fungsi biasa yang membuat dan me-return objek baru secara terisolasi
function buatMahasiswa(nama, nim, jurusan) {
  return {
    nama,
    nim,
    jurusan,
    info() {
      return `${this.nama} (${this.nim}) - ${this.jurusan}`;
    },
  };
}

const mhsA = buatMahasiswa('Budi', '1012002', 'Sistem Informasi');
console.log('Factory Function:', mhsA.info());

console.log('\n=== 3. PENDEKATAN 3: CONSTRUCTOR FUNCTION (KEYWORD NEW) ===');
function Mahasiswa(nama, nim, jurusan) {
  // 1. Secara implisit membuat: this = Object.create(Mahasiswa.prototype)
  this.nama = nama;
  this.nim = nim;
  this.jurusan = jurusan;
  // 2. Secara implisit mengembalikan: return this;
}

// Praktik terbaik: taruh method bersama pada prototype untuk menghemat memori
Mahasiswa.prototype.info = function () {
  return `${this.nama} (${this.nim}) - ${this.jurusan}`;
};

const mhsB = new Mahasiswa('Siti', '1012003', 'Teknik Elektro');
console.log('Constructor Function:', mhsB.info());
console.log('Cek instanceof Mahasiswa:', mhsB instanceof Mahasiswa); // true

console.log('\n=== 4. PENDEKATAN TAMBAHAN: OBJECT.CREATE() ===');
const protoPengguna = {
  sapa() {
    return `Halo, akun saya aktif di platform ini.`;
  },
};

const userBaru = Object.create(protoPengguna);
userBaru.username = 'joko_dev';
console.log('User via Object.create():', userBaru.username);
console.log('Warisan method prototype :', userBaru.sapa());
