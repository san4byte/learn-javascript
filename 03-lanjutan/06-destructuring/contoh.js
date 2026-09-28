// Penjelasan lengkap dapat dibaca pada README.md
// Destructuring Assignment pada Array dan Object

const coba = ["satu", "dua", "tiga"];
const [a, , c] = coba;
console.log("Array destructuring:", a, c);

let y = 1, z = 2;
[y, z] = [z, y];
console.log("Swap variables:", y, z);

const mhs = {
  nama: "joko santoso",
  umur: 20,
};
const { nama, umur } = mhs;
console.log("Object destructuring:", nama, umur);
