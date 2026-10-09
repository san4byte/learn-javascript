# Mini Project 06 - Galeri Gambar Interaktif (Image Gallery)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membangun galeri foto interaktif dengan gambar utama (_hero image_) dan deretan thumbnail menggunakan teknik _Event Delegation_ dan transisi animasi CSS.
> - **Kapan Digunakan**: Mengembangkan komponen _Product Showcase_, portofolio fotografi, atau galeri preview media di situs e-commerce.
> - **Aturan Praktis**: Gunakan satu event listener terpusat pada kontainer pembungkus thumbnail (_Event Delegation_) daripada memasang listener individual pada setiap elemen gambar.

---

## 1. 🎯 Tujuan Belajar

- Mengimplementasikan pola interaksi galeri gambar standar industri (_Master-Detail View_).
- Menerapkan teknik _Event Delegation_ menggunakan `e.target` untuk menghemat alokasi memori browser.
- Mengelola kelas status visual aktif (`active`) untuk menandai thumbnail yang sedang dipilih.
- Memicu pemutaran ulang animasi transisi CSS (_re-triggering CSS animation_) secara dinamis via JavaScript.

---

## 2. 📖 Penjelasan Konsep & Event Delegation

### 🎭 Analogi Dunia Nyata

> Galeri gambar bekerja seperti **proyektor slide fotografi**: Anda memiliki rak penyimpanan berisi puluhan klise film kecil (thumbnail). Saat Anda memilih satu klise dan memasukkannya ke slot lensa proyektor, gambar berukuran besar dan tajam langsung diproyeksikan ke dinding auditorium (jumbo image).

### Komponen Galeri & Tanggung Jawab

| Komponen                | Elemen / Selector      | Peran & Tanggung Jawab                                                     |
| :---------------------- | :--------------------- | :------------------------------------------------------------------------- |
| **Gambar Jumbo**        | `img.gambar-jumbo`     | Menampilkan gambar aktif beresolusi tinggi di area utama                   |
| **Kontainer Thumbnail** | `div.galeri-kontainer` | Menampung seluruh thumbnail dan bertindak sebagai penangkap event delegasi |
| **Thumbnail Item**      | `img.thumb`            | Elemen pemicu; menyimpan URL gambar pada atribut `src`                     |
| **Animasi Fade**        | Class `.fade`          | Transisi opasitas CSS yang dipicu ulang setiap kali gambar berganti        |

---

### Penjelasan Detail Komponen Interaksi

#### 1. Pengikatan Tunggal via Event Delegation

Alih-alih menambahkan `addEventListener` ke setiap gambar kecil satu per satu, listener dipasang satu kali pada elemen kontainer induk:

```javascript
const kontainer = document.querySelector(".galeri-kontainer");
const jumbo = document.querySelector(".gambar-jumbo");

kontainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("thumb")) {
    jumbo.src = e.target.src;
  }
});
```

#### 2. Re-triggering Animasi CSS Fade-In

Browser mengabaikan penambahan class jika class tersebut sudah ada di daftar class elemen. Oleh karena itu, class dilepas lalu dipasang kembali:

```javascript
jumbo.classList.add("fade");
setTimeout(function () {
  jumbo.classList.remove("fade");
}, 500);
```

#### 3. Penandaan Visual Thumbnail Aktif

Memastikan hanya thumbnail yang diklik yang memiliki tanda sorotan:

```javascript
const thumbs = document.querySelectorAll(".thumb");
thumbs.forEach((thumb) => thumb.classList.remove("aktif"));
e.target.classList.add("aktif");
```

---

## 3. 💻 Struktur Proyek & Panduan Eksekusi

Proyek galeri gambar ini terdiri dari berkas-berkas berikut:

- `index.html`: Tata letak layout kontainer hero image dan daftar thumbnail.
- `style.css`: Aturan animasi `@keyframes fadeIn` dan styling border thumbnail aktif.
- `img/`: Direktori aset foto (`1.jpg` hingga `6.jpg`).
- `example.js`: Skrip kompatibel universal untuk verifikasi lingkungan.

### Menjalankan di Terminal (Verifikasi Skrip)

```bash
node projects/mini-projects/06-image-gallery/example.js
```

### Menjalankan di Browser (Visual Interaktif)

Buka berkas `index.html` langsung di browser Anda atau menggunakan live server lokal:

```bash
npx serve projects/mini-projects/06-image-gallery
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Halaman Detail Produk Toko Online**: Pengguna memeriksa foto produk dari berbagai sudut pandang (tampak depan, samping, detail tekstur bahan).
2. **Katalog Portofolio Fotografer / Arsitek**: Menampilkan hasil dokumentasi proyek beresolusi tinggi dengan interaksi klik cepat tanpa jeda reload halaman.

### ⚠️ Common Pitfalls

- **Animasi Fade-in Tidak Terulang**: Jika class animasi CSS tidak di-remove sebelum dipasang kembali, browser tidak mendeteksi perubahan state dan tidak akan memutar ulang animasi fade-in pada klik berikutnya.
- **Klik Elemen Sela (Bukan Thumbnail)**: Jika pengguna mengklik celah kosong di antara thumbnail, pastikan pengecekan `if (e.target.classList.contains('thumb'))` mencegah gambar jumbo berubah menjadi kosong (`undefined`).

### 🌟 Best Practice

- Selalu manfaatkan _Event Delegation_ pada kontainer pembungkus thumbnail agar konsumsi memori efisien dan thumbnail baru yang ditambahkan via API otomatis langsung memiliki event klik aktif.
- Berikan atribut `alt` yang deskriptif pada setiap gambar thumbnail untuk mendukung aksesibilitas pengguna disabilitas (_screen reader_).

---

## 5. ✍️ Latihan Mandiri

1. Tambahkan tombol panah "Next" dan "Previous" yang memungkinkan pengguna mengganti gambar secara berurutan menggunakan keyboard (tombol panah kiri dan panah kanan).
2. Tambahkan fitur Zoom Lensa sederhana di mana kursor mouse memperbesar area detail tertentu pada gambar jumbo saat diarahkan (_hover_).

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [05 - Suit Jawa GUI](../05-suit-jawa-gui/README.md)
- 🏠 **Daftar Isi Mini Projects:** [README Mini Projects](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
