// Penjelasan lengkap dapat dibaca pada README.md
// Rest Parameter: menangani argumen tak terbatas ke dalam bentuk array

function jmlAngka(...angka) {
  return angka.reduce((a, b) => a + b, 0);
}
console.log("Total penjumlahan:", jmlAngka(1, 2, 3, 4, 5));

const kelompok = ["joko", "santoso", "samsul", "adi", "roy"];
const [ketua, wakil, ...anggota] = kelompok;
console.log("Ketua:", ketua);
console.log("Wakil:", wakil);
console.log("Anggota:", anggota);
