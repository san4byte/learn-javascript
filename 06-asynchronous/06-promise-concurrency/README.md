# 06 - Promise Concurrency (Promise.all, Promise.race, dan Promise.allSettled)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Mengeksekusi banyak operasi asinkron secara paralel bersamaan alih-alih menunggu satu per satu secara berurutan (*sequential*).
> * **Kapan Digunakan**: Mengambil data dari beberapa endpoint API independen secara simultan untuk memangkas waktu tunggu aplikasi.
> * **Aturan Praktis**: Gunakan `Promise.all()` jika seluruh data wajib berhasil (*all-or-nothing*), atau `Promise.allSettled()` jika ingin menerima hasil baik sukses maupun gagal tanpa membatalkan yang lain.

## 1. 🎯 Tujuan Belajar
- Menjalankan beberapa proses asynchronous paralel secara bersamaan.
- Memahami cara kerja `Promise.all()` (fail-fast jika ada satu promise yang reject).
- Memahami cara kerja `Promise.race()` (mengambil hasil promise tercepat).
- Memahami `Promise.allSettled()` untuk audit hasil paralel yang toleran terhadap kegagalan.
- Mengoptimalkan performa waktu respon aplikasi web.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **memesan 3 paket kurir secara bersamaan**:
> - **Sekuensial (Tanpa Konkurensi)**: Anda memesan paket A, menunggu sampai tiba di rumah (2 hari), baru memesan paket B (2 hari), lalu paket C (2 hari). Total waktu: 6 hari!
> - **Paralel (`Promise.all`)**: Anda memesan paket A, B, dan C pada jam yang sama. Ketiganya bergerak di jalan secara simultan. Waktu tunggu total hanya sepanjang waktu paket yang paling lambat (misal 2 hari).

### 1. `Promise.all([p1, p2, p3])`
- Menunggu **seluruh** promise berhasil diselesaikan.
- Mengembalikan array berisi seluruh hasil sukses: `[hasil1, hasil2, hasil3]`.
- **Fail-Fast**: Jika ada **SATU SAJA** promise yang melempar error (*rejected*), seluruh operasi langsung dibatalkan dan melompat ke blok `.catch()`.

### 2. `Promise.race([p1, p2])`
- Mengembalikan promise pertama yang selesai lebih dulu (*tercepat*), terlepas dari apakah hasil tercepat tersebut berstatus sukses (*resolved*) ataupun gagal (*rejected*).

### 3. `Promise.allSettled([p1, p2])`
- Menunggu seluruh promise selesai tanpa peduli ada yang gagal.
- Mengembalikan array status detail: `{ status: "fulfilled", value }` atau `{ status: "rejected", reason }`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Async: Concurrency Promise (all, race, any, allSettled)

const createPromise = (name, delayMs, succeed = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve(`[SUKSES] ${name} selesai dalam ${delayMs}ms`);
      } else {
        reject(new Error(`[GAGAL] ${name} error`));
      }
    }, delayMs);
  });
};

const p1 = createPromise("Service User", 100);
const p2 = createPromise("Service Payment", 200);
const p3 = createPromise("Service Notifikasi", 150);

// 1. Promise.all: Menunggu SEMUA selesai, gagal jika 1 saja gagal
Promise.all([p1, p2, p3])
  .then((results) => {
    console.log("--- Promise.all Selesai Bersama ---");
    console.log(results);
  })
  .catch((err) => console.error(err));

// 2. Promise.race: Mengambil yang PALING CEPAT selesai
const f1 = createPromise("Fast Server", 80);
const f2 = createPromise("Slow Server", 300);

Promise.race([f1, f2]).then((winner) => {
  console.log("--- Promise.race Winner ---");
  console.log("Pemenang:", winner);
});
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- Promise.race Winner ---
Pemenang: [SUKSES] Fast Server selesai dalam 80ms
--- Promise.all Selesai Bersama ---
[
  '[SUKSES] Service User selesai dalam 100ms',
  '[SUKSES] Service Payment selesai dalam 200ms',
  '[SUKSES] Service Notifikasi selesai dalam 150ms'
]
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
1. **Dashboard Overview Data**: Saat membuka aplikasi perbankan, aplikasi perlu mengambil data Saldo Akun, Riwayat 5 Transaksi Terakhir, dan Profil Pengguna dari 3 microservices berbeda. Menggunakan `Promise.all()` memangkas waktu loading hingga 60%.
2. **Request Timeout Guard dengan `Promise.race()`**: Menandingkan pemanggilan API fetch dengan promise timeout 5 detik. Jika server tidak merespons dalam 5 detik, anggap request time-out.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Menggunakan `Promise.all()` saat Ada Request Opsional**: Jika salah satu request (misal widget ramalan cuaca) gagal, seluruh halaman dashboard ikut gagal dimuat. Untuk bagian opsional, gunakan `Promise.allSettled()`.
* **Salah Menaruh `await` di Loop**: Menulis `for (const id of ids) { await fetchData(id); }` adalah anti-pattern sekuensial lambat. Ubah menjadi `await Promise.all(ids.map(fetchData))`.

### 🌟 Best Practice
* Gunakan `Promise.all()` untuk request data independen yang saling melengkapi.
* Gunakan `Promise.allSettled()` jika Anda ingin memproses sebanyak mungkin data yang berhasil tanpa terganggu oleh request yang gagal.

---

## 6. ✍️ Latihan Mandiri
1. Buat 3 promise tiruan dengan jeda waktu 500ms, 1000ms, dan 1500ms. Jalankan ketiganya secara paralel menggunakan `Promise.all()` dan cetak total durasi waktu eksekusi.
2. Ubah salah satu promise agar melakukan `reject()`, amati bagaimana `Promise.all()` bereaksi dan bagaimana `Promise.allSettled()` menanganinya.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05 - Promise](../05-promise/README.md)
- ➡️ **Selanjutnya:** [07 - Fetch API](../07-fetch-api/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
