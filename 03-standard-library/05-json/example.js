// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log(
  '--- 1. Serialisasi Objek ke JSON (Filtering Replacer & Indentasi) ---'
);
const transaksi = {
  id: 'TRX-001',
  total: 150000,
  status: 'LUNAS',
  pinRahasia: 1234,
  waktu: '2026-10-02T10:00:00.000Z',
};

// Filter data: sembunyikan 'pinRahasia' dengan menyertakan whitelist properti, indentasi 2 spasi
const jsonString = JSON.stringify(
  transaksi,
  ['id', 'total', 'status', 'waktu'],
  2
);
console.log('Hasil stringify (Pretty Print):');
console.log(jsonString);

console.log('\n--- 2. Deserialisasi JSON ke Objek (Reviver Tanggal) ---');
// Parse kembali teks JSON dengan reviver untuk merekonstruksi objek Date asli
const transaksiBaru = JSON.parse(jsonString, (key, val) => {
  if (key === 'waktu') {
    return new Date(val);
  }
  return val;
});

console.log('Hasil parse objek         :', transaksiBaru);
console.log('Apakah waktu berupa Date? :', transaksiBaru.waktu instanceof Date);
console.log('Tahun transaksi           :', transaksiBaru.waktu.getFullYear());
console.log(
  'Format tanggal lokal      :',
  transaksiBaru.waktu.toLocaleDateString('id-ID')
);
