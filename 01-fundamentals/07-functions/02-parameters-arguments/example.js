// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.2 - PARAMETER, ARGUMEN & DEFAULT PARAMETER
// =============================================================================

console.log('=== 1. PARAMETER VS ARGUMEN & DEFAULT PARAMETERS ===');
// Parameter jenisKopi, ukuran, dan gula memiliki nilai fallback default
function buatPesananKopi(
  jenisKopi = 'Americano',
  ukuran = 'Regular',
  gula = false,
) {
  return `Pesanan: Kopi ${jenisKopi} | Ukuran: ${ukuran} | Gula: ${gula ? 'Ya' : 'Tidak'}`;
}

// Argumen default aktif jika parameter tidak diisi atau diisi undefined
console.log('Default penuh      :', buatPesananKopi());
console.log('Argumen kustom     :', buatPesananKopi('Latte', 'Large', true));
console.log('Argumen undefined  :', buatPesananKopi(undefined, 'Small', false)); // Fallback jenisKopi ke Americano

console.log('\n=== 2. OBJEK ARGUMENTS (ARRAY-LIKE LEGACY) ===');
function jumlahkanSemua() {
  console.log(`Banyak argumen yang diterima: ${arguments.length}`);
  // Konversi array-like arguments menjadi Array asli menggunakan Array.from
  const listAngka = Array.from(arguments);
  return listAngka.reduce((total, num) => total + num, 0);
}

console.log('Jumlah 3 angka :', jumlahkanSemua(10, 20, 30));
console.log('Jumlah 5 angka :', jumlahkanSemua(5, 15, 25, 35, 45));

console.log('\n=== 3. DESTRUCTURING PARAMETER & OPTIONS OBJECT PATTERN ===');
// Daripada mengirimkan banyak argumen yang rawan tertukar urutannya,
// gunakan pola Options Object dengan destructuring langsung pada parameter
function konfigurasiServer({
  host = 'localhost',
  port = 3000,
  secure = false,
} = {}) {
  const protokol = secure ? 'https' : 'http';
  return `Server aktif di ${protokol}://${host}:${port}`;
}

console.log('Konfigurasi default:', konfigurasiServer());
console.log(
  'Konfigurasi custom :',
  konfigurasiServer({ port: 8080, secure: true }),
);
