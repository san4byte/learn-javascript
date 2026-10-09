// 02 - Timing Events (setTimeout dan setInterval)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

console.log('========================================================');
console.log('📌 DEMONSTRASI TIMING EVENTS (JAVASCRIPT SCHEDULING)');
console.log('========================================================\n');

// 1. setTimeout dengan parameter tambahan (...args)
console.log('--- 1. setTimeout dengan Parameter Tambahan ---');
const salam = (nama, peran) => {
  console.log(`[TIMEOUT]: Halo, ${nama}! Anda masuk sebagai: ${peran}`);
};
const timerUser = setTimeout(salam, 100, 'Joko Santoso', 'Fullstack Engineer');

// 2. clearTimeout: Membatalkan timer sebelum sempat jalan
console.log('\n--- 2. clearTimeout (Pembatalan Timer) ---');
const timerBatal = setTimeout(() => {
  console.log('Pesan ini tidak akan pernah dicetak!');
}, 500);

clearTimeout(timerBatal);
console.log('Timer timerBatal berhasil dibatalkan dengan clearTimeout()');

// 3. setInterval & clearInterval: Countdown Timer
console.log('\n--- 3. setInterval & clearInterval (Countdown) ---');
let hitungan = 3;

const intervalId = setInterval(() => {
  if (hitungan > 0) {
    console.log(`[INTERVAL]: Hitung mundur: ${hitungan}...`);
    hitungan--;
  } else {
    console.log('[INTERVAL]: 🚀 Peluncuran Berhasil!');
    clearInterval(intervalId); // Wajib dihentikan agar tidak bocor di memori

    // 4. Pola Recursive setTimeout (Alternatif Modern untuk setInterval)
    jalankanRecursiveTimeout();
  }
}, 100);

// 4. Recursive setTimeout (Mencegah overlapping jika eksekusi memakan waktu)
function jalankanRecursiveTimeout() {
  console.log('\n--- 4. Pola Recursive setTimeout ---');
  let iterasi = 1;

  function tick() {
    console.log(`[RECURSIVE TIMEOUT]: Eksekusi ke-${iterasi}`);
    if (iterasi < 2) {
      iterasi++;
      setTimeout(tick, 100);
    } else {
      console.log('Pola recursive setTimeout selesai dijalankan.');
    }
  }

  setTimeout(tick, 100);
}
