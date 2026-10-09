// 05 - Promise (Konsep Pending, Fulfilled, dan Rejected)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

console.log('========================================================');
console.log('📌 DEMONSTRASI PEMBUATAN & KONSUMSI PROMISE ES6');
console.log('========================================================\n');

// 1. Membuat Promise kustom dengan new Promise((resolve, reject) => {})
function cekSaldoRekening(jumlah) {
  return new Promise((resolve, reject) => {
    console.log(`[PROMISE]: Memeriksa saldo sebesar Rp ${jumlah}...`);
    setTimeout(() => {
      if (jumlah >= 50000) {
        resolve({ status: 'VALID', saldo: jumlah });
      } else {
        reject(
          new Error(`Saldo Rp ${jumlah} kurang dari batas minimum Rp 50.000!`),
        );
      }
    }, 150);
  });
}

// 2. Chaining .then(), .catch(), dan .finally() pada skenario Sukses
console.log('--- 1. Skenario Sukses & Promise Chaining ---');
cekSaldoRekening(100000)
  .then((data) => {
    console.log('[THEN 1]: Saldo valid terverifikasi:', data);
    return `Kupon Cashback untuk saldo Rp ${data.saldo}`; // mengembalikan nilai ke then berikutnya
  })
  .then((promo) => {
    console.log(
      '[THEN 2 - Chaining]: Menerima hasil then sebelumnya ->',
      promo,
    );
  })
  .catch((err) => {
    console.error('[CATCH]: Terjadi kesalahan:', err.message);
  })
  .finally(() => {
    console.log('[FINALLY]: Sesi verifikasi perbankan ditutup.');

    // 3. Skenario Gagal (Rejected)
    ujiSkenarioGagal();
  });

function ujiSkenarioGagal() {
  console.log('\n--- 2. Skenario Gagal (Rejected) Terpanggil di .catch() ---');
  cekSaldoRekening(20000)
    .then((data) => {
      console.log('Baris ini tidak akan pernah dijalankan karena error:', data);
    })
    .catch((err) => {
      console.error('[CATCH MENANGKAP ERROR]:', err.message);
    })
    .finally(() => {
      console.log('[FINALLY]: Pembersihan selesai.');

      // 4. Instan Promise.resolve() dan Promise.reject()
      ujiInstantPromises();
    });
}

function ujiInstantPromises() {
  console.log(
    '\n--- 3. Instant Promises (Promise.resolve & Promise.reject) ---',
  );
  Promise.resolve('Nilai Instan Langsung Resolved').then((pesan) =>
    console.log('[INSTANT RESOLVE]:', pesan),
  );

  Promise.reject(new Error('Penolakan Instan Langsung Ditolak')).catch((err) =>
    console.log('[INSTANT REJECT]:', err.message),
  );
}
