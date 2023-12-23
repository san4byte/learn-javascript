// console.log(i);
// var i = 10;
// output : undefined
// hoisting

// *
// for (let i = 0; i < 10; i++) {
// 	console.log(i);
// }
// console.log(i);
// ? output : 0 - 10
// function test() {
// 	for (let i = 0; i < 10; i++) {
// 		console.log(i);
// 	}
// }
// test();
// console.log(i);
// ? output : 0 - 9 [angka 10 eror karena javascript menganut function scope

// * const
// const i = 10;
// i = 15
// ? output : eror
const mhs = {
	nama: "joko santoso",
	umur: 20,
};

mhs.umur = 30;
console.log(mhs);
// ? no eror
// * atau
const i = [1, 2, 3];
i.push(4);
// ? mo eror
