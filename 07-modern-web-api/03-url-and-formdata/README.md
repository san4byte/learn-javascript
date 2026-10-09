# 03 - URL, URLSearchParams, dan FormData API

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengurai dan memanipulasi alamat URL beserta query parameternya secara deklaratif menggunakan `URLSearchParams`, serta merakit data formulir dan unggahan berkas biner menggunakan `FormData`.
> - **Kapan Digunakan**: Fitur filter pencarian e-commerce yang dapat dibagikan (_shareable URL_), pagination web, pengiriman formulir dinamis, serta upload file avatar/dokumen via Fetch API.
> - **Aturan Praktis**: Saat mengirim `FormData` melalui `fetch()`, **JANGAN** pernah menyetel header `Content-Type: multipart/form-data` secara manual. Biarkan peramban menyetelnya secara otomatis lengkap dengan kode pembatas (_multipart boundary_).

---

## 1. 🎯 Tujuan Belajar

- Memahami anatomi objek standar `URL` (`protocol`, `hostname`, `pathname`, `search`, `hash`).
- Menguasai manipulasi parameter URL menggunakan antarmuka `URLSearchParams`.
- Mampu menyinkronkan status filter antarmuka pengguna ke address bar peramban.
- Menguasai pembuatan dan pengelolaan data formulir menggunakan `FormData`.
- Memahami teknik melampirkan berkas fisik (_File / Blob upload_) ke dalam payload HTTP.
- Mengetahui cara mengirimkan `FormData` secara aman menggunakan `fetch()` tanpa kesalahan header.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **`URLSearchParams`** seperti **papan rute dan stiker nomor pesanan di kaca depan mobil ekspedisi**: Siapa pun di luar mobil dapat membaca stiker tersebut (`?kategori=elektronik&halaman=2`). Jika Anda ingin mengubah rute, Anda cukup menempel stiker baru (`params.set('halaman', '3')`).
> - **`FormData`** seperti **kardus paket kargo bersegel tertutup rapat**: Anda dapat memasukkan surat teks (`username`), dokumen formulir, maupun barang fisik berupa file foto biner (`avatar.png`). Kurir mengantarkannya ke kantor pusat server dalam satu kesatuan kardus kargo yang aman.

---

### Tabel Ringkasan Method URLSearchParams & FormData

| Antarmuka         | Method Penting                    | Fungsi Utama                                                            |
| :---------------- | :-------------------------------- | :---------------------------------------------------------------------- |
| `URLSearchParams` | `get(key)` / `getAll(key)`        | Mengambil nilai pertama atau seluruh nilai (jika jamak) dari parameter. |
| `URLSearchParams` | `set(key, value)`                 | Menyetel nilai parameter (menimpa jika kunci sudah ada).                |
| `URLSearchParams` | `append(key, value)`              | Menambahkan nilai baru tanpa menimpa nilai yang sudah ada.              |
| `URLSearchParams` | `delete(key)`                     | Menghapus parameter tertentu dari susunan query string.                 |
| `FormData`        | `append(name, value, [filename])` | Menambahkan field teks atau berkas Blob/File ke formulir.               |
| `FormData`        | `get(name)` / `has(name)`         | Membaca atau memeriksa keberadaan suatu field di form.                  |
| `FormData`        | `entries()`                       | Mengembalikan iterator pasangan `[key, value]` untuk looping.           |

---

### Pembahasan Mendalam Fitur & API

#### 1. Anatomi Objek URL

Standar W3C menyediakan konstruktor `URL` untuk membedah bagian-bagian alamat web tanpa regex rumit:

```javascript
const url = new URL("https://toko.com:8080/produk?kat=buku#ulasan");
console.log(url.protocol); // "https:"
console.log(url.hostname); // "toko.com"
console.log(url.pathname); // "/produk"
console.log(url.search); // "?kat=buku"
console.log(url.hash); // "#ulasan"
```

#### 2. Membaca Query String dengan `URLSearchParams`

Mengambil nilai filter dari URL secara langsung:

```javascript
const params = new URLSearchParams("?q=laptop&sort=asc&tag=sale&tag=free");
console.log(params.get("q")); // "laptop"
console.log(params.getAll("tag")); // ["sale", "free"] (parameter jamak)
console.log(params.has("diskon")); // false
```

#### 3. Memodifikasi Query String (`set`, `append`, `delete`, `sort`)

Memperbarui parameter pencarian secara dinamis:

```javascript
params.set("page", "2"); // Mengatur page=2
params.append("tag", "promo"); // Menambah tag=promo baru
params.delete("sort"); // Menghapus parameter sort
params.sort(); // Mengurutkan parameter secara alfabetis
console.log(params.toString()); // "page=2&q=laptop&tag=sale&tag=free&tag=promo"
```

#### 4. Iterasi Pasangan Query via `for...of`

Mendukung iterasi fungsional modern:

```javascript
for (const [key, val] of params.entries()) {
  console.log(`${key} -> ${val}`);
}
```

#### 5. Objek `FormData` dari Form HTML vs Pembuatan Terprogram

Dapat diinstansiasi langsung dari elemen `<form>` atau dibuat kosong di memori:

```javascript
// Cara 1: Dari form HTML yang ada
const formEl = document.querySelector("form");
const fdFromDom = new FormData(formEl);

// Cara 2: Terprogram manual
const fd = new FormData();
fd.append("email", "joko@example.com");
```

#### 6. Mengunggah Berkas Fisik (File / Blob) via `formData.append()`

Menerima berkas objek `File` dari `<input type="file">` atau `Blob` buatan:

```javascript
const fileInput = document.querySelector('input[type="file"]');
const fdUpload = new FormData();
if (fileInput.files[0]) {
  fdUpload.append("dokumen", fileInput.files[0], "laporan-tahunan.pdf");
}
```

#### 7. Mengirimkan `FormData` dengan Fetch API

Kirimkan objek FormData langsung sebagai nilai `body`.

```javascript
// ✅ BENAR: Biarkan browser membuat Content-Type beserta boundary uniknya
await fetch("/api/upload", {
  method: "POST",
  body: fdUpload,
});

// ❌ JANGAN PERNAH MENULIS INI:
// headers: { 'Content-Type': 'multipart/form-data' } // boundary akan hilang dan server error 500!
```

#### 8. Konversi `FormData` ke Plain JSON Object

Jika API Anda hanya menerima payload `application/json` murni tanpa file upload:

```javascript
const payloadJson = Object.fromEntries(new FormData(formEl).entries());
console.log(payloadJson); // { email: "...", nama: "..." }
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi manipulasi URL e-commerce, pembacaan parameter query pencarian, iterasi filter, serta perakitan data formulir lengkap dengan lampiran berkas Blob simulasi telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 07-modern-web-api/03-url-and-formdata/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Sinkronisasi Filter E-Commerce ke Address Bar**:
   ```javascript
   function updateFilterUrl(kategori, halaman) {
     const url = new URL(window.location.href);
     url.searchParams.set("kategori", kategori);
     url.searchParams.set("page", halaman);
     window.history.pushState({}, "", url);
     fetchProducts(url.searchParams.toString());
   }
   ```
2. **Unggah Foto Profil dengan Preview**: Menangkap file gambar pengguna dan langsung mengunggahnya secara asinkron ke server CDN.

### ⚠️ Common Pitfalls

- **Menyetel `Content-Type: multipart/form-data` Secara Manual**: Ini adalah jebakan paling sering terjadi. Ketika Anda menyetelnya manual, browser tidak menyertakan parameter `boundary=----WebKitFormBoundary...`, sehingga server backend gagal mem-parse isi body dan melempar error `Multer/Formidable Error`.
- **Lupa Encoding Karakter Khusus**: Membangun URL secara manual via penggabungan string (`"?q=" + kata`) dapat memicu URL rusak jika kata mengandung spasi atau tanda `&`. Gunakan selalu `URLSearchParams` yang otomatis melakukan _URL-encoding_.

### 🌟 Best Practice

- Manfaatkan `URLSearchParams` untuk membuat URL tautan produk yang ramah dibagikan pengguna ke media sosial (_shareable state_).
- Gunakan `Object.fromEntries(formData.entries())` untuk formulir berbasis JSON murni.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah objek `new URLSearchParams()` dari string `"?role=admin&status=active&status=verified"`. Gunakan method `.getAll('status')` untuk mengambil seluruh statusnya.
2. Tambahkan parameter baru `sort=terbaru` dan ubah hasilnya menjadi string query URL yang valid menggunakan `.toString()`!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [02 - Modern Syntax ES2020+](../02-modern-syntax-es2020/README.md)
- ➡️ **Materi Selanjutnya:** [04 - Async Parallel & AbortController](../04-async-parallel-abort/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
