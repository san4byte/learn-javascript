// Penjelasan lengkap dapat dibaca pada README.md
// Template literals: string interpolation dan multi-line string

const nama = "joko";
const umur = 20;
console.log(`hallo nama saya ${nama}, umur saya ${umur}`);

const x = 10;
console.log(`Angka 10 adalah: ${x % 2 == 0 ? "genap" : "ganjil"}`);

const mhs = {
  nama: "joko",
  umur: 20,
  nirm: "12142119184",
  email: "joko744@gmail.com",
};

const el = `
<div class="mhs">
  <h2>${mhs.nama}</h2>
  <span class="nirm">${mhs.nirm}</span>
</div>`;
console.log(el);
