// 03 - Callbacks dan Fenomena Callback Hell
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

console.log('========================================================');
console.log('📌 DEMONSTRASI POLA CALLBACK & CALLBACK HELL');
console.log('========================================================\n');

// 1. Synchronous Callback
console.log('--- 1. Synchronous Callback ---');
const angka = [1, 2, 3, 4, 5];
const hasilKuadrat = angka.map((n) => n * n); // callback berjalan sinkron seketika
console.log('Hasil kuadrat sinkron:', hasilKuadrat);

// 2. Error-First Callback Convention (Standar Klasik Node.js)
console.log('\n--- 2. Pola Node.js Error-First Callback (err, data) ---');
function bacaFileSimulasi(namaFile, callback) {
  setTimeout(() => {
    if (namaFile === 'config.json') {
      callback(null, { database: 'localhost', port: 5432 }); // Sukses: err = null
    } else {
      callback(new Error(`File "${namaFile}" tidak ditemukan!`), null); // Gagal
    }
  }, 100);
}

bacaFileSimulasi('config.json', (err, config) => {
  if (err) {
    console.error('[ERROR]:', err.message);
    return;
  }
  console.log('[SUKSES BACA FILE]:', config);

  // 3. Simulasi Callback Hell (Pyramid of Doom)
  jalankanCallbackHell();
});

// 3. Simulasi Masalah Callback Hell
function jalankanCallbackHell() {
  console.log('\n--- 3. Simulasi Callback Hell (Pyramid of Doom) ---');

  function getPengguna(id, cb) {
    setTimeout(() => cb(null, { id, nama: 'Joko Santoso' }), 100);
  }

  function getDaftarOrder(userId, cb) {
    setTimeout(() => cb(null, ['ORD-001', 'ORD-002']), 100);
  }

  function getDetailOrder(orderId, cb) {
    setTimeout(
      () => cb(null, { id: orderId, total: 250000, status: 'Lunas' }),
      100,
    );
  }

  // Bersarang bertingkat (Nested Callback)
  getPengguna(1, (errUser, user) => {
    if (errUser) return console.error(errUser);
    console.log(`[Step 1] User didapat: ${user.nama}`);

    getDaftarOrder(user.id, (errOrder, orders) => {
      if (errOrder) return console.error(errOrder);
      console.log(
        `[Step 2] Ditemukan ${orders.length} pesanan. Memeriksa ${orders[0]}...`,
      );

      getDetailOrder(orders[0], (errDetail, detail) => {
        if (errDetail) return console.error(errDetail);
        console.log(
          `[Step 3] Detail Pesanan: ID=${detail.id}, Total=Rp ${detail.total}, Status=${detail.status}`,
        );
        console.log(
          '\n💡 Perhatikan bagaimana nesting kode menjorok ke kanan dan penanganan error berulang!',
        );
      });
    });
  });
}
