// * konsep this

// todo: cara 1 - funtion deklaration
function halo() {
	console.log(this);
	console.log("hallo");
}
halo();
//! this mengembalikan object global

// todo: cara 2 - object literal
let obj = { a: 10, nama: "joko" };
// method halo
obj.halo = function () {
	console.log(this);
	console.log("hallo");
};
obj.halo();
// ! this mengembalikan object yang bersangkutan

// todo: cara 3 - constructor
function Halo2() {
	console.log(this);
	console.log("hallo");
}
let obj2 = new Halo2();
let obj3 = new Halo2();
// ! this mengembalikan object yang baru dibuat
