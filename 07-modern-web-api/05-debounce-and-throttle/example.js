// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Implementasi Fungsi Helper Debounce ---');
/**
 * Debounce: Menunda eksekusi fungsi sampai tidak ada aktivitas lagi selama delayMs.
 */
function debounce(fungsiAsli, delayMs = 300) {
  let timerId;

  return function (...args) {
    // Bersihkan timer sebelumnya jika user masih aktif melakukan trigger
    clearTimeout(timerId);

    // Buat timer baru
    timerId = setTimeout(() => {
      fungsiAsli.apply(this, args);
    }, delayMs);
  };
}

// Simulasi fungsi pencarian API
function lakukanPencarianAPI(query) {
  console.log(`[PANGGIL API] Mencari data produk untuk keyword: "${query}"`);
}

// Bungkus fungsi pencarian dengan debounce (delay 200ms)
const pencarianTerDebounce = debounce(lakukanPencarianAPI, 200);

console.log('Simulasi user mengetik cepat di keyboard:');
console.log("- User mengetik 'j'");
pencarianTerDebounce('j');

setTimeout(() => {
  console.log("- User mengetik 'ja' (setelah 50ms)");
  pencarianTerDebounce('ja');
}, 50);

setTimeout(() => {
  console.log("- User mengetik 'jav' (setelah 100ms)");
  pencarianTerDebounce('jav');
}, 100);

setTimeout(() => {
  console.log("- User berhenti mengetik di kata 'javascript' (setelah 150ms)");
  pencarianTerDebounce('javascript');
}, 150);

// Hasil: Dari 4 kali pengetikan, fungsi lakukanPencarianAPI hanya dipanggil 1 KALI saja!

// Tunggu sampai simulasi debounce selesai (400ms) sebelum memulai throttle
setTimeout(() => {
  console.log('\n--- 2. Implementasi Fungsi Helper Throttle ---');
  /**
   * Throttle: Membatasi eksekusi fungsi maksimal 1 kali setiap intervalMs.
   */
  function throttle(fungsiAsli, intervalMs = 200) {
    let terakhirDipanggil = 0;

    return function (...args) {
      const sekarang = Date.now();
      if (sekarang - terakhirDipanggil >= intervalMs) {
        terakhirDipanggil = sekarang;
        fungsiAsli.apply(this, args);
      }
    };
  }

  function rekamPosisiScroll(posisiY) {
    console.log(`[EVENT THROTTLE] Menghitung posisi scroll: ${posisiY}px`);
  }

  const scrollTerThrottle = throttle(rekamPosisiScroll, 100);

  // Simulasi scroll cepat browser
  console.log('Simulasi scroll intensif dalam 300ms:');
  scrollTerThrottle(10);  // Dipanggil (eksekusi pertama)
  scrollTerThrottle(50);  // Diabaikan (terlalu cepat)
  scrollTerThrottle(120); // Diabaikan

  setTimeout(() => scrollTerThrottle(250), 110); // Dipanggil (>100ms berlalu)
  setTimeout(() => scrollTerThrottle(400), 120); // Diabaikan
  setTimeout(() => scrollTerThrottle(600), 220); // Dipanggil (>100ms berlalu)
}, 450);
