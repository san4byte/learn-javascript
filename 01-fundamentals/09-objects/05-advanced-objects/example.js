// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Prototype Inheritance Klasik ---');
function Robot(nama, energi) {
  this.nama = nama;
  this.energi = energi;
}

// Menempelkan method ke Prototype (Hanya dibuat 1 kali di memori!)
Robot.prototype.bekerja = function (jam) {
  this.energi -= jam * 10;
  console.log(`${this.nama} bekerja selama ${jam} jam. Sisa energi: ${this.energi}%`);
};

Robot.prototype.isiUlang = function (tambah) {
  this.energi += tambah;
  console.log(`${this.nama} mengisi ulang baterai. Energi saat ini: ${this.energi}%`);
};

const optimus = new Robot('Optimus Prime', 100);
const bumblebee = new Robot('Bumblebee', 80);

optimus.bekerja(3);
bumblebee.isiUlang(15);

// Membuktikan kedua objek berbagi method yang sama:
console.log('Apakah berbagi method prototype yang sama?', optimus.bekerja === bumblebee.bekerja); // true

console.log('\n--- 2. Pewarisan dengan Object.create() ---');
const cetakanInduk = {
  sapa() {
    return `Halo dari ${this.nama}`;
  }
};

// Membuat objek baru yang mewarisi langsung dari cetakanInduk
const anakRobot = Object.create(cetakanInduk);
anakRobot.nama = 'MiniBot';
console.log(anakRobot.sapa());
