// * Membuat object

// todo: object literal
let mhs = {
	nama: "joko santoso",
	prodi: "pai",
	sem: "lima",
	nirm: "1214.21.19184",
};

console.log(mhs);

// todo: function deklaration
function tesObject(nama, prodi, sem, nirm) {
	let mhs2 = {};
	mhs2.nama = nama;
	mhs2.prodi = prodi;
	mhs2.sem = sem;
	mhs2.nirm = nirm;

	return mhs2;
}
console.log(tesObject("joko santoso", "pai", "lima", "1214.21.19184"));
// ! lebih ringkas jika ada tambahan data lagi

// todo: constructor
function Mhs(nama, prodi, sem, nirm) {
	this.nama = nama;
	this.prodi = prodi;
	this.sem = sem;
	this.nirm = nirm;
}

console.log(new Mhs("joko", "pai", "lima", "1214.21.19184"));
// ! wajib pakai new
