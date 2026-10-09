/**
 * 05 - Super Constructor
 *
 * Demonstrasi lengkap pemanggilan super constructor di JavaScript:
 * 1. Pemanggilan dasar super() dan inisialisasi properti induk
 * 2. Aturan pemanggilan super() sebelum mengakses 'this' (ReferenceError demo)
 * 3. Meneruskan argumen (Parameter forwarding) dan rest parameter
 * 4. Perilaku default constructor ketika subclass tidak menulis constructor
 * 5. Menambahkan properti baru khusus subclass setelah super()
 * 6. Evaluasi ekspresi sebelum super() dipanggil
 */

console.log('=== 1. Pemanggilan Dasar super() ===');
class Karyawan {
  constructor(nama, departemen) {
    this.nama = nama;
    this.departemen = departemen;
    console.log(
      `[Superclass] Constructor Karyawan dijalankan untuk: ${this.nama}`,
    );
  }

  getInfo() {
    return `${this.nama} (${this.departemen})`;
  }
}

class Manajer extends Karyawan {
  constructor(nama, departemen, totalBawahan) {
    // Memanggil constructor Karyawan
    super(nama, departemen);
    this.totalBawahan = totalBawahan;
    console.log(
      `[Subclass] Constructor Manajer dijalankan untuk: ${this.nama}`,
    );
  }
}

const pakBudi = new Manajer('Budi Santoso', 'Teknologi', 12);
console.log(
  `Info: ${pakBudi.getInfo()}, Bawahan: ${pakBudi.totalBawahan} orang\n`,
);

console.log("=== 2. Aturan Akses 'this' Sebelum super() ===");
class ParentTest {
  constructor(id) {
    this.id = id;
  }
}

class BrokenChild extends ParentTest {
  constructor(id) {
    // Sengaja mencoba mengakses 'this' sebelum memanggil super()
    try {
      // eval/simulasi untuk menangkap ReferenceError
      // Di ES6 class, baris `this.id = id; super(id);` akan memicu ReferenceError pada waktu eksekusi
      throw new ReferenceError(
        "Must call super constructor in derived class before accessing 'this'",
      );
    } catch (err) {
      console.log(`Tertangkap Error yang diharapkan: ${err.message}`);
    }
    super(id);
  }
}

const safeInstance = new BrokenChild('ID-001');
console.log(
  `Instance berhasil dibuat setelah super(): id = ${safeInstance.id}\n`,
);

console.log('=== 3. Parameter Forwarding & Rest Parameter ===');
class RekeningBank {
  constructor(nomorRekening, saldoAwal) {
    this.nomorRekening = nomorRekening;
    this.saldo = saldoAwal;
  }
}

class RekeningPrioritas extends RekeningBank {
  constructor(levelPrivilege, ...rekeningArgs) {
    // Meneruskan argumen dinamis ke superclass
    super(...rekeningArgs);
    this.levelPrivilege = levelPrivilege;
  }
}

const vip = new RekeningPrioritas('Platinum', 'ACC-889900', 50_000_000);
console.log(
  `Nomor: ${vip.nomorRekening}, Saldo: Rp${vip.saldo.toLocaleString()}, Level: ${vip.levelPrivilege}\n`,
);

console.log('=== 4. Perilaku Default Constructor Subclass ===');
class Hewan {
  constructor(nama, habitat) {
    this.nama = nama;
    this.habitat = habitat;
  }
}

// Subclass TIDAK menulis constructor sama sekali:
// JS engine otomatis menyediakan: constructor(...args) { super(...args); }
class Ikan extends Hewan {
  berenang() {
    return `${this.nama} berenang di ${this.habitat}.`;
  }
}

const cupang = new Ikan('Cupang Emas', 'Air Tawar');
console.log(cupang.berenang());
console.log(`Nama: ${cupang.nama}, Habitat: ${cupang.habitat}\n`);

console.log('=== 5. Menambah Properti Khusus Subclass ===');
class Produk {
  constructor(sku, harga) {
    this.sku = sku;
    this.harga = harga;
  }
}

class ProdukDigital extends Produk {
  constructor(sku, harga, downloadLink, fileSizeBytes) {
    super(sku, harga);
    // Inisialisasi properti unik milik child class
    this.downloadLink = downloadLink;
    this.fileSizeBytes = fileSizeBytes;
  }

  getSizeMB() {
    return (this.fileSizeBytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}

const ebook = new ProdukDigital(
  'EBOOK-JS-01',
  150000,
  'https://download.id/js-mastery.pdf',
  5242880,
);
console.log(
  `SKU: ${ebook.sku}, Harga: Rp${ebook.harga}, Size: ${ebook.getSizeMB()}\n`,
);

console.log('=== 6. Evaluasi Ekspresi Sebelum super() ===');
class Kendaraan {
  constructor(kodeIdentifikasi) {
    this.kodeIdentifikasi = kodeIdentifikasi;
  }
}

function generateUUID(prefix) {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

class Pesawat extends Kendaraan {
  constructor(maskapai) {
    // Memanggil helper function langsung di argumen super()
    super(generateUUID(`AIR-${maskapai.toUpperCase()}`));
    this.maskapai = maskapai;
  }
}

const boeing = new Pesawat('Garuda');
console.log(
  `Pesawat: ${boeing.maskapai}, Kode Registrasi: ${boeing.kodeIdentifikasi}`,
);
