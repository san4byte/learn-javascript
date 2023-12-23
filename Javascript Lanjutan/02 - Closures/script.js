// * EXECITION CONTEXT, HOISTING & SCOPE

// * Closure

// lexical scope
// function init() {
// 	let nama = `joko santoso`; // local scope
// 	function tampilNama() {
// 		console.log(nama); //closure
// 	}
// 	return tampilNama;
// }
// let panggil = init();
// panggil();

//
// function ucapSalam(waktu) {
// 	return function (nama) {
// 		console.log(`halo ${nama}, selamat ${waktu}, semoga harimu menyenangakn`);
// 	};
// }

// let selamatPagi = ucapSalam("pagi");
// let selamatSiang = ucapSalam("siang");

// selamatPagi("joko");
// selamatSiang("mamak");

//
// let add = (function () {
// 	let counter = 0;
// 	return function () {
// 		return ++counter;
// 	};
// })();

// counter = 1000; // tidak akan menganggu

// console.log(add());
// console.log(add());
// console.log(add());
