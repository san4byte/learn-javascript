# 17 - Base64 (btoa, atob, Penanganan UTF-8 Unicode, dan Base64URL)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengonversi data biner menjadi 64 karakter ASCII yang aman ditransmisikan melalui kanal berbasis teks (seperti HTTP, email, atau JSON).
> - **Kapan Digunakan**: Mengirim data kredensial via HTTP Basic Auth header, menyematkan gambar kecil via Data URL, atau mengemas payload token web (JWT).
> - **Aturan Praktis**: `btoa()` **hanya mendukung karakter Latin-1 (0–255)**; selalu gunakan pola `TextEncoder`/`TextDecoder` atau `Buffer.from()` jika data memuat aksara non-Latin atau emoji, dan **ingat bahwa Base64 adalah encoding, BUKAN enkripsi pengamanan data**.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep skema encoding **Base64** dan alasan penggunaannya dalam transmisi data web.
- Menguasai fungsi bawaan standar browser dan Node.js: `btoa()` (_binary to ASCII_) dan `atob()` (_ASCII to binary_).
- Memahami aturan penambahan padding tanda sama dengan (`=`) serta konsekuensi pembengkakan ukuran data sebesar $\approx 33\%$.
- Menganalisis batasan kritis rentang Latin-1 ($0x00 - 0xFF$) pada `btoa()` dan cara menangani `InvalidCharacterError`.
- Mengimplementasikan helper universal modern berbasis **`TextEncoder`** & **`TextDecoder`** untuk mendukung karakter UTF-8 dan Emoji secara penuh.
- Memanfaatkan API bawaan **`Buffer`** pada ekosistem Node.js untuk konversi cepat.
- Memahami varian **Base64URL** (URL-Safe) untuk skenario token web (JWT) dan parameter query URL.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `Base64` seperti **layanan telegram diplomatik zaman dahulu**: stasiun radio telegraf hanya memiliki tuts tombol untuk huruf alfabet Latin standar. Jika Anda ingin mengirimkan sketsa gambar atau dokumen stempel rahasia, operator telegram harus menerjemahkan titik-titik biner gambar tersebut menjadi kombinasi deretan huruf teks biasa (`btoa`) agar dapat dikirim lewat kabel telegraf tanpa risiko distorsi karakter. Di stasiun penerima, operator menerjemahkan kembali deretan huruf tersebut menjadi gambar semula (`atob`).

---

### 1. Cheat-Sheet API & Komparasi Base64

| Metode / Fitur             | Lingkungan    | Input                    | Output                 | Penanganan UTF-8 / Emoji            |
| :------------------------- | :------------ | :----------------------- | :--------------------- | :---------------------------------- |
| **`btoa(str)`**            | Web & Node.js | String Latin-1 ($0-255$) | String Base64          | ❌ Melempar `InvalidCharacterError` |
| **`atob(base64)`**         | Web & Node.js | String Base64            | String Latin-1         | ❌ Menghasilkan karakter terpotong  |
| **`TextEncoder` + `btoa`** | Web & Node.js | String UTF-8 Bebas       | String Base64          | ✅ Aman untuk semua aksara & emoji  |
| **`Buffer.from()`**        | Node.js Murni | String / Buffer          | String Base64 / UTF-8  | ✅ Sangat cepat dan otomatis        |
| **Base64URL**              | Web & Node.js | String Base64            | Safe String (`-`, `_`) | ✅ Aman dimasukkan ke parameter URL |

---

### 2. Anatomi Base64 & Karakter Padding (`=`)

Base64 memetakan data dengan mengelompokkan setiap 3 byte ($3 \times 8 = 24$ bit) menjadi 4 unit 6-bit ($4 \times 6 = 24$ bit). Masing-masing unit 6-bit dipetakan ke 64 karakter indeks ASCII (`A-Z`, `a-z`, `0-9`, `+`, `/`).

Jika jumlah byte input tidak habis dibagi 3, karakter `=` ditambahkan di ujung sebagai penyeimbang (_padding_):

- **1 byte input** $\rightarrow$ menghasilkan 2 karakter Base64 + 2 padding (`==`).
- **2 byte input** $\rightarrow$ menghasilkan 3 karakter Base64 + 1 padding (`=`).
- **3 byte input** $\rightarrow$ menghasilkan 4 karakter Base64 + 0 padding.

```javascript
console.log(btoa("a")); // "YQ==" (1 byte -> butuh 2 padding)
console.log(btoa("ab")); // "YWI=" (2 byte -> butuh 1 padding)
console.log(btoa("abc")); // "YWJj"  (3 byte -> pas kelipatan 3, tanpa padding)
```

> ⚠️ **Catatan Overhead Ukuran**:
> Karena setiap 3 byte data diubah menjadi 4 karakter ASCII, ukuran data yang di-encode ke Base64 selalu **membengkak sekitar 33%** lebih besar dari ukuran file aslinya.

---

### 3. Batasan Kritis `btoa()`: Jebakan Karakter Latin-1

Fungsi `btoa()` secara historis dirancang untuk memproses string biner di mana setiap karakter hanya berukuran 1 byte (rentang kode $0$ s.d. $255$).
Ketika Anda memasukkan karakter di luar rentang tersebut (misalnya huruf beraksen, aksara Mandarin/Arab/Jawa, atau Emoji), JavaScript akan melempar fatal error:

```javascript
try {
  btoa("Kopi ☕"); // Simbol ☕ memiliki code point 9749 (> 255)
} catch (err) {
  console.error(err.name); // "InvalidCharacterError"
}
```

---

### 4. Solusi Universal Modern: `TextEncoder` & `TextDecoder`

Di browser modern dan Node.js 18+, solusi standar dan paling elegan untuk menangani string Unicode UTF-8 adalah memanfaatkan pasangan Web Standard API: **`TextEncoder`** dan **`TextDecoder`**.

```javascript
// Helper Encode Aman untuk UTF-8 & Emoji
function utf8ToBase64(str) {
  // 1. Ubah string ke deretan byte UTF-8 (Uint8Array, angka 0-255)
  const bytes = new TextEncoder().encode(str);
  // 2. Petakan Uint8Array menjadi string biner Latin-1
  const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    "",
  );
  // 3. Masukkan ke btoa bawaan
  return btoa(binString);
}

// Helper Decode Aman ke Teks Unicode Asli
function base64ToUtf8(base64) {
  // 1. Bongkar Base64 ke binary string
  const binString = atob(base64);
  // 2. Ambil nilai kode angka asli ke Uint8Array
  const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
  // 3. Rakit kembali bytes UTF-8 menjadi string teks asli
  return new TextDecoder().decode(bytes);
}

const encoded = utf8ToBase64("Halo Dunia! 🌟");
console.log(encoded); // "SGFsbyBEdW5pYSEg8J+Mnw=="
console.log(base64ToUtf8(encoded)); // "Halo Dunia! 🌟" ✅
```

---

### 5. Pendekatan Spesifik Node.js: `Buffer.from()`

Jika aplikasi Anda berjalan di lingkungan backend Node.js murni, Anda dapat menggunakan kelas global **`Buffer`** yang jauh lebih ringkas dan dioptimasi di level C++:

```javascript
const teks = "Belajar JavaScript 🚀";

// String UTF-8 ke Base64
const base64Str = Buffer.from(teks, "utf-8").toString("base64");

// Base64 kembali ke String UTF-8
const restoredStr = Buffer.from(base64Str, "base64").toString("utf-8");

console.log(base64Str); // "QmVsYWphciBKYXZhU2NyaXB0IPCfjqA="
console.log(restoredStr); // "Belajar JavaScript 🚀" ✅
```

---

### 6. Base64URL: Varian Aman untuk URL dan Web Token (JWT)

Karakter bawaan Base64 standar memuat simbol `+` dan `/`, serta padding `=`. Ketiga karakter ini merupakan _reserved characters_ di URL yang berisiko merusak parameter routing atau HTTP query.

Spesifikasi **Base64URL** (RFC 7515) mengatasi masalah ini dengan:

1. Mengganti karakter `+` menjadi `-` (dash/hyphen).
2. Mengganti karakter `/` menjadi `_` (underscore).
3. Menghapus karakter padding `=` di bagian akhir.

```javascript
function toBase64Url(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(base64Url) {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return base64;
}

const sample = "users?query=node.js&filter=true";
const b64 = utf8ToBase64(sample); // "dXNlcnM/cXVlcnk9bm9kZS5qcyZmaWx0ZXI9dHJ1ZQ=="
const b64Url = toBase64Url(b64); // "dXNlcnM_cXVlcnk9bm9kZS5qcyZmaWx0ZXI9dHJ1ZQ" ✅
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi dasar `btoa()`/`atob()`, demonstrasi pembuktian padding `=`, penanganan `InvalidCharacterError`, helper universal `TextEncoder`/`TextDecoder`, API `Buffer` Node.js, konversi Base64URL, hingga studi kasus HTTP Basic Auth dan Data URL dirangkum dalam satu laboratorium kode terpadu yang siap dijalankan.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/17-base64/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Header HTTP Basic Authentication**:
   Mengirimkan kombinasi `username:password` pada header HTTP:
   `Authorization: Basic ${btoa(username + ':' + password)}`.
2. **Data URL Gambar / Media Kecil**:
   Menyematkan icon kecil langsung pada atribut `src` HTML atau CSS background tanpa menambah request HTTP jaringan:
   `<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0..." />`.
3. **Payload Token JWT (JSON Web Token)**:
   JWT terdiri dari tiga bagian terpisah titik (`header.payload.signature`), di mana header dan payload dikemas dalam format Base64URL.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira Base64 adalah Enkripsi**:
  Base64 adalah **encoding data publik**, bukan enkripsi keamanan! Siapa pun dapat membalikkan string Base64 dalam hitungan milidetik hanya dengan memanggil `atob()`. **Jangan pernah menyimpan password atau token rahasia dalam bentuk Base64 mentah.**
- **Crash `InvalidCharacterError` saat Menerima Emoji**:
  Memanggil `btoa(inputUser)` secara langsung tanpa helper UTF-8 akan langsung merusak aplikasi pengguna saat mereka memasukkan simbol atau emoji.
- **Pembengkakan Ukuran File Besar**:
  Menyematkan gambar besar (misal > 50 KB) menggunakan Data URL Base64 memperberat dokumen HTML/CSS sebesar 33% dan mencegah browser melakukan caching aset biner secara efisien.

### 🌟 Best Practice

- Gunakan helper universal berbasis `TextEncoder` dan `TextDecoder` untuk semua operasi Base64 string dinamis.
- Gunakan Base64URL jika data Base64 akan disematkan ke dalam URL path, parameter query, atau cookie web.
- Batasi penggunaan Data URL Base64 hanya untuk ikon mini (di bawah 5–10 KB).

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `buatHeaderAuthBasic(username, password)` yang menerima dua argumen kredensial dan menghasilkan string header HTTP `Basic <base64>` yang aman untuk UTF-8.
2. Buat fungsi `parseDataUrl(dataUrlString)` yang menerima string format `data:<mimeType>;base64,<data>` lalu mengekstrak serta mengembalikan objek `{ mimeType, contentText }` menggunakan fungsi decoding UTF-8.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [16 - Encode](../16-encode/README.md)
- ➡️ **Selanjutnya:** [18 - Eval](../18-eval/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
