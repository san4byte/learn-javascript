// math.js - Modul penghitungan matematika lingkaran dan volume
export function hitungLuas(r) {
  return 3.14159 * r * r;
}

// Fungsi dengan nama internal
function rumusKubusInternal(sisi) {
  return sisi * sisi * sisi;
}

// Mengekspor dengan alias menggunakan kata kunci 'as':
export { rumusKubusInternal as hitungVolumeKubus };
