# 04 - AJAX dengan XMLHttpRequest (XHR)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengirim dan menerima data dari server web di latar belakang tanpa memuat ulang (_refresh_) halaman web menggunakan objek klasik `XMLHttpRequest`.
> - **Kapan Digunakan**: Memahami fondasi historis komunikasi jaringan pada web, memelihara kode basis lama (_legacy apps_), atau mengimplementasikan fitur pemantauan progress upload berkas (_upload progress events_).
> - **Aturan Praktis**: Selalu verifikasi bahwa `xhr.readyState === 4` (selesai) dan kode status HTTP bernilai sukses (`xhr.status === 200`) sebelum melakukan `JSON.parse(xhr.responseText)`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep dasar **AJAX** (_Asynchronous JavaScript and XML_).
- Mengetahui sejarah komunikasi web sebelum era Fetch API menggunakan objek `XMLHttpRequest`.
- Menguasai 5 tahap siklus hidup `xhr.readyState` (dari 0 `UNSENT` hingga 4 `DONE`).
- Memahami interpretasi kode status HTTP (`200 OK`, `404 Not Found`, `500 Server Error`).
- Mampu mengirim permintaan HTTP GET dan POST berformat payload JSON.
- Mengetahui alasan teknis mengapa Fetch API modern menggantikan `XMLHttpRequest`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan Anda sedang duduk di **restoran**:
>
> - Halaman web adalah **meja makan Anda bersama teman-teman**.
> - Objek `XMLHttpRequest` adalah **seorang pelayan restoran**.
> - Anda memesan sepiring makanan (`xhr.open()` dan `xhr.send()`).
> - Sembari pelayan pergi ke dapur di belakang panggung (`Web APIs`), Anda dan teman-teman tetap asyik mengobrol santai tanpa harus mematung kaku (UI non-blocking).
> - Pelayan memantau koki memasak (`readyState 1 -> 2 -> 3`). Begitu hidangan selesai (`readyState 4`) dan rasanya enak sesuai pesanan (`status 200`), pelayan mengantarkan piring makanan hangat kembali ke meja makan Anda.

---

### Tabel 5 Tahapan Siklus Hidup `xhr.readyState`

| Nilai Status | Nama Konstanta W3C | Penjelasan Kondisi                                                                |
| :----------: | :----------------- | :-------------------------------------------------------------------------------- |
|   **`0`**    | `UNSENT`           | Objek client XHR telah dibuat, tetapi method `open()` belum dipanggil.            |
|   **`1`**    | `OPENED`           | Method `open()` telah berhasil dipanggil; koneksi HTTP telah dikonfigurasi.       |
|   **`2`**    | `HEADERS_RECEIVED` | Method `send()` telah dipanggil, header respons server telah diterima peramban.   |
|   **`3`**    | `LOADING`          | Data badan respon (_response body_) sedang diunduh secara bertahap (_streaming_). |
|   **`4`**    | `DONE`             | Seluruh operasi transfer data telah rampung seutuhnya (sukses maupun gagal).      |

---

### Pembahasan Mendalam Fitur & API

#### 1. Konsep Dasar AJAX

AJAX memungkinkan pertukaran data secara asinkron dengan server di balik layar sehingga halaman tidak perlu berkedip atau memuat ulang seluruh layout CSS dan HTML dari awal.

```javascript
const xhr = new XMLHttpRequest();
console.log("Objek XHR dibuat:", xhr.readyState); // 0 (UNSENT)
```

#### 2. Membuka Koneksi: `xhr.open(method, url, async)`

Mengonfigurasi jenis metode HTTP (`GET`, `POST`, `PUT`, `DELETE`), URL target endpoint, dan parameter boolean apakah berjalan asinkron (selalu berikan `true`).

```javascript
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);
console.log("Koneksi dibuka:", xhr.readyState); // 1 (OPENED)
```

#### 3. Mengirimkan Permintaan: `xhr.send(body)`

Mengirimkan request ke server. Untuk metode `GET`, kosongkan parameter atau isi `null`.

```javascript
xhr.send(null); // Memulai pengiriman request jaringan
```

#### 4. Event `onreadystatechange` vs `onload`

- `onreadystatechange`: Terpicu setiap kali nilai `readyState` berubah (bisa terpanggil 4 kali).
- `onload`: Event modern pada XHR yang hanya terpicu saat `readyState === 4`.

```javascript
// Cara Tradisional:
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log("Data diterima:", data.title);
  }
};
```

#### 5. Kode Status HTTP Esensial

Selalu periksa status HTTP respons:

- `200`: Permintaan berhasil diproses (_OK_).
- `201`: Sumber daya baru berhasil dibuat (_Created_).
- `400`: Format request salah (_Bad Request_).
- `401` / `403`: Tidak memiliki hak otentikasi / akses (_Unauthorized_ / _Forbidden_).
- `404`: Alamat endpoint tidak ditemukan (_Not Found_).
- `500`: Kesalahan pada server pusat (_Internal Server Error_).

#### 6. Mengirim Data JSON via POST & `xhr.setRequestHeader()`

Ketika mengirim data badan (_request body_), Anda wajib menyetel header `Content-Type`:

```javascript
xhr.open("POST", "https://api.example.com/items", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

const payload = JSON.stringify({ nama: "Keyboard Mechanical", harga: 750000 });
xhr.send(payload);
```

#### 7. Penanganan Timeout dan Error Jaringan

XHR menyediakan properti `timeout` (dalam ms) dan event listener `ontimeout` serta `onerror`.

```javascript
xhr.timeout = 5000; // 5 detik
xhr.ontimeout = () => console.error("Koneksi server time-out!");
xhr.onerror = () => console.error("Koneksi jaringan terputus!");
```

#### 8. Mengapa Ekosistem Web Beralih ke Fetch API

Meskipun handal, `XMLHttpRequest` memiliki kelemahan:

1. Berbasis arsitektur event callback yang rumit dan rentan spaghetti code.
2. Tidak terintegrasi secara bawaan dengan Promise.
3. Fetch API menyediakan sintaks yang jauh lebih bersih, modern, dan mendukung _streaming request_ serta _AbortController_.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi simulasi siklus hidup 5 status `readyState`, penanganan koneksi HTTP GET, parsing data JSON, dan eksekusi jaringan live di browser telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini dirancang ganda (_dual-compatible_) untuk dapat diuji di terminal Node.js guna memverifikasi alur siklus hidup, maupun di peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 06-asynchronous/04-ajax-xmlhttprequest/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk mencoba menekan tombol permintaan data AJAX live ke REST API!

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Upload Progress Tracker**: XHR masih sering digunakan dalam skenario khusus di mana pengembang perlu memantau persentase progres unggah berkas besar via `xhr.upload.onprogress`:
   ```javascript
   xhr.upload.onprogress = function (event) {
     if (event.lengthComputable) {
       const percent = (event.loaded / event.total) * 100;
       console.log(`Progres Upload: ${percent.toFixed(0)}%`);
     }
   };
   ```

### ⚠️ Common Pitfalls

- **Lupa Melakukan `JSON.parse()`**: `xhr.responseText` selalu bertipe string mentah. Jika Anda langsung mengakses `xhr.responseText.id`, hasilnya adalah `undefined`.
- **Menyetel `async = false`**: Memanggil `xhr.open('GET', url, false)` akan membekukan (_freeze_) seluruh tab browser sampai respon jaringan kembali. Praktik ini sudah usang dan dilarang keras oleh standar browser modern.

### 🌟 Best Practice

- Gunakan `Fetch API` atau `Axios` untuk semua proyek baru.
- Jika terpaksa menggunakan `XMLHttpRequest`, gunakan event `onload` dan `onerror` daripada memeriksa `readyState === 4` di dalam `onreadystatechange`.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di peramban web. Tambahkan penanganan `xhr.onerror` pada `example.js` lalu ubah URL ke domain palsu (misal: `https://domain-palsu-tidak-ada.xyz`) untuk melihat bagaimana browser menangani kesalahan jaringan.
2. Tambahkan indikator teks status _"Sedang memuat data..."_ pada elemen HTML sebelum `xhr.send()` dipanggil.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [03 - Callbacks](../03-callbacks/README.md)
- ➡️ **Materi Selanjutnya:** [05 - Promise](../05-promise/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
