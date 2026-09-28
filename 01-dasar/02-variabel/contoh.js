// Penjelasan lengkap dapat dibaca pada README.md
// Demonstrasi variabel: var (hoisting & function scope), let & const (block scope)

console.log("--- Hoisting dengan var ---");
console.log(i); // undefined
var i = 10;

console.log("--- Block scope let ---");
for (let j = 0; j < 5; j++) {
  console.log("Nilai j:", j);
}

console.log("--- Mutasi Objek dan Array dengan const ---");
const mhs = {
  nama: "joko santoso",
  umur: 20,
};
mhs.umur = 30; // Properti dapat diubah
console.log(mhs);

const angka = [1, 2, 3];
angka.push(4); // Elemen dapat ditambah
console.log(angka);
