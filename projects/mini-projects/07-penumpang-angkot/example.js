// =============================================================================
// MODUL 01 - FUNDAMENTALS: 08.3 - PROJECT KELOLA PENUMPANG ANGKOT
// =============================================================================

console.log('=== 1. SISTEM PENGELOLAAN KURSI PENUMPANG ANGKOT ===');
const KAPASITAS_MAKSIMAL = 4;
const daftarKursi = [];

function tambahPenumpang(nama, kursi, kapasitas = KAPASITAS_MAKSIMAL) {
  // 1. Validasi: Jika kursi masih kosong sama sekali
  if (kursi.length === 0) {
    kursi.push(nama);
    console.log(`[NAIK]: ${nama} duduk di kursi pertama (Kursi 1).`);
    return kursi;
  }

  // 2. Validasi: Pencegahan nama duplikat
  if (kursi.includes(nama)) {
    console.log(`[DITOLAK]: Penumpang '${nama}' sudah berada di dalam angkot!`);
    return kursi;
  }

  // 3. Prioritas: Isi kursi kosong di tengah (undefined) jika ada yang turun
  for (let i = 0; i < kursi.length; i++) {
    if (kursi[i] === undefined) {
      kursi[i] = nama;
      console.log(`[NAIK]: ${nama} menduduki kursi kosong (Kursi ${i + 1}).`);
      return kursi;
    }
  }

  // 4. Validasi: Batas kapasitas maksimal
  if (kursi.length >= kapasitas) {
    console.log(
      `[PENUH]: Maaf ${nama}, kapasitas angkot sudah penuh (${kapasitas} kursi)!`,
    );
    return kursi;
  }

  // 5. Tambah di kursi paling belakang
  kursi.push(nama);
  console.log(
    `[NAIK]: ${nama} duduk di kursi paling belakang (Kursi ${kursi.length}).`,
  );
  return kursi;
}

function turunkanPenumpang(nama, kursi) {
  if (kursi.length === 0) {
    console.log('[PERINGATAN]: Angkot masih kosong, tidak ada penumpang.');
    return kursi;
  }

  for (let i = 0; i < kursi.length; i++) {
    if (kursi[i] === nama) {
      kursi[i] = undefined; // Kursi menjadi slot kosong kembali
      console.log(`[TURUN]: ${nama} telah turun dari Kursi ${i + 1}.`);
      return kursi;
    }
  }

  console.log(`[GAGAL]: Penumpang '${nama}' tidak ditemukan di dalam angkot.`);
  return kursi;
}

function cetakStatusKursi(kursi) {
  const tampilan = kursi.map((p, idx) =>
    p ? `[#${idx + 1}: ${p}]` : `[#${idx + 1}: KOSONG]`,
  );
  console.log('Status Kursi Angkot:', tampilan.join(' '));
}

// SIMULASI ALUR PENUMPANG
console.log('\n--- Sesi 1: Penumpang Naik Berurutan ---');
tambahPenumpang('Joko', daftarKursi);
tambahPenumpang('Budi', daftarKursi);
tambahPenumpang('Siti', daftarKursi);
cetakStatusKursi(daftarKursi);

console.log('\n--- Sesi 2: Penumpang Turun di Perjalanan ---');
turunkanPenumpang('Budi', daftarKursi);
cetakStatusKursi(daftarKursi);

console.log('\n--- Sesi 3: Penumpang Baru Mengisi Kursi Kosong ---');
tambahPenumpang('Ahmad', daftarKursi); // Mengisi kursi kosong bekas Budi
cetakStatusKursi(daftarKursi);

console.log('\n--- Sesi 4: Menolak Duplikat & Uji Batas Penuh ---');
tambahPenumpang('Joko', daftarKursi); // Ditolak: Duplikat
tambahPenumpang('Rina', daftarKursi); // Naik di kursi 4 (Penuh)
tambahPenumpang('Doni', daftarKursi); // Ditolak: Angkot sudah penuh
cetakStatusKursi(daftarKursi);
