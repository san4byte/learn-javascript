// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Proteksi Objek: Object.freeze() vs Object.seal() ---');
const configServer = {
  host: 'localhost',
  port: 8080,
};

// Bekukan objek secara total (immutable)
Object.freeze(configServer);

// Uji coba mutasi (tidak akan mengubah nilai pada objek yang di-freeze):
configServer.port = 9000;
configServer.timeout = 5000;

console.log('Hasil pembuktian freeze :', configServer);
console.log('Apakah objek di-freeze? :', Object.isFrozen(configServer)); // true

console.log('\n--- 2. Iterasi Pasangan Data dengan Object.entries() ---');
const kursValas = {
  USD: 16000,
  EUR: 17500,
  SGD: 12000,
  JPY: 105,
};

// Iterasi praktis menggunakan destructuring [kunci, nilai]
for (const [mataUang, nilaiRupiah] of Object.entries(kursValas)) {
  console.log(
    `1 ${mataUang.padEnd(4)} = Rp ${nilaiRupiah.toLocaleString('id-ID')}`
  );
}

console.log('\n--- 3. Analitik Data: Object.values() & Array.reduce() ---');
function hitungRataRataKurs(dataKurs) {
  const daftarNilai = Object.values(dataKurs);

  if (daftarNilai.length === 0) {
    return 'Data kurs kosong';
  }

  const totalNilai = daftarNilai.reduce((total, val) => total + val, 0);
  const rataRata = totalNilai / daftarNilai.length;

  return `Rata-rata Nilai Kurs: Rp ${rataRata.toLocaleString('id-ID', {
    maximumFractionDigits: 2,
  })}`;
}

console.log(hitungRataRataKurs(kursValas));

// Query string dari URL browser
const urlParams = new URLSearchParams('page=2&limit=20&sort=asc');

// Langsung ubah jadi objek JavaScript biasa!
const konfigurasi = Object.fromEntries(urlParams);

console.log(konfigurasi);
// Output: { page: "2", limit: "20", sort: "asc" }
console.log(konfigurasi.limit); // "20"

const kurs = {
  USD: 16000,
  EUR: 17500,
  SGD: 12000,
  JPY: 105,
};

// Misal: Hanya ambil mata uang yang nilainya di atas Rp 1.000
const kursTinggi = Object.fromEntries(
  Object.entries(kurs).filter(([mataUang, nilai]) => nilai > 1000)
);

console.log(kursTinggi);
// Output: { USD: 16000, EUR: 17500, SGD: 12000 }  (JPY otomatis terbuang!)
