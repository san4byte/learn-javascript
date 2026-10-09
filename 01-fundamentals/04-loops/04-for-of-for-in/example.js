// =============================================================================
// MODUL 01 - FUNDAMENTALS: 04.4 - FOR..OF & FOR..IN
// =============================================================================

console.log('=== 1. FOR..OF PADA ITERABLE (ARRAY & STRING) ===');
const bahasaFavorit = ['JavaScript', 'TypeScript', 'Python'];

// Iterasi langsung pada nilai (value)
for (const bahasa of bahasaFavorit) {
  console.log(`Bahasa: ${bahasa}`);
}

// Iterasi karakter string
const kode = 'JS6';
for (const char of kode) {
  console.log(`Karakter: ${char}`);
}

console.log('\n=== 2. FOR..OF DENGAN ENTRIES() UNTUK INDEKS & NILAI ===');
for (const [idx, bahasa] of bahasaFavorit.entries()) {
  console.log(`Indeks [${idx}] => ${bahasa}`);
}

console.log('\n=== 3. FOR..OF PADA SET DAN MAP ===');
const setTag = new Set(['frontend', 'backend', 'fullstack']);
for (const tag of setTag) {
  console.log(`Tag Set: ${tag}`);
}

const mapHarga = new Map([
  ['kopi', 15000],
  ['teh', 8000],
]);
for (const [menu, harga] of mapHarga) {
  console.log(`Menu ${menu}: Rp ${harga.toLocaleString('id-ID')}`);
}

console.log('\n=== 4. FOR..IN PADA OBJEK (ENUMERABLE KEYS) ===');
const parentObj = { pembuat: 'ECMAScript' };
const spekLaptop = Object.create(parentObj);
spekLaptop.merk = 'ThinkPad';
spekLaptop.ramGB = 16;
spekLaptop.ssdGB = 512;

console.log('Iterasi for..in dengan filter Object.hasOwn:');
for (const key in spekLaptop) {
  // for..in membaca seluruh properti turunan prototype
  if (Object.hasOwn(spekLaptop, key)) {
    console.log(`- Properti Asli [${key}]: ${spekLaptop[key]}`);
  } else {
    console.log(`- Properti Warisan [${key}]: ${spekLaptop[key]}`);
  }
}

console.log('\n=== 5. ALTERNATIF MODERN: OBJECT.ENTRIES() DENGAN FOR..OF ===');
const pengaturan = { tema: 'gelap', notifikasi: true, bahasa: 'id' };
for (const [kunci, nilai] of Object.entries(pengaturan)) {
  console.log(`Konfigurasi: ${kunci} -> ${nilai}`);
}
