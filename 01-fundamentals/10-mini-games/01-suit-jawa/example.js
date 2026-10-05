// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Mini Game: Suit Jawa ---');

function mainkanSuitJawa(pilihanPlayer) {
  // 1. Bangkitkan pilihan komputer secara acak (0 sampai 1)
  const acak = Math.random();
  let pilihanKomputer = '';

  if (acak < 0.34) {
    pilihanKomputer = 'gajah';
  } else if (acak <= 0.67) {
    pilihanKomputer = 'orang';
  } else {
    pilihanKomputer = 'semut';
  }

  // 2. Tentukan aturan kemenangan
  let hasil = '';
  if (pilihanPlayer === pilihanKomputer) {
    hasil = 'SERI!';
  } else if (pilihanPlayer === 'gajah') {
    hasil = pilihanKomputer === 'orang' ? 'MENANG! (Gajah menginjak Orang)' : 'KALAH! (Gajah dikalahkan Semut)';
  } else if (pilihanPlayer === 'orang') {
    hasil = pilihanKomputer === 'gajah' ? 'KALAH! (Orang diinjak Gajah)' : 'MENANG! (Orang menginjak Semut)';
  } else if (pilihanPlayer === 'semut') {
    hasil = pilihanKomputer === 'orang' ? 'KALAH! (Semut diinjak Orang)' : 'MENANG! (Semut masuk telinga Gajah)';
  } else {
    hasil = 'Pilihan tidak valid! Pilih: gajah, orang, atau semut.';
  }

  console.log(`Player   : ${pilihanPlayer}`);
  console.log(`Komputer : ${pilihanKomputer}`);
  console.log(`Hasil    : ${hasil}`);
  return hasil;
}

// Simulasi Permainan:
mainkanSuitJawa('gajah');
console.log('');
mainkanSuitJawa('semut');
