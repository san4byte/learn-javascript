// function Biotada(nama, nilai) {
// 	this.nama = nama;
// 	this.nilai = nilai;
// }
// Biotada.prototype.tambah = function (naik) {
// 	this.nilai += naik;
// 	return `hallo ${this.nama}, selamat kamu naik`;
// };
// Biotada.prototype.kurang = function (turun) {
// 	this.nilai -= turun;
// 	return `hallo ${this.nama}, maaf kamu turun`;
// };

// let samsul = new Biotada(`joko santoso`, 75);

// pengelolaan angkot
// object: sopir, trayek, penumpang, kas
// membuat method penumpang naik dan turun
// * jika penumpang turun
// jika penumpang 0 maka di push
// tidak boleh ada nama penumpang yang sama
// jika ada kursi kosong maka harus di isi dulu
// jika full maka lanjut ke kursi ujung
// * jika penumpang turun
// jika kursi masih kosong maka alert()
// jika ada nama sama maka penumpang turun(undifine)

// ?
function Angkot(sopir, trayek, penumpang, kas) {
	this.sopir = sopir;
	this.trayek = trayek;
	this.penumpang = penumpang;
	this.kas = kas;
}
Angkot.prototype.Pnaik = function (namaP) {
	if (this.penumpang.length === 0) {
		this.penumpang.push(namaP);
		return this.penumpang;
	} else {
		if (this.penumpang.includes(namaP)) {
			alert(`${namaP} sudah ada didalam angkot`);
			return false;
		}
		for (let i = 0; i < this.penumpang.length; i++) {
			if (this.penumpang[i] === undefined) {
				this.penumpang[i] = namaP;
				return this.penumpang;
			} else if (i === this.penumpang.length - 1) {
				this.penumpang.push(namaP);
				return this.penumpang;
			}
		}
	}
};
Angkot.prototype.Pturun = function (namaP, bayar) {
	if (this.penumpang.length === 0) {
		alert(`Angkot masih kosong`);
		return false;
	} else {
		for (let i = 0; i < this.penumpang.length; i++) {
			if (this.penumpang[i] === namaP) {
				this.penumpang[i] = undefined;
				this.kas += bayar;
				return this.penumpang;
			}
		}
		if (this.penumpang !== namaP) {
			alert(`maaf penumpang tidak ada didalam angkot`);
			return false;
		}
	}
};

let angkot = new Angkot(`joko santoso`, [`dayun`, `siak`], [], 0);
