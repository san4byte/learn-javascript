# 09 - Latihan Mandiri: Galeri Gambar Interaktif (Image Gallery)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Membangun galeri foto interaktif dengan gambar utama (Hero Image) dan thumbnail.
> * **Kapan Digunakan**: Menerapkan Event Delegation pada kontainer thumbnail foto.
> * **Aturan Praktis**: Selalu manfaatkan Event Delegation pada kontainer pembungkus thumbnail agar kode lebih hemat memori dan mendukung penambahan thumbnail baru secara dinamis.

## 1. 🎯 Tujuan Belajar
- Membangun galeri foto interaktif dengan gambar utama (Hero Image) dan thumbnail.
- Menerapkan Event Delegation pada kontainer thumbnail foto.
- Menambahkan efek animasi transisi halus (Fade-in) saat gambar berganti.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Galeri gambar seperti **proyektor slide foto**: Anda memilih satu slide kecil dari rak penyimpanan (thumbnail), memasukkannya ke slot proyektor, dan gambar besar langsung terpancar di layar utama bioskop.

Proyek **Galeri Gambar** adalah komponen antarmuka yang paling sering kita temui di halaman detail produk toko online (seperti Tokopedia, Shopee, Amazon):
* Ada satu gambar berukuran besar di bagian tengah (**Jumbo / Hero Image**).
* Di bagian bawah terdapat deretan gambar-gambar kecil (**Thumbnails**).
* Ketika salah satu thumbnail diklik:
  1. `src` gambar utama diganti dengan `src` thumbnail yang diklik.
  2. Thumbnail yang sedang aktif diberi border sorotan (*active class*).
  3. Gambar utama memunculkan efek transisi fade-in halus.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log("--- 09. Image Gallery ---");
  console.log("Buka file 'index.html' di browser Anda untuk melihat interaksi galeri foto!");
} else {
  console.log("--- 09. Image Gallery (Browser) ---");

  const kontainerGaleri = document.querySelector(".galeri-kontainer");
  const gambarUtama = document.querySelector(".gambar-jumbo");

  if (kontainerGaleri && gambarUtama) {
    // Terapkan Event Delegation pada kontainer thumbnail
    kontainerGaleri.addEventListener("click", function (e) {
      if (e.target.classList.contains("thumb")) {
        // Ganti sumber gambar jumbo
        gambarUtama.src = e.target.src;
        console.log(`Gambar aktif diubah ke: ${e.target.src}`);
      }
    });
  }
}
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 09. Image Gallery (Browser) ---
Gambar aktif diubah ke: http://127.0.0.1:5500/05-dom/11-practice-image-gallery/img/1.jpg
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Halaman Detail Produk Toko Online**: Pengguna melihat foto sepatu dari berbagai sudut (depan, samping, belakang, sol).
2. **Katalog Portofolio Fotografer / Desainer**: Menampilkan karya foto beresolusi tinggi secara rapi dan cepat.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Animasi Fade-in Tidak Terulang**: Jika class animasi CSS tidak di-remove sebelum dipasang kembali, browser tidak akan memutar ulang animasi fade-in pada klik kedua. Berikan jeda waktu `setTimeout(() => img.classList.remove('fade'), 500)`.

### 🌟 Best Practice
* Selalu manfaatkan Event Delegation pada kontainer pembungkus thumbnail agar kode lebih hemat memori dan mendukung penambahan thumbnail baru secara dinamis.

---

## 6. ✍️ Latihan Mandiri
1. Tambahkan efek transparansi (opacity 0.5) pada thumbnail yang tidak aktif, dan berikan opacity 1.0 penuh dengan border biru pada thumbnail yang sedang aktif.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [08 - Latihan Game Suit Jawa GUI](../10-practice-suit-jawa-gui/README.md)
- ➡️ **Selanjutnya:** [Modul 03 - Asynchronous JavaScript](../../06-asynchronous/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
