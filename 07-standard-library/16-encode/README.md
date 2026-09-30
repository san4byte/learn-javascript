# 16 - URL Encoding (encodeURI, encodeURIComponent, decodeURI, dan decodeURIComponent)

## 1. 🎯 Tujuan Belajar
- Memahami konsep URL Encoding (*Percent-Encoding*) untuk transmisi data aman di internet.\n- Membedakan fungsi dan peruntukan antara `encodeURI()` dan `encodeURIComponent()`.\n- Memahami pasangan decoding: `decodeURI()` dan `decodeURIComponent()`.\n- Mengetahui karakter reserved URL (`;`, `/`, `?`, `:`, `@`, `&`, `=`, `+`, `$`, `,`, `#`) dan bagaimana keduanya diperlakukan.

---

## 2. 📖 Penjelasan Konsep
Saat mengirim data melalui URL (alamat web), karakter tertentu seperti spasi, tanda pagar `#`, tanda tanya `?`, atau huruf non-Latin memiliki arti khusus (*reserved characters*) atau tidak didukung oleh protokol HTTP standar. Karakter-karakter tersebut wajib dikonversi menjadi format **Percent-Encoding** (contoh: spasi menjadi `%20`).

JavaScript menyediakan dua pasang fungsi global untuk menangani encoding dan decoding URL:

### 1. `encodeURI()` vs `encodeURIComponent()`

| Fitur | `encodeURI(uri)` | `encodeURIComponent(component)` |
| :--- | :--- | :--- |
| **Tujuan Penggunaan** | Meng-encode **seluruh alamat URL lengkap** | Meng-encode **satu nilai parameter/query string** |
| **Karakter Reserved URL** | **TIDAK di-encode** (dibiarkan utuh): `;,/?:@&=+$#` | **SEMUA di-encode** menjadi kode persen |
| **Karakter Spasi** | Diubah menjadi `%20` | Diubah menjadi `%20` |
| **Contoh Kasus** | `https://site.com/cari?q=buku baru` | Nilai parameter: `buku & majalah/edisi #1` |

> ⚠️ **Penting**: Jika Anda menggunakan `encodeURI` pada nilai query parameter yang memuat karakter `&` atau `=`, karakter tersebut tidak akan di-encode sehingga struktur parameter URL Anda akan rusak dan terpecah! Sebaliknya, jika Anda menggunakan `encodeURIComponent` pada URL lengkap, tanda protokol `https://` akan berubah menjadi `https%3A%2F%2F` sehingga URL tidak bisa dibuka oleh browser!

### 2. Pasangan Decoding
* **`decodeURI(encodedURI)`**: Mengembalikan URL lengkap hasil `encodeURI` kembali ke karakter aslinya.
* **`decodeURIComponent(encodedComponent)`**: Mengembalikan nilai komponen hasil `encodeURIComponent` kembali ke karakter aslinya.

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Perbedaan encodeURI vs encodeURIComponent ---");
const parameterKueri = "buku & majalah / edisi #1 (edisi baru)";

// Skenario A: encodeURI (Karakter & / # DIBIARKAN, berbahaya jika jadi query param!)
const hasilEncodeURI = encodeURI(parameterKueri);
console.log("encodeURI            :", hasilEncodeURI);

// Skenario B: encodeURIComponent (Semua karakter khusus di-encode dengan aman)
const hasilEncodeComponent = encodeURIComponent(parameterKueri);
console.log("encodeURIComponent   :", hasilEncodeComponent);

console.log("\n--- 2. Contoh Nyata Membangun URL Search yang Aman ---");
const baseUrl = "https://toko-buku.com/search";
const kataKunci = "React & Node.js: Panduan Pemula 100% Bagus!";
const filterKategori = "IT / Programming";

// Gabungkan URL: baseUrl tetap aman, parameter dibungkus encodeURIComponent
const urlLengkap = `${baseUrl}?q=${encodeURIComponent(kataKunci)}&kategori=${encodeURIComponent(filterKategori)}`;
console.log("URL Lengkap Siap Pakai:\n" + urlLengkap);

console.log("\n--- 3. Mengembalikan Nilai dengan decodeURIComponent ---");
const parameterDariServer = "React%20%26%20Node.js%3A%20Panduan%20Pemula%20100%25%20Bagus!";
const hasilDecode = decodeURIComponent(parameterDariServer);
console.log("Hasil Decode Kembali :", hasilDecode);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Perbedaan encodeURI vs encodeURIComponent ---
encodeURI            : buku%20&%20majalah%20/%20edisi%20#1%20(edisi%20baru)
encodeURIComponent   : buku%20%26%20majalah%20%2F%20edisi%20%231%20(edisi%20baru)

--- 2. Contoh Nyata Membangun URL Search yang Aman ---
URL Lengkap Siap Pakai:
https://toko-buku.com/search?q=React%20%26%20Node.js%3A%20Panduan%20Pemula%20100%25%20Bagus!&kategori=IT%20%2F%20Programming

--- 3. Mengembalikan Nilai dengan decodeURIComponent ---
Hasil Decode Kembali : React & Node.js: Panduan Pemula 100% Bagus!
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> `encodeURI` seperti **memberi perangko pos resmi pada amplop surat lengkap**: stempel jalan raya, nama kota, dan kode pos (`https://`, `/`, `?`) tidak boleh dicoret karena kurir butuh melihat struktur alamatnya. Sedangkan `encodeURIComponent` seperti **membungkus dokumen rahasia di dalam amplop dengan bubble wrap tebal**: semua isi di dalamnya diikat rapat agar tidak bocor dan tidak mengganggu proses pengiriman surat.

### 🏢 Real-World Use Case
1. **Kueri Pencarian Web (Search Bar)**: Mengamankan kata kunci pencarian yang dimasukkan user yang memuat karakter simbol seperti `&`, `?`, `=`, atau `#`.\n2. **Deep Linking & Redirect URL**: Mengirimkan URL tujuan sebagai parameter callback pada sistem login: `login?redirect=${encodeURIComponent('/dashboard?tab=1')}`.\n3. **Sharing Link Media Sosial**: Menyiapkan URL berbagi WhatsApp atau Twitter: `https://wa.me/?text=${encodeURIComponent(pesan)}`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Menggunakan `encodeURIComponent` pada seluruh URL**: Menulis `encodeURIComponent('https://google.com')` akan mengubah karakter `:` dan `/` sehingga browser tidak dapat mengenali protokol web.\n* **Menggunakan `encodeURI` pada nilai parameter query**: Karakter `&` pada nilai teks tidak di-encode sehingga server akan menganggapnya sebagai pemisah parameter baru (*parameter tampering*).\n* **Mencoba decode string persen yang tidak lengkap**: `decodeURIComponent('%')` akan melempar fatal error `URIError: URI malformed`. Selalu bungkus decoding string dari luar dalam `try...catch`.

### 🌟 Best Practice
* Gunakan `encodeURIComponent()` untuk setiap nilai parameter query string secara individual.\n* Gunakan API modern `URLSearchParams` atau objek `URL` bawaan JavaScript yang otomatis melakukan encoding komponen secara tepat.\n* Selalu bungkus `decodeURIComponent()` dengan `try...catch` untuk mengantisipasi URL rusak atau karakter persen malformed dari pengguna jahat.

---

## 6. ✍️ Latihan Mandiri
1. Buat fungsi `bangunUrlWhatsapp(nomorHp, pesanTeks)` yang menghasilkan link `https://wa.me/<nomor>?text=<pesan_terencode>` menggunakan `encodeURIComponent`.\n2. Tulis fungsi `bacaQueryParamAman(encodedStr)` yang mem-decode string parameter dan menangani potensi `URIError` menggunakan `try...catch`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [15 - Reflect](../15-reflect/README.md)\n- ➡️ **Selanjutnya:** [17 - Base64](../17-base64/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
