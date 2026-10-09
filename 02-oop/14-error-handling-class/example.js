/**
 * 14 - Error Handling Class (Error, throw, try..catch..finally)
 *
 * Demonstrasi lengkap Error Handling berbasis Class di JavaScript:
 * 1. Anatomi class Error bawaan (message, name, stack)
 * 2. Kata kunci throw dan penangkapan di blok try...catch
 * 3. Garansi eksekusi blok finally untuk cleanup
 * 4. Berbagai Subclass Error bawaan (TypeError, RangeError, ReferenceError)
 * 5. Error Re-throwing (Melempar ulang error yang tidak ditangani)
 * 6. Error Chaining dengan opsi 'cause' (ES2022)
 */

console.log('=== 1. Anatomi Objek Error Bawaan ===');
const errStandar = new Error('Koneksi gagal tersambung ke server');
console.log('error.name   :', errStandar.name); // "Error"
console.log('error.message:', errStandar.message); // "Koneksi gagal tersambung ke server"
console.log('error.stack  : Tersedia (' + typeof errStandar.stack + ')\n');

console.log('=== 2. Alur Eksekusi try...catch...finally ===');
function prosesData(angka) {
  let resourceDibuka = true;
  console.log('1. Resource berhasil dibuka.');

  try {
    if (typeof angka !== 'number') {
      throw new TypeError(
        `Input harus berupa number, diterima: ${typeof angka}`
      );
    }
    if (angka < 0) {
      throw new RangeError('Angka tidak boleh negatif!');
    }
    console.log(`2. Proses berhasil: Hasil akar = ${Math.sqrt(angka)}`);
  } catch (err) {
    console.log(`3. [CATCH] Tertangkap error: [${err.name}] ${err.message}`);
  } finally {
    resourceDibuka = false;
    console.log('4. [FINALLY] Resource selalu ditutup dan dibersihkan!');
  }
}

prosesData(16);
console.log('--- Kasus Error ---');
prosesData(-25);
console.log();

console.log('=== 3. Berbagai Subclass Error Bawaan JavaScript ===');
function ujiTipeError(pilihan) {
  try {
    if (pilihan === 1) throw new TypeError('Tipe variabel salah!');
    if (pilihan === 2)
      throw new RangeError('Nilai berada di luar jangkauan aman!');
    if (pilihan === 3) throw new URIError('Format URI rusak!');
  } catch (err) {
    if (err instanceof TypeError) {
      console.log('Menangani TypeError secara khusus.');
    } else if (err instanceof RangeError) {
      console.log('Menangani RangeError secara khusus.');
    } else {
      console.log(`Menangani Error umum: ${err.name}`);
    }
  }
}

ujiTipeError(1);
ujiTipeError(2);
ujiTipeError(3);
console.log();

console.log('=== 4. Error Re-throwing (Melempar Ulang) ===');
function bacaFileKonfigurasi(adaFile) {
  try {
    if (!adaFile) {
      throw new Error('File konfigurasi tidak ditemukan di disk!');
    }
    return '{ "mode": "prod" }';
  } catch (err) {
    console.log('Log lokal dicatat: Gagal membaca file.');
    // Lempar ulang agar layer aplikasi atas dapat mengambil tindakan
    throw err;
  }
}

try {
  bacaFileKonfigurasi(false);
} catch (err) {
  console.log(`Layer Atas menangkap: ${err.message}\n`);
}

console.log("=== 5. Error Chaining dengan Opsi 'cause' (ES2022) ===");
function panggilDatabase() {
  throw new Error('Koneksi TCP terputus!');
}

function prosesCheckout() {
  try {
    panggilDatabase();
  } catch (dbErr) {
    // Membungkus low-level error ke high-level application error
    throw new Error('Checkout gagal diproses', { cause: dbErr });
  }
}

try {
  prosesCheckout();
} catch (orderErr) {
  console.log('Pesan Utama :', orderErr.message);
  console.log('Akar Masalah:', orderErr.cause.message);
}
