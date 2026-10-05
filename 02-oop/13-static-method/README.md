# 13 - Static Method

## Tujuan Belajar
- Memahami konsep **Static Method** pada JavaScript Class.
- Membuat fungsi-fungsi utilitas (*helper/utility functions*) yang terorganisir di dalam class.
- Memahami mengapa method statis tidak membutuhkan instansiasi objek (`new`).

## Penjelasan Konsep
Method statis adalah fungsi yang didefinisikan di dalam class menggunakan kata kunci **`static`**:
1. Method ini tidak membutuhkan state internal dari instance objek.
2. Tidak dapat mengakses `this` milik instance objek (di dalam static method, `this` merujuk ke Class itu sendiri).
3. Sangat cocok dijadikan sebagai kumpulan fungsi utilitas murni (*pure helper functions*).
4. Contoh bawaan JavaScript: `Math.floor()`, `Math.random()`, `Array.from()`, `Object.keys()`.

## Contoh Kode
```javascript
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

const total = MathUtils.sum(1, 2, 3, 4, 5);
console.info("Hasil MathUtils.sum:", total);
```

### Output
```text
Hasil MathUtils.sum: 15
Hasil MathUtils.multiply: 50
```

## Penjelasan Tambahan
- **Kapan Menggunakan Static Method?**:
  Jika suatu fungsi melakukan komputasi umum dan tidak peduli terhadap data properti individual suatu objek, jadikan method tersebut `static`. Ini menghemat memori karena Anda tidak perlu membuat objek baru dengan `new` hanya untuk menjalankan satu baris perhitungan matematika atau pemformatan tanggal.

## Latihan
1. Buat class `DateFormatter` dengan static method `formatIndonesia(date)` yang mengembalikan string tanggal berformat `"DD Bulan YYYY"`.

## Ringkasan Poin Penting
- Static method dipanggil langsung via `NamaClass.namaMethod()`.
- Mengelompokkan fungsi pembantu tanpa perlu membuat objek instance.

---
[⬅️ Materi Sebelumnya: 12 - Static Field](../12-static-field/README.md) | [Materi Selanjutnya: 14 - Error Handling Class ➡️](../14-error-handling-class/README.md)
