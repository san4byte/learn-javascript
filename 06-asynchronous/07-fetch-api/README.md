# 05 - Fetch API (HTTP Request Modern)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami konsep HTTP Request: Method (GET, POST), Headers, Status Code, dan Payload.
> - **Kapan Digunakan**: Menguasai penggunaan `fetch()` bawaan browser & Node.js 18+.
> - **Aturan Praktis**: Selalu periksa `if (!response.ok)` sebelum memanggil `response.json()`.

## 1. 🎯 Tujuan Belajar

- Memahami konsep HTTP Request: Method (GET, POST), Headers, Status Code, dan Payload.
- Menguasai penggunaan `fetch()` bawaan browser & Node.js 18+.
- Memahami parsing response data menggunakan `response.json()` dan `response.text()`.
- Mengetahui cara menangani error HTTP (karena fetch tidak otomatis melempar error pada 404/500).

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> `fetch()` seperti **pelayan restoran yang membawa buku menu**: Anda meminta makanan ke pelayan (mengirim HTTP request). Pelayan pergi ke dapur (server) dan kembali membawa nampan tertutup (`Response`). Untuk memakannya, Anda harus membuka tutup nampannya terlebih dahulu (**`response.json()`**). Jika koki kehabisan bahan (Error 404), pelayan tetap datang membawa nampan berisi catatan kosong (Promise fulfilled, tapi `response.ok === false`).

`fetch()` adalah Web API modern standar untuk melakukan pertukaran data melalui jaringan internet (_HTTP Request_) dari JavaScript ke server backend.

`fetch()` menggantikan teknologi kuno `XMLHttpRequest` (XHR) dan library luar seperti jQuery Ajax.

### Ciri Khas Krusial dari `fetch()`:

1. `fetch()` mengembalikan sebuah **Promise**.
2. **`fetch()` TIDAK melempar error saat server merespon dengan status 404 atau 500!**
   Promise hanya akan di-_reject_ jika terjadi kegagalan jaringan internet total (_network failure_) atau domain tidak ditemukan.
   Oleh karena itu, developer **wajib memeriksa properti `response.ok`**!

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Mengambil Data via HTTP GET ---');
// Simulasi URL API Publik (JSONPlaceholder)
const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

// Mock fetch jika offline / diuji di lingkungan tanpa koneksi internet
const universalFetch =
  typeof fetch !== 'undefined'
    ? fetch
    : async () => ({
        ok: true,
        status: 200,
        json: async () => ({
          id: 1,
          title: 'Belajar JavaScript Asynchronous',
          body: 'Materi Fetch API modern',
        }),
      });

universalFetch(API_URL)
  .then((response) => {
    // 1. Cek apakah HTTP status code dalam rentang 200-299
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    // 2. Parse response body dari format JSON ke Objek JavaScript
    return response.json();
  })
  .then((data) => {
    console.log('Data berhasil diambil dari server:');
    console.log('- ID Post    :', data.id);
    console.log('- Judul Post :', data.title);
  })
  .catch((err) => {
    console.error('Gagal melakukan fetch:', err.message);
  });

console.log('\n--- 2. Mengirim Data via HTTP POST ---');
async function kirimDataBaru() {
  try {
    const payload = {
      title: 'Artikel Baru',
      body: 'Konten artikel berhasil dibuat via POST',
      userId: 1,
    };

    const res = await universalFetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const hasil = await res.json();
    console.log(
      'Sukses menyimpan data ke server! Respons ID:',
      hasil.id || 101
    );
  } catch (error) {
    console.error('Error kirim data:', error.message);
  }
}

kirimDataBaru();
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Mengambil Data via HTTP GET ---

--- 2. Mengirim Data via HTTP POST ---
Data berhasil diambil dari server:
- ID Post    : 1
- Judul Post : Belajar JavaScript Asynchronous
Sukses menyimpan data ke server! Respons ID: 101
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Menampilkan Katalog Produk E-Commerce**: Mengambil data daftar barang dari server database backend saat halaman pertama dibuka.
2. **Form Login & Register**: Mengirimkan username dan password terenkripsi via HTTP `POST` ke endpoint autentikasi server.
3. **Integrasi Pihak Ketiga**: Menghubungkan website ke API cuaca (OpenWeatherMap), API ongkos kirim (RajaOngkir), atau Payment Gateway (Midtrans).

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa `await` atau `.then()` pada `response.json()`**: Membaca `response.json()` adalah operasi asinkron! Jika Anda menulis `const data = response.json()`, nilai `data` adalah objek `Promise <pending>`, bukan isi datanya.
- **Tidak Mengecek `response.ok`**: Mengabaikan status `response.ok` akan membuat aplikasi tetap mencoba mem-parse body halaman 404 HTML sebagai JSON, yang berujung pada error `SyntaxError: Unexpected token < in JSON at position 0`.

### 🌟 Best Practice

- Selalu periksa `if (!response.ok)` sebelum memanggil `response.json()`.
- Selalu cantumkan header `'Content-Type': 'application/json'` saat mengirim payload JSON menggunakan method POST/PUT.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah fungsi `ambilDataPengguna(userId)` menggunakan `fetch` ke `https://jsonplaceholder.typicode.com/users/[userId]`.
2. Tampilkan nama dan email pengguna ke konsol terminal jika berhasil, dan tangani error jika ID tidak ditemukan.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04 - Promise](../06-promise-concurrency/README.md)
- ➡️ **Selanjutnya:** [06 - Async dan Await](../08-async-await/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
