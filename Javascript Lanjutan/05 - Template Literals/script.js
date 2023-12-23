// ''
// ""
// `` (template literals)

// const nama = "joko";
// const umur = 20;
// console.log(` hallo nama saya ${nama}, umur saya ${umur}`);

// * exspresen
// const x = 10;
// console.log(`${x % 2 == 0 ? "genap" : "ganjil"}`);

// * HTML fragmants
const mhs = {
	nama: "joko",
	umur: 20,
	nirm: "12142119184",
	email: "joko744@gmail.com",
};

const test = /*html*/ `
<div class="mhs">
  <h2>${mhs.nama}</h2>
  <span class="nirm">${mhs.nirm}</span>
</div>`;

console.log(test);
