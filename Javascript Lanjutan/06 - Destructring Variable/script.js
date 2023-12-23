// ! Destructring Variable
// todo: array
// const coba = ["satu", "dua", "tiga"];

// * bisa diskip namun komanya jangan dihilangkan
// const [a, , c] = coba;
// console.log(a);
// console.log(c);

// * swap item
// let y = 1;
// let z = 2;
// console.log(y);
// console.log(z);
// [y, z] = [z, y];
// console.log(y);
// console.log(z);

// * return value pada array
// function coba() {
// 	return [1, 2];
// }

// const [a, b] = coba();
// console.log(a);
// console.log(b);

// * rest parameter (...)
// const [a, ...value] = [1, 2, 3, 4, 5, 6];
// console.log(value); // jadi array

// todo: object
// * nama harus sesuai nama properti
// const mhs = {
// 	nama: "Joko Santoso",
// 	umur: 20,
// 	email: "joko@gmail.com",
// };

// const { nama, umur, email } = mhs;
// console.log(nama);

// * tanpa di declarasi dulu objectnya
// ({ nama, umur, email } = {
// 	nama: "Joko Santoso",
// 	umur: 20,
// 	email: "joko@gmail.com",
// });
// console.log(nama);

// * asign ke variable baru (menggan nama variable agar beda dengan properti)
// const mhs = {
// 	nama: "Joko Santoso",
// 	umur: 20,
// 	email: "joko@gmail.com",
// };

// const { nama: a, umur, email } = mhs;
// console.log(a);

// * default value
// const mhs = {
// 	nama: "Joko Santoso",
// 	umur: 20,
// };

// const { nama, umur, email = "joko@gmail.com" } = mhs;
// console.log(email);

// * gabung antara variable baru dan + memberi nilai default
// const mhs = {
// 	nama: "Joko Santoso",
// 	umur: 20,
// };

// const { nama, umur, email: a = "joko@gmail.com" } = mhs;
// console.log(email); // !eror
// console.log(a); // no eror

// * rest parameter (...)
// const mhs = {
// 	nama: "Joko Santoso",
// 	umur: 20,
// 	email: "joko@gmail.com",
// };

// const { nama, ...value } = mhs;
// console.log(value); // output: berbentuk object

// *mengembil field pada object, setelah dikirim sebagai parameter untuk function
const mhs = {
	nama: "Joko Santoso",
	umur: 20,
	email: "joko@gmail.com",
};
// * umum
// function test(mhs) {
// 	return mhs.email;
// }
// * khusus
function test({ email }) {
	return email;
}

console.log(test(mhs));
