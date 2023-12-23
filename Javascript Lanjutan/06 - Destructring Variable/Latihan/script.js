// function coba(a, b) {
// 	return [a + b, a * b];
// }

// const [jumlah, kali] = coba(2, 3);

// * object
// gunakan objct jika tidak mau berurutan
// function calc(a, b) {
// 	return {
// 		jumlah: a + b,
// 		kali: a * b,
// 		kurang: a - b,
// 	};
// }

// const { kali, kurang, jumlah } = calc(2, 3);

// * Destruction function argument
const mhs = {
	nama: "joko santoso",
	umur: 20,
	nilai: {
		tugas: 60,
		uts: 70,
		uas: 80,
	},
};

function cetakMhs({ nama, umur, nilai: { tugas, uts, uas } }) {
	return `Hallo nama saya ${nama} saya ${umur} tahun, dan nilai uas saya adalah ${uas}`;
}

console.log(cetakMhs(mhs));
