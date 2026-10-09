/**
 * 12 - Static Field
 *
 * Demonstrasi lengkap Static Field di JavaScript (ES2022):
 * 1. Deklarasi static field & perbandingan akses (Class vs Instance)
 * 2. Mengakses static field dari dalam instance method via this.constructor
 * 3. Pewarisan static field pada subclass (Static Inheritance)
 * 4. Pola Global Counter (Melacak total instance yang dibuat)
 * 5. Pola Enum / Konfigurasi Konstanta
 * 6. Static Initialization Block (static { ... })
 */

console.log('=== 1. Deklarasi Dasar & Pembuktian Akses ===');
class KonfigurasiApp {
  static NAMA_APLIKASI = 'SistemInventaris';
  static VERSI = '2.5.0';
  static TIMEOUT_MS = 5000;
}

const appInst = new KonfigurasiApp();

// Static field HANYA ada di class, bukan di instance:
console.log(
  'Akses via instance (appInst.NAMA_APLIKASI):',
  appInst.NAMA_APLIKASI
); // undefined
console.log(
  'Akses via Class (KonfigurasiApp.NAMA_APLIKASI):',
  KonfigurasiApp.NAMA_APLIKASI
); // "SistemInventaris"
console.log(
  `Versi: ${KonfigurasiApp.VERSI}, Timeout: ${KonfigurasiApp.TIMEOUT_MS}ms\n`
);

console.log('=== 2. Mengakses Static Field dari Instance Method ===');
class Pengguna {
  static TOTAL_PENGGUNA = 0;

  constructor(nama) {
    this.nama = nama;
    // Mengakses static field menggunakan this.constructor atau Pengguna
    this.constructor.TOTAL_PENGGUNA++;
  }

  getInfo() {
    return `${this.nama} (Daftar bersama ${this.constructor.TOTAL_PENGGUNA} pengguna aktif)`;
  }
}

const user1 = new Pengguna('Andi');
const user2 = new Pengguna('Budi');
const user3 = new Pengguna('Cici');

console.log(user1.getInfo());
console.log('Total pengguna terdaftar:', Pengguna.TOTAL_PENGGUNA);
console.log();

console.log('=== 3. Pewarisan Static Field pada Subclass ===');
class Database {
  static DRIVER = 'PostgreSQL';
  static DEFAULT_PORT = 5432;
}

class ReplicaDatabase extends Database {
  // Mewarisi static field Database
  static ROLE = 'Read-Replica';
}

console.log('Replica DRIVER      :', ReplicaDatabase.DRIVER); // "PostgreSQL" (diwarisi!)
console.log('Replica DEFAULT_PORT:', ReplicaDatabase.DEFAULT_PORT); // 5432 (diwarisi!)
console.log('Replica ROLE        :', ReplicaDatabase.ROLE); // "Read-Replica"
console.log();

console.log('=== 4. Pola Enum / Konstanta Nilai Tetap ===');
class StatusPesanan {
  static PENDING = 'MENUNGGU_PEMBAYARAN';
  static DIPROSES = 'SEDANG_DIPROSES';
  static DIKIRIM = 'DALAM_PENGIRIMAN';
  static SELESAI = 'SELESAI';
}

function prosesPesanan(status) {
  switch (status) {
    case StatusPesanan.PENDING:
      return 'Silakan selesaikan pembayaran Anda.';
    case StatusPesanan.DIPROSES:
      return 'Pesanan sedang disiapkan penjual.';
    case StatusPesanan.SELESAI:
      return 'Transaksi telah berhasil.';
    default:
      return 'Status tidak dikenali.';
  }
}

console.log(prosesPesanan(StatusPesanan.PENDING));
console.log(prosesPesanan(StatusPesanan.SELESAI));
console.log();

console.log('=== 5. Static Initialization Block (ES2022) ===');
class KonektorLayanan {
  static API_KEY;
  static READY = false;

  // Blok inisialisasi statis: dieksekusi saat class pertama kali dimuat
  static {
    try {
      this.API_KEY = 'PROD-SECRET-' + Math.floor(Math.random() * 1000);
      this.READY = true;
      console.log('-> Static init block: Berhasil inisialisasi API key!');
    } catch (e) {
      this.READY = false;
    }
  }
}

console.log(
  `Layanan Siap: ${KonektorLayanan.READY}, Kunci: ${KonektorLayanan.API_KEY}`
);
