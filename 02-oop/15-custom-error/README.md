# 15 - Custom Error Class

## Tujuan Belajar
- Memahami cara membuat class Error kustom dengan mewarisi class bawaan (`extends Error`).
- Menambahkan informasi kontekstual tambahan pada objek error (seperti field input yang salah atau kode status HTTP).
- Menggunakan operator `instanceof` di blok `catch` untuk menangani berbagai tipe error secara spesifik.

## Penjelasan Konsep
Class `Error` bawaan JavaScript hanya memiliki properti standar seperti `message` dan `name`.
Di aplikasi nyata, kita sering membutuhkan informasi error yang lebih spesifik. Kita dapat membuat **Custom Error Class**:
1. Buat class baru dengan `class ValidationError extends Error`.
2. Panggil `super(message)` di constructor agar stack trace terbentuk sempurna.
3. Tambahkan properti khusus, seperti `this.field = field` atau `this.statusCode = 404`.
4. Di dalam blok `catch`, gunakan `if (error instanceof ValidationError)` untuk membedakan perlakuan penanganan error.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Custom Error Class (Membuat jenis class error sendiri dengan extends Error)

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class MathUtils {
  static sum(...numbers) {
    if (numbers.length === 0) {
      throw new ValidationError("Daftar angka tidak boleh kosong!", "numbers");
    }

    let total = 0;
    for (const number of numbers) {
      if (typeof number !== "number") {
        throw new ValidationError(`Nilai '${number}' harus berupa number!`, "element");
      }
      total += number;
    }
    return total;
  }
}

try {
  MathUtils.sum("bukan angka");
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`[VALIDASI GAGAL] Pada field '${error.field}': ${error.message}`);
  } else {
    console.error(`[SISTEM ERROR]: ${error.message}`);
  }
}
```

### Output
```text
[VALIDASI GAGAL] Pada field 'element': Nilai 'bukan angka' harus berupa number!
```

## Penjelasan Tambahan
- **Mengapa Dibutuhkan di Proyek Nyata?**:
  Di backend (Express/NestJS) atau frontend besar, ada banyak ragam error: `NotFoundError`, `UnauthorizedError`, `DatabaseConnectionError`. Dengan Custom Error, frontend bisa otomatis tahu pesan error mana yang perlu ditampilkan ke user (merah di form) dan error mana yang cukup dicatat ke log server.

## Latihan
1. Buat `NotFoundError extends Error` yang menerima properti `resourceName` dan `id`. Lempar error ini jika data user tidak ditemukan di database bayangan.

## Ringkasan Poin Penting
- Custom Error dibuat dengan `extends Error`.
- Selalu panggil `super(message)`.
- Gunakan `instanceof` untuk percabangan penanganan error di blok `catch`.

---
[⬅️ Materi Sebelumnya: 14 - Error Handling Class](../14-error-handling-class/README.md) | [Materi Selanjutnya: 16 - Iterable dan Iterator ➡️](../16-iterable-and-iterator/README.md)
