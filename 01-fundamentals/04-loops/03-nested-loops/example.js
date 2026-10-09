// =============================================================================
// MODUL 01 - FUNDAMENTALS: 04.3 - NESTED LOOPS (PERULANGAN BERSARANG)
// =============================================================================

console.log('=== 1. POLA GRID PERSEGI (BARIS X KOLOM) ===');
const tinggiKotak = 3;
const lebarKotak = 5;
let hasilKotak = '';

for (let baris = 1; baris <= tinggiKotak; baris++) {
  let barisTeks = '';
  for (let kolom = 1; kolom <= lebarKotak; kolom++) {
    barisTeks += '* ';
  }
  hasilKotak += barisTeks.trim() + '\n';
}
console.log(hasilKotak.trim());

console.log('\n=== 2. POLA SEGITIGA SIKU-SIKU BINTANG ===');
let hasilSegitiga = '';
for (let i = 1; i <= 4; i++) {
  let barisBintang = '';
  for (let j = 1; j <= i; j++) {
    barisBintang += '*';
  }
  hasilSegitiga += barisBintang + '\n';
}
console.log(hasilSegitiga.trim());

console.log('\n=== 3. TRAVERSAL ARRAY DUA DIMENSI (MATRIKS) ===');
const matriks = [
  [10, 20, 30],
  [40, 50, 60],
  [70, 80, 90],
];

let totalJumlah = 0;
for (let r = 0; r < matriks.length; r++) {
  for (let c = 0; c < matriks[r].length; c++) {
    totalJumlah += matriks[r][c];
    process.stdout.write(`[${r},${c}]=${matriks[r][c]} `);
  }
  console.log();
}
console.log(`Total penjumlahan seluruh elemen matriks: ${totalJumlah}`);

console.log('\n=== 4. LABELLED STATEMENTS DENGAN BREAK PADA NESTED LOOP ===');
// Mencari angka target dalam matriks dan langsung keluar dari loop terluar
const target = 50;
let ditemukan = false;

loopBaris: for (let r = 0; r < matriks.length; r++) {
  for (let c = 0; c < matriks[r].length; c++) {
    if (matriks[r][c] === target) {
      console.log(
        `Target ${target} ditemukan di koordinat baris ${r}, kolom ${c}!`,
      );
      ditemukan = true;
      break loopBaris; // Menghentikan langsung loop luar berlabel 'loopBaris'
    }
  }
}
console.log(`Status pencarian: ${ditemukan ? 'Berhasil' : 'Tidak Ditemukan'}`);
