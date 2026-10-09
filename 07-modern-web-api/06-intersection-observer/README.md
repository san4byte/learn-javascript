# 06 - Intersection Observer API (Lazy Loading dan Infinite Scroll Modern)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memantau visibilitas elemen HTML terhadap area pandang layar (_viewport_) secara asinkron tanpa membebani thread rendering browser.
> - **Kapan Digunakan**: _Lazy loading_ gambar dan video, _infinite scroll pagination_, animasi saat elemen di-scroll ke layar (_scroll animations_), serta pelacakan tayangan iklan (_ad impression tracking_).
> - **Aturan Praktis**: Segera panggil `observer.unobserve(entry.target)` setelah gambar berhasil di-_lazy load_ agar memori dibebaskan. Selalu tentukan ukuran rasio kontainer (CSS `aspect-ratio`) untuk mencegah pergeseran tata letak yang merusak skor SEO (_Cumulative Layout Shift / CLS_).

---

## 1. 🎯 Tujuan Belajar

- Memahami bahaya _Layout Thrashing / Reflow_ akibat penggunaan `getBoundingClientRect()` di dalam event scroll biasa.
- Menguasai cara kerja antarmuka standar W3C **`IntersectionObserver`**.
- Memahami 3 opsi konfigurasi utama: `root`, `rootMargin`, dan `threshold`.
- Mampu membedah properti objek `IntersectionObserverEntry` (`isIntersecting`, `intersectionRatio`, `target`).
- Mengimplementasikan fitur _Image Lazy Loading_ modern menggunakan atribut `data-src`.
- Mengimplementasikan fitur _Infinite Scroll Pagination_ berbasis elemen penanda (_Sentinel Element_).
- Mengetahui cara melepas pemantauan dengan `unobserve()` dan `disconnect()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Event Scroll Jadul + `getBoundingClientRect()`** seperti **seorang satpam yang setiap detik berlari bolak-balik memeriksa pintu gerbang** untuk melihat apakah ada mobil tamu yang datang. Satpam kelelahan dan kehabisan napas (CPU 100% dan layar patah-patah).
> - **`IntersectionObserver`** seperti **sensor inframerah laser otomatis di pintu gerbang**: Satpam bisa duduk tenang di pos jaga sambil minum kopi. Sensor laser baru membunyikan sinyal ke pos jaga HANYA KETIKA ban mobil tamu melintasi garis batas gerbang (`isIntersecting: true`).

---

### Tabel Ringkasan Properti & Method Intersection Observer

| Komponen / Properti       | Tipe Data | Deskripsi Singkat                                               |
| :------------------------ | :-------- | :-------------------------------------------------------------- |
| `observer.observe(el)`    | Method    | Memulai pemantauan visibilitas pada elemen target.              |
| `observer.unobserve(el)`  | Method    | Menghentikan pemantauan pada satu elemen target spesifik.       |
| `observer.disconnect()`   | Method    | Menghentikan seluruh pemantauan pada semua elemen sekaligus.    |
| `entry.isIntersecting`    | `boolean` | `true` jika elemen target sedang bersinggungan dengan viewport. |
| `entry.intersectionRatio` | `number`  | Persentase keterlihatan elemen di layar ($0.0$ sampai $1.0$).   |
| `entry.target`            | `Element` | Simpul elemen DOM yang sedang diamati.                          |

---

### Pembahasan Mendalam Fitur & API

#### 1. Masalah Kinerja `getBoundingClientRect()` pada Event Scroll

Memanggil `getBoundingClientRect()` di dalam event scroll memaksa browser melakukan kalkulasi tata letak sinkron (_Layout Thrashing_), yang memicu lonjakan CPU dan menurunkan frame rate layar dari 60 FPS ke bawah 20 FPS.

#### 2. Konstruktor `new IntersectionObserver(callback, options)`

Menerima callback fungsi yang akan dipanggil browser setiap kali ambang batas keterlihatan terpenuhi.

```javascript
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Elemen tampak di layar:", entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
```

#### 3. Parameter Konfigurasi: `root`, `rootMargin`, dan `threshold`

- **`root`**: Elemen leluhur pembatas (berikan `null` untuk menggunakan viewport browser).
- **`rootMargin`**: Jarak margin pemicu sebelum elemen menyentuh layar (misal: `'200px'` untuk mulai mengunduh gambar 200px sebelum user tiba).
- **`threshold`**: Nilai $0.0$ (1 pixel pertama terlihat) hingga $1.0$ (seluruh tubuh elemen tampak di layar).

```javascript
const options = {
  root: null,
  rootMargin: "150px 0px", // Pre-fetch sebelum terlihat
  threshold: 0.1, // 10% terlihat
};
```

#### 4. Membedah Objek `IntersectionObserverEntry`

Setiap entri memuat data telemetri posisi elemen:

```javascript
function handler(entries) {
  for (const entry of entries) {
    console.log("Apakah terlihat? :", entry.isIntersecting);
    console.log("Rasio tampak     :", entry.intersectionRatio);
    console.log("Elemen target    :", entry.target.id);
  }
}
```

#### 5. Pola Implementasi Image Lazy Loading via `data-src`

Simpan URL gambar asli di atribut `data-src`, dan pasang gambar placeholder ringan di atribut `src`.

```javascript
const imageObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Ganti ke URL asli
      obs.unobserve(img); // Berhenti memantau agar hemat RAM
    }
  });
});

document
  .querySelectorAll("img[data-src]")
  .forEach((img) => imageObserver.observe(img));
```

#### 6. Pola Implementasi Infinite Scroll Berbasis Sentinel Element

Tempatkan sebuah elemen penanda kosong (`<div id="sentinel"></div>`) di bagian paling bawah daftar:

```javascript
const sentinelObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadNextPageData(); // Muat batch data berikutnya saat sentinel terlihat
  }
});

sentinelObserver.observe(document.getElementById("sentinel"));
```

#### 7. Pelepasan Pengamatan: `unobserve()` dan `disconnect()`

- `unobserve(el)`: Dilepas segera setelah aksi 1 kali selesai (seperti lazy loading foto).
- `disconnect()`: Dipanggil saat halaman atau komponen di-unmount.

```javascript
// Mematikan seluruh pemantauan sekaligus:
observer.disconnect();
```

#### 8. Mencegah Cumulative Layout Shift (CLS)

Saat gambar lazy load selesai diunduh, jika kontainernya tidak memiliki tinggi tetap, konten teks di bawahnya akan melompat secara tiba-tiba (_CLS penalty_).

```css
/* Wajib beri rasio aspek pada tag gambar: */
img.lazy {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #f1f5f9;
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi inisialisasi `IntersectionObserver`, simulasi asinkron perlintasan batas layar (_intersection ratio_), pola arsitektur _Image Lazy Loading_, serta mekanisme _Infinite Scroll Sentinel_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi simulasi di terminal:

```bash
node 07-modern-web-api/06-intersection-observer/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk mengamati bagaimana gambar produk dimuat secara cerdas saat Anda menggulir halaman ke bawah.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Lazy Loading Banner & Iklan Berbayar**: Menghitung tayangan iklan (_Ad Impressions_) hanya jika iklan tersebut benar-benar terlihat minimal 50% di layar selama lebih dari 1 detik.
2. **Animasi Reveal Saat Scroll (AOS)**: Menambahkan class CSS `.fade-in` pada kartu layanan saat pengguna menggulir ke bagian seksi tersebut.

### ⚠️ Common Pitfalls

- **Lupa Memanggil `unobserve()` pada Lazy Loaded Images**: Membiarkan ratusan gambar terus dipantau setelah selesai dimuat akan membuang-buang alokasi memori observer.
- **Mengabaikan Root Margin**: Jika `rootMargin` disetel 0px, pengguna dengan koneksi internet lambat akan melihat kotak kosong sebelum gambar selesai diunduh. Berikan `rootMargin: '200px'` agar pengunduhan dimulai sebelum elemen masuk layar.

### 🌟 Best Practice

- Gunakan atribut native HTML `loading="lazy"` untuk kebutuhan dasar, dan gunakan `IntersectionObserver` untuk kontrol penuh atas placeholder efek blur (_blur-up effect_).
- Selalu sediakan dimensi CSS yang jelas (`aspect-ratio` atau `min-height`) pada kontainer media lazy load.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di peramban web. Tambahkan opsi `threshold: [0, 0.5, 1.0]` pada observer dan amati log konsol ketika elemen target mulai masuk, setengah terlihat, dan terlihat utuh di layar.
2. Buat elemen sentinel di bawah galeri artikel dan panggil fungsi simulasi `muatArtikelTambahan()` setiap kali sentinel menyentuh layar!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [05 - Debounce & Throttle](../05-debounce-and-throttle/README.md)
- ➡️ **Modul Selanjutnya:** [08 - Build Tools & Ecosystem](../../08-build-tools/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
