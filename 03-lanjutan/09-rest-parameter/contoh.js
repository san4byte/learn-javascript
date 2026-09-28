// function myFunc(...value) {
// 	return value;
// }

// console.log(myFunc(1, 2, 3, 4, 5));

// function jmlAngka(...angka) {
// let total = 0;
// for (const a of angka) {
// 	total += a;
// }
// return total;
// return angka.reduce((a, b) => a + b);
// }

// console.log(jmlAngka(1, 2, 3, 4, 5));

// * array destrucktering

// const kelompok = ["joko", "santoso", "samsul", "adi", "roy"];
// const [ketua, wakil, ...myTeam] = kelompok;
// console.log(wakil);

// * object destrucktering

// const team = {
// 	pm: "joko",
// 	frondEnd: "santoso",
// 	backEnd: "adi",
// 	ux: "samsul",
// };

// const { pm, ...myTeam } = team;
// console.log(myTeam);

// * filtering

function fillter(type, ...values) {
	return values.filter((e) => typeof(e) === type);
}

console.log(fillter("boolean", 1, 2, "string", false, 10, true));
