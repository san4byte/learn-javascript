// const card = document.querySelector(".card");
// const out = document.querySelector(".close");

// out.addEventListener("click", () => {
// 	card.classList.toggle("active");
// });

// ? DOM-traversal
const out = document.querySelectorAll(".close");
const card = document.querySelectorAll(".card");

// * menggunakan forEach
// out.forEach((el) => {
// 	el.addEventListener("click", (e) => {
// e.target.parentElement.style.visibility = "hidden";
// 		e.target.parentElement.classList.toggle("active");
// 		e.preventDefault(); // * untuk mencegah aksi default
// 		e.stopPropagation(); // * untuk mencegah jika parentnya memiliki event (bubbling) maka even ini yang didahulukan
// 	});
// });

// * event bubbling
// card.forEach((cards) => {
// 	cards.addEventListener("click", () => {
// 		alert("ok");
// 	});
// });

// * cara lebih bagus
const container = document.querySelector(".container");
container.addEventListener("click", (e) => {
	if (e.target.className == "close") {
		e.target.parentElement.classList.toggle("active");
		e.preventDefault();
	}
	if (e.target.className == "card") {
		alert("ok");
	}
});

// * menggunakan looping
// for (let i = 0; i < out.length; i++) {
// 	out[i].addEventListener("click", () => {
// 		out[i].parentElement.style.visibility = "hidden";
// 		console.log(out[i].parentElement);
// 	});
// }
