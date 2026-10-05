// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Eksplorasi Method String Populer ---');
const email = 'joko.santoso@perusahaan.co.id';
console.log("Apakah email memiliki '@'?          :", email.includes('@'));
console.log("Apakah berawalan 'joko'?             :", email.startsWith('joko'));
console.log("Apakah berakhiran '.co.id'?          :", email.endsWith('.co.id'));

console.log(
  '\n--- 2. Studi Kasus Nyata: Generator Kode Invoice (buatKodeInvoice) ---'
);
function buatKodeInvoice(prefix, kategori, nomorUrut) {
  // 1. Bersihkan spasi di ujung dan ubah ke uppercase
  const kodePrefix = prefix.trim().toUpperCase();

  // 2. Ubah kategori ke uppercase dan ganti spasi dengan tanda hubung (-)
  const kodeKategori = kategori.toUpperCase().replaceAll(' ', '-');

  // 3. Konversi nomor ke string lalu tambahkan leading zero minimal 5 digit
  const kodeNomor = String(nomorUrut).padStart(5, '0');

  // 4. Gabungkan ketiga bagian dengan template literal
  return `${kodePrefix}-${kodeKategori}-${kodeNomor}`;
}

// Pengujian Kasus Uji:
console.log(
  'Nomor Urut 2 Digit (42)              :',
  buatKodeInvoice('  inv  ', 'alat kantor', 42)
);
// Output: "INV-ALAT-KANTOR-00042"

console.log(
  "String Nomor Urut 1 Digit ('7')      :",
  buatKodeInvoice('trx ', 'gadget', '7')
);
// Output: "TRX-GADGET-00007"

console.log(
  'Nomor Lebih dari 5 Digit             :',
  buatKodeInvoice('inv', 'elektronik', 4279977)
);
// Output: "INV-ELEKTRONIK-4279977" (tidak terpotong oleh padStart)
