/**
 * 16 - Iterable dan Iterator Protocol
 *
 * Demonstrasi lengkap Iteration Protocols di JavaScript:
 * 1. Implementasi manual kontrak Iterable & Iterator (Counter)
 * 2. Konsumsi protokol: for...of, Spread operator (...), Destructuring, Array.from()
 * 3. Custom Collection Enkapsulasi (ProductCatalog)
 * 4. Implementasi modern menggunakan Generator Method (*[Symbol.iterator]() & yield)
 * 5. Lazy Evaluation: Deret tak hingga (Infinite Fibonacci Generator) hemat memori
 * 6. Method iterator opsional: return() untuk cleanup saat break/keluar dini
 */

console.log('=== 1. Implementasi Manual Kontrak Iterable & Iterator ===');
class RentangAngka {
  constructor(dari, sampai) {
    this.dari = dari;
    this.sampai = sampai;
  }

  // Kontrak Iterable: Menyediakan method ber-symbol [Symbol.iterator]()
  [Symbol.iterator]() {
    let saatIni = this.dari;
    const batas = this.sampai;

    // Kontrak Iterator: Mengembalikan objek dengan method next()
    return {
      next() {
        if (saatIni <= batas) {
          return { value: saatIni++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const deret = new RentangAngka(1, 4);

console.log('Konsumsi via for...of:');
for (const angka of deret) {
  console.log(`- Angka: ${angka}`);
}
console.log();

console.log('=== 2. Konsumen Protokol Iterasi di JavaScript ===');
// a. Spread Operator
const arrayAngka = [...deret];
console.log('Spread [...deret]           :', arrayAngka);

// b. Destructuring Assignment
const [pertama, kedua] = deret;
console.log('Destructuring [pertama, ...] :', pertama, kedua);

// c. Array.from()
const dariArray = Array.from(deret);
console.log('Array.from(deret)            :', dariArray);

// d. new Set()
const himpunan = new Set(deret);
console.log('new Set(deret)               :', himpunan);
console.log();

console.log('=== 3. Custom Collection Enkapsulasi (Katalog Produk) ===');
class KatalogProduk {
  #daftar = [];

  tambah(nama, harga) {
    this.#daftar.push({ nama, harga });
  }

  // Mengekspos item secara aman melalui protokol iterasi
  [Symbol.iterator]() {
    let indeks = 0;
    const items = this.#daftar;

    return {
      next() {
        if (indeks < items.length) {
          return { value: items[indeks++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const katalog = new KatalogProduk();
katalog.tambah('Laptop Ultra', 18_000_000);
katalog.tambah('Mouse Ergonomis', 450_000);

for (const item of katalog) {
  console.log(`Produk: ${item.nama} | Rp${item.harga.toLocaleString('id-ID')}`);
}
console.log();

console.log('=== 4. Pendekatan Modern: Generator Method (* & yield) ===');
class RakBuku {
  #buku = ['Clean Code', 'Design Patterns', 'Refactoring'];

  // Generator otomatis mengembalikan objek Iterator yang mematuhi protokol
  *[Symbol.iterator]() {
    for (const judul of this.#buku) {
      yield judul; // Membungkus nilai ke { value, done: false } secara otomatis
    }
  }
}

const rak = new RakBuku();
for (const judul of rak) {
  console.log(`Buku: ${judul}`);
}
console.log();

console.log('=== 5. Lazy Evaluation: Deret Fibonacci Tak Hingga ===');
class GeneratorFibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

const deretFibo = new GeneratorFibonacci();
const hasilFibo = [];

// Konsumsi deret tak terhingga secukupnya menggunakan break
for (const n of deretFibo) {
  hasilFibo.push(n);
  if (hasilFibo.length >= 8) break; // Berhenti setelah 8 angka
}

console.log('8 Bilangan Fibonacci Pertama:', hasilFibo);
console.log();

console.log('=== 6. Cleanup Resource saat Keluar Dini via return() ===');
class StreamSensor {
  [Symbol.iterator]() {
    let aktif = true;
    let hitung = 1;

    return {
      next() {
        if (aktif && hitung <= 5) {
          return { value: `DataSensor-${hitung++}`, done: false };
        }
        return { value: undefined, done: true };
      },
      // Dipanggil otomatis oleh engine jika loop dihentikan oleh break / throw
      return() {
        console.log(
          '-> [Cleanup]: Loop dihentikan dini, koneksi sensor ditutup!',
        );
        aktif = false;
        return { value: undefined, done: true };
      },
    };
  }
}

for (const sample of new StreamSensor()) {
  console.log('Membaca:', sample);
  if (sample === 'DataSensor-2') {
    console.log('Kondisi terpenuhi, melakukan break...');
    break; // Mematikan iterator & memicu method return()
  }
}
