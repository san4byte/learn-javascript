// 06 - Promise Concurrency (Promise.all, allSettled, race, dan any)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

console.log('========================================================');
console.log('📌 DEMONSTRASI 4 METHOD PROMISE CONCURRENCY');
console.log('========================================================\n');

const createService = (nama, delayMs, sukses = true, hasil = null) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (sukses) {
        resolve(hasil || `Data dari ${nama} (${delayMs}ms)`);
      } else {
        reject(new Error(`Service ${nama} mengalami kegagalan!`));
      }
    }, delayMs);
  });
};

// 1. Promise.all (Menunggu semua sukses, fail-fast jika 1 gagal)
console.log('--- 1. Promise.all() ---');
const task1 = createService('Auth Service', 100);
const task2 = createService('Product Service', 150);
const task3 = createService('Cart Service', 120);

Promise.all([task1, task2, task3])
  .then(([auth, produk, keranjang]) => {
    console.log('[PROMISE.ALL SUKSES]: Seluruh task paralel berhasil:');
    console.log(`- ${auth}\n- ${produk}\n- ${keranjang}`);
    jalankanAllSettled();
  })
  .catch((err) => console.error('[PROMISE.ALL GAGAL]:', err.message));

// 2. Promise.allSettled (Tidak pernah reject, mengembalikan status semua task)
function jalankanAllSettled() {
  console.log('\n--- 2. Promise.allSettled() ---');
  const serviceA = createService('Database Utama', 80, true, 'Koneksi Stabil');
  const serviceB = createService('Cache Redis', 100, false); // Gagal
  const serviceC = createService('Search Engine', 90, true, 'Index Siap');

  Promise.allSettled([serviceA, serviceB, serviceC]).then((results) => {
    console.log('[ALLSETTLED SELESAI]: Laporan lengkap kesehatan layanan:');
    results.forEach((res, idx) => {
      if (res.status === 'fulfilled') {
        console.log(
          `  [Service ${idx + 1}] Status: FULFILLED, Nilai: "${res.value}"`,
        );
      } else {
        console.log(
          `  [Service ${idx + 1}] Status: REJECTED, Alasan: "${res.reason.message}"`,
        );
      }
    });
    jalankanRaceDanAny();
  });
}

// 3. Promise.race & Promise.any
function jalankanRaceDanAny() {
  console.log('\n--- 3. Promise.race() vs Promise.any() ---');

  // Promise.race: yang tercepat menang (baik sukses maupun gagal)
  const mirror1 = createService('Server Singapura', 200);
  const mirror2 = createService('Server Jakarta', 80); // Tercepat

  Promise.race([mirror1, mirror2]).then((tercepat) => {
    console.log('[PROMISE.RACE]: Pemenang tercepat adalah:', tercepat);
  });

  // Promise.any: yang tercepat SUKSES yang menang (mengabaikan yang gagal)
  const mirrorFail = createService('Mirror A (Rusak)', 50, false); // Cepat tapi gagal
  const mirrorOk = createService(
    'Mirror B (Normal)',
    150,
    true,
    'Mirror B Sukses',
  );

  Promise.any([mirrorFail, mirrorOk])
    .then((pemenangSukses) => {
      console.log(
        '[PROMISE.ANY]: Server sukses pertama yang diambil:',
        pemenangSukses,
      );
    })
    .catch((err) => {
      console.error('[PROMISE.ANY SEMUA GAGAL]:', err);
    });
}
