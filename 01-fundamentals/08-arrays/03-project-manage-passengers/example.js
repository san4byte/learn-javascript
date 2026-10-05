// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Project Sistem Kursi Penumpang Angkot ---');

const daftarKursi = [];

function tambahPenumpang(nama, kursi) {
  // 1. Jika angkot kosong
  if (kursi.length === 0) {
    kursi.push(nama);
    console.log(`[NAIK]: ${nama} duduk di kursi pertama (kursi 1).`);
    return kursi;
  }

  // 2. Cek apakah nama sudah ada (duplikasi)
  if (kursi.includes(nama)) {
    console.log(
      `[DITOLAK]: Penumpang bernama '${nama}' sudah ada di dalam angkot!`
    );
    return kursi;
  }

  // 3. Telusuri apakah ada kursi kosong di tengah (undefined)
  for (let i = 0; i < kursi.length; i++) {
    if (kursi[i] === undefined) {
      kursi[i] = nama;
      console.log(`[NAIK]: ${nama} menduduki kursi kosong (kursi ${i + 1}).`);
      return kursi;
    }
  }

  // 4. Jika seluruh kursi terisi penuh, tambah di kursi belakang
  kursi.push(nama);
  console.log(
    `[NAIK]: Seluruh kursi penuh, ${nama} duduk di kursi paling belakang (kursi ${kursi.length}).`
  );
  return kursi;
}

function turunkanPenumpang(nama, kursi) {
  if (kursi.length === 0) {
    console.log(
      '[PERINGATAN]: Angkot masih kosong, tidak ada penumpang yang bisa turun.'
    );
    return kursi;
  }

  for (let i = 0; i < kursi.length; i++) {
    if (kursi[i] === nama) {
      kursi[i] = undefined; // Kursi menjadi kosong kembali
      console.log(`[TURUN]: ${nama} telah turun dari kursi ${i + 1}.`);
      return kursi;
    }
  }

  console.log(
    `[GAGAL]: Tidak ada penumpang bernama '${nama}' di dalam angkot.`
  );
  return kursi;
}

// Simulasi Alur Penumpang:
tambahPenumpang('Joko', daftarKursi);
tambahPenumpang('Budi', daftarKursi);
tambahPenumpang('Siti', daftarKursi);
console.log('Status Kursi:', daftarKursi);

// Budi turun di perjalanan
turunkanPenumpang('Budi', daftarKursi);
console.log('Status Kursi:', daftarKursi);

// Penumpang baru naik dan mengisi kursi kosong bekas Budi
tambahPenumpang('Ahmad', daftarKursi);
console.log('Status Kursi:', daftarKursi);
