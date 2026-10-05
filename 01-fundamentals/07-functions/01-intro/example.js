// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log(
  '--- 1. Function Declaration (Contoh Kasus Nyata: Hitung Diskon) ---'
);
// Dapat dipanggil sebelum deklarasi karena di-hoist oleh JavaScript
const totalBelanja = hitungHargaDiskon(100000, 10);
console.log(
  `Total setelah diskon 10%: Rp ${totalBelanja.toLocaleString('id-ID')}`
);

function hitungHargaDiskon(hargaAwal, persentaseDiskon) {
  const nominalPotongan = (hargaAwal * persentaseDiskon) / 100;
  const hargaAkhir = hargaAwal - nominalPotongan;
  return hargaAkhir; // Mengembalikan hasil perhitungan
}

console.log('\n--- 2. Function Expression ---');
// Disimpan ke dalam variabel const
const sapaPengguna = function (nama, peran = 'Pengunjung') {
  return `Halo, ${nama}! Anda masuk sebagai [${peran}].`;
};

console.log(sapaPengguna('Joko Santoso', 'Software Engineer'));

console.log('\n--- 3. Efek Fungsi Tanpa Keyword return ---');
function fungsiTanpaReturn() {
  const rahasia = 12345;
  // Lupa me-return nilai
}

const hasilUji = fungsiTanpaReturn();
console.log('Nilai kembalian fungsi:', hasilUji); // undefined
