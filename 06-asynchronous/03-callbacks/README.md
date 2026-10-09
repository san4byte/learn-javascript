# 03 - Callbacks dan Fenomena Callback Hell

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami konsep _callback function_ (fungsi yang dioperasikan sebagai argumen ke fungsi lain) untuk menangani alur eksekusi asinkron sebelum era ES6 Promise.
> - **Kapan Digunakan**: Penanganan event listener DOM, timer `setTimeout`, serta membaca pustaka atau API warisan (_legacy code_ / library berbasis Node.js klasik).
> - **Aturan Praktis**: Gunakan konvensi standar _Error-First Callback_ `(err, data) => {}`. Hindari menumpuk pemanggilan callback asinkron secara bersarang lebih dari 2 tingkat karena memicu masalah **Callback Hell (Pyramid of Doom)**.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep fungsi sebagai warga kelas satu (_first-class citizens_) yang memungkinkan sebuah fungsi dikirimkan sebagai argumen.
- Membedakan antara _Synchronous Callback_ (misal: `Array.map`) dan _Asynchronous Callback_ (misal: timer, fetch, event).
- Menguasai konvensi standar industri _Error-First Callback_ (`err, data`).
- Mengidentifikasi masalah arsitektural **Callback Hell** (_Pyramid of Doom_).
- Memahami isu hilangnya kontrol (_Inversion of Control_) dan mengapa blok `try...catch` biasa tidak mampu menangkap error di dalam callback asinkron.
- Mengetahui alasan kuat mengapa ekosistem JavaScript modern berevolusi menuju Promise dan Async/Await.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Asynchronous Callback** seperti **meninggalkan nomor ponsel Anda di resepsionis restoran**: Anda tidak perlu mematung di depan pintu masuk. Anda bebas jalan-jalan di mal (non-blocking). Begitu meja kosong tersedia, pelayan restoran akan menelepon balik (_calling back_) nomor Anda.
> - **Callback Hell** seperti **birokrasi berbelit-belit**: Untuk mendapatkan stempel izin, resepsionis menyuruh Anda menunggu telepon dari satpam, satpam menyuruh Anda menunggu telepon dari kepala gudang, kepala gudang menyuruh menunggu telepon dari bendahara, dan jika salah satu dari mereka gagal mengangkat telepon, seluruh berkas Anda hangus tanpa penjelasan yang jelas.

---

### Tabel Perbandingan Pola Penanganan Callback

| Pola / Jenis         | Karakteristik Eksekusi             | Penanganan Error                    | Keterbacaan Kode              |
| :------------------- | :--------------------------------- | :---------------------------------- | :---------------------------- |
| **Sync Callback**    | Seketika di Call Stack utama       | `try...catch` biasa                 | Sangat Jelas                  |
| **Async Callback**   | Ditunda di Web API / Task Queue    | Parameter khusus `(err, ...)`       | Menurun jika bertingkat       |
| **Callback Hell**    | Bersarang dalam (_nested pyramid_) | Rentan duplikasi kode di tiap level | Sangat Buruk (_anti-pattern_) |
| **Promise Chaining** | Rantai linier `.then().catch()`    | Satu blok `.catch()` terpadu        | Rapi & Terstruktur            |

---

### Pembahasan Mendalam Fitur & API

#### 1. Konsep Callback & First-Class Citizens

Di JavaScript, fungsi adalah objek yang dapat disimpan dalam variabel, diteruskan sebagai argumen, atau dikembalikan dari fungsi lain.

```javascript
function sambut(nama, aksiCallback) {
  aksiCallback(`Halo, ${nama}!`);
}
sambut("Joko", (pesan) => console.log(pesan));
```

#### 2. Synchronous Callback vs Asynchronous Callback

- **Sync Callback**: Dijalankan saat itu juga sebelum baris berikutnya dieksekusi.
- **Async Callback**: Didaftarkan dan baru dijalankan setelah thread utama selesai memproses antreannya.

```javascript
// Synchronous (menghalangi sampai map selesai):
[1, 2].map((x) => x * 2);

// Asynchronous (menunggu timer di latar belakang):
setTimeout(() => console.log("Selesai"), 100);
```

#### 3. Pola Standar Node.js Error-First Callback `(err, data)`

Konvensi resmi ekosistem Node.js: argumen pertama selalu diperuntukkan bagi objek `Error` (atau `null` jika sukses), dan argumen kedua berisi data hasil.

```javascript
function bacaProfil(id, callback) {
  if (id <= 0) {
    return callback(new Error("ID harus positif"), null);
  }
  callback(null, { id, nama: "Joko Santoso" });
}
```

#### 4. Fenomena Callback Hell (Pyramid of Doom)

Ketika operasi asinkron kedua membutuhkan hasil operasi pertama, dan operasi ketiga membutuhkan hasil operasi kedua, lekukan tanda kurung kurawal menjorok ke kanan membentuk segitiga/piramida.

```javascript
getUser(1, (err, user) => {
  getOrder(user.id, (err, orders) => {
    getDetail(orders[0], (err, detail) => {
      // Kode semakin sulit dibaca dan dipelihara
    });
  });
});
```

#### 5. Masalah Kehilangan Kontrol (Inversion of Control)

Saat Anda memberikan callback ke pustaka pihak ketiga (_third-party library_), Anda menyerahkan kendali kapan dan berapa kali callback tersebut akan dipanggil. Pustaka yang memiliki bug mungkin saja memanggil fungsi Anda 0 kali atau 5 kali secara tidak terduga.

#### 6. Keterbatasan Blok `try...catch` pada Callback Asinkron

Blok `try...catch` sinkron tidak dapat menangkap error yang dilempar dari dalam callback asinkron karena Call Stack tempat blok `try` berada sudah terlanjur selesai sebelum callback dieksekusi.

```javascript
try {
  setTimeout(() => {
    // ❌ Error ini TIDAK AKAN tertangkap oleh catch di luar!
    // throw new Error('Crash!');
  }, 100);
} catch (e) {
  console.log("Tidak akan pernah masuk ke sini");
}
```

#### 7. Mitigasi Menulis Fungsi Mandiri Terpisah (Named Functions)

Salah satu cara klasik untuk merapikan piramida callback sebelum era Promise adalah dengan memecah fungsi anonim menjadi fungsi mandiri bernama.

```javascript
function tanganiDetail(err, detail) {
  /* proses */
}
function tanganiOrders(err, orders) {
  getDetail(orders[0], tanganiDetail);
}
function tanganiUser(err, user) {
  getOrder(user.id, tanganiOrders);
}

getUser(1, tanganiUser); // Alur menjadi lebih datar
```

#### 8. Mengapa Dunia JavaScript Beralih ke Promise

Promise diciptakan untuk memulihkan kontrol eksekusi (_trust and composability_), menyediakan perantaian linier (_chaining_), serta menyatukan penanganan error terpusat melalui satu blok `.catch()`.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi perbandingan synchronous callback, konvensi _Error-First Callback_ Node.js, simulasi fenomena _Callback Hell_, serta bahaya percabangan error telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 06-asynchronous/03-callbacks/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Kompatibilitas Pustaka Klasik Node.js**: Menggunakan utilitas `util.promisify` untuk mengubah fungsi berbasis callback menjadi Promise modern:
   ```javascript
   const fs = require("fs");
   const util = require("util");
   const readFileAsync = util.promisify(fs.readFile);
   ```
2. **Event Handling pada Komponen UI**: Pola callback masih menjadi standar mutlak pada pendaftaran aksi pengguna (`element.addEventListener('click', callback)`).

### ⚠️ Common Pitfalls

- **Lupa Perintah `return` Saat Memanggil Callback Error**: Jika Anda memanggil `callback(err)` tanpa kata kunci `return`, kode di baris bawahnya akan tetap dieksekusi, berujung pada pemanggilan callback ganda (_double callback execution_).
- **Membungkus Pemanggilan Asinkron dengan `try...catch`**: Ingat bahwa `try...catch` biasa tidak bekerja melintasi batas waktu asinkron. Gunakan `Promise` atau `async/await` jika ingin menggunakan `try...catch`.

### 🌟 Best Practice

- Selalu letakkan parameter `error` di posisi argumen pertama pada fungsi callback buatan Anda.
- Refaktorisasi fungsi berbasis callback bertingkat menjadi `Promise` atau fungsi `async/await` untuk kode basis baru.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi `simulasiLogin(username, password, callback)` dengan aturan: jika password sama dengan `"rahasia"`, panggil `callback(null, { token: "TOKEN-123" })`. Jika salah, panggil `callback(new Error("Password salah!"))`.
2. Uji fungsi login tersebut dengan memberikan username/password yang benar dan salah, lalu tangani error-nya menggunakan pola _Error-First Callback_.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [02 - Timing Events](../02-timing-events/README.md)
- ➡️ **Materi Selanjutnya:** [04 - AJAX XMLHttpRequest](../04-ajax-xmlhttprequest/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
