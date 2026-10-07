/**
 * Modul 01 & 07: Closures, Timing Events & Debounce
 * 
 * Fungsi pembungkus (higher-order function) untuk menunda eksekusi fungsi
 * sampai user berhenti memicu event selama durasi delay tertentu.
 * 
 * Sangat berguna untuk: Kolom pencarian (Search Input) agar tidak memanggil
 * API di setiap huruf yang diketik.
 * 
 * @param {Function} fn - Fungsi asli yang ingin ditunda
 * @param {number} delay - Waktu tunggu dalam milidetik (default: 300ms)
 * @returns {Function} Fungsi baru yang sudah dibungkus logika debounce
 */
export function debounce(fn, delay = 300) {
  let timerId; // Disimpan di closure memori fungsi pembungkus

  return function (...args) {
    // 1. Batalkan hitungan mundur sebelumnya jika user mengetik lagi
    clearTimeout(timerId);

    // 2. Pasang hitungan mundur baru
    timerId = setTimeout(() => {
      // Jalankan fungsi asli jika waktu delay telah habis
      fn.apply(this, args);
    }, delay);
  };
}
