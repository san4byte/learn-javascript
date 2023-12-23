// * normal
// let mahasiswa = {
// 	nama: "Joko",
// 	energi: 10,
// 	makan: function (porsi) {
// 		this.energi = this.energi + porsi;
// 		console.log(`hallo ${this.nama}, selamat makan!`);
// 	},
// };

// *2. function declaration

// function Mahasiswa(nama, energi) {
// 	let mahasiswa = {};
// 	mahasiswa.nama = nama;
// 	mahasiswa.energi = energi;
// 	mahasiswa.makan = function (porsi) {
// 		this.energi += porsi;
// 		console.log(`hallo ${this.nama}, selamat makan`);
// 	};

// 	mahasiswa.main = function (jam) {
// 		this.energi -= jam;
// 		console.log(`hallo ${this.nama}, selamat bermain`);
// 	};

// 	return mahasiswa;
// }

// let joko = Mahasiswa(`joko santoso`, 20);
// let samsul = Mahasiswa(`samsul`, 30);

// *3. constructor function

// function Mahasiswa(nama, energi) {
// 	this.nama = nama;
// 	this.energi = energi;
// 	this.makan = function (porsi) {
// 		this.energi += porsi;
// 		console.log(`hallo ${this.nama}, selamat makan`);
// 	};

// 	this.main = function (jam) {
// 		this.energi -= jam;
// 		console.log(`hallo ${this.nama}, selamat bermain`);
// 	};
// }

// let samsul = new Mahasiswa(`joko`, 30);

// * menggunakan objectCreate()
// const methodMahasiswa = {
// 	makan: function (porsi) {
// 		this.energi += porsi;
// 		console.log(`hallo ${this.nama}, selamt makan`);
// 	},
// };

// function Mahasiswa(nama, energi) {
// 	let mahasiswa = Object.create(methodMahasiswa);
// 	mahasiswa.nama = nama;
// 	mahasiswa.energi = energi;

// 	return mahasiswa;
// }

// * menggunakan prototype

// function Mahasiswa(nama, energi) {
// 	this.nama = nama;
// 	this.energi = energi;
// }
// Mahasiswa.prototype.makan = function (porsi) {
// 	this.energi += porsi;
// 	return `hallo ${this.nama}, selamat makan`;
// };

// Mahasiswa.prototype.main = function (jam) {
// 	this.energi -= jam;
// 	return `hallo ${this.nama}, selamat main`;
// };

// * versi class
// namun dibelakang layar yang dijalankan tetap menggunakan prototype

class Mahasiswa {
	constructor(nama, energi) {
		this.nama = nama;
		this.energi = energi;
	}
	makan(porsi) {
		this.energi += porsi;
		return `hallo ${this.nama}, selamat makan`;
	}

	main(jam) {
		this.energi -= jam;
		return `hallo ${this.nama}, selamat main`;
	}
}

let samsul = new Mahasiswa(`joko`, 20);
