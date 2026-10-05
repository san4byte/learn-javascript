// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. for..of pada Array ---');
const bahasaFavorit = ['JavaScript', 'TypeScript', 'Python'];

for (const bahasa of bahasaFavorit) {
  console.log(`Saya sedang mempelajari: ${bahasa}`);
}

console.log('\n--- 2. for..of dengan entries() untuk mendapatkan Index ---');
for (const [index, bahasa] of bahasaFavorit.entries()) {
  console.log(`Urutan ke-${index + 1}: ${bahasa}`);
}

console.log('\n--- 3. for..of pada String ---');
const kataKunci = 'KODE';
for (const huruf of kataKunci) {
  console.log(`Karakter: ${huruf}`);
}

console.log('\n--- 4. for..in pada Objek (Membaca Property & Value) ---');
const profilLaptop = {
  merk: 'ThinkPad',
  ramGB: 16,
  ssdGB: 512,
  os: 'Ubuntu Linux',
};

for (const properti in profilLaptop) {
  console.log(`- ${properti}: ${profilLaptop[properti]}`);
}
