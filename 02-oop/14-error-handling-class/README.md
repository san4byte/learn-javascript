# 14 - Error Handling Class (Error, throw, try..catch..finally)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menangani kesalahan program secara anggun menggunakan `try`, `catch`, `finally`, serta melemparkan error via `throw`.
> - **Kapan Digunakan**: Mencegah aplikasi web crash saat terjadi error tidak terduga dan membersihkan resource kerja.
> - **Aturan Praktis**: Selalu lemparkan objek `new Error('pesan')`, bukan string biasa.

## 1. 🎯 Tujuan Belajar

- Memahami penanganan error berbasis OOP di JavaScript.
- Memahami class bawaan **`Error`** dan atribut utamanya (`message`, `stack`).
- Melempar error menggunakan kata kunci **`throw`**.
- Menangkap dan mengisolasi error menggunakan blok **`try...catch...finally`** agar aplikasi tidak _crash_.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti **sistem rem darurat pada lift gedung**: Jika sensor mendeteksi kabel putus (`throw Error`), rem magnetik darurat langsung mencengkeram rel agar kereta lift tidak jatuh bebas (`catch`), dan lampu darurat tetap menyala untuk evakuasi aman (`finally`).

Di JavaScript, error direpresentasikan sebagai objek turunan dari class bawaan **`Error`**:

1. **`throw new Error("Pesan error")`**: Menghentikan eksekusi normal dan melempar sinyal kondisi darurat (exception).
2. **`try`**: Blok kode yang diawasi karena berpotensi menimbulkan error.
3. **`catch (error)`**: Blok kode yang otomatis dieksekusi saat error terjadi di blok `try`. Objek `error` menampung pesan kesalahan (`error.message`).
4. **`finally`**: Blok kode yang **pasti selalu dieksekusi**, baik terjadi error maupun tidak. Sangat cocok untuk proses bersih-bersih (_cleanup_), seperti menutup koneksi database atau mematikan animasi loading.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Error Handling di OOP menggunakan Class Error, throw, try, catch, dan finally

class MathUtils {
  static sum(...numbers) {
    if (numbers.length === 0) {
      throw new Error('Parameter numbers harus diisi, tidak boleh kosong!');
    }

    let total = 0;
    for (const number of numbers) {
      if (typeof number !== 'number') {
        throw new Error(`Parameter '${number}' bukan tipe number!`);
      }
      total += number;
    }
    return total;
  }
}

try {
  console.info('1. Memulai eksekusi di blok try');
  const hasil = MathUtils.sum(); // Error dilempar di sini
  console.info('2. Hasil:', hasil);
} catch (error) {
  console.error('3. Terjadi Error:', error.message);
} finally {
  console.info('4. Blok finally selesai dijalankan.');
}

console.info('5. Aplikasi tetap berjalan normal tanpa crash!');
```

---

## 4. 🖥️ Output yang Diharapkan

```text
1. Memulai eksekusi di blok try
3. Terjadi Error: Parameter numbers harus diisi, tidak boleh kosong!
4. Blok finally selesai dijalankan.
5. Aplikasi tetap berjalan normal tanpa crash!
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

Menangani kegagalan request jaringan HTTP, parsing data JSON corrupt, atau validasi form input user.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Silent Failure**: Menangkap error di blok `catch` kosong tanpa log atau aksi penyelamatan (`catch(e) {}`), sehingga bug tersembunyi dan sulit dideteksi.
- **Throwing Non-Error**: Melakukan `throw 'pesan'` (string) alih-alih `throw new Error('pesan')` menghilangkan informasi jejak stack trace.

### 🌟 Best Practice

- Selalu gunakan instance `Error` saat melempar pengecualian.
- Manfaatkan blok `finally` untuk operasi pembersihan (_cleanup_) seperti menutup loading spinner atau koneksi.

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `bagi(a, b)` yang melempar `new Error("Tidak bisa membagi dengan angka nol!")` jika `b === 0`. Tangkap error tersebut menggunakan `try...catch`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [13 - Static Method](../13-static-method/README.md)
- ➡️ **Selanjutnya:** [15 - Custom Error Class](../15-custom-error/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
