// const tampilNama = function (nama) {
// 	return `hallo ${nama}`;
// };
// console.log(tampilNama("joko"));

// * Arrow Function
// const tampilNama = (nama, waktu) => {
// 	return `hallo ${nama} selamat ${waktu}`;
// };
// console.log(tampilNama("joko", "malam"));

// * implisit return (lebih ringkas)
// const tampilNama = (nama) => `hallo ${nama}`;
// console.log(tampilNama("joko"));

// * array
// let mhs = ["joko", "santoso", "ayam b"];
// let jumlahHuruf = mhs.map(function (nama) {
// 	return nama.length;
// });
// console.log(jumlahHuruf);

// * versi arrow
// let jumlahHuruf = mhs.map((nama) => nama.length);
// console.log(jumlahHuruf);

// * jika ingin dalam bentuk object
// let jumlahHuruf = mhs.map((nama) => ({ nama: nama, jmlHuruf: nama.length }));
// console.log(jumlahHuruf);
// console.table(jumlahHuruf); // jika ingin rapi

// ! THIS (konsep this pada arrow function)

// arrow function tidak memiliki konsep THIS
// const Mahasiswa = function () {
// 	this.nama = "joko santoso";
// 	this.umur = 25;
// 	this.sayHello = () => {
// 		console.log(`hallo ${this.nama} umur ${this.umur}`);
// 	};
// };
// const samsul = new Mahasiswa();
// ? output: no eror

// const mhs = {
// 	nama: "joko santoso",
// 	umur: 25,
// 	sayHello: () => {
// 		console.log(`hallo ${this.nama} umur ${this.umur}`);
// 	},
// };
// ? output: akan undefined karena Arroewfunction tidak memiliki konsep THIS

// * contoh kasus
// const Mahasiswa = function () {
// 	this.nama = "joko santoso";
// 	this.umur = 25;
// 	this.sayHello = function () {
// 		console.log(`hallo ${this.nama} umur ${this.umur}`);
// 	};

// 	setInterval(() => {
// 		console.log(this.umur++);
// 	}, 500);
// };
// const samsul = new Mahasiswa();

const box = document.querySelector(".box");
box.addEventListener("click", function () {
	let satu = "size";
	let dua = "caption";

	if (this.classList.contains(satu)) {
		[satu, dua] = [dua, satu];
	}
	this.classList.toggle(satu);
	setTimeout(() => {
		this.classList.toggle(dua);
	}, 600);
});
