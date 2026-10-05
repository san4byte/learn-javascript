// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Pembuatan Proxy & Interceptor Trap get ---');
const user = {
  nama: 'Joko',
  umur: 25,
};

const handler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }

    // Menggunakan String(property) agar aman jika properti bertipe Symbol
    return `[Peringatan: Properti '${String(property)}' tidak ditemukan!]`;
  },

  set(target, property, value) {
    if (property === 'umur') {
      if (typeof value !== 'number' || value <= 0) {
        throw new Error(
          'Umur harus berupa angka tidak boleh 0 dan tidak boleh negatif!'
        );
      }
    }

    // Simpan nilai ke target untuk semua properti yang lolos validasi
    target[property] = value;
    return true; // Wajib me-return true menandakan operasi penulisan berhasil
  },
};

const proxyUser = new Proxy(user, handler);

// Uji coba pembacaan properti:
console.log('Akses properti ada   :', proxyUser.nama);
console.log('Akses properti gaib  :', proxyUser.alamat);

console.log('\n--- 2. Validasi Penulisan Data dengan Trap set ---');
try {
  // Uji coba nilai yang benar:
  proxyUser.umur = 2;
  console.log('Berhasil update umur menjadi:', proxyUser.umur);

  // Uji coba nilai yang salah (memicu error):
  proxyUser.umur = -5;
} catch (err) {
  console.error('Gagal update umur:', err.message);
}
