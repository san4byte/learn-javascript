// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. EMPAT CARA INSTANSIASI DATE ===');
// 1. Tanggal & waktu saat ini
const sekarang = new Date();
console.log('1. Tanggal saat ini            :', sekarang.toISOString());

// 2. Dari Epoch milidetik
const dariEpoch = new Date(0); // 1 Januari 1970 00:00:00 UTC
console.log('2. Unix Epoch (0 ms)           :', dariEpoch.toISOString());

// 3. Dari ISO 8601 String
const dariIso = new Date('2026-08-17T10:00:00.000Z');
console.log('3. Dari ISO 8601 String        :', dariIso.toISOString());

// 4. Dari komponen terpisah (Tahun, IndexBulan [0-11], Tanggal, Jam, Menit, Detik)
// 17 Agustus 2026 (Agustus = index 7)
const dariKomponen = new Date(2026, 7, 17, 10, 30, 0);
console.log('4. Dari Komponen (7 = Agustus) :', dariKomponen.toString());

console.log('\n=== 2. LOCAL TIME vs UTC & TIMEZONE OFFSET ===');
console.log('Jam Lokal (getHours)           :', dariKomponen.getHours());
console.log('Jam UTC (getUTCHours)          :', dariKomponen.getUTCHours());
console.log(
  'Selisih Menit ke UTC (offset)  :',
  dariKomponen.getTimezoneOffset(),
); // Di WIB: -420 (7 jam di depan UTC)

console.log('\n=== 3. MANIPULASI TANGGAL & AUTO-ROLLOVER ===');
// Manipulasi tanggal via setter otomatis memperhitungkan pergantian bulan/tahun kabisat
const tanggalPesanan = new Date(2026, 0, 31); // 31 Januari 2026
console.log(
  'Tanggal Awal                   :',
  tanggalPesanan.toLocaleDateString('id-ID'),
);

// Tambah 1 hari -> otomatis masuk ke 1 Februari
tanggalPesanan.setDate(tanggalPesanan.getDate() + 1);
console.log(
  'Tambah 1 Hari (Auto-Rollover)  :',
  tanggalPesanan.toLocaleDateString('id-ID'),
); // 1/2/2026

// Tambah 30 hari lagi
tanggalPesanan.setDate(tanggalPesanan.getDate() + 30);
console.log(
  'Tambah 30 Hari Lagi            :',
  tanggalPesanan.toLocaleDateString('id-ID'),
); // 3/3/2026

console.log('\n=== 4. KALKULASI SELISIH WAKTU & DATE.NOW() ===');
const waktuMulai = Date.now(); // Angka epoch ms saat ini (sangat cepat, tanpa objek)
const deadline = new Date(Date.now() + 1000 * 60 * 60 * 48); // 48 jam ke depan

const selisihMs = deadline.getTime() - waktuMulai;
const selisihJam = selisihMs / (1000 * 60 * 60);
console.log('Timestamp ms (Date.now())      :', waktuMulai);
console.log('Selisih Waktu                  :', selisihJam, 'jam');

console.log('\n=== 5. FORMATTING LOKAL INDONESIA TINGKAT LANJUT ===');
const opsiFormatLengkap = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
};

const waktuFormatted = dariIso.toLocaleDateString('id-ID', opsiFormatLengkap);
console.log('Format Formal Indonesia        :', waktuFormatted);
console.log(
  'Format Jam Saja (TimeString)   :',
  dariIso.toLocaleTimeString('id-ID'),
);
console.log(
  'Date.parse() string ISO ke ms  :',
  Date.parse('2026-08-17T10:00:00.000Z'),
);

console.log('\n=== 6. VALIDASI OBJEK DATE (DETEKSI INVALID DATE) ===');
function isValidDate(d) {
  return d instanceof Date && !isNaN(d.getTime());
}

const tanggalValid = new Date('2026-12-31');
const tanggalRusak = new Date('bukan-tanggal-valid');

console.log("Validasi '2026-12-31'          :", isValidDate(tanggalValid)); // true
console.log("Validasi 'bukan-tanggal'       :", isValidDate(tanggalRusak)); // false
console.log('Output jika tanggal rusak      :', tanggalRusak.toString()); // "Invalid Date"
