// Tagged tamplate
// const nama = "Joko Santoso";
// const umur = 20;

// * ...
// function coba(string, ...value) {
	// let result = "";
	// string.forEach((str, i) => {
	// result += `${str}${value[i] || ""}`;
	// });
	// return result;

// * reduce
// 	return string.reduce((result, str, i) => `${result}${str}${value[i] || ""}`, "");
// }

// const test = coba`Hallo nama saya ${nama}, saya ${umur} tahun `;
// console.log(test);

// ? membuat higlight
const nama = "Joko Santoso";
const umur = 20;
const email = "joko@gamil.com";

function highlight(string, ...value) {
	return string.reduce(
		(result, str, i) => `${result}${str}<span class="hl">${value[i] || ""}</span>`,
		""
	);
}

const test = highlight`Hallo nama saya ${nama}, saya ${umur} tahun, dan email saya: ${email} `;
console.log(test);
document.body.innerHTML = test;
