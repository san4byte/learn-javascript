// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. 'this' di dalam Method Objek ---");
const akunPengguna = {
  nama: 'Joko Santoso',
  saldo: 1500000,

  tampilkanInfo: function () {
    // 'this' menunjuk ke objek akunPengguna
    console.log(
      `Pemilik: ${this.nama} | Saldo: Rp ${this.saldo.toLocaleString('id-ID')}`
    );
  },
};

akunPengguna.tampilkanInfo();

console.log("\n--- 2. 'this' di dalam Constructor Function ---");
function Mobil(merk) {
  // 'this' mengacu pada instance mobil yang baru diciptakan
  this.merk = merk;
  this.klakson = function () {
    console.log(`Brum brum! Mobil ${this.merk} membunyikan klakson.`);
  };
}

const avanza = new Mobil('Toyota');
avanza.klakson();

console.log("\n--- 3. Mengikat 'this' secara Eksplisit dengan bind() ---");
const fungsiLepas = akunPengguna.tampilkanInfo;
// Jika dipanggil langsung: fungsiLepas(); -> this.nama undefined!

// Kita ikat kembali nilai 'this' ke akunPengguna:
const fungsiTerikat = fungsiLepas.bind(akunPengguna);
fungsiTerikat();
