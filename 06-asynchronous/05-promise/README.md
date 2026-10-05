# 04 - Promise (Konsep Pending, Fulfilled, Rejected)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami konsep Promise sebagai objek representasi nilai masa depan.
> - **Kapan Digunakan**: Memahami 3 status utama Promise: `pending`, `fulfilled`, dan `rejected`.
> - **Aturan Praktis**: Selalu letakkan satu buah `.catch()` di bagian paling akhir dari rantai `.then()` untuk menangkap seluruh kemungkinan error di tingkatan mana pun.

## 1. 🎯 Tujuan Belajar

- Memahami konsep Promise sebagai objek representasi nilai masa depan.
- Memahami 3 status utama Promise: `pending`, `fulfilled`, dan `rejected`.
- Mampu membuat Promise sendiri menggunakan konstruktor `new Promise()`.
- Menguasai teknik _Promise Chaining_ menggunakan `.then()`, `.catch()`, dan `.finally()`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Promise seperti **struk nomor pesanan di gerai cepat saji (KFC/McDonalds)**: Saat Anda memesan burger di kasir, kasir memberikan struk nomor (Promise) dalam keadaan _pending_. Sambil menunggu pesanan disiapkan, Anda bisa duduk santai di meja. Jika burger siap (_fulfilled_), nomor Anda dipanggil dan Anda menikmati makanan (`.then`). Jika persediaan burger habis (_rejected_), kasir memanggil Anda untuk meminta maaf (`.catch`). Apapun hasilnya, Anda mengembalikan nampan ke tempat sampah (`.finally`).

**Promise** adalah objek yang merepresentasikan keberhasilan atau kegagalan dari suatu operasi asynchronous di masa depan. Promise diciptakan di ES6 untuk menyelesaikan masalah _Callback Hell_.

### 3 Status (States) dari Promise:

1. **`pending`**: Status awal ketika operasi asinkron sedang berlangsung (belum selesai dan belum gagal).
2. **`fulfilled`**: Operasi berhasil diselesaikan dengan baik (memanggil fungsi `resolve(data)`).
3. **`rejected`**: Operasi gagal atau terjadi error (memanggil fungsi `reject(error)`).

Begitu Promise beralih status dari _pending_ ke _fulfilled_ atau _rejected_, statusnya menjadi **Settled** (tetap) dan tidak dapat diubah lagi.

### Penanganan Hasil (Instance Methods):

- `.then(callback)`: Dijalankan ketika Promise berstatus _fulfilled_.
- `.catch(callback)`: Dijalankan ketika Promise berstatus _rejected_.
- `.finally(callback)`: Selalu dijalankan di akhir, baik sukses maupun gagal (sangat berguna untuk mematikan status _loading spinner_).

### Tabel Referensi Lengkap Static Methods `Promise` Combinator

| Method Statis                   | Syarat Fulfilled (Resolve)                                          | Syarat Rejected (Fail)                                      | Kasus Penggunaan Ideal                                                        |
| :------------------------------ | :------------------------------------------------------------------ | :---------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **`Promise.all([...])`**        | **Semua** promise harus fulfilled                                   | Segera rejected jika **satu saja** gagal (_fail-fast_)      | Menjalankan request paralel yang saling bergantung (semua harus sukses)       |
| **`Promise.allSettled([...])`** | Selalu fulfilled setelah **semua selesai** (baik sukses/gagal)      | Tidak pernah rejected                                       | Dashboard analitik (tampilkan widget yang sukses, beri peringatan yang gagal) |
| **`Promise.race([...])`**       | Mengambil hasil dari promise yang **paling cepat selesai**          | Mengambil reject dari promise yang **paling cepat gagal**   | Mengimplementasikan sistem _request timeout_                                  |
| **`Promise.any([...])`**        | Mengambil hasil dari promise yang **pertama kali fulfilled/sukses** | Rejected hanya jika **seluruhnya gagal** (`AggregateError`) | Mengambil data dari server mirror tercepat                                    |
| **`Promise.resolve(val)`**      | Menghasilkan promise yang langsung berstatus fulfilled              | -                                                           | Mengubah nilai sinkron instan menjadi Promise                                 |
| **`Promise.reject(err)`**       | -                                                                   | Menghasilkan promise yang langsung berstatus rejected       | Memicu penolakan error secara instan                                          |

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Membuat dan Mengonsumsi Promise Sederhana ---');
function verifikasiAkunBank(saldoMinimal) {
  return new Promise((resolve, reject) => {
    console.log('Sedang memverifikasi rekening di sistem pusat...');

    setTimeout(() => {
      if (saldoMinimal >= 50000) {
        resolve({
          status: 'Aktif',
          pesan: 'Rekening valid dan saldo mencukupi.',
        });
      } else {
        reject(new Error('Saldo di bawah ketentuan minimal (Rp 50.000)!'));
      }
    }, 300);
  });
}

// Mengonsumsi Promise dengan .then, .catch, .finally
verifikasiAkunBank(100000)
  .then((hasil) => {
    console.log('[SUKSES]:', hasil.pesan);
    return 'Lanjut ke langkah otorisasi'; // Return nilai untuk diteruskan ke .then berikutnya
  })
  .then((pesanLanjutan) => {
    console.log('[CHAINING]:', pesanLanjutan);
  })
  .catch((err) => {
    console.error('[GAGAL]:', err.message);
  })
  .finally(() => {
    console.log('[FINALLY]: Proses verifikasi perbankan selesai ditutup.');
  });

console.log('\n--- 2. Simulasi Promise yang Gagal (Rejected) ---');
verifikasiAkunBank(10000).catch((err) => {
  console.log('[TERTANGKAP DI CATCH]:', err.message);
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

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Fetch Data API**: Fungsi modern `fetch()` di browser mengembalikan Promise.
2. **Database Query**: Library database modern (Prisma, Mongoose, Knex) mengembalikan Promise untuk setiap operasi `select`, `insert`, dan `update`.
3. **Promise.all**: Menjalankan beberapa verifikasi secara paralel (telah dipelajari di Modul 06).

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Me-return Nilai di Dalam .then()**: Jika Anda membuat Promise Chaining tetapi lupa menulis `return data`, method `.then()` berikutnya akan menerima nilai `undefined`.
- **Mengabaikan .catch()**: Promise yang di-reject tanpa ada handler `.catch()` akan memicu peringatan fatal `UnhandledPromiseRejection` di Node.js modern.

### 🌟 Best Practice

- Selalu letakkan satu buah `.catch()` di bagian paling akhir dari rantai `.then()` untuk menangkap seluruh kemungkinan error di tingkatan mana pun.
- Gunakan `.finally()` untuk menyembunyikan elemen indikator loading (seperti _spinner_) agar antarmuka tidak macet di layar pengguna.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah fungsi `beliTiketBioskop(usia)` yang mengembalikan Promise. Jika usia >= 17, `resolve('Tiket Dewasa Diberikan')`; jika usia < 17, `reject('Usia belum mencukupi')`.
2. Uji fungsi tersebut untuk usia 15 dan usia 20 lengkap dengan `.then()`, `.catch()`, dan `.finally()`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Callbacks dan Callback Hell](../03-callbacks/README.md)
- ➡️ **Selanjutnya:** [05 - Fetch API](../06-promise-concurrency/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
