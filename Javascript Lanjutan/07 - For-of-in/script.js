// ? For...of
// * array
const mhs = ["joko", "adi", "samsul"];

// for (let i = 0; i < mhs.length; i++) {
// 	console.log(`${i + 1}. ${mhs[i]}`);
// }

// mhs.forEach((e, i) => console.log(`${i + 1}. ${e}`));

// for (const e of mhs) {
// 	console.log(e);
// }

// * string
// const nama = "joko";

// for (const n of nama) {
// 	console.log(n);
// }

// * nodelist
// const coba = document.querySelectorAll(".nama");

// coba.forEach((e) => console.log(e.innerHTML));

// * arguments
// function tambahAngka() {
// ! tidak bisa forEach
// ! tidak bisa .reduce()
// for of
// 	jml = 0;
// 	for (e of arguments) {
// 		jml += e;
// 	}
// 	return jml;
// }

// console.log(tambahAngka(1, 2, 3, 4, 5));

// ? For..in
// * khusus object
// const mhs = {
// 	nama: "joko",
// 	umur: "20",
// 	email: "joko@gmail.com",
// };

// for (e in mhs) {
// 	// console.log(e);
// 	// console.log(mhs[e]);
// 	console.log(`${e} : ${mhs[e]}`);
// }
