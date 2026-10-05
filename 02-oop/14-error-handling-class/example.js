// Penjelasan lengkap dapat dibaca pada README.md
// Error Handling di OOP menggunakan Class Error, throw, try, catch, dan finally

class MathUtils {
  static sum(...numbers) {
    if (numbers.length === 0) {
      // Melempar error menggunakan instance dari class Error
      throw new Error("Parameter numbers harus diisi, tidak boleh kosong!");
    }

    let total = 0;
    for (const number of numbers) {
      if (typeof number !== "number") {
        throw new Error(`Parameter '${number}' bukan tipe number!`);
      }
      total += number;
    }

    return total;
  }
}

// Menangani kemungkinan error secara aman dengan blok try..catch..finally
try {
  console.info("1. Memulai eksekusi di blok try");
  const hasil = MathUtils.sum(); // Ini akan melempar Error
  console.info("2. Baris ini tidak akan pernah dieksekusi jika terjadi error:", hasil);
} catch (error) {
  // Blok catch menangkap objek error
  console.error("3. Terjadi Error:", error.message);
} finally {
  // Blok finally SELALU dijalankan apapun yang terjadi
  console.info("4. Blok finally selesai dijalankan.");
}

console.info("5. Aplikasi tetap berjalan normal tanpa crash!");
