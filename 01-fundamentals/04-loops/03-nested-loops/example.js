// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Pola Kotak Persegi Bintang (3 x 5) ---');
let hasilKotak = '';

for (let baris = 1; baris <= 3; baris++) {
  let barisTeks = '';
  for (let kolom = 1; kolom <= 5; kolom++) {
    barisTeks += '* ';
  }
  hasilKotak += barisTeks.trim() + '\n';
}

console.log(hasilKotak.trim());

console.log('\n--- 2. Pola Segitiga Siku-Siku Bintang ---');
let hasilSegitiga = '';

for (let i = 1; i <= 4; i++) {
  let bintang = '';
  for (let j = 1; j <= i; j++) {
    bintang += '*';
  }
  hasilSegitiga += bintang + '\n';
}

console.log(hasilSegitiga.trim());
