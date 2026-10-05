# 15 - Custom Error Class

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Membuat class error khusus dengan mewarisi class `Error` bawaan JavaScript (`class MyError extends Error`).
> * **Kapan Digunakan**: Membedakan berbagai jenis kegagalan aplikasi secara spesifik untuk penanganan yang tepat sasaran.
> * **Aturan Praktis**: Panggil `super(message)` di constructor dan tetapkan `this.name = this.constructor.name`.

## 1. 🎯 Tujuan Belajar
- Memahami cara membuat class Error kustom dengan mewarisi class bawaan (`extends Error`).
- Menambahkan informasi kontekstual tambahan pada objek error (seperti field input yang salah atau kode status HTTP).
- Menggunakan operator `instanceof` di blok `catch` untuk menangani berbagai tipe error secara spesifik.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **kode darurat rumah sakit**: Alih-alih hanya berteriak 'Ada masalah!', staf menggunakan kode spesifik seperti *Code Blue* (jantung) atau *Code Red* (kebakaran), sehingga tim medis yang datang membawa perlengkapan yang tepat sasaran.

Class `Error` bawaan JavaScript hanya memiliki properti standar seperti `message` dan `name`.
Di aplikasi nyata, kita sering membutuhkan informasi error yang lebih spesifik. Kita dapat membuat **Custom Error Class**:
1. Buat class baru dengan `class ValidationError extends Error`.
2. Panggil `super(message)` di constructor agar stack trace terbentuk sempurna.
3. Tambahkan properti khusus, seperti `this.field = field` atau `this.statusCode = 404`.
4. Di dalam blok `catch`, gunakan `if (error instanceof ValidationError)` untuk membedakan perlakuan penanganan error.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Custom Error Class (Membuat jenis class error sendiri dengan extends Error)

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
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
  MathUtils.sum('bukan angka');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`[VALIDASI GAGAL] Pada field '${error.field}': ${error.message}`);
  } else {
    console.error(`[SISTEM ERROR]: ${error.message}`);
  }
}
```

---

## 4. 🖥️ Output yang Diharapkan
```text
[VALIDASI GAGAL] Pada field 'element': Nilai 'bukan angka' harus berupa number!
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Penanganan respons API backend (`ValidationError`, `UnauthorizedError`, `DatabaseConnectionError`) dan form error rendering di frontend.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Memanggil `super(message)`**: Menyebabkan properti `message` kosong dan jejak stack trace rusak.
* **Tidak Menyesuaikan `this.name`**: Jika `this.name` tidak diubah, nama error yang tercetak akan tetap `Error` biasa alih-alih nama class custom Anda.

### 🌟 Best Practice
* Bangun arsitektur hierarki error yang rapi untuk aplikasi skala produksi.
* Gabungkan dengan operator `instanceof` di blok `catch` untuk routing error otomatis.

---

## 6. ✍️ Latihan Mandiri
1. Buat `NotFoundError extends Error` yang menerima properti `resourceName` dan `id`. Lempar error ini jika data user tidak ditemukan di database bayangan.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [14 - Error Handling Class](../14-error-handling-class/README.md)
- ➡️ **Selanjutnya:** [16 - Iterable dan Iterator Protocol](../16-iterable-and-iterator/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
