/**
 * 10 - Private Method
 *
 * Demonstrasi lengkap Private Method (#) di JavaScript (ES2022):
 * 1. Private instance method sebagai helper internal
 * 2. Private getter dan setter (#get / #set)
 * 3. Private static method (static #method)
 * 4. Proteksi syntax error saat diakses dari luar
 * 5. Batasan akses private method pada turunan subclass
 */

console.log('=== 1. Private Instance Method sebagai Helper ===');
class AkunKeamanan {
  #percobaanGagal = 0;
  #terkunci = false;

  login(passwordInput, passwordBenar) {
    if (this.#terkunci) {
      return 'Akun terkunci! Hubungi administrator.';
    }

    if (this.#cocokkanHash(passwordInput, passwordBenar)) {
      this.#resetPercobaan();
      return 'Login berhasil! Selamat datang.';
    } else {
      this.#catatKegagalan();
      return `Password salah! Percobaan gagal: ${this.#percobaanGagal}/3`;
    }
  }

  // Private helper method 1: Algoritma internal
  #cocokkanHash(input, benar) {
    return input.trim() === benar.trim();
  }

  // Private helper method 2: State management internal
  #catatKegagalan() {
    this.#percobaanGagal++;
    if (this.#percobaanGagal >= 3) {
      this.#terkunci = true;
      console.log('-> [ALERT]: Akun otomatis dikunci!');
    }
  }

  // Private helper method 3: Cleanup internal
  #resetPercobaan() {
    this.#percobaanGagal = 0;
  }
}

const auth = new AkunKeamanan();
console.log(auth.login('salah1', 'rahasia123'));
console.log(auth.login('salah2', 'rahasia123'));
console.log(auth.login('salah3', 'rahasia123'));
console.log(auth.login('rahasia123', 'rahasia123')); // Akun sudah terkunci
console.log();

console.log('=== 2. Private Getter dan Private Setter ===');
class SuhuSensor {
  #celsius = 0;

  constructor(suhuAwal) {
    this.#suhuInternal = suhuAwal; // Memanggil private setter
  }

  // Private Getter & Setter
  get #suhuInternal() {
    return this.#celsius;
  }

  set #suhuInternal(val) {
    if (val < -273.15) throw new RangeError('Suhu di bawah nol mutlak!');
    this.#celsius = val;
  }

  bacaSuhuCelsius() {
    return `${this.#suhuInternal} °C`;
  }
}

const sensor = new SuhuSensor(25);
console.log(`Sensor: ${sensor.bacaSuhuCelsius()}\n`);

console.log('=== 3. Private Static Method ===');
class PengolahData {
  static prosesData(dataMentah) {
    const dataBersih = this.#bersihkan(dataMentah);
    const dataEnkripsi = this.#enkripsi(dataBersih);
    return `PROCESSED::${dataEnkripsi}`;
  }

  // Helper statis rahasia
  static #bersihkan(str) {
    return str.trim().toLowerCase();
  }

  static #enkripsi(str) {
    return Buffer.from(str).toString('base64');
  }
}

const hasil = PengolahData.prosesData('  Hello World!  ');
console.log(`Hasil pengolahan aman: ${hasil}\n`);

console.log('=== 4. Batasan Subclass pada Private Method ===');
class LayananInduk {
  #logRahasia(pesan) {
    console.log(`[Induk Private Log]: ${pesan}`);
  }

  jalankanAman(pesan) {
    this.#logRahasia(pesan); // Subclass dapat memicu via public method
  }
}

class LayananAnak extends LayananInduk {
  eksekusi(pesan) {
    // this.#logRahasia(pesan); // SyntaxError jika ditulis langsung!
    this.jalankanAman(pesan);
  }
}

const anak = new LayananAnak();
anak.eksekusi('Tugas dimulai dari subclass.');
