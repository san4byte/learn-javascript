# 17 - Base64 (btoa, atob, dan Penanganan Teks UTF-8 Unicode)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami konsep encoding **Base64** sebagai representasi data biner dalam 64 karakter ASCII yang aman.
> - **Kapan Digunakan**: Menguasai fungsi bawaan `btoa()` (binary to ASCII) dan `atob()` (ASCII to binary).
> - **Aturan Praktis**: Gunakan helper berbasis `TextEncoder` dan `TextDecoder` untuk menjamin keamanan konversi string beraksen dan emoji.

## 1. 🎯 Tujuan Belajar

- Memahami konsep encoding **Base64** sebagai representasi data biner dalam 64 karakter ASCII yang aman.
- Menguasai fungsi bawaan `btoa()` (binary to ASCII) dan `atob()` (ASCII to binary).
- Memahami **batasan kritis `btoa`** yang hanya mendukung karakter rentang Latin-1 (code point 0x00 - 0xFF).
- Mampu menangani string Unicode / UTF-8 modern (seperti huruf beraksen, aksara Asia, dan emoji) agar tidak melempar InvalidCharacterError.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> `Base64` seperti **layanan telegram diplomatik zaman dahulu**: jaringan telegraf radio hanya mendukung alfabet teks huruf Latin standar. Jika Anda ingin mengirim lukisan sketsa atau gambar dokumen biner rahasia, Anda harus menerjemahkan titik-titik piksel gambar tersebut menjadi deretan kombinasi karakter teks biasa (`btoa`) agar bisa dikirim lewat kabel radio telegraf tanpa mengalami distorsi.

**Base64** adalah skema encoding biner-ke-teks yang merepresentasikan data biner dalam format string ASCII berbasis 64 karakter (`A-Z`, `a-z`, `0-9`, `+`, `/`, dengan `=` sebagai padding).

### 1. Fungsi Bawaan Browser & Node.js Modern

- **`btoa(stringBiner)`**: _Binary to ASCII_, mengonversi string biner/teks menjadi string terenkripsi Base64.
- **`atob(stringBase64)`**: _ASCII to Binary_, mengembalikan string Base64 kembali ke bentuk aslinya.

### 2. Batasan Kritis: Masalah Karakter Latin-1 vs Unicode (UTF-8)

Fungsi `btoa()` secara historis dirancang hanya untuk menangani karakter dalam rentang **Latin-1** (kode karakter $0$ hingga $255$).
Jika Anda memasukkan karakter di luar rentang ini—seperti karakter kanji, aksara Arab/Jawa, atau **Emoji** (misal: `"Halo Dunia 🚀"`):

```javascript
btoa('Belajar JavaScript 🚀');
// ❌ ERROR FATAL: DOMException / InvalidCharacterError: The string to be encoded contains characters outside of the Latin1 range.
```

### 3. Solusi Universal Meng-encode Unicode ke Base64

Agar string Unicode modern dapat di-encode dengan aman menggunakan Base64:

1. **Pendekatan Modern (Node.js & Browser Modern)**:
   Menggunakan objek standar **`TextEncoder`** dan **`TextDecoder`** atau `Buffer` di Node.js.
2. **Pendekatan Universal / Web Legacy**:
   Mengonversi karakter Unicode menjadi urutan byte persen via `encodeURIComponent` sebelum dimasukkan ke `btoa()`:
   ```javascript
   function utf8_to_b64(str) {
     return btoa(
       encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
         return String.fromCharCode('0x' + p1);
       })
     );
   }
   ```

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Dasar Encoding & Decoding Base64 (ASCII Murni) ---');
const teksBiasa = 'Joko Santoso:Programmer';
const textToBase64 = btoa(teksBiasa);
const base64ToText = atob(textToBase64);

console.log('Teks Asli                :', teksBiasa);
console.log('Hasil btoa() (Base64)    :', textToBase64);
console.log('Hasil atob() (Decode)    :', base64ToText);

console.log('\n--- 2. Penanganan Masalah Karakter Unicode / Emoji ---');
const teksUnicode = 'Halo Dunia! 🌟 Selamat Belajar JavaScript 🚀';

// Helper Encode Unicode ke Base64 (Aman untuk UTF-8 dan Emoji)
function encodeBase64Unicode(str) {
  // 1. Bongkar string/emoji menjadi deretan byte UTF-8 (Uint8Array: angka 0-255)
  const bytes = new TextEncoder().encode(str);
  // 2. Ubah tiap angka byte menjadi karakter Latin-1 (0-255) agar muat di btoa
  const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    ''
  );
  // 3. Masukkan ke btoa yang hanya menerima karakter rentang 0-255
  return btoa(binString);
}

// Helper Decode Base64 ke Unicode Asli
function decodeBase64Unicode(base64) {
  // 1. Buka Base64 kembali menjadi string karakter biner Latin-1
  const binString = atob(base64);
  // 2. Ambil nilai kode angka asli (0-255) dari tiap karakter menjadi Uint8Array
  const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
  // 3. Rakit kembali deretan byte UTF-8 menjadi string teks/emoji asli
  return new TextDecoder().decode(bytes);
}

const base64Aman = encodeBase64Unicode(teksUnicode);
const hasilDecodeAman = decodeBase64Unicode(base64Aman);

console.log('Teks Unicode Asli        :', teksUnicode);
console.log('Base64 Aman UTF-8        :', base64Aman);
console.log('Hasil Decode Sempurna    :', hasilDecodeAman);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Dasar Encoding & Decoding Base64 (ASCII Murni) ---
Teks Asli                : Joko Santoso:Programmer
Hasil btoa() (Base64)    : Sm9rbyBTYW50b3NvOlByb2dyYW1tZXI=
Hasil atob() (Decode)    : Joko Santoso:Programmer

--- 2. Penanganan Masalah Karakter Unicode / Emoji ---
Teks Unicode Asli        : Halo Dunia! 🌟 Selamat Belajar JavaScript 🚀
Base64 Aman UTF-8        : SGFsbyBEdW5pYSEg8J+MnyBTZWxhbWF0IEJlbGFqYXIgSmF2YVNjcmlwdCDwn5qA
Hasil Decode Sempurna    : Halo Dunia! 🌟 Selamat Belajar JavaScript 🚀
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Data URL Gambar Inline**: Menyematkan gambar ikon kecil langsung di dalam CSS atau HTML (`<img src='data:image/png;base64,iVBORw0KGgo...' />`) tanpa perlu request HTTP terpisah.
2. **HTTP Basic Authentication Header**: Mengirim kredensial username dan password di header `Authorization: Basic ${btoa(user + ':' + pass)}`.
3. **Payload JSON Web Token (JWT)**: Token otentikasi JWT menggunakan format Base64URL untuk membungkus claims data pengguna.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira Base64 adalah Enkripsi**: Base64 adalah **encoding**, BUKAN enkripsi pengamanan data! Siapapun bisa membuka data Base64 semudah memanggil `atob()`. Jangan gunakan Base64 untuk menyembunyikan password.
- **Bencana `InvalidCharacterError`**: Memanggil `btoa('🚀')` langsung tanpa helper Unicode akan langsung merusak aplikasi dengan error runtime yang fatal.
- **Ukuran file membengkak ~33%**: Data yang di-encode ke Base64 mengalami peningkatan ukuran byte sekitar 33%. Jangan gunakan Base64 untuk file gambar atau video berukuran besar.

### 🌟 Best Practice

- Gunakan helper berbasis `TextEncoder` dan `TextDecoder` untuk menjamin keamanan konversi string beraksen dan emoji.
- Ingat bahwa Base64 hanya untuk kemudahan transmisi data di media berbasis teks, bukan untuk keamanan rahasia.
- Batasi penggunaan Data URL gambar Base64 hanya untuk file berukuran kecil (di bawah 10 KB).

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `buatHeaderAuthBasic(username, password)` yang menghasilkan string otentikasi header HTTP `Basic <base64>` menggunakan `btoa()`.
2. Ujilah helper `encodeBase64Unicode` dengan memasukkan nama Anda beserta simbol dan emoji, lalu buktikan bahwa string dapat dikembalikan secara utuh dengan `decodeBase64Unicode`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [16 - Encode](../16-encode/README.md)
- ➡️ **Selanjutnya:** [18 - Eval](../18-eval/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
