# 16 - URL Encoding (encodeURI, encodeURIComponent, decodeURI, dan decodeURIComponent)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengonversi karakter teks khusus menjadi format **Percent-Encoding** agar aman ditransmisikan melalui alamat URL internet.
> - **Kapan Digunakan**: Membangun parameter query pencarian (_search params_), deep linking callback autentikasi, dan pengiriman pesan via link WhatsApp / media sosial.
> - **Aturan Praktis**: Selalu gunakan `encodeURIComponent()` untuk **setiap nilai parameter secara terpisah**, jangan pernah gunakan pada seluruh URL utuh, dan bungkus `decodeURIComponent()` dengan `try...catch` untuk mengantisipasi `URIError`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep URL Percent-Encoding dan alasan mengapa karakter khusus wajib disandikan dalam protokol HTTP.
- Membedakan peran dan peruntukan antara `encodeURI()` dan `encodeURIComponent()`.
- Memahami pasangan fungsi decoding: `decodeURI()` dan `decodeURIComponent()`.
- Mengetahui daftar karakter _reserved_ URL (`;`, `/`, `?`, `:`, `@`, `&`, `=`, `+`, `$`, `,`, `#`) dan bagaimana keduanya diperlakukan.
- Menangani potensi crash aplikasi akibat `URIError: URI malformed` menggunakan pola `try...catch`.
- Memahami alternatif modern berbasis standar web: objek `URL` dan `URLSearchParams`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `encodeURI` seperti **memberi perangko pos resmi pada amplop surat lengkap**: stempel jalan raya, nama kota, dan kode pos (`https://`, `/`, `?`) tidak boleh dicoret karena kurir kantor pos butuh membaca struktur alamatnya. Sedangkan `encodeURIComponent` seperti **membungkus dokumen rahasia di dalam amplop dengan bubble wrap tebal**: semua isi teks di dalamnya diikat rapat agar tidak bocor dan tidak mengganggu proses penyortiran surat oleh kurir.

---

### 1. Tabel Perbandingan `encodeURI()` vs `encodeURIComponent()` (Cheat-Sheet)

| Fitur                       | `encodeURI(uri)`                            | `encodeURIComponent(component)`                      |
| :-------------------------- | :------------------------------------------ | :--------------------------------------------------- |
| **Tujuan Utama**            | Meng-encode **seluruh alamat URL lengkap**. | Meng-encode **satu nilai parameter / query string**. |
| **Karakter Reserved URL**   | **Dibiarkan UTUH**: `;,/?:@&=+$#`           | **SEMUA di-encode** menjadi kode persen (`%XX`).     |
| **Karakter Spasi**          | Diubah menjadi `%20`.                       | Diubah menjadi `%20`.                                |
| **Karakter Alpha-Numerik**  | Dibiarkan utuh (`A-Z`, `a-z`, `0-9`).       | Dibiarkan utuh (`A-Z`, `a-z`, `0-9`).                |
| **Karakter Unescaped Lain** | `- _ . ! ~ * ' ( )`                         | `- _ . ! ~ * ' ( )`                                  |
| **Contoh Input**            | `'https://web.com/cari?q=buku baru'`        | Nilai parameter: `'buku & majalah #1'`               |
| **Hasil Output**            | `'https://web.com/cari?q=buku%20baru'`      | `'buku%20%26%20majalah%20%231'`                      |

---

### 2. Aturan Kritis: Kapan Menggunakan yang Mana?

> ⚠️ **Dua Kesalahan Fatal yang Sering Terjadi**:
>
> 1. **Jika Anda menggunakan `encodeURI` pada nilai query parameter**: Karakter `&` atau `=` tidak akan di-encode. Akibatnya, string seperti `'buku & majalah'` akan dipecah oleh server backend menjadi dua parameter yang berbeda (_parameter tampering_).
> 2. **Jika Anda menggunakan `encodeURIComponent` pada URL lengkap**: Simbol protokol `https://` dan garis miring `/` akan diubah menjadi `https%3A%2F%2F`. URL tersebut rusak dan tidak bisa dibuka oleh browser!

- **Praktik yang Benar**:

  ```javascript
  const domain = "https://toko-buku.com/search";
  const keyword = "React & Node.js: Panduan Pemula";
  const kategori = "IT / Web";

  // Biarkan URL dasar utuh, bungkus setiap nilai variabel dengan encodeURIComponent:
  const urlAman = `${domain}?q=${encodeURIComponent(keyword)}&kategori=${encodeURIComponent(kategori)}`;
  ```

---

### 3. Pasangan Decoding: `decodeURI()` vs `decodeURIComponent()`

- **`decodeURI(encodedURI)`**: Mengembalikan URL utuh kembali ke teks aslinya, namun tetap membiarkan kode persen karakter reserved (seperti `%26`, `%2F`, `%3A`) dalam bentuk persen.
- **`decodeURIComponent(encodedComponent)`**: Memulihkan seluruh kode persen kembali menjadi karakter aslinya secara total:

  ```javascript
  const tersandi = "React%20%26%20Node.js%3A%20100%25";

  console.log(decodeURI(tersandi)); // "React %26 Node.js%3A 100%" (simbol %26 dan %3A tidak dipulihkan)
  console.log(decodeURIComponent(tersandi)); // "React & Node.js: 100%"     (seluruhnya dipulihkan! ✅)
  ```

---

### 4. Jebakan Fatal: `URIError: URI malformed`

Jika string yang di-decode memuat tanda persen `%` yang tidak valid (misalnya persen tunggal atau heksadesimal tidak lengkap), JavaScript akan melempar fatal error:

```javascript
// decodeURIComponent('diskon 100%'); // ❌ URIError: URI malformed

// Pola Defensive Programming yang Benar:
function safeDecodeURI(str, fallback = "") {
  try {
    return decodeURIComponent(str);
  } catch (error) {
    console.warn("Gagal memulihkan URL:", error.message);
    return fallback;
  }
}

console.log(safeDecodeURI("diskon 100%", "diskon 100%")); // Aman tanpa crash ✅
```

---

### 5. Penanganan Karakter Unicode & Emoji

Karakter internasional atau emoji menempati beberapa byte di UTF-8. `encodeURIComponent` secara cerdas mengonversi setiap byte menjadi pasangan `%XX`:

```javascript
const teks = "Kopi ☕";
const encoded = encodeURIComponent(teks);
console.log(encoded); // "Kopi%20%E2%98%95"
console.log(decodeURIComponent(encoded)); // "Kopi ☕" ✅
```

---

### 6. Alternatif Modern: API `URL` & `URLSearchParams`

Di browser modern dan Node.js, Anda tidak perlu lagi merangkai URL secara manual dengan string concatenation:

```javascript
const myUrl = new URL("https://toko-buku.com/search");

// searchParams otomatis melakukan encoding yang benar secara background:
myUrl.searchParams.set("q", "React & Node.js");
myUrl.searchParams.set("page", 1);

console.log(myUrl.toString());
// "https://toko-buku.com/search?q=React+%26+Node.js&page=1" ✅
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep perbedaan `encodeURI` vs `encodeURIComponent`, penyusunan URL aman, pemulihan decoding, penanganan `URIError` via `try...catch`, encoding emoji, dan pemanfaatan `URLSearchParams` di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/16-encode/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Kotak Pencarian Web (Search Bar)**: Mengamankan kata kunci pencarian yang dimasukkan pengguna sebelum dialihkan ke halaman hasil pencarian.
2. **Deep Linking & Callback URL**: Mengirimkan alamat halaman kembali pada alur login SSO: `/login?returnTo=${encodeURIComponent('/checkout?step=2')}`.
3. **Integrasi Share Link WhatsApp / Medsos**: Memformat pesan otomatis WhatsApp Web: `https://wa.me/62812345?text=${encodeURIComponent(pesan)}`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Meng-encode Seluruh URL dengan `encodeURIComponent`**: Mengakibatkan `https://` menjadi `https%3A%2F%2F` sehingga link tidak bisa diklik.
- **Meng-encode Parameter dengan `encodeURI`**: Karakter pemisah seperti `&` atau `=` tidak di-encode sehingga parameter terpotong di server.
- **Lupa `try...catch` pada Decoding**: Memicu crash aplikasi jika string URL dari pengguna mengandung karakter persen liar (`%`).

### 🌟 Best Practice

- Gunakan `encodeURIComponent()` untuk nilai individual setiap parameter query string.
- Gunakan objek `new URL()` dan `URLSearchParams` untuk menyusun URL yang bersih, terstruktur, dan otomatis aman.
- Selalu lindungi pemanggilan `decodeURIComponent()` dengan blok `try...catch`.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `buatLinkWhatsApp(nomor, pesan)` yang menerima nomor telepon internasional dan teks pesan, lalu mengembalikan tautan `https://wa.me/<nomor>?text=<pesan_terencode>`.
2. Buat fungsi `ekstrakParamSearch(urlLengkap)` yang mem-parsing nilai parameter `q` dari suatu URL dan mengembalikan string bersih yang sudah di-decode secara aman.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [15 - Reflect](../15-reflect/README.md)
- ➡️ **Selanjutnya:** [17 - Base64](../17-base64/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
