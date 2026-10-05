// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Demonstrasi Urutan Eksekusi Event Loop ---');

console.log('1. [Synchronous] Awal script dieksekusi di Call Stack');

// Macrotask (Task Queue)
setTimeout(() => {
  console.log(
    '4. [Macrotask - setTimeout] Dijalankan setelah antrean microtask kosong'
  );
}, 0);

// Microtask (Microtask Queue)
Promise.resolve().then(() => {
  console.log(
    '3. [Microtask - Promise.then] Dijalankan SEBELUM setTimeout meski delay 0ms!'
  );
});

console.log('2. [Synchronous] Akhir script sinkron selesai');

/*
Penjelasan Alur Eksekusi:
1. '1. [Synchronous]' masuk Call Stack -> dicetak -> keluar.
2. setTimeout(..., 0) masuk Call Stack -> didaftarkan ke Web APIs -> masuk ke Macrotask Queue.
3. Promise.resolve().then(...) masuk Call Stack -> callback didaftarkan ke Microtask Queue.
4. '2. [Synchronous]' masuk Call Stack -> dicetak -> keluar.
5. Call Stack sekarang KOSONG.
6. Event Loop memprioritaskan Microtask Queue: callback Promise dicetak (3).
7. Microtask Queue kosong, Event Loop beralih ke Macrotask Queue: callback setTimeout dicetak (4).
*/
