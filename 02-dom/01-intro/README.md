# 01 - Pengenalan DOM (Document Object Model) & DOM Tree

## 1. 🎯 Tujuan Belajar
- Memahami konsep dasar Document Object Model (DOM) sebagai representasi dokumen di memori.
- Memahami struktur hierarki pohon dokumen (DOM Tree).
- Mengenal 4 tipe Node fundamental: Document, Element, Attribute, dan Text Node.
- Memahami bagaimana JavaScript dapat memanipulasi dokumen web secara dinamis.

---

## 2. 📖 Penjelasan Konsep
**Document Object Model (DOM)** adalah antarmuka pemrograman (*Application Programming Interface*) standar W3C untuk dokumen HTML dan XML.

Ketika browser memuat halaman web:
1. Browser mengurai teks mentah HTML (*parsing*).
2. Browser membuat pohon objek di dalam memori RAM yang disebut **DOM Tree**.
3. JavaScript diberikan akses ke objek global **`document`** untuk membaca, menambah, mengubah, dan menghapus elemen maupun gaya CSS secara *real-time*.

### 🌳 Diagram Hierarki DOM Tree

```text
                     +-------------------+
                     |     DOCUMENT      | (Root Node)
                     +---------+---------+
                               |
                     +---------v---------+
                     |     <html>        | (Element Node)
                     +----+---------+----+
                          |         |
            +-------------+         +-------------+
            |                                     |
  +---------v---------+                 +---------v---------+
  |      <head>       |                 |      <body>       |
  +---------+---------+                 +----+---------+----+
            |                                |         |
  +---------v---------+            +---------v--+   +--v---------+
  |      <title>      |            |    <h1>    |   |    <p>     |
  +---------+---------+            +-----+------+   +-----+------+
            |                            |                |
  +---------v---------+            +-----v------+   +-----v------+
  | "Belajar DOM"     |            | "Judul Web"|   | "Paragraf" |
  |   (Text Node)     |            | (Text Node)|   | (Text Node)|
  +-------------------+            +------------+   +------------+
```

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log("--- 01. Pengenalan DOM (Document Object Model) ---");
  console.log("Status: Berjalan di runtime Node.js (lingkungan non-browser).");
  console.log("DOM adalah API milik browser. Buka file 'index.html' di browser Anda untuk melihat objek 'document'.");
} else {
  console.log("--- 01. Pengenalan DOM (Browser Environment) ---");
  console.log("Objek Document:", document);
  console.log("Judul Halaman :", document.title);
  console.log("URL Halaman   :", document.URL);
}
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 01. Pengenalan DOM (Browser Environment) ---
Objek Document: #document
Judul Halaman : 01 - Pengenalan DOM
URL Halaman   : http://127.0.0.1:5500/02-dom/01-intro/index.html
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> HTML mentah seperti **sketsa cetak biru arsitektur rumah di atas kertas kertas**: sketsa itu hanya teks diam. DOM adalah **model maket miniatur 3D rumah** yang sudah terbangun di atas meja. Dengan kuas JavaScript, Anda bisa mengecat dinding miniatur tersebut, mengganti warna genteng, atau memindahkan miniatur pintu secara instan.

### 🏢 Real-World Use Case
1. **Single Page Application (SPA)**: Framework modern (React, Vue, Svelte) bekerja dengan memanipulasi DOM di balik layar untuk memperbarui tampilan tanpa me-reload halaman.
2. **Dynamic Theming**: Mengubah atribut class pada tag `<html>` atau `<body>` untuk beralih antara tema gelap (*Dark Mode*) dan terang (*Light Mode*).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Mengeksekusi Skrip Sebelum DOM Selesai Di-parse**: Jika tag `<script>` diletakkan di dalam `<head>` tanpa atribut `defer`, JavaScript akan mencoba mengakses elemen HTML yang belum selesai dibuat browser, berujung pada error `TypeError: Cannot read properties of null`. Letakkan `<script>` di akhir `<body>` atau gunakan atribut `defer`.

### 🌟 Best Practice
* Selalu letakkan tag `<script src="contoh.js"></script>` tepat sebelum penutup `</body>` agar HTML selesai dimuat terlebih dahulu oleh browser.
* Pahami perbedaan antara representasi HTML teks statis dan objek DOM dinamis yang hidup di memori browser.

---

## 6. ✍️ Latihan Mandiri
1. Buka browser Anda pada file `index.html` ini, buka DevTools Console (`F12`), lalu ketik:
   `document.title = "Belajar DOM Itu Menyenangkan!";`
   Perhatikan perubahan teks pada tab judul browser Anda!

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [01-Dasar: 10.2 - Game Tebak Angka](../../01-dasar/10-project-game/02-tebak-angka/README.md)
- ➡️ **Selanjutnya:** [02 - DOM Selection](../02-dom-selection/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
