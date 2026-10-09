# 08 - Async dan Await (Sintaks Asinkron Modern)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyediakan cara penulisan kode asinkron berbasis Promise dengan gaya bahasa prosedural/linier yang sangat mudah dibaca dan dipelihara layaknya kode sinkron biasa.
> - **Kapan Digunakan**: Standar utama industri modern untuk semua alur operasi asinkron: query database, HTTP Fetch, pemrosesan file, dan orchestrasi alur bisnis.
> - **Aturan Praktis**: Fungsi berawalan `async` otomatis mengembalikan Promise. Kata kunci `await` hanya dapat dipanggil di dalam fungsi `async` (atau _Top-Level Await_ di ES Module). Selalu bungkus eksekusi `await` di dalam blok `try...catch` untuk menangani potensi error.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep `async / await` sebagai penyedap sintaks (_syntactic sugar_) di atas teknologi Promise.
- Menguasai fungsi kata kunci `async` dan bagaimana ia otomatis membungkus nilai balik menjadi Promise.
- Memahami mekanisme kata kunci `await` yang menjeda (_pause_) fungsi lokal tanpa membekukan thread utama browser/server.
- Menguasai penanganan kesalahan asinkron menggunakan blok standar `try...catch...finally`.
- Memahami berbagai gaya deklarasi fungsi `async` (deklarasi reguler, _arrow function_, dan _class method_).
- Menghindari jebakan kinerja _Sequential Bottleneck_ dan memadukan `await` dengan `Promise.all` untuk konkurensi paralel.
- Memahami fitur _Top-Level Await_ pada berkas ES Modules.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan proses memesan tiket bioskop di **mesin tiket mandiri (_self-service kiosk_)**:
>
> - Pada era Promise biasa (`.then().then()`), Anda memesan tiket, lalu Anda harus berjalan ke loket sebelah untuk meminta struk, lalu berjalan ke loket seberang lagi untuk memesan popcorn (rantai panjang yang membingungkan).
> - Dengan **`async / await`**, Anda berdiri di depan satu mesin otomatis: Anda menekan tombol pesan tiket dan berdiri sejenak menunggu tiket dicetak (**`await ambilTiket()`**), setelah tiket keluar ke tangan Anda, Anda langsung menekan tombol popcorn di mesin yang sama (**`await ambilPopcorn()`**). Alur kegiatan Anda berjalan lurus, tertib, dan mengalir dari atas ke bawah tanpa bolak-balik.

---

### Tabel Ringkasan Kata Kunci `async` dan `await`

| Kata Kunci        | Posisi Penempatan         | Dampak Perilaku                                                 | Syarat Penggunaan                                 |
| :---------------- | :------------------------ | :-------------------------------------------------------------- | :------------------------------------------------ |
| **`async`**       | Sebelum nama fungsi       | Mengubah nilai balik fungsi menjadi `Promise<T>`.               | Dapat digunakan di fungsi apa pun.                |
| **`await`**       | Di depan ekspresi Promise | Menjeda fungsi sampai Promise _settled_ dan mengambil nilainya. | Wajib di dalam fungsi `async` atau Top-Level ESM. |
| **`try...catch`** | Membungkus blok `await`   | Menangkap kegagalan (`rejection`) Promise secara alami.         | Blok pengendali eksepsi standar.                  |

---

### Pembahasan Mendalam Fitur & API

#### 1. Konsep Syntactic Sugar di Atas Promise

Sintaks `async / await` (diperkenalkan pada ES2017) bukanlah arsitektur baru yang menggantikan Promise, melainkan pembungkus yang lebih elegan. Di balik layar, mesin JavaScript tetap mengompilasinya menjadi Promise dan Microtask.

```javascript
// Kedua kode ini menghasilkan objek yang sama persis:
async function getDataAsync() {
  return 42;
}
function getDataPromise() {
  return Promise.resolve(42);
}
```

#### 2. Kata Kunci `async` dan Nilai Balik Otomatis

Setiap nilai yang di-return dari dalam fungsi `async` akan otomatis dibungkus menjadi `Promise.resolve(nilai)`. Jika terjadi `throw new Error()`, otomatis menjadi `Promise.reject(error)`.

```javascript
async function sapa() {
  return "Halo Dunia!";
}
sapa().then((pesan) => console.log(pesan)); // Output: Halo Dunia!
```

#### 3. Kata Kunci `await` dan Mekanisme Pause Eksekusi

Kata kunci `await` menghentikan sementara pengeksekusian baris berikutnya **hanya di dalam fungsi tersebut**, sementara sisa aplikasi di luar fungsi tetap berjalan normal (_non-blocking_).

```javascript
async function prosesData() {
  console.log("1. Mulai");
  const hasil = await fetch("https://api.example.com/data");
  console.log("2. Data selesai diambil:", hasil.status);
}
```

#### 4. Penanganan Error Alami via `try...catch...finally`

Anda tidak perlu lagi menulis `.catch()`. Gunakan blok `try...catch` standar seperti pada kode sinkron:

```javascript
async function eksekusiAman() {
  try {
    const user = await getUser(-1); // melempar error
  } catch (err) {
    console.error("Error tertangkap:", err.message);
  } finally {
    console.log("Pembersihan loading selalu dijalankan.");
  }
}
```

#### 5. Berbagai Bentuk Deklarasi Fungsi `async`

Dapat dipasang pada berbagai bentuk fungsi JavaScript:

```javascript
// 1. Function Declaration:
async function fn1() {}

// 2. Function Expression:
const fn2 = async function () {};

// 3. Arrow Function:
const fn3 = async () => {};

// 4. Object / Class Method:
const obj = { async ambilData() {} };
class Layanan {
  async hitungTotal() {}
}
```

#### 6. Bahaya Sequential Bottleneck (Antrean Lambat)

Kesalahan umum pemula adalah menaruh `await` satu per satu pada tugas yang sebenarnya tidak saling membutuhkan data:

```javascript
// ❌ LAMBAT: Butuh total waktu 3 detik (1s + 1s + 1s)
const user = await fetchUser(); // 1 detik
const produk = await fetchProduk(); // 1 detik
const cuaca = await fetchCuaca(); // 1 detik
```

#### 7. Menggabungkan `async/await` dengan `Promise.all`

Jalankan operasi independen secara paralel untuk memangkas waktu tunggu secara drastis:

```javascript
// ✅ CEPAT: Berjalan bersamaan, hanya butuh total waktu 1 detik!
const [user, produk, cuaca] = await Promise.all([
  fetchUser(),
  fetchProduk(),
  fetchCuaca(),
]);
```

#### 8. Fitur Top-Level Await pada ES Modules

Pada modul JavaScript modern (ESM), Anda dapat memanggil `await` langsung di tingkat terluar berkas (_root file_) tanpa perlu membungkusnya ke dalam fungsi `async () => {}`.

```javascript
// Bekerja langsung di file .js bertipe modul (ES Modules):
const config = await import("./config.js");
console.log("Konfigurasi dimuat:", config);
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi deklarasi fungsi `async`, penanganan eksepsi menggunakan `try...catch...finally`, skenario data sukses vs gagal, serta optimasi paralel menggunakan `Promise.all` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 06-asynchronous/08-async-await/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Alur Transaksi Checkout E-Commerce**:
   ```javascript
   async function handleCheckout(cartId, paymentMethod) {
     try {
       showSpinner(true);
       const order = await orderService.createOrder(cartId);
       const payment = await paymentService.process(order.id, paymentMethod);
       await notificationService.sendReceipt(order.id);
       navigateToSuccessPage(order.id);
     } catch (err) {
       showToastError(err.message);
     } finally {
       showSpinner(false);
     }
   }
   ```

### ⚠️ Common Pitfalls

- **Menggunakan `await` di Luar Fungsi `async` pada Skrip Non-Module**: Memanggil `await` di berkas CommonJS klasik akan memicu `SyntaxError: await is only valid in async functions and the top-level bodies of modules`.
- **Menulis `forEach` dengan Callback `async`**: `[1, 2].forEach(async (id) => { await hapus(id); })` tidak akan menunggu proses asinkron selesai sebelum melanjutkan baris berikutnya. Gunakan perulangan `for...of` atau `Promise.all()`.

### 🌟 Best Practice

- Gunakan perulangan `for...of` jika Anda memang sengaja ingin memproses data asinkron satu per satu secara sekuensial.
- Gunakan `Promise.all()` bersama `await` jika data yang diproses independen dan ingin dijalankan secara paralel.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi asinkron `ambilProfilLengkap(id)` yang memanggil dua fungsi simulasi: `ambilBio(id)` dan `ambilFoto(id)`.
2. Terapkan blok `try...catch` dan pastikan kedua data diambil secara bersamaan menggunakan `await Promise.all()`!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [07 - Fetch API](../07-fetch-api/README.md)
- ➡️ **Materi Selanjutnya:** [09 - Web Workers](../09-web-workers/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
