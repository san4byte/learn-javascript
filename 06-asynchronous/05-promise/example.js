// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Membuat dan Mengonsumsi Promise Sederhana ---');
function verifikasiAkunBank(saldoMinimal) {
  return new Promise((resolve, reject) => {
    console.log('Sedang memverifikasi rekening di sistem pusat...');
    
    setTimeout(() => {
      if (saldoMinimal >= 50000) {
        resolve({ status: 'Aktif', pesan: 'Rekening valid dan saldo mencukupi.' });
      } else {
        reject(new Error('Saldo di bawah ketentuan minimal (Rp 50.000)!'));
      }
    }, 300);
  });
}

// Mengonsumsi Promise dengan .then, .catch, .finally
verifikasiAkunBank(100000)
  .then((hasil) => {
    console.log('[SUKSES]:', hasil.pesan);
    return 'Lanjut ke langkah otorisasi'; // Return nilai untuk diteruskan ke .then berikutnya
  })
  .then((pesanLanjutan) => {
    console.log('[CHAINING]:', pesanLanjutan);
  })
  .catch((err) => {
    console.error('[GAGAL]:', err.message);
  })
  .finally(() => {
    console.log('[FINALLY]: Proses verifikasi perbankan selesai ditutup.');
  });

console.log('\n--- 2. Simulasi Promise yang Gagal (Rejected) ---');
verifikasiAkunBank(10000)
  .catch((err) => {
    console.log('[TERTANGKAP DI CATCH]:', err.message);
  });
