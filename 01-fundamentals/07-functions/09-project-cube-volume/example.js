// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Project Perhitungan Volume Dua Kubus ---');

// Fungsi pembantu independen (Modular Helper)
function hitungVolumeKubus(sisi) {
  return sisi * sisi * sisi; // atau Math.pow(sisi, 3)
}

// Fungsi utama yang mengombinasikan hasil
function jumlahVolumeDuaKubus(sisiA, sisiB) {
  const volumeA = hitungVolumeKubus(sisiA);
  const volumeB = hitungVolumeKubus(sisiB);
  
  return volumeA + volumeB;
}

const sisiKubus1 = 8;
const sisiKubus2 = 3;

const totalVolume = jumlahVolumeDuaKubus(sisiKubus1, sisiKubus2);

console.log(`Kubus 1 (sisi ${sisiKubus1}) volume : ${hitungVolumeKubus(sisiKubus1)}`);
console.log(`Kubus 2 (sisi ${sisiKubus2}) volume : ${hitungVolumeKubus(sisiKubus2)}`);
console.log(`Total gabungan volume      : ${totalVolume}`);
