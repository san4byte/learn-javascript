# 04 - Promise (Konsep Pending, Fulfilled, Rejected)

## 1. 🎯 Tujuan Belajar
- Memahami konsep Promise sebagai objek representasi nilai masa depan.
- Memahami 3 status utama Promise: `pending`, `fulfilled`, dan `rejected`.
- Mampu membuat Promise sendiri menggunakan konstruktor `new Promise()`.
- Menguasai teknik *Promise Chaining* menggunakan `.then()`, `.catch()`, dan `.finally()`.

---

## 2. 📖 Penjelasan Konsep
**Promise** adalah objek yang merepresentasikan keberhasilan atau kegagalan dari suatu operasi asynchronous di masa depan. Promise diciptakan di ES6 untuk menyelesaikan masalah *Callback Hell*.

### 3 Status (States) dari Promise:
1. **`pending`**: Status awal ketika operasi asinkron sedang berlangsung (belum selesai dan belum gagal).
2. **`fulfilled`**: Operasi berhasil diselesaikan dengan baik (memanggil fungsi `resolve(data)`).
3. **`rejected`**: Operasi gagal atau terjadi error (memanggil fungsi `reject(error)`).

Begitu Promise beralih status dari *pending* ke *fulfilled* atau *rejected*, statusnya menjadi **Settled** (tetap) dan tidak dapat diubah lagi.

### Penanganan Hasil:
* `.then(callback)`: Dijalankan ketika Promise berstatus *fulfilled*.
* `.catch(callback)`: Dijalankan ketika Promise berstatus *rejected*.
* `.finally(callback)`: Selalu dijalankan di akhir, baik sukses maupun gagal (sangat berguna untuk mematikan status *loading spinner*).

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Membuat dan Mengonsumsi Promise Sederhana ---");
function verifikasiAkunBank(saldoMinimal) {
  return new Promise((resolve, reject) => {
    console.log("Sedang memverifikasi rekening di sistem pusat...");
    
    setTimeout(() => {
      if (saldoMinimal >= 50000) {
        resolve({ status: "Aktif", pesan: "Rekening valid dan saldo mencukupi." });
      } else {
        reject(new Error("Saldo di bawah ketentuan minimal (Rp 50.000)!"));
      }
    }, 300);
  });
}

// Mengonsumsi Promise dengan .then, .catch, .finally
verifikasiAkunBank(100000)
  .then((hasil) => {
    console.log("[SUKSES]:", hasil.pesan);
    return "Lanjut ke langkah otorisasi"; // Return nilai untuk diteruskan ke .then berikutnya
  })
  .then((pesanLanjutan) => {
    console.log("[CHAINING]:", pesanLanjutan);
  })
  .catch((err) => {
    console.error("[GAGAL]:", err.message);
  })
  .finally(() => {
    console.log("[FINALLY]: Proses verifikasi perbankan selesai ditutup.");
  });

console.log("\n--- 2. Simulasi Promise yang Gagal (Rejected) ---");
verifikasiAkunBank(10000)
  .catch((err) => {
    console.log("[TERTANGKAP DI CATCH]:", err.message);
  });
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Membuat dan Mengonsumsi Promise Sederhana ---
Sedang memverifikasi rekening di sistem pusat...

--- 2. Simulasi Promise yang Gagal (Rejected) ---
Sedang memverifikasi rekening di sistem pusat...
[SUKSES]: Rekening valid dan saldo mencukupi.
[CHAINING]: Lanjut ke langkah otorisasi
[FINALLY]: Proses verifikasi perbankan selesai ditutup.
[TERTANGKAP DI CATCH]: Saldo di bawah ketentuan minimal (Rp 50.000)!
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Promise seperti **struk nomor pesanan di gerai cepat saji (KFC/McDonalds)**: Saat Anda memesan burger di kasir, kasir memberikan struk nomor (Promise) dalam keadaan *pending*. Sambil menunggu pesanan disiapkan, Anda bisa duduk santai di meja. Jika burger siap (*fulfilled*), nomor Anda dipanggil dan Anda menikmati makanan (`.then`). Jika persediaan burger habis (*rejected*), kasir memanggil Anda untuk meminta maaf (`.catch`). Apapun hasilnya, Anda mengembalikan nampan ke tempat sampah (`.finally`).

### 🏢 Real-World Use Case
1. **Fetch Data API**: Fungsi modern `fetch()` di browser mengembalikan Promise.
2. **Database Query**: Library database modern (Prisma, Mongoose, Knex) mengembalikan Promise untuk setiap operasi `select`, `insert`, dan `update`.
3. **Promise.all**: Menjalankan beberapa verifikasi secara paralel (telah dipelajari di Modul 06).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Me-return Nilai di Dalam .then()**: Jika Anda membuat Promise Chaining tetapi lupa menulis `return data`, method `.then()` berikutnya akan menerima nilai `undefined`.
* **Mengabaikan .catch()**: Promise yang di-reject tanpa ada handler `.catch()` akan memicu peringatan fatal `UnhandledPromiseRejection` di Node.js modern.

### 🌟 Best Practice
* Selalu letakkan satu buah `.catch()` di bagian paling akhir dari rantai `.then()` untuk menangkap seluruh kemungkinan error di tingkatan mana pun.
* Gunakan `.finally()` untuk menyembunyikan elemen indikator loading (seperti *spinner*) agar antarmuka tidak macet di layar pengguna.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `beliTiketBioskop(usia)` yang mengembalikan Promise. Jika usia >= 17, `resolve('Tiket Dewasa Diberikan')`; jika usia < 17, `reject('Usia belum mencukupi')`.
2. Uji fungsi tersebut untuk usia 15 dan usia 20 lengkap dengan `.then()`, `.catch()`, dan `.finally()`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [03 - Callbacks dan Callback Hell](../03-callbacks/README.md)
- ➡️ **Selanjutnya:** [05 - Fetch API](../05-fetch/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
