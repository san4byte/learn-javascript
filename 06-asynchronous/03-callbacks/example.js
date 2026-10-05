// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Asynchronous Callback Dasar ---');
function ambilDataPengguna(id, callbackSukses, callbackGagal) {
  setTimeout(() => {
    if (id > 0) {
      callbackSukses({ id: id, nama: 'Joko Santoso', email: 'joko@example.com' });
    } else {
      callbackGagal(new Error('ID pengguna tidak valid!'));
    }
  }, 200);
}

ambilDataPengguna(1, 
  (user) => console.log('Berhasil ambil user:', user.nama),
  (err) => console.error('Gagal:', err.message)
);

console.log('\n--- 2. Ilustrasi Callback Hell (Pyramid of Doom) ---');
// Simulasi proses berantai zaman dulu (sebelum ada Promise):
function ambilPesanan(userId, callback) {
  setTimeout(() => callback(['Order #101', 'Order #102']), 200);
}

function ambilDetailOrder(orderId, callback) {
  setTimeout(() => callback({ orderId, status: 'Terkirim', kurir: 'JNE' }), 200);
}

// Nested Callback bertingkat:
ambilDataPengguna(1, (user) => {
  console.log(`[Piramida Step 1] User didapat: ${user.nama}`);
  
  ambilPesanan(user.id, (daftarOrder) => {
    console.log(`[Piramida Step 2] Jumlah pesanan: ${daftarOrder.length}`);
    
    ambilDetailOrder(daftarOrder[0], (detail) => {
      console.log(`[Piramida Step 3] Status pesanan pertama: ${detail.status}`);
      // Jika butuh 5 langkah lagi, kode akan menjorok sangat jauh ke kanan!
    }, (err) => console.error(err));
  }, (err) => console.error(err));
}, (err) => console.error(err));
