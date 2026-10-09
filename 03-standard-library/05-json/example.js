// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. DASAR SERIALISASI & PRETTY-PRINT ===');
const user = {
  id: 101,
  username: 'jokosantoso',
  aktif: true,
  saldo: 500000.75,
};

// Stringify standar (1 baris rapat)
console.log('JSON rapat (compact)          :', JSON.stringify(user));

// Pretty-print dengan indentasi 2 spasi
console.log(
  'JSON pretty-print (2 spasi)   :\n' + JSON.stringify(user, null, 2)
);

console.log('\n=== 2. ADVANCED REPLACER: WHITELIST & FUNGSI ===');
const transaksi = {
  id: 'TRX-999',
  pinRahasia: '123456',
  total: 250000,
  tokenOauth: 'xyz-secret-token',
  waktu: new Date('2026-10-09T10:00:00Z'),
};

// A. Replacer berupa Array Whitelist (Hanya properti tertentu yang lolos)
const whitelistJson = JSON.stringify(transaksi, ['id', 'total', 'waktu'], 2);
console.log('Whitelist Array (pin & token disembunyikan):\n' + whitelistJson);

// B. Replacer berupa Fungsi: menyensor properti sensitif secara dinamis
const replacerFnJson = JSON.stringify(transaksi, (key, value) => {
  if (key === 'pinRahasia' || key === 'tokenOauth') {
    return undefined; // Nilai undefined otomatis DIHAPUS dari JSON
  }
  return value;
});
console.log('Replacer Function             :', replacerFnJson);

console.log('\n=== 3. ADVANCED REVIVER: REKONSTRUKSI OBJEK DATE ===');
const jsonDenganTanggal = JSON.stringify({
  laporanId: 'REP-01',
  dibuatPada: '2026-10-09T08:30:00.000Z',
});

// JSON.parse biasa membuat tanggal menjadi String biasa
const parseBiasa = JSON.parse(jsonDenganTanggal);
console.log('Tanpa reviver (tipe dibuatPada):', typeof parseBiasa.dibuatPada); // "string"

// JSON.parse dengan fungsi Reviver untuk mengembalikan ke Date instance
const parseDenganReviver = JSON.parse(jsonDenganTanggal, (key, value) => {
  if (key === 'dibuatPada') {
    return new Date(value); // Rekonstruksi menjadi instance Date
  }
  return value;
});
console.log(
  'Dengan reviver (instanceof Date):',
  parseDenganReviver.dibuatPada instanceof Date
); // true
console.log(
  'Format tanggal lokal          :',
  parseDenganReviver.dibuatPada.toLocaleDateString('id-ID')
);

console.log('\n=== 4. CUSTOM SERIALIZATION VIA METHOD toJSON() ===');
class Produk {
  constructor(sku, nama, hargaBeli, hargaJual) {
    this.sku = sku;
    this.nama = nama;
    this.hargaBeli = hargaBeli; // Rahasia internal
    this.hargaJual = hargaJual;
  }

  // Method khusus toJSON() otomatis dipanggil oleh JSON.stringify
  toJSON() {
    return {
      sku: this.sku,
      nama: this.nama,
      harga: this.hargaJual, // Sembunyikan hargaBeli dari output JSON!
    };
  }
}

const laptop = new Produk('SKU-LAP-01', 'Laptop Pro', 8000000, 10500000);
console.log('Serialisasi Class dengan toJSON():', JSON.stringify(laptop));

console.log('\n=== 5. PERILAKU TIPE DATA & JEBAKAN SERIALISASI ===');
const dataCampur = {
  teks: 'halo',
  fungsi: () => console.log('test'), // Dihapus dari objek
  simbol: Symbol('id'), // Dihapus dari objek
  dataUndefined: undefined, // Dihapus dari objek
  list: [1, undefined, () => {}, 4], // Di dalam array diubah menjadi null!
};
console.log('Perilaku tipe tak terdukung   :', JSON.stringify(dataCampur));
// Output: {"teks":"halo","list":[1,null,null,4]}

console.log('\n=== 6. PENANGANAN ERROR PARSING (SAFE PARSE) ===');
function safeJsonParse(jsonStr, fallback) {
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    console.log(`[Error Logged] Gagal parse JSON: ${error.message}`);
    return fallback;
  }
}

const jsonRusak = '{ "nama": "Joko", umur: 25 }'; // Error: key umur tidak pakai kutip ganda
const hasilAman = safeJsonParse(jsonRusak, { status: 'fallback_default' });
console.log('Hasil Safe Parse              :', hasilAman);
