# 14 - Error Handling Class (Error, throw, try..catch..finally)

## Tujuan Belajar
- Memahami penanganan error berbasis OOP di JavaScript.
- Memahami class bawaan **`Error`** dan atribut utamanya (`message`, `stack`).
- Melempar error menggunakan kata kunci **`throw`**.
- Menangkap dan mengisolasi error menggunakan blok **`try...catch...finally`** agar aplikasi tidak *crash*.

## Penjelasan Konsep
Di JavaScript, error direpresentasikan sebagai objek turunan dari class bawaan **`Error`**:
1. **`throw new Error("Pesan error")`**: Menghentikan eksekusi normal dan melempar sinyal kondisi darurat (exception).
2. **`try`**: Blok kode yang diawasi karena berpotensi menimbulkan error.
3. **`catch (error)`**: Blok kode yang otomatis dieksekusi saat error terjadi di blok `try`. Objek `error` menampung pesan kesalahan (`error.message`).
4. **`finally`**: Blok kode yang **pasti selalu dieksekusi**, baik terjadi error maupun tidak. Sangat cocok untuk proses bersih-bersih (*cleanup*), seperti menutup koneksi database atau mematikan animasi loading.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Error Handling di OOP menggunakan Class Error, throw, try, catch, dan finally

class MathUtils {
  static sum(...numbers) {
    if (numbers.length === 0) {
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

try {
  console.info("1. Memulai eksekusi di blok try");
  const hasil = MathUtils.sum(); // Error dilempar di sini
  console.info("2. Hasil:", hasil);
} catch (error) {
  console.error("3. Terjadi Error:", error.message);
} finally {
  console.info("4. Blok finally selesai dijalankan.");
}

console.info("5. Aplikasi tetap berjalan normal tanpa crash!");
```

### Output
```text
1. Memulai eksekusi di blok try
3. Terjadi Error: Parameter numbers harus diisi, tidak boleh kosong!
4. Blok finally selesai dijalankan.
5. Aplikasi tetap berjalan normal tanpa crash!
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti rem darurat pada lift gedung: Jika kabel lift terputus (`throw Error`), sensor darurat aktif (`catch`) dan rem magnetik mencengkeram rel sehingga penumpang selamat. Lampu darurat otomatis menyala untuk evakuasi (`finally`).
- **Mengapa Penting di Proyek Nyata?**:
  Tanpa `try...catch`, satu saja error kecil (seperti data API yang tidak lengkap) akan menghentikan seluruh script JavaScript di halaman web, membuat tombol-tombol lain tidak bisa diklik (*unresponsive*).

## Latihan
1. Buat fungsi `bagi(a, b)` yang melempar `new Error("Tidak bisa membagi dengan angka nol!")` jika `b === 0`. Tangkap error tersebut menggunakan `try...catch`.

## Ringkasan Poin Penting
- Gunakan `throw new Error()` untuk memberi sinyal kesalahan.
- Gunakan `try..catch` untuk menangkal crash aplikasi.
- `finally` selalu berjalan untuk aksi penutup (*cleanup*).

---
[⬅️ Materi Sebelumnya: 13 - Static Method](../13-static-method/README.md) | [Materi Selanjutnya: 15 - Custom Error ➡️](../15-custom-error/README.md)
