// Penjelasan lengkap dapat dibaca pada README.md
// Custom Error Class (Membuat jenis class error sendiri dengan extends Error)

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field; // Menyimpan info field formulir mana yang salah
  }
}

class MathUtils {
  static sum(...numbers) {
    if (numbers.length === 0) {
      throw new ValidationError('Daftar angka tidak boleh kosong!', 'numbers');
    }

    let total = 0;
    for (const number of numbers) {
      if (typeof number !== 'number') {
        throw new ValidationError(`Nilai '${number}' harus berupa number!`, 'element');
      }
      total += number;
    }

    return total;
  }
}

try {
  const hasil = MathUtils.sum('bukan angka');
  console.info(hasil);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`[VALIDASI GAGAL] Pada field '${error.field}': ${error.message}`);
  } else {
    console.error(`[SISTEM ERROR]: ${error.message}`);
  }
} finally {
  console.info('Pengecekan kalkulasi selesai.');
}
