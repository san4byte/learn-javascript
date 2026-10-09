# 01 - Web Storage API (localStorage, sessionStorage, dan Cookies)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyimpan data berformat pasangan kunci-nilai (_key-value_) di sisi peramban klien (_Client-Side Storage_) tanpa perlu mengirimkannya berulang kali ke server pada setiap request HTTP.
> - **Kapan Digunakan**: Menyimpan preferensi tema antarmuka (Dark/Light mode), data keranjang belanja lokal (_offline cart_), formulir _draft_, hingga caching data non-sensitif.
> - **Aturan Praktis**: Web Storage hanya mendukung tipe data string mentah. Selalu gunakan `JSON.stringify()` saat menyimpan objek/array dan `JSON.parse()` saat membacanya kembali di dalam blok `try...catch` guna mencegah error parsing.

---

## 1. 🎯 Tujuan Belajar

- Memahami perbedaan mendasar antara `localStorage`, `sessionStorage`, dan `Cookies`.
- Menguasai 5 method inti antarmuka `Storage`: `setItem()`, `getItem()`, `removeItem()`, `clear()`, dan `key()`.
- Mampu menyimpan dan merekonstruksi struktur data kompleks (Array/Object) via JSON serialization.
- Memahami mekanisme sinkronisasi data lintas tab browser menggunakan event `window.onstorage`.
- Mengetahui batasan kapasitas kuota penyimpanan (~5MB-10MB) dan menangani error `QuotaExceededError`.
- Memahami implikasi keamanan XSS vs HttpOnly Cookies untuk data otentikasi sensitif.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **`localStorage`** seperti **buku catatan permanen di meja kerja kantor Anda**: Besok, lusa, atau bulan depan saat Anda masuk kantor kembali, catatan tersebut tetap ada di tempatnya sampai Anda sendiri yang merobek atau menghapusnya.
> - **`sessionStorage`** seperti **papan tulis temporary di ruang meeting**: Begitu sesi meeting selesai dan ruangan ditutup (tab peramban di-close), papan tulis otomatis dihapus bersih oleh petugas kebersihan.
> - **`Cookies`** seperti **tiket gelang bernomor barcode di pergelangan tangan Anda**: Anda tidak perlu membuka tas Anda; setiap kali Anda berjalan melewati gerbang pengecekan (setiap request HTTP ke server), petugas tiket langsung memindai gelang tersebut secara otomatis.

---

### Tabel Perbandingan Mekanisme Penyimpanan Klien

| Parameter                | `localStorage`                          | `sessionStorage`                     | `Cookies`                                  |
| :----------------------- | :-------------------------------------- | :----------------------------------- | :----------------------------------------- |
| **Masa Hidup Data**      | Permanen (sampai dihapus eksplisit)     | Sementara (hilang saat tab ditutup)  | Dapat ditentukan tanggal kedaluwarsanya    |
| **Kapasitas Rata-rata**  | $\approx 5\text{ MB} - 10\text{ MB}$    | $\approx 5\text{ MB}$                | $\approx 4\text{ KB}$                      |
| **Pengiriman ke Server** | ❌ Tidak pernah otomatis dikirim        | ❌ Tidak pernah otomatis dikirim     | ✅ Otomatis terlampir di header HTTP       |
| **Isolasi Lingkup**      | Dibagikan antar semua tab (Same-Origin) | Khusus untuk tab aktif saat itu saja | Dibagikan antar tab domain yang sama       |
| **Proteksi Keamanan**    | Rentan pencurian skrip XSS              | Rentan pencurian skrip XSS           | Bisa dilindungi flag `HttpOnly` & `Secure` |

---

### Pembahasan Mendalam Fitur & API

#### 1. Perbedaan Fundamental `localStorage` vs `sessionStorage`

Keduanya mewarisi antarmuka `Storage` yang sama persis, hanya berbeda pada masa retensi data di memori browser.

```javascript
// Data bertahan selamanya meskipun browser ditutup dan dibuka lagi
localStorage.setItem("tema", "dark");

// Data otomatis terhapus saat tab jendela browser ditutup
sessionStorage.setItem("langkahWizard", "2");
```

#### 2. Menyimpan Data dengan `storage.setItem(key, value)`

Menyimpan pasangan string. Jika nilai yang dimasukkan bukan string (seperti angka atau boolean), browser akan otomatis mengonversinya menjadi string.

```javascript
localStorage.setItem("namaUser", "Joko Santoso");
localStorage.setItem("loginTerakhir", Date.now().toString());
```

#### 3. Membaca Data dengan `storage.getItem(key)`

Mengambil nilai string berdasarkan kuncinya. Mengembalikan `null` jika kunci tidak ditemukan.

```javascript
const user = localStorage.getItem("namaUser");
if (user !== null) {
  console.log("Selamat datang kembali,", user);
}
```

#### 4. Menghapus Data Spesifik dengan `storage.removeItem(key)`

Menghapus satu kunci tertentu tanpa mengganggu kunci lainnya.

```javascript
localStorage.removeItem("langkahWizard"); // Hanya kunci ini yang dihapus
```

#### 5. Mengosongkan Seluruh Penyimpanan dengan `storage.clear()`

Menghapus seluruh pasangan key-value yang tersimpan pada origin/domain aktif.

```javascript
localStorage.clear(); // Bersih total
```

#### 6. Serialisasi Objek Kompleks via `JSON.stringify()` dan `JSON.parse()`

Karena Storage hanya menerima tipe string, objek JavaScript wajib dikonversi menjadi string JSON terlebih dahulu.

```javascript
const cart = [{ id: 1, nama: "Kopi", harga: 25000 }];

// Simpan objek:
localStorage.setItem("keranjang", JSON.stringify(cart));

// Baca kembali ke objek:
const savedCart = JSON.parse(localStorage.getItem("keranjang") || "[]");
console.log("Jumlah item:", savedCart.length);
```

#### 7. Event `window.onstorage` untuk Sinkronisasi Antar-Tab

Event `storage` terpicu pada jendela/tab lain pada domain yang sama saat terjadi perubahan data di `localStorage`.

```javascript
window.addEventListener("storage", (event) => {
  console.log(
    `Kunci '${event.key}' diubah dari '${event.oldValue}' menjadi '${event.newValue}'`,
  );
  if (event.key === "tema") {
    document.body.className = event.newValue;
  }
});
```

#### 8. Batasan Keamanan XSS & Penanganan `QuotaExceededError`

Jika kapasitas kuota peramban penuh ($\approx 5\text{MB}$), method `setItem()` akan melempar eksepsi `QuotaExceededError`.

```javascript
try {
  localStorage.setItem("key_besar", dataBesar);
} catch (e) {
  if (e.name === "QuotaExceededError") {
    console.error("Kapasitas penyimpanan browser lokal telah penuh!");
  }
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi penyimpanan tipe primitif, serialisasi objek JSON, class helper aman (_safe wrapper_) penanganan kuota, serta simulasi keranjang belanja e-commerce telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini dirancang untuk dapat dijalankan langsung di terminal Node.js melalui _Storage fallback mock_, maupun di peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 07-modern-web-api/01-web-storage/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Application Tab (`F12 -> Application -> Local Storage`)** untuk mengamati perubahan data secara langsung.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Penyimpanan Preferensi Tema (Dark Mode Switcher)**:
   ```javascript
   function applySavedTheme() {
     const savedTheme = localStorage.getItem("app_theme") || "light";
     document.documentElement.setAttribute("data-theme", savedTheme);
   }
   ```
2. **Formulir Draft Auto-Save**: Menyimpan isi ketikan artikel pengguna setiap 2 detik ke `sessionStorage` agar tulisan tidak hilang saat terjadi refresh halaman yang tidak disengaja.

### ⚠️ Common Pitfalls

- **Menyimpan Objek Langsung Tanpa `JSON.stringify()`**: Menulis `localStorage.setItem('user', { id: 1 })` akan menyimpan string `"[object Object]"` yang tidak bisa dibaca kembali.
- **Menyimpan Token Sensitif / Rahasia di `localStorage`**: Jangan pernah menyimpan token sensitif (seperti refresh token finansial atau password) di `localStorage` karena rentan dicuri oleh skrip berbahaya pihak ketiga melalui serangan **XSS (Cross-Site Scripting)**. Gunakan `HttpOnly Cookie`.

### 🌟 Best Practice

- Selalu bungkus pembacaan `JSON.parse(localStorage.getItem(...))` di dalam blok `try...catch` untuk mengantisipasi data korup atau manipulasi manual oleh user di DevTools.
- Buat abstraksi modul penyimpanan terpusat agar mudah beralih ke IndexedDB jika data melebihi batas 5MB.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di peramban web. Buka DevTools Console (`F12`), simpan daftar to-do list berisi 3 buah tugas ke dalam `localStorage` menggunakan `JSON.stringify()`.
2. Tutup tab peramban Anda, buka tab baru dengan alamat yang sama, lalu baca kembali data tugas tersebut menggunakan `JSON.parse(localStorage.getItem(...))`!

---

## 6. 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [06 - Asynchronous JavaScript](../../06-asynchronous/README.md)
- ➡️ **Materi Selanjutnya:** [02 - Modern Syntax ES2020+](../02-modern-syntax-es2020/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
