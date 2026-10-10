# 01 - Pengenalan DOM & DOM Tree

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami konsep Document Object Model (DOM) sebagai representasi dokumen HTML berupa pohon objek (_tree structure_) di memori browser.
> - **Kapan Digunakan**: Pondasi mutlak sebelum melakukan manipulasi tampilan web dinamis, penanganan event klik/input, dan pembuatan Single Page Application (SPA).
> - **Aturan Praktis**: Objek `document` adalah gerbang utama (_entry point_) DOM di browser. Tempatkan tag `<script>` tepat sebelum penutup `</body>` atau gunakan atribut `defer` pada `<head>` agar elemen HTML selesai di-parse sebelum skrip dieksekusi.

---

## 1. 🎯 Tujuan Belajar

- Memahami definisi W3C DOM dan bagaimana browser mengubah berkas teks HTML menjadi objek memori (_DOM Tree_).
- Mengetahui perbedaan peran antara **BOM** (`window`) dan **DOM** (`document`).
- Mengenal properti bawaan objek `document` (`title`, `URL`, `documentElement`, `head`, `body`, dll.).
- Mengidentifikasi tipe-tipe simpul W3C melalui konstanta `Node.nodeType`, `nodeName`, dan `nodeValue`.
- Memahami strategi pemuatan skrip JavaScript yang aman terhadap siklus hidup dokumen HTML.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan file HTML mentah Anda adalah **selembar kertas cetak biru arsitektur rumah**. Kertas tersebut bersifat pasif dan diam. Ketika browser membaca cetak biru tersebut, ia mendirikan **maket miniatur 3D rumah interaktif** di atas meja kerja yang disebut **DOM Tree**.
> Melalui JavaScript (seperti alat pengendali), Anda dapat mengganti cat dinding kamar tidur (`document.body.style`), menambahkan furnitur baru (`createElement`), atau merobohkan sekat ruangan (`remove()`) secara langsung tanpa harus menggambar ulang cetak birunya dari awal.

---

### Tabel Ringkasan Properti & Tipe Node DOM

| Properti / Tipe            | Nilai Kembali (_Return Value_)                    | Deskripsi Singkat                                         |
| :------------------------- | :------------------------------------------------ | :-------------------------------------------------------- |
| `document.title`           | `string`                                          | Membaca atau mengubah teks judul tab dokumen browser.     |
| `document.URL`             | `string`                                          | Alamat URL lengkap halaman yang sedang aktif.             |
| `document.documentElement` | `Element` (`<html>`)                              | Simpul elemen akar paling atas dari keseluruhan dokumen.  |
| `document.head`            | `Element` (`<head>`)                              | Simpul elemen pembungkus metadata dan stylesheet dokumen. |
| `document.body`            | `Element` (`<body>`)                              | Simpul elemen penampung seluruh konten visual halaman.    |
| `document.readyState`      | `string` (`loading` / `interactive` / `complete`) | Status kesiapan pemuatan dokumen HTML.                    |
| `Node.ELEMENT_NODE` (1)    | `number`                                          | Tipe node untuk elemen/tag HTML (misal `<h1>`, `<div>`).  |
| `Node.TEXT_NODE` (3)       | `number`                                          | Tipe node untuk teks karakter di dalam elemen atau spasi. |
| `Node.DOCUMENT_NODE` (9)   | `number`                                          | Tipe node untuk simpul teratas root (`document`).         |

---

### Pembahasan Mendalam Fitur & API

#### 1. Gerbang Utama: Objek `document`

Objek global `document` disediakan oleh browser sebagai antarmuka resmi untuk berinteraksi dengan struktur halaman web.

```javascript
// Memeriksa keberadaan objek dokumen di runtime
if (typeof document !== "undefined") {
  console.log("DOM tersedia:", document.nodeName); // Output: "#document"
}
```

#### 2. Membaca dan Mengubah `document.title`

Properti `title` merefleksikan isi tag `<title>` pada dokumen HTML dan dapat dimutasi secara langsung oleh skrip.

```javascript
console.log("Judul saat ini:", document.title);
// Mengubah judul tab browser secara real-time
document.title = "Dashboard Pengguna - Aktif";
```

#### 3. Mengakses URL Dokumen dengan `document.URL`

Mengembalikan string alamat URL absolut dokumen saat ini (bersifat _read-only_).

```javascript
const currentUrl = document.URL;
console.log("Halaman dibuka dari:", currentUrl);
```

#### 4. Akses Elemen Akar (`documentElement`, `head`, `body`)

DOM menyediakan pintasan (_shortcut_) cepat untuk mengakses tiga simpul struktur utama tanpa perlu memanggil method pencarian query.

```javascript
const html = document.documentElement; // Elemen <html>
const kepala = document.head; // Elemen <head>
const badan = document.body; // Elemen <body>
console.log(html.tagName, kepala.tagName, badan.tagName); // "HTML" "HEAD" "BODY"
```

#### 5. Metadata Status Dokumen (`readyState`)

Menandakan tahap siklus hidup penguraian (_parsing_) dokumen oleh browser.

```javascript
console.log("Status pemuatan:", document.readyState);
// Kemungkinan nilai: "loading", "interactive", atau "complete"
```

#### 6. Mengenal Sistem Tipe Node (`Node.nodeType`)

Setiap simpul pada DOM Tree memiliki jenis yang diidentifikasi oleh angka integer 1 sampai 12 sesuai standar W3C.

```javascript
const heading = document.getElementById("judul-halaman");
if (heading) {
  console.log(heading.nodeType === Node.ELEMENT_NODE); // true (nilai 1)
  console.log(heading.firstChild.nodeType === Node.TEXT_NODE); // true (nilai 3)
}
```

#### 7. Perbedaan Objek BOM (`window`) vs DOM (`document`)

`window` mewakili jendela peramban (BOM - Browser Object Model) dan merupakan objek teratas global, sedangkan `document` adalah properti dari `window` yang mewakili isi halaman web.

```javascript
// Objek document adalah bagian dari window
console.log(window.document === document); // true
// window menangani ukuran layar, navigasi, dan timer:
console.log("Lebar viewport:", window.innerWidth);
```

#### 8. Strategi Penempatan Skrip (`defer`, `async`, vs Akhir `<body>`)

Jika JavaScript mengeksekusi elemen sebelum elemen tersebut di-render oleh browser, panggilan seleksi akan mengembalikan `null`.

```html
<!-- Pendekatan 1: Menaruh tag skrip di baris terbawah <body> (Tradisional & Aman) -->
<script src="example.js"></script>

<!-- Pendekatan 2: Meletakkan di <head> dengan atribut defer (Standar Modern) -->
<!-- Skrip diunduh paralel dan dieksekusi setelah parsing HTML selesai -->
<script src="example.js" defer></script>
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi properti dokumen, inspeksi tipe simpul W3C, dan simulasi struktur hierarki telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas tersebut mendukung eksekusi terminal (Node.js) untuk visualisasi konseptual, maupun eksekusi langsung di browser melalui [`index.html`](index.html).

Jalankan skrip demonstrasi menggunakan Node.js di terminal:

```bash
node 05-dom/01-intro/example.js
```

Atau buka [`index.html`](index.html) langsung di browser (atau via ekstensi VS Code _Live Server_) dan amati tab **DevTools Console (`F12`)**.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Dinamis Tab Badge / Notifikasi**: Menampilkan jumlah pesan yang belum dibaca langsung di judul tab browser:
   ```javascript
   function updateUnreadBadge(count) {
     document.title = count > 0 ? `(${count}) Pesan Baru - MyApp` : "MyApp";
   }
   ```
2. **Global Theming**: Menyetel tema gelap/terang pada level dokumen:
   ```javascript
   document.documentElement.setAttribute("data-theme", "dark");
   ```

### ⚠️ Common Pitfalls

- **Mengakses DOM Terlalu Dini**: Memanggil `document.getElementById()` di tag `<head>` tanpa `defer` atau tanpa menunggu event `DOMContentLoaded` akan menghasilkan nilai `null` dan memicu error `TypeError: Cannot read properties of null`.
- **Menyamakan Text Node dengan Element Node**: Spasi dan enter di antara tag HTML dalam kode sumber dihitung sebagai simpul teks (`Text Node`) oleh DOM. Menggunakan `childNodes` alih-alih `children` sering kali mengambil simpul spasi tak kasat mata ini.

### 🌟 Best Practice

- Gunakan atribut `defer` jika memasang tag `<script>` di bagian `<head>`, atau letakkan berkas skrip tepat sebelum `</body>`.
- Kenali batasan lingkungan: Objek `document` tidak tersedia secara global di lingkungan murni Node.js. Gunakan pengkondisian `typeof document !== 'undefined'` untuk pustaka (_library_) universal.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di peramban web Anda, tekan `F12` untuk membuka Console, kemudian ketik:
   ```javascript
   document.title = "Belajar DOM Bersama Antigravity!";
   ```
   Amati perubahan teks yang terjadi pada bilah tab jendela peramban Anda.
2. Gunakan perintah berikut di Console browser untuk menginspeksi tipe simpul tag `<body>`:
   ```javascript
   console.log(document.body.nodeType === Node.ELEMENT_NODE);
   ```

---

## 6. 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [08 - Dynamic Module Loading (Modul 04)](../../04-modules/08-dynamic-module-loading/README.md)
- ➡️ **Materi Selanjutnya:** [02 - DOM Selection](../02-dom-selection/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
