// Penjelasan lengkap dapat dibaca pada README.md
// Static Method (Fungsi utility pembantu yang dipanggil langsung dari Class tanpa 'new')

class MathUtils {
  static sum(...numbers) {
    let total = 0;
    for (const number of numbers) {
      total += number;
    }
    return total;
  }

  static multiply(a, b) {
    return a * b;
  }
}

// Dipanggil langsung dari nama Class tanpa perlu instansiasi 'new MathUtils()'
const total = MathUtils.sum(1, 2, 3, 4, 5);
console.info('Hasil MathUtils.sum:', total);

const hasilKali = MathUtils.multiply(10, 5);
console.info('Hasil MathUtils.multiply:', hasilKali);
