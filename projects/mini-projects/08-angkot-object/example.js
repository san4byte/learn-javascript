// =============================================================================
// MODUL 01 - FUNDAMENTALS: 09.6 - LATIHAN PENGELOLAAN ANGKOT BERBASIS OBJEK
// =============================================================================

console.log(
  '=== 1. SISTEM MANAJEMEN ANGKOT BERBASIS CONSTRUCTOR & PROTOTYPE ===',
);

function Angkot(sopir, trayek, kasAwal = 0, kapasitas = 4) {
  this.sopir = sopir;
  this.trayek = trayek;
  this.penumpang = [];
  this.kas = kasAwal;
  this.kapasitas = kapasitas;
}

// Method 1: Penumpang Naik
Angkot.prototype.penumpangNaik = function (nama) {
  // Cek duplikasi
  if (this.penumpang.includes(nama)) {
    console.log(`[DITOLAK]: Penumpang '${nama}' sudah ada di dalam angkot!`);
    return false;
  }

  // Cari kursi kosong (undefined) di tengah
  for (let i = 0; i < this.penumpang.length; i++) {
    if (this.penumpang[i] === undefined) {
      this.penumpang[i] = nama;
      console.log(`[NAIK]: ${nama} duduk di kursi kosong (Kursi ${i + 1}).`);
      return this.penumpang;
    }
  }

  // Cek batas kapasitas
  if (this.penumpang.length >= this.kapasitas) {
    console.log(
      `[PENUH]: Maaf ${nama}, angkot trayek ${this.trayek.join('-')} sudah penuh!`,
    );
    return false;
  }

  // Tambah di kursi belakang
  this.penumpang.push(nama);
  console.log(`[NAIK]: ${nama} duduk di kursi ${this.penumpang.length}.`);
  return this.penumpang;
};

// Method 2: Penumpang Turun & Pembayaran Ongkos
Angkot.prototype.penumpangTurun = function (nama, ongkos) {
  if (this.penumpang.length === 0) {
    console.log('[PERINGATAN]: Angkot masih kosong!');
    return false;
  }

  for (let i = 0; i < this.penumpang.length; i++) {
    if (this.penumpang[i] === nama) {
      this.penumpang[i] = undefined; // Kursi kosong kembali
      this.kas += ongkos; // Kas bertambah
      console.log(
        `[TURUN]: ${nama} turun dan membayar ongkos Rp ${ongkos.toLocaleString('id-ID')}.`,
      );
      return this.penumpang;
    }
  }

  console.log(`[GAGAL]: Penumpang '${nama}' tidak ada di angkot ini.`);
  return false;
};

// Method 3: Ringkasan Status Armada
Angkot.prototype.infoArmada = function () {
  const aktif = this.penumpang.filter(Boolean);
  return `Angkot [${this.sopir}] | Rute: ${this.trayek.join(' -> ')} | Penumpang: ${aktif.length}/${this.kapasitas} | Kas: Rp ${this.kas.toLocaleString('id-ID')}`;
};

// SIMULASI ALUR OPERASIONAL ARMADA
console.log('\n--- Inisialisasi Armada ---');
const angkot1 = new Angkot('Pak Joko', ['Cicaheum', 'Cibiru'], 0, 3);
console.log(angkot1.infoArmada());

console.log('\n--- Alur Penumpang Naik ---');
angkot1.penumpangNaik('Budi');
angkot1.penumpangNaik('Siti');
angkot1.penumpangNaik('Dewi');
angkot1.penumpangNaik('Andi'); // Uji coba kapasitas penuh (maks 3)
console.log(angkot1.infoArmada());

console.log('\n--- Alur Penumpang Turun & Pembayaran ---');
angkot1.penumpangTurun('Siti', 5000);
console.log(angkot1.infoArmada());

console.log('\n--- Penumpang Baru Mengisi Kursi Kosong ---');
angkot1.penumpangNaik('Ahmad'); // Mengisi kursi kosong bekas Siti
console.log(angkot1.infoArmada());
