/**
 * 13 - Static Method
 *
 * Demonstrasi lengkap Static Method di JavaScript:
 * 1. Fungsi utilitas matematika murni (Utility helpers)
 * 2. Konteks 'this' di dalam static method (merujuk ke Class constructor)
 * 3. Pola Factory Method (Penciptaan objek terkontrol)
 * 4. Pemanggilan antar static method menggunakan 'this'
 * 5. Pewarisan static method dan pemanggilan super di static method
 * 6. Penanganan kesalahan saat memanggil static method dari instance
 */

console.log('=== 1. Fungsi Utilitas Murni (MathUtils) ===');
class MathUtils {
  static sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
  }

  static average(...numbers) {
    if (numbers.length === 0) return 0;
    // Memanggil static method lain di class yang sama via this
    return this.sum(...numbers) / numbers.length;
  }
}

console.log('MathUtils.sum(10, 20, 30):', MathUtils.sum(10, 20, 30)); // 60
console.log('MathUtils.average(10, 20, 30):', MathUtils.average(10, 20, 30)); // 20
console.log();

console.log("=== 2. Konteks 'this' di Dalam Static Method ===");
class CekKonteks {
  static namaKelas = 'CekKonteks';

  static ujiThis() {
    console.log('Apakah this === CekKonteks?', this === CekKonteks); // true
    console.log('Akses static field via this:', this.namaKelas);
  }
}

CekKonteks.ujiThis();
console.log();

console.log('=== 3. Pola Desain Factory Method ===');
class Pengguna {
  constructor(nama, peran, email) {
    this.nama = nama;
    this.peran = peran;
    this.email = email;
  }

  // Factory 1: Membuat instance tamu anonim
  static buatAnonim() {
    return new this('Tamu', 'GUEST', 'guest@example.com');
  }

  // Factory 2: Mengonversi payload JSON menjadi instance sah
  static dariJSON(jsonStr) {
    const data = JSON.parse(jsonStr);
    return new this(data.nama, data.peran, data.email);
  }
}

const tamu = Pengguna.buatAnonim();
console.log('Instance dari factory buatAnonim():', tamu);

const userDariJson = Pengguna.dariJSON(
  '{"nama":"Joko","peran":"ADMIN","email":"joko@code.id"}'
);
console.log('Instance dari factory dariJSON():', userDariJson);
console.log(
  'Apakah userDariJson instance Pengguna?',
  userDariJson instanceof Pengguna
); // true
console.log();

console.log('=== 4. Pewarisan Static Method & Pemanggilan super ===');
class LayananDasar {
  static formatRespon(data) {
    return { status: 200, payload: data };
  }
}

class LayananKatalog extends LayananDasar {
  static formatRespon(data) {
    // Memperkaya respon induk menggunakan super.formatRespon()
    const responInduk = super.formatRespon(data);
    return {
      ...responInduk,
      service: 'CATALOG_SERVICE',
      timestamp: Date.now(),
    };
  }
}

const responKatalog = LayananKatalog.formatRespon(['Produk A', 'Produk B']);
console.log('Respon Static Warisan:', responKatalog);
console.log();

console.log('=== 5. Penanganan Error Akses via Instance ===');
const objMath = new MathUtils();
try {
  objMath.sum(1, 2); // Error! Static method tidak ada di instance prototype
} catch (err) {
  console.log(
    `Error pemanggilan lewat instance: ${err.name} -> ${err.message}`
  );
}
