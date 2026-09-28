// contoh high order function
// function repeat(n, action) {
// 	for (let i = 0; i < n; i++) {
// 		action(i);
// 	}
// }
// repeat(10, console.log);

//
// let total = 0,
// 	count = 1;

// while (count <= 10) {
// 	total += count;
// 	count++;
// }

// console.log(total);

const angka = [-1, 8, 9, 1, 4, -5, -4, 3, 2, 9];

// * filter
// mencari angka yang >= 3

// ? for
// const newAngka = [];
// for (let i = 0; i < angka.length; i++) {
// 	if (angka[i] >= 3) {
// 		newAngka.push(angka[i]);
// 	}
// }

// ? filter
// const newAngka = angka.filter((e) => e >= 3); // arrow function
// console.log(newAngka);

// ? map
// semua nagka di array angka dikali 2
// const newAngka = angka.map((e) => e * 2);
// console.log(angka);
// console.log(newAngka);

// ? reduce
// menjumlahkan seluruh isi array angka
// const newAngka = angka.reduce((acumulator, curentvalue) => acumulator + curentvalue, 0);
// console.log(newAngka);

// ? method chaining
// gabungan fillter, map, reduce
const hasil = angka
	.filter((e) => e >= 5)
	.map((e) => e * 3)
	.map((e) => e / 2)
	.reduce((acc, cuu) => acc + cuu);
console.log(hasil);
