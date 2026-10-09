# 🚀 Projects (Aplikasi & Implementasi Nyata)

Selamat datang di direktori **Projects**! Direktori ini adalah tempat implementasi nyata (_real-world implementation_) yang merangkum dan mengintegrasikan seluruh teori pembelajaran dari **Modul 01 hingga Modul 08** ke dalam produk aplikasi web yang fungsional, responsif, dan siap rilis.

Direktori ini dibagi menjadi dua kategori utama:

1. **Capstone Application (Skala Penuh)**: Aplikasi web modern komprehensif siap rilis produksi.
2. **Mini Projects (Latihan Interaktif WPU)**: Kumpulan aplikasi mini berbasis logika CLI dan manipulasi DOM interaktif.

---

## 📚 Daftar Kategori Projek

### 1. [OmniStore Pro — Modern E-Commerce Storefront & Detail](omnistore-pro/README.md)

- **Deskripsi**: Aplikasi belanja online modern berbasis Multi-Page Application (MPA) dengan Vite, Tailwind CSS v4, dan DummyJSON API.
- **Fitur Utama**: Live Search dengan Debounce & AbortController, Infinite Scroll & Lazy Loading Gambar via IntersectionObserver, Halaman Detail Produk Interaktif dengan galeri foto, serta Keranjang Belanja Reaktif (Proxy State) & Persisten (LocalStorage).
- **Teknologi**: Vanilla JavaScript (ES Modules), Vite, Tailwind CSS v4, DummyJSON API.
- **Dokumentasi Lengkap**: [Baca README OmniStore Pro](omnistore-pro/README.md)

---

### 2. [Mini Projects — Kumpulan Latihan Logika & DOM Interaktif (WPU Series)](mini-projects/README.md)

Kumpulan 6 proyek latihan terpadu untuk mengasah logika komputasi dan manipulasi antarmuka web:

1. **[01 - Juragan Angkot](mini-projects/01-juragan-angkot/README.md)**: Simulasi logika armada transportasi (Loops & Branching).
2. **[02 - Suit Jawa CLI](mini-projects/02-suit-jawa-cli/README.md)**: Game klasik Suit Jawa berbasis teks console.
3. **[03 - Tebak Angka CLI](mini-projects/03-tebak-angka-cli/README.md)**: Game tebak angka 1–10 dengan batas peluang.
4. **[04 - Color Picker](mini-projects/04-color-picker/README.md)**: Manipulasi warna background dengan tombol acak dan slider RGB real-time.
5. **[05 - Suit Jawa GUI](mini-projects/05-suit-jawa-gui/README.md)**: Game Suit Jawa grafis dengan animasi putar gambar dan skor.
6. **[06 - Image Gallery](mini-projects/06-image-gallery/README.md)**: Galeri thumbnail foto dengan event delegation dan transisi fade-in.

- **Dokumentasi Lengkap**: [Buka Direktori Mini Projects](mini-projects/README.md)

---

## 🛠️ Cara Menjalankan Projek

Setiap projek di dalam direktori ini memiliki konfigurasi mandiri:

### Menjalankan OmniStore Pro:

```bash
cd projects/omnistore-pro
npm install
npm run dev      # Server dev di http://localhost:5173
```

### Menjalankan Mini Projects:

```bash
# Contoh menjalankan game atau simulasi CLI di terminal:
node projects/mini-projects/01-juragan-angkot/example.js
node projects/mini-projects/02-suit-jawa-cli/example.js

# Untuk projek GUI (Color Picker, Suit Jawa GUI, Image Gallery):
# Buka file index.html masing-masing sub-folder langsung di browser Anda.
```

---

[⬅️ Kembali ke Daftar Isi Utama (Root README)](../README.md)
