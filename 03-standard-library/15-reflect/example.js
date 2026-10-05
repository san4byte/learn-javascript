// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Operasi Refleksi Standar dengan Reflect ---');
const user = {
  nama: 'Joko',
  umur: 25,
  role: 'admin',
};

// Membaca properti dengan Reflect.get
console.log("Reflect.get(user, 'nama')   :", Reflect.get(user, 'nama'));

// Memeriksa properti dengan Reflect.has
console.log("Reflect.has(user, 'role')   :", Reflect.has(user, 'role'));

// Menghapus properti dengan Reflect.deleteProperty
const statusHapus = Reflect.deleteProperty(user, 'role');
console.log('Status hapus properti role  :', statusHapus);
console.log('Objek setelah dihapus       :', user);

console.log('\n--- 2. Kolaborasi Sempurna: Proxy + Reflect ---');
const produk = {
  nama: 'Laptop',
  harga: 10000000,
};

const handler = {
  get(target, property, receiver) {
    console.log(`[ACCESS LOG]: Mengakses properti '${String(property)}'`);
    return Reflect.get(target, property, receiver);
  },

  set(target, property, value, receiver) {
    if (property === 'harga' && value < 0) {
      throw new Error('Harga tidak boleh negatif!');
    }

    return Reflect.set(target, property, value, receiver);
  },
};

const proxyProduk = new Proxy(produk, handler);

// Uji coba pembacaan via proxy
console.log('Baca nama via proxy         :', proxyProduk.nama);

// Uji coba penulisan via proxy
try {
  proxyProduk.harga = 12000000;
  console.log('Berhasil ubah harga         :', proxyProduk.harga);

  // Memicu validasi error:
  proxyProduk.harga = -1;
} catch (error) {
  console.error('Gagal update harga          :', error.message);
}
