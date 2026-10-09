/**
 * 09 - Private Class Field
 *
 * Demonstrasi lengkap Private Class Field (#) di JavaScript (ES2022):
 * 1. Deklarasi dan manipulasi #field privat di dalam class
 * 2. Ketidakberadaan di Object.keys() / JSON.stringify() (Hard Encapsulation)
 * 3. Pemeriksaan Brand Checking menggunakan operator '#field in object'
 * 4. Batasan pewarisan: Subclass tidak dapat mengakses #field parent
 * 5. Static Private Field (static #field)
 * 6. Demonstrasi SyntaxError saat diakses di luar lingkup class
 */

console.log('=== 1. Deklarasi & Manipulasi Private Field (#) ===');
class RekeningBank {
  // Deklarasi private field
  #saldo = 0;
  #nomorRekening;

  constructor(nomorRekening, saldoAwal = 0) {
    this.#nomorRekening = nomorRekening;
    this.#saldo = saldoAwal;
  }

  setor(jumlah) {
    if (jumlah <= 0) throw new Error('Jumlah setoran harus lebih dari 0');
    this.#saldo += jumlah;
    console.log(`Setor Rp${jumlah.toLocaleString('id-ID')} berhasil.`);
  }

  tarik(jumlah) {
    if (jumlah > this.#saldo) {
      console.log(
        `Penarikan Rp${jumlah.toLocaleString('id-ID')} gagal: Saldo tidak mencukupi.`,
      );
      return false;
    }
    this.#saldo -= jumlah;
    console.log(`Tarik Rp${jumlah.toLocaleString('id-ID')} berhasil.`);
    return true;
  }

  get ringkasan() {
    return `Rekening: ${this.#nomorRekening}, Saldo: Rp${this.#saldo.toLocaleString('id-ID')}`;
  }
}

const rek = new RekeningBank('ACC-998877', 500_000);
rek.setor(250_000);
rek.tarik(100_000);
rek.tarik(1_000_000); // Gagal
console.log(rek.ringkasan);
console.log();

console.log('=== 2. Hard Encapsulation & Invisibilitas Objek ===');
console.log('Object.keys(rek):', Object.keys(rek));
console.log('JSON.stringify(rek):', JSON.stringify(rek));
console.log(
  'Object.getOwnPropertyNames(rek):',
  Object.getOwnPropertyNames(rek),
);
console.log(
  'rek.#saldo diakses langsung? Akan memicu SyntaxError jika ditulis langsung di kode!',
);
console.log();

console.log("=== 3. Brand Checking dengan Operator '#field in object' ===");
class Validator {
  #secretTag = 'BRAND_VALID';

  static isInstansiSah(target) {
    // Mengecek apakah target memiliki private field #secretTag
    return #secretTag in target;
  }
}

const v1 = new Validator();
const plainObj = { secretTag: 'BRAND_VALID' };

console.log('v1 memiliki #secretTag?', Validator.isInstansiSah(v1)); // true
console.log('plainObj memiliki #secretTag?', Validator.isInstansiSah(plainObj)); // false
console.log();

console.log('=== 4. Batasan Pewarisan pada Subclass ===');
class AkunInduk {
  #kodeRahasia = 'SUPER-SECRET-123';

  getKodeRahasiaTerproteksi() {
    return this.#kodeRahasia; // Boleh via method publik parent
  }
}

class AkunAnak extends AkunInduk {
  cobaAkses() {
    // this.#kodeRahasia -> SyntaxError jika ditulis langsung!
    // Subclass TIDAK BISA mengakses #kodeRahasia milik AkunInduk secara langsung
    return `Akses via induk method: ${this.getKodeRahasiaTerproteksi()}`;
  }
}

const anak = new AkunAnak();
console.log(anak.cobaAkses());
console.log();

console.log('=== 5. Static Private Field (static #field) ===');
class Otentikasi {
  static #API_KEY = 'SECRET-API-KEY-XYZ-999';

  static validasiToken(tokenInput) {
    return tokenInput === this.#API_KEY;
  }
}

console.log("Otentikasi token 'SALAH':", Otentikasi.validasiToken('SALAH')); // false
console.log(
  'Otentikasi token asli:',
  Otentikasi.validasiToken('SECRET-API-KEY-XYZ-999'),
); // true
// Otentikasi.#API_KEY -> SyntaxError jika diakses di luar class
