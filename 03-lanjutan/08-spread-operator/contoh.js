// Penjelasan lengkap dapat dibaca pada README.md
// Spread Operator: menyebarkan iterable menjadi elemen tunggal

const mhs = ["joko", "adi", "samsul"];
const dosen = ["pak budi", "bu siti"];

const gabung = [...mhs, "aji", ...dosen];
console.log("Gabungan array:", gabung);

const mhsCopy = [...mhs];
mhsCopy[0] = "tono";
console.log("Array copy:", mhsCopy);
console.log("Array asli tetap aman:", mhs);
