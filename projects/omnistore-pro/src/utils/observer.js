/**
 * Modul 07: Modern Web API - IntersectionObserver
 * 
 * Pengamat berbasis browser untuk mendeteksi visibilitas suatu elemen
 * di dalam viewport (layar) tanpa membebani performa scroll.
 */

/**
 * 1. Lazy Loading Gambar
 * Mengawasi gambar dengan atribut `data-src`.
 * Ketika gambar mendekati layar (rootMargin 100px), src aslinya dipasang
 * dan transisi opacity diaktifkan.
 */
export const initLazyImages = () => {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // Jika elemen gambar mulai terlihat di layar
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
          }
          // Hentikan pengawasan setelah gambar selesai dimuat
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '100px' } // Ambil ancang-ancang 100px sebelum benar-benar terlihat
  );

  document.querySelectorAll('img[data-src]').forEach((el) => {
    imageObserver.observe(el);
  });
};

/**
 * 2. Infinite Scroll
 * Mengawasi elemen Sentinel di bagian paling bawah halaman katalog.
 * Ketika user scroll dan menyentuh Sentinel, fungsi `onLoadMore` akan dieksekusi.
 * 
 * @param {HTMLElement} sentinelElement - Elemen penanda batas bawah
 * @param {Function} onLoadMore - Callback untuk mengambil produk batch berikutnya
 */
export const initInfiniteScroll = (sentinelElement, onLoadMore) => {
  if (!sentinelElement) return;

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      });
    },
    { threshold: 0.1 }
  );

  scrollObserver.observe(sentinelElement);
};
