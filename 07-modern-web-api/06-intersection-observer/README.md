# 06 - Intersection Observer API (Lazy Loading dan Infinite Scroll Modern)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami kekurangan fatal dari memantau posisi scroll menggunakan `window.addEventListener('scroll')`.
> * **Kapan Digunakan**: Memahami konsep kerja `IntersectionObserver` dan terminologi `threshold` serta `rootMargin`.
> * **Aturan Praktis**: Selalu berikan placeholder gambar dengan ukuran aspect ratio yang tepat (misal dengan CSS `aspect-ratio: 16/9`) agar layout halaman tidak melompat (*Cumulative Layout Shift / CLS*).

## 1. 🎯 Tujuan Belajar
- Memahami kekurangan fatal dari memantau posisi scroll menggunakan `window.addEventListener('scroll')`.
- Memahami konsep kerja `IntersectionObserver` dan terminologi `threshold` serta `rootMargin`.
- Mampu membuat fitur Lazy Loading gambar untuk mempercepat loading halaman web.
- Mampu mengimplementasikan Infinite Scroll modern berbasis Sentinel Element.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Memantau posisi scroll dengan event listener biasa seperti seorang **satpam yang setiap detik bolak-balik menengok ke gerbang** untuk mengecek apakah ada tamu datang (sangat melelahkan dan boros tenaga). Sedangkan **IntersectionObserver** seperti **sensor inframerah laser di gerbang**: satpam bisa tidur tenang di pos, alarm baru berbunyi secara otomatis ketika tamu melangkah melewati batas gerbang.

Secara historis, untuk mengetahui apakah sebuah elemen (seperti gambar produk atau tombol 'Load More') sudah terlihat di layar pengguna, developer menggunakan:
```javascript
window.addEventListener('scroll', () => {
  const rect = element.getBoundingClientRect();
  if (rect.top < window.innerHeight) { /* elemen terlihat */ }
});
```
Metode jadul ini **sangat buruk untuk performa** karena memanggil `getBoundingClientRect()` di dalam event scroll memaksa browser melakukan *synchronous layout calculation* (*Layout Thrashing / Reflow*), yang menyebabkan konsumsi CPU melonjak dan scrolling terasa patah-patah.

### Solusi Modern: `IntersectionObserver` API
`IntersectionObserver` memungkinkan kode JavaScript mendaftarkan fungsi callback yang dieksekusi secara asinkron oleh browser **hanya ketika** elemen target masuk atau keluar dari area pandang layar (*viewport*).

### Konsep Kunci:
1. **Target**: Elemen DOM yang ingin kita pantau.
2. **Root**: Area batas pemantauan (default-nya adalah viewport browser / layar perangkat).
3. **Threshold**: Angka antara 0 sampai 1.0 yang menunjukkan berapa persen bagian target yang harus terlihat sebelum callback dipanggil:
   * `threshold: 0` -> Callback dipanggil seketika saat ujung elemen 1 pixel mulai menyentuh layar.
   * `threshold: 0.5` -> Callback dipanggil saat 50% bagian elemen sudah terlihat.
   * `threshold: 1.0` -> Callback dipanggil hanya saat 100% seluruh tubuh elemen tampak di layar.
4. **Root Margin**: Jarak margin luar untuk memicu observer lebih awal (misal: `rootMargin: '200px'` akan mendownload gambar 200 pixel sebelum user benar-benar mencapai posisi gambar tersebut).

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Konsep Dasar Konstruktor IntersectionObserver ---');

// Mock sederhana jika dijalankan di Node.js (di browser IntersectionObserver adalah API bawaan)
const ObserverClass = typeof IntersectionObserver !== 'undefined' ? IntersectionObserver : class {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe(target) {
    console.log(`[Observer] Mulai memantau elemen: <${target.tagName || 'elemen'}>`);
    // Simulasi asinkron bahwa elemen masuk ke viewport layar
    setTimeout(() => {
      this.callback([
        { target, isIntersecting: true, intersectionRatio: 0.75 }
      ], this);
    }, 100);
  }
  unobserve(target) {
    console.log(`[Observer] Berhenti memantau elemen: <${target.tagName || 'elemen'}> (hemat memori)`);
  }
  disconnect() {
    console.log(`[Observer] Mematikan seluruh pemantauan`);
  }
};

// Pengaturan observer
const observerOptions = {
  root: null,          // Menggunakan viewport browser sebagai acuan
  rootMargin: '100px', // Trigger 100px sebelum elemen benar-benar masuk layar
  threshold: 0.25      // Trigger saat minimal 25% bagian elemen terlihat
};

// Callback yang akan dipanggil browser secara asinkron
function onIntersectCallback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(`Elemen terlihat di layar! Rasio visibilitas: ${entry.intersectionRatio}`);
      observer.unobserve(entry.target);
    }
  });
}

// Inisialisasi observer
const myObserver = new ObserverClass(onIntersectCallback, observerOptions);
myObserver.observe({ tagName: 'SECTION', id: 'banner-promosi' });

console.log('\n--- 2. Pola Real-World: Lazy Loading Gambar Produk ---');
/*
Struktur HTML Gambar di E-Commerce:
<img class="lazy-image" data-src="https://cdn.toko.com/produk-hd.jpg" src="placeholder-blur.jpg" alt="Laptop">
*/

function setupLazyImages() {
  const imageObserver = new ObserverClass((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        console.log(`[LAZY LOAD] Mendownload gambar HD untuk: ${img.alt || 'Produk'}`);
        // img.src = img.dataset.src;
        // img.classList.remove('lazy-image');
        observer.unobserve(img); // Jangan dipantau lagi setelah gambar di-load
      }
    });
  });

  // Contoh simulasi elemen target
  const dummyElement = { tagName: 'IMG', alt: 'Laptop Gaming ASUS ROG' };
  imageObserver.observe(dummyElement);
}

setupLazyImages();

console.log('\n--- 3. Pola Real-World: Infinite Scroll Sentinel ---');
/*
Daripada menghitung posisi scroll, taruh sebuah elemen kecil kosong di bawah daftar:
<div id="scroll-sentinel"></div>
*/
function setupInfiniteScroll(fetchNextPageCallback) {
  const infiniteObserver = new ObserverClass((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('[INFINITE SCROLL] Pengguna mencapai batas bawah halaman -> Memuat batch data baru...');
        fetchNextPageCallback?.();
      }
    });
  });

  const sentinel = { tagName: 'DIV', id: 'scroll-sentinel' };
  infiniteObserver.observe(sentinel);
}

setupInfiniteScroll(() => console.log('--> Fetch API halaman berikutnya sukses'));
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Konsep Dasar Konstruktor IntersectionObserver ---
[Observer] Mulai memantau elemen: <SECTION>

--- 2. Pola Real-World: Lazy Loading Gambar Produk ---
[Observer] Mulai memantau elemen: <IMG>

--- 3. Pola Real-World: Infinite Scroll Sentinel ---
[Observer] Mulai memantau elemen: <DIV>
--> Fetch API halaman berikutnya sukses
Elemen terlihat di layar! Rasio visibilitas: 0.75
[Observer] Berhenti memantau elemen: <SECTION> (hemat memori)
[LAZY LOAD] Mendownload gambar HD untuk: Laptop Gaming ASUS ROG
[Observer] Berhenti memantau elemen: <IMG> (hemat memori)
[INFINITE SCROLL] Pengguna mencapai batas bawah halaman -> Memuat batch data baru...
--> Fetch API halaman berikutnya sukses
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Lazy Loading Media (Gambar & Video Iframe)**: Menghemat kuota internet pengguna ponsel dengan hanya memuat gambar saat gambar tersebut digulir mendekati layar.
2. **Infinite Scroll (TikTok / Twitter / Instagram Feed)**: Mendeteksi elemen paling bawah daftar artikel secara otomatis untuk mengambil postingan berikutnya dari backend.
3. **Analitik Iklan Sponsor (Ad Impressions)**: Menghitung impresi iklan secara akurat hanya jika iklan tersebut benar-benar terlihat minimal 50% di layar user selama minimal 1 detik.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Memanggil `observer.unobserve(target)`**: Untuk skenario lazy loading satu kali, jika Anda lupa memanggil `unobserve()`, observer akan terus hidup di memori browser dan memicu callback berulang kali setiap elemen keluar-masuk layar.
* **Tidak Memberikan Dimensi Awal (Aspect Ratio / Min-Height)**: Jika kontainer gambar kosong memiliki tinggi `0px`, semua gambar di bawahnya akan seketika masuk ke viewport pada saat halaman pertama kali dibuka, sehingga seluruh gambar langsung terdownload sekaligus dan membatalkan manfaat lazy loading.

### 🌟 Best Practice
* Selalu berikan placeholder gambar dengan ukuran aspect ratio yang tepat (misal dengan CSS `aspect-ratio: 16/9`) agar layout halaman tidak melompat (*Cumulative Layout Shift / CLS*).
* Manfaatkan `rootMargin: '200px'` agar gambar sudah selesai diunduh beberapa saat sebelum pengguna benar-benar melihatnya, memberikan pengalaman yang mulus tanpa menunggu.

---

## 6. ✍️ Latihan Mandiri
1. Buka file `index.html` pada modul ini di browser dan amati bagaimana gambar kartu produk hanya diunduh saat kartu digulir masuk ke layar.
2. Tambahkan efek transisi CSS `fade-in` agar gambar yang baru dimuat muncul secara halus.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05 - Debounce dan Throttle Optimization](../05-debounce-and-throttle/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
