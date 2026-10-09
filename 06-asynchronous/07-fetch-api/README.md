# 07 - Fetch API (HTTP Request Modern)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Melakukan komunikasi jaringan (_HTTP Request_) modern berbasis Promise bawaan peramban web dan runtime Node.js (v18+) tanpa ketergantungan pustaka luar.
> - **Kapan Digunakan**: Mengambil data (_GET_), mengirim data baru (_POST_), memperbarui (_PUT/PATCH_), serta menghapus sumber daya (_DELETE_) pada RESTful API.
> - **Aturan Praktis**: **`fetch()` tidak melempar rejection saat menerima kode status HTTP 404 atau 500**. Anda **wajib** memeriksa nilai boolean `response.ok` sebelum memanggil `response.json()`.

---

## 1. 🎯 Tujuan Belajar

- Menguasai sintaks modern `fetch()` untuk berkomunikasi dengan server backend.
- Memahami struktur siklus hidup objek `Response` (`status`, `statusText`, `headers`, `ok`).
- Memahami mengapa status HTTP 404/500 tidak otomatis memicu blok `.catch()` pada `fetch()`.
- Menguasai parsing badan respons menggunakan `response.json()` dan `response.text()`.
- Mampu mengirimkan permintaan HTTP POST lengkap dengan konfigurasi headers dan JSON payload.
- Menguasai teknik pembatalan request (_request aborting_) menggunakan `AbortController`.
- Mengetahui perbandingan teknis antara Fetch API bawaan vs pustaka pihak ketiga (Axios).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan fungsi `fetch()` seperti **seorang kurir paket pos**:
>
> - Anda memberikan alamat dan instruksi pengiriman (`fetch(url, options)`).
> - Kurir pergi ke kantor pusat di kota lain dan kembali membawa **sebuah kardus paket tertutup (`Response`)**.
> - Kardus tersebut memiliki stiker status di luarnya: bertuliskan _"Diterima Baik"_ (`status: 200, ok: true`) atau _"Alamat Rumah Salah"_ (`status: 404, ok: false`). Kurir tetap berhasil pulang membawakan kardus itu kepada Anda (Promise fulfilled, bukan rejected).
> - Untuk melihat barang pesanan Anda, Anda harus merobek lakban kardus tersebut terlebih dahulu menggunakan gunting (**`await response.json()`**).
> - Kurir hanya dinyatakan gagal pulang (_rejected_) jika di tengah jalan jembatan antar-kota runtuh atau bannya bocor total (_Network Offline / DNS Failure_).

---

### Tabel Ringkasan Properti & Method Objek Response

| Properti / Method     | Tipe Data         | Deskripsi Singkat                                                  |
| :-------------------- | :---------------- | :----------------------------------------------------------------- |
| `response.ok`         | `boolean`         | Bernilai `true` jika kode status berada pada rentang `200 - 299`.  |
| `response.status`     | `number`          | Angka kode status HTTP (misal: `200`, `201`, `400`, `404`, `500`). |
| `response.statusText` | `string`          | Deskripsi teks status dari server (misal: `"OK"`, `"Not Found"`).  |
| `response.headers`    | `Headers`         | Objek antarmuka untuk membaca metadata header respons server.      |
| `response.json()`     | `Promise<any>`    | Mengurai data badan respons yang berformat JSON.                   |
| `response.text()`     | `Promise<string>` | Mengambil seluruh isi badan respons sebagai string mentah.         |
| `response.blob()`     | `Promise<Blob>`   | Mengambil badan respons berupa data biner murni (gambar, PDF).     |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Dasar `fetch(url, options)`

Secara default, jika parameter `options` diabaikan, `fetch()` akan menjalankan permintaan HTTP metode `GET`.

```javascript
fetch("https://api.example.com/users")
  .then((res) => res.json())
  .then((users) => console.log("Daftar User:", users));
```

#### 2. Menangani Objek Response (`status`, `statusText`, `ok`)

Objek `Response` adalah gerbang pertama yang tiba dari server sebelum data isi body dibaca.

```javascript
const res = await fetch("https://api.example.com/status");
console.log("Status HTTP :", res.status); // 200
console.log("Status OK   :", res.ok); // true
console.log("Tipe Konten :", res.headers.get("content-type"));
```

#### 3. Mengapa `fetch()` TIDAK Melempar Error pada Status 404 dan 500

Ini adalah perbedaan terbesar antara `fetch()` dan pustaka Axios: selama browser berhasil menghubungi server dan server merespon (meskipun server merespon dengan 404 atau 500), Promise `fetch()` dianggap **sukses terselesaikan**.

```javascript
const res = await fetch("/api/halaman-tidak-ada");

// ❌ Jangan anggap ini langsung masuk ke catch!
if (!res.ok) {
  // ✅ Wajib periksa sendiri secara manual:
  throw new Error(`Permintaan gagal dengan kode HTTP: ${res.status}`);
}
const data = await res.json();
```

#### 4. Membaca Badan Respons: `response.json()` vs `response.text()`

Method pembacaan _body_ hanya dapat dipanggil **tepat 1 kali** karena data respons dihabiskan sebagai aliran biner (_readable stream_).

```javascript
// Untuk respon JSON:
const dataObj = await res.json();

// Untuk dokumen HTML atau log teks:
// const teksMentah = await res.text();
```

#### 5. Mengirim Data via HTTP POST

Menyertakan konfigurasi `method`, `headers`, dan mengonversi objek JavaScript ke JSON via `JSON.stringify()`.

```javascript
const response = await fetch("https://api.example.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ judul: "Belajar Fetch", dilihat: 100 }),
});
```

#### 6. Menyetel Header Kustom (Authorization Bearer Token)

Digunakan untuk menyertakan token otentikasi JWT pada API terproteksi.

```javascript
const res = await fetch("/api/dashboard", {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    Accept: "application/json",
  },
});
```

#### 7. Membatalkan Request Menggunakan `AbortController`

Memungkinkan pengembang membatalkan permintaan jaringan yang sedang berjalan jika pengguna berpindah halaman atau request telah melebihi batas waktu toleransi.

```javascript
const controller = new AbortController();

// Mengirim request dengan pengait signal:
fetch("/api/heavy-data", { signal: controller.signal }).catch((err) => {
  if (err.name === "AbortError") console.log("Request dibatalkan oleh user!");
});

// Batalkan sewaktu-waktu:
controller.abort();
```

#### 8. Perbandingan Fitur: Fetch API vs Axios

| Fitur                    | Native Fetch API                   | Pustaka Axios                      |
| :----------------------- | :--------------------------------- | :--------------------------------- |
| **Instalasi Tambahan**   | ❌ Tidak Perlu (Bawaan Web & Node) | ⚠️ Butuh instalasi via npm         |
| **JSON Serialization**   | ⚠️ Manual via `JSON.stringify()`   | ✅ Otomatis                        |
| **Error Status 4xx/5xx** | ⚠️ Harus cek manual via `res.ok`   | ✅ Otomatis reject ke `.catch()`   |
| **Request Cancellation** | ✅ Standar W3C `AbortController`   | ✅ `AbortController` / CancelToken |

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi permintaan HTTP GET, verifikasi mutlak `response.ok`, pengiriman data berformat JSON melalui HTTP POST dengan header `Content-Type`, serta pembatalan aksi via `AbortController` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 06-asynchronous/07-fetch-api/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Fungsi Wrapper API Terpusat (Client Helper)**:
   ```javascript
   async function apiClient(endpoint, customConfig = {}) {
     const config = {
       method: "GET",
       headers: { "Content-Type": "application/json" },
       ...customConfig,
     };
     const response = await fetch(`/api${endpoint}`, config);
     if (!response.ok) {
       const errorData = await response.json().catch(() => ({}));
       throw new Error(errorData.message || `HTTP Error ${response.status}`);
     }
     return response.json();
   }
   ```

### ⚠️ Common Pitfalls

- **Lupa Melakukan `await` pada `response.json()`**: `response.json()` mengembalikan Promise, bukan objek langsung. Menulis `const data = response.json();` akan menghasilkan objek Promise tertunda, bukan payload data.
- **Memanggil `response.json()` Dua Kali**: Jika Anda memanggil `await res.json()` lalu di baris berikutnya memanggil `await res.text()`, browser akan melempar error `TypeError: body stream already read`.

### 🌟 Best Practice

- Selalu bungkus pemanggilan fetch di dalam fungsi bantuan (_helper_) yang memeriksa `response.ok` secara terpusat.
- Sambungkan `AbortController` dengan `setTimeout` untuk membuat fungsi `fetchWithTimeout()` yang tangguh saat menghadapi jaringan lemot.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi `cariProduk(keyword)` menggunakan `fetch()` ke endpoint publik `https://dummyjson.com/products/search?q=${keyword}`.
2. Tambahkan pengecekan `if (!res.ok)` serta tampilkan nama produk dan harga dari hasil respon server di terminal atau Console!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [06 - Promise Concurrency](../06-promise-concurrency/README.md)
- ➡️ **Materi Selanjutnya:** [08 - Async Await](../08-async-await/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
