// 01 - Pengenalan Asynchronous & Arsitektur Event Loop
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

console.log('========================================================');
console.log('📌 DEMONSTRASI ARSITEKTUR EVENT LOOP & URUTAN EKSEKUSI');
console.log('========================================================\n');

// 1. Eksekusi Sinkron Utama (Call Stack)
console.log('1. [Call Stack] Script sinkron mulai berjalan');

// 2. Macrotask (Task Queue) melalui setTimeout
setTimeout(() => {
  console.log(
    '5. [Macrotask - setTimeout (0ms)] Dijalankan setelah Call Stack dan Microtask kosong',
  );
}, 0);

// 3. Penjadwalan Microtask eksplisit via queueMicrotask
if (typeof queueMicrotask === 'function') {
  queueMicrotask(() => {
    console.log(
      '3. [Microtask - queueMicrotask] Penjadwalan microtask eksplisit',
    );
  });
}

// 4. Microtask melalui Promise Resolution (.then)
Promise.resolve().then(() => {
  console.log(
    '4. [Microtask - Promise.then] Callback promise resolved diproses di antrean prioritas tinggi',
  );
});

// 5. Akhir Eksekusi Sinkron
console.log('2. [Call Stack] Seluruh instruksi sinkron selesai diproses\n');

/*
URUTAN EKSEKUSI OLEH RUNTIME:
1. "1. [Call Stack] Script sinkron mulai berjalan" (Call Stack langsung)
2. setTimeout didaftarkan ke Web/Node API -> Timer 0ms berakhir -> Callback masuk ke Macrotask Queue
3. queueMicrotask mendaftarkan callback ke Microtask Queue
4. Promise.resolve().then mendaftarkan callback ke Microtask Queue
5. "2. [Call Stack] Seluruh instruksi sinkron selesai diproses" (Call Stack langsung)
6. Call Stack KOSONG!
7. Event Loop memeriksa Microtask Queue terlebih dahulu:
   - Menjalankan "3. [Microtask - queueMicrotask]"
   - Menjalankan "4. [Microtask - Promise.then]"
8. Microtask Queue kini kosong.
9. Event Loop beralih mengambil Macrotask Queue:
   - Menjalankan "5. [Macrotask - setTimeout (0ms)]"
*/
