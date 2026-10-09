/**
 * 15 - Custom Error Class
 *
 * Demonstrasi lengkap Custom Error Class di JavaScript:
 * 1. Pembuatan Base Custom Error (AppError extends Error)
 * 2. Menjaga identitas 'name' dan stack trace (Error.captureStackTrace)
 * 3. Spesialisasi Subclass Error (ValidationError, NotFoundError, UnauthorizedError)
 * 4. Penambahan metadata spesifik (statusCode, field, resource, timestamp)
 * 5. Serialisasi toJSON() untuk format response REST API
 * 6. Routing penanganan error secara polimorfis via 'instanceof'
 */

console.log('=== 1. Fondasi Base Custom Error ===');
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name; // Otomatis mengikuti nama class anak
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();

    // Memangkas constructor dari stack trace di engine V8 (Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      success: false,
      error: {
        type: this.name,
        message: this.message,
        statusCode: this.statusCode,
        timestamp: this.timestamp,
      },
    };
  }
}

console.log('=== 2. Spesialisasi Subclass Error Berjenjang ===');
class ValidationError extends AppError {
  constructor(message, field, invalidValue) {
    super(message, 400);
    this.field = field;
    this.invalidValue = invalidValue;
  }

  toJSON() {
    const base = super.toJSON();
    base.error.field = this.field;
    base.error.invalidValue = this.invalidValue;
    return base;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} dengan ID '${id}' tidak ditemukan di database.`, 404);
    this.resource = resource;
    this.id = id;
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Akses ditolak: Token tidak valid atau kedaluwarsa') {
    super(message, 401);
  }
}

console.log('=== 3. Pengujian Pelemparan & Serialisasi JSON ===');
const errNotFound = new NotFoundError('Produk', 'PRD-990');
console.log('Instance NotFoundError:', errNotFound.toJSON());

const errValidation = new ValidationError(
  "Email tidak memiliki karakter '@'",
  'email',
  'joko.gmail.com'
);
console.log('Instance ValidationError:', errValidation.toJSON());
console.log();

console.log('=== 4. Penanganan Polimorfis di Blok catch ===');
function prosesPermintaanPengguna(aksi) {
  try {
    if (aksi === 'LOGIN_GAGAL') {
      throw new UnauthorizedError();
    }
    if (aksi === 'DATA_KOSONG') {
      throw new NotFoundError('Pengguna', 101);
    }
    if (aksi === 'INPUT_RUSAK') {
      throw new ValidationError('Umur harus berupa angka positif', 'umur', -10);
    }
    if (aksi === 'SISTEM_CRASH') {
      throw new Error('Kabel server fisik terputus!');
    }
    console.log('Permintaan berhasil diproses.');
  } catch (error) {
    // Routing error berdasarkan tipe instance
    if (error instanceof ValidationError) {
      console.log(
        `[HTTP 400] Input field '${error.field}' salah: ${error.message}`
      );
    } else if (error instanceof NotFoundError) {
      console.log(
        `[HTTP 404] Resource '${error.resource}' (ID: ${error.id}) tidak ada.`
      );
    } else if (error instanceof UnauthorizedError) {
      console.log(`[HTTP 401] Otentikasi gagal: ${error.message}`);
    } else if (error instanceof AppError) {
      console.log(
        `[HTTP ${error.statusCode}] Kesalahan aplikasi: ${error.message}`
      );
    } else {
      console.log(
        `[HTTP 500] Kesalahan sistem internal tak terduga: ${error.message}`
      );
    }
  }
}

prosesPermintaanPengguna('LOGIN_GAGAL');
prosesPermintaanPengguna('DATA_KOSONG');
prosesPermintaanPengguna('INPUT_RUSAK');
prosesPermintaanPengguna('SISTEM_CRASH');
