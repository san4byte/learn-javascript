// =============================================================================
// MODUL 01 - FUNDAMENTALS: 08 - OBJEK (OBJECTS)
// =============================================================================

// --- 1. OBJECT LITERAL & METHOD SHORTHAND ---
console.log('=== 1. OBJECT LITERAL & METHOD SHORTHAND ===');
const pengguna = {
  id: 101,
  namaLengkap: 'Joko Santoso',
  keahlian: ['JavaScript', 'Node.js'],
  alamat: {
    kota: 'Jakarta',
  },
  // Method Shorthand ES6
  perkenalkan() {
    return `Halo, saya ${this.namaLengkap} dari ${this.alamat.kota}.`;
  },
};
console.log(pengguna.perkenalkan());

// --- 2. TIGA CARA MEMBUAT OBJEK ---
console.log('\n=== 2. TIGA CARA MEMBUAT OBJEK ===');
// a. Object Literal (Satu objek tunggal / DTO)
const motor = { merk: 'Honda', cc: 150 };

// b. Factory Function (Memproduksi objek baru secara terisolasi)
function buatProduk(nama, harga) {
  return {
    nama,
    harga,
    tampilkan() {
      return `${this.nama} - Rp ${this.harga.toLocaleString('id-ID')}`;
    },
  };
}
const buku = buatProduk('Buku JS', 125000);
console.log('Factory Function:', buku.tampilkan());

// c. Constructor Function (Instansiasi dengan keyword `new`)
function Siswa(nama, kelas) {
  this.nama = nama;
  this.kelas = kelas;
}
const siswa1 = new Siswa('Ahmad', '12-IPA');
console.log('Constructor Function:', siswa1.nama, siswa1.kelas);

// --- 3. KONSEP KEYWORD THIS & BINDING ---
console.log('\n=== 3. KEYWORD THIS & BINDING ===');
const akun = {
  pemilik: 'Budi',
  saldo: 500000,
  cekSaldo() {
    // 'this' mengikat ke objek pemanggil di sebelah kiri titik: akun
    return `Pemilik: ${this.nama ?? this.pemilik} | Saldo: Rp ${this.saldo.toLocaleString('id-ID')}`;
  },
};
console.log(akun.cekSaldo());

// Perilaku Arrow Function pada Objek (Lexical this - mewarisi scope luar)
const profil = {
  nama: 'Siti',
  sapaBiasa: function () {
    return `Biasa: ${this.nama}`; // this menunjuk ke profil
  },
  sapaArrow: () => {
    return `Arrow: ${this?.nama ?? 'undefined (lexical global)'}`;
  },
};
console.log(profil.sapaBiasa());
console.log(profil.sapaArrow());

// --- 4. DESTRUCTURING OBJECT & ALIASING ---
console.log('\n=== 4. DESTRUCTURING OBJECT, ALIASING & DEFAULT ===');
const responseAPI = {
  status: 200,
  data: {
    userId: 99,
    username: 'jokosantoso',
  },
};

// Aliasing (username -> namaAkun), default value (role = 'Member')
const {
  status,
  data: { username: namaAkun },
  role = 'Member',
} = responseAPI;
console.log(`Status: ${status}, Akun: ${namaAkun}, Role Default: ${role}`);

// Rest property pada objek
const spesifikasi = {
  processor: 'M3 Max',
  ram: '36GB',
  storage: '1TB',
  beratKg: 1.6,
};
const { processor, ram, ...spekLainnya } = spesifikasi;
console.log(`Core: ${processor} ${ram} | Spek Lainnya:`, spekLainnya);

// --- 5. SPREAD OPERATOR & IMMUTABLE MERGING ---
console.log('\n=== 5. SPREAD OPERATOR & OBJECT MERGING ===');
const configDasar = { tema: 'terang', notifikasi: true, bahasa: 'id' };
const configUser = { tema: 'gelap' }; // Overriding properti tema

// Penggabungan objek (urutan kanan menimpa urutan kiri)
const configFinal = { ...configDasar, ...configUser, versi: 2 };
console.log('Config gabungan:', configFinal);

// --- 6. PROTOTYPE INHERITANCE DASAR & MEMORY SHARING ---
console.log('\n=== 6. PROTOTYPE INHERITANCE (MEMORY SHARING) ===');
function Robot(nama, energi) {
  this.nama = nama;
  this.energi = energi;
}

// Method disimpan di prototype agar di-share bersama seluruh instans (efisien memori)
Robot.prototype.bekerja = function (jam) {
  this.energi -= jam * 10;
  return `${this.nama} bekerja ${jam} jam. Sisa energi: ${this.energi}%`;
};

const optimus = new Robot('Optimus', 100);
console.log(optimus.bekerja(3));
