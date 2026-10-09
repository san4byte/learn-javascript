// =============================================================================
// MODUL 01 - FUNDAMENTALS: 12 - SINTAKS MODERN ES LANJUTAN
// =============================================================================
'use strict'; // Mengaktifkan Strict Mode untuk mengunci kode berkualitas

console.log('=== 1. OPTIONAL CHAINING (?.) PADA PROPERTI, ARRAY & METHOD ===');
const pelanggan = {
  id: 101,
  profil: {
    nama: 'Joko Santoso',
    alamat: {
      kota: 'Jakarta Selatan',
    },
  },
  pesanan: ['Kopi Latte', 'Croissant'],
  bayar() {
    return 'Pembayaran sukses diproses!';
  },
};

// a. Akses properti bersarang aman
console.log('Kota pelanggan    :', pelanggan?.profil?.alamat?.kota);
console.log('Kode pos (opsional):', pelanggan?.profil?.kontak?.kodePos); // undefined (tidak crash!)

// b. Akses elemen array dengan optional chaining
console.log('Pesanan ke-1      :', pelanggan.pesanan?.[0]);
console.log('Kupon diskon ke-1 :', pelanggan.kupon?.[0]); // undefined

// c. Pemanggilan method opsional
console.log('Panggil method ada:', pelanggan.bayar?.());
console.log('Panggil method non:', pelanggan.batalkan?.()); // undefined (tidak TypeError)

console.log('\n=== 2. NULLISH COALESCING (??) VS LOGICAL OR (||) ===');
const setelanGame = {
  skorAwal: 0,
  namaKarakter: '',
  audioAktif: false,
};

// Kasus 0:
console.log('Skor dengan || (keliru menimpa 0) :', setelanGame.skorAwal || 100); // 100
console.log('Skor dengan ?? (mempertahankan 0) :', setelanGame.skorAwal ?? 100); // 0

// Kasus string kosong "":
console.log(
  'Nama dengan || (keliru menimpa ""):',
  setelanGame.namaKarakter || 'Pemain Anonim',
);
console.log(
  'Nama dengan ?? (mempertahankan ""):',
  setelanGame.namaKarakter ?? 'Pemain Anonim',
);

console.log('\n=== 3. LOGICAL ASSIGNMENT OPERATORS (??=, ||=, &&=) ===');
const konfigurasi = { port: 3000 };

// ??= (Nullish coalescing assignment): hanya menetapkan jika null atau undefined
konfigurasi.port ??= 8080; // Tetap 3000
konfigurasi.host ??= 'localhost'; // Disetel ke 'localhost' karena sebelumnya undefined
console.log('Konfigurasi setelah ??= :', konfigurasi);

console.log('\n=== 4. STRICT MODE ENFORCEMENT ===');
try {
  // Evaluasi penugasan tanpa deklarasi (dilarang keras dalam strict mode)
  eval('variabelBocor = 12345;');
} catch (err) {
  console.log('Strict Mode menangkap penugasan ilegal:', err.message);
}
