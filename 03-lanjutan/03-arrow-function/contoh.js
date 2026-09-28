// Penjelasan lengkap dapat dibaca pada README.md
// Arrow function: sintaks ringkas dan implisit return

const tampilNama = (nama) => `hallo ${nama}`;
console.log(tampilNama("joko"));

const tampilLengkap = (nama, waktu) => `hallo ${nama} selamat ${waktu}`;
console.log(tampilLengkap("joko", "malam"));

let mhs = ["joko", "santoso", "ayam b"];
let jumlahHuruf = mhs.map((nama) => nama.length);
console.log(jumlahHuruf);
