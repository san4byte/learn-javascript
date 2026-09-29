// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Konsep Dasar Konstruktor IntersectionObserver ---");

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
  rootMargin: "100px", // Trigger 100px sebelum elemen benar-benar masuk layar
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
myObserver.observe({ tagName: "SECTION", id: "banner-promosi" });

console.log("\n--- 2. Pola Real-World: Lazy Loading Gambar Produk ---");
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
  const dummyElement = { tagName: "IMG", alt: "Laptop Gaming ASUS ROG" };
  imageObserver.observe(dummyElement);
}

setupLazyImages();

console.log("\n--- 3. Pola Real-World: Infinite Scroll Sentinel ---");
/*
Daripada menghitung posisi scroll, taruh sebuah elemen kecil kosong di bawah daftar:
<div id="scroll-sentinel"></div>
*/
function setupInfiniteScroll(fetchNextPageCallback) {
  const infiniteObserver = new ObserverClass((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("[INFINITE SCROLL] Pengguna mencapai batas bawah halaman -> Memuat batch data baru...");
        fetchNextPageCallback?.();
      }
    });
  });

  const sentinel = { tagName: "DIV", id: "scroll-sentinel" };
  infiniteObserver.observe(sentinel);
}

setupInfiniteScroll(() => console.log("--> Fetch API halaman berikutnya sukses"));
