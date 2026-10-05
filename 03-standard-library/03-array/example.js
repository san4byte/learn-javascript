// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Struktur Data Stack (LIFO: Last-In First-Out) ---');
const riwayatAksi = [];
riwayatAksi.push("Ketik: 'Halo'");
riwayatAksi.push("Ketik: 'Halo Dunia'");
riwayatAksi.push('Format: Bold');
console.log('Tumpukan aksi saat ini        :', riwayatAksi);

// Tombol Undo (mengambil aksi terakhir yang ditaruh di atas)
const aksiDibatalkan = riwayatAksi.pop();
console.log('Aksi di-undo (pop)            :', aksiDibatalkan);
console.log('Sisa tumpukan aksi            :', riwayatAksi);

console.log(
  '\n--- 2. Studi Kasus Nyata: Antrean Pesanan (Queue FIFO, Search, & Reduce) ---'
);
class AntreanPesanan {
  // Enkapsulasi data antrean menggunakan Private Field (#)
  #daftar = [];

  tambahPesanan(data) {
    this.#daftar.push(data);
    console.log(`[+] Pesanan masuk antrean: ID ${data.id} (${data.nama})`);
  }

  prosesPesanan() {
    if (this.#daftar.length === 0) {
      return 'Antrean kosong';
    }
    const pesanan = this.#daftar.shift();
    return `Pesanan ID ${pesanan.id} milik ${pesanan.nama} selesai diproses`;
  }

  cariPesananById(targetId) {
    const pesanan = this.#daftar.find((item) => item.id === targetId);
    if (!pesanan) {
      return `Pesanan dengan ID ${targetId} tidak ditemukan`;
    }
    return `ID ${targetId} ditemukan: ${pesanan.nama} (Rp ${pesanan.total.toLocaleString('id-ID')})`;
  }

  hitungTotalPendapatan() {
    const total = this.#daftar.reduce((acc, item) => acc + item.total, 0);
    return `Total Nilai Antrean: ${total.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })}`;
  }

  get daftarAntrean() {
    return [...this.#daftar]; // Kembalikan salinan array agar data asli aman
  }
}

// Pengujian Kasus Uji:
const antreanResto = new AntreanPesanan();

antreanResto.tambahPesanan({ id: 1, nama: 'Budi', total: 150000 });
antreanResto.tambahPesanan({ id: 2, nama: 'Andi', total: 10000 });
antreanResto.tambahPesanan({ id: 3, nama: 'Siti', total: 25000 });

console.log('\n--- Pemrosesan Antrean (Queue: First-In First-Out) ---');
console.log(antreanResto.prosesPesanan()); // Budi diproses lebih dulu (FIFO)
console.log(antreanResto.prosesPesanan()); // Andi diproses kedua

console.log('\n--- Pencarian Data (Array.find) ---');
console.log(antreanResto.cariPesananById(3)); // Siti ditemukan
console.log(antreanResto.cariPesananById(99)); // ID tidak ada

console.log('\n--- Akumulasi Data (Array.reduce) ---');
console.log(antreanResto.hitungTotalPendapatan()); // Sisa pesanan Siti (Rp 25.000)
