/**
 * 06 - Super Method (Method Overriding & Super)
 *
 * Demonstrasi lengkap pemanggilan method superclass menggunakan super.methodName():
 * 1. Method overriding dasar (menimpa method induk)
 * 2. Memperluas method parent dengan super.methodName()
 * 3. Menangkap dan mengolah return value dari super.methodName()
 * 4. Meneruskan dan mengubah parameter ke super.methodName(arg)
 * 5. Pemanggilan super dalam static method (Static Super)
 * 6. Binding 'this' saat mengeksekusi super.methodName()
 */

console.log('=== 1. Method Overriding Dasar ===');
class Hewan {
  bersuara() {
    return 'Suara hewan umum';
  }
}

class Kucing extends Hewan {
  // Menimpa total tanpa memanggil super.bersuara()
  bersuara() {
    return 'Meong! 🐱';
  }
}

const cat = new Kucing();
console.log(`Suara Kucing: ${cat.bersuara()}\n`);

console.log('=== 2. Memperluas Logika Parent dengan super.methodName() ===');
class Bentuk {
  gambar() {
    console.log('-> Menyiapkan kanvas 2D');
  }
}

class Lingkaran extends Bentuk {
  gambar() {
    super.gambar(); // Jalankan persiapan kanvas induk
    console.log('-> Menggambar lingkaran beradius 10px');
  }
}

const bulatan = new Lingkaran();
bulatan.gambar();
console.log();

console.log('=== 3. Mengolah Return Value dari super.methodName() ===');
class KalkulatorDasar {
  hitungTotal(harga, kuantitas) {
    return harga * kuantitas;
  }
}

class KalkulatorPajak extends KalkulatorDasar {
  hitungTotal(harga, kuantitas, tarifPajak = 0.11) {
    const subtotal = super.hitungTotal(harga, kuantitas);
    const nominalPajak = subtotal * tarifPajak;
    return subtotal + nominalPajak;
  }
}

const calc = new KalkulatorPajak();
const totalBiaya = calc.hitungTotal(100000, 2); // 200rb + PPN 11% (22rb) = 222rb
console.log(
  `Total tagihan setelah pajak: Rp${totalBiaya.toLocaleString('id-ID')}\n`,
);

console.log('=== 4. Parameter Forwarding & Modifikasi Argumen ===');
class Logger {
  log(pesan) {
    console.log(`[LOG SYSTEM]: ${pesan}`);
  }
}

class TimestampLogger extends Logger {
  log(pesan) {
    const timestamp = new Date().toISOString();
    // Memodifikasi parameter sebelum diteruskan ke super
    super.log(`[${timestamp}] ${pesan}`);
  }
}

const logger = new TimestampLogger();
logger.log('Aplikasi berhasil dimulai.');
console.log();

console.log('=== 5. Pemanggilan super dalam Static Method ===');
class ApiClient {
  static getBaseUrl() {
    return 'https://api.example.com/v1';
  }
}

class UserApiClient extends ApiClient {
  static getEndpoint() {
    // Mengakses static method milik parent class via super
    return `${super.getBaseUrl()}/users`;
  }
}

console.log(`Endpoint Pengguna: ${UserApiClient.getEndpoint()}\n`);

console.log("=== 6. Binding 'this' di Dalam super.methodName() ===");
class Pengguna {
  constructor(nama) {
    this.nama = nama;
  }

  perkenalkan() {
    return `Halo, nama saya ${this.nama}`;
  }
}

class Pelajar extends Pengguna {
  constructor(nama, sekolah) {
    super(nama);
    this.sekolah = sekolah;
  }

  perkenalkan() {
    // Di dalam super.perkenalkan(), 'this' tetap merujuk ke instance Pelajar
    const salamDasar = super.perkenalkan();
    return `${salamDasar}, saya siswa di ${this.sekolah}.`;
  }
}

const siswa = new Pelajar('Andi', 'SMK Negeri 1');
console.log(siswa.perkenalkan());
