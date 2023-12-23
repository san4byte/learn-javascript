const input = document.querySelectorAll("input[type=range]");

input.forEach(function (pilihan) {
	pilihan.addEventListener("input", () => {
		const sliderMerah = document.querySelector("input[class=slider-red]");
		const sliderHijau = document.querySelector("input[class=slider-green]");
		const sliderBiru = document.querySelector("input[class=slider-blue]");

		const r = sliderMerah.value;
		const g = sliderHijau.value;
		const b = sliderBiru.value;

		const red = document.getElementById("red");
		const green = document.getElementById("green");
		const blue = document.getElementById("blue");
		if (pilihan.className == "slider-red") {
			red.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
			console.log(red.style.backgroundColor);
		}
		if (pilihan.className == "slider-green") {
			green.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
		}
		if (pilihan.className == "slider-blue") {
			blue.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
		}

		document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	});
});

// 02
// const input = document.querySelectorAll("input[type=range]");

// input.forEach(function (pilihan) {
// 	pilihan.addEventListener("input", () => {
// 		const sliderMerah = document.querySelector("input[class=slider-red]");
// 		const sliderHijau = document.querySelector("input[class=slider-green]");
// 		const sliderBiru = document.querySelector("input[class=slider-blue]");

// 		const r = sliderMerah.value;
// 		const g = sliderHijau.value;
// 		const b = sliderBiru.value;

// 		const red = document.getElementById("red");
// 		const green = document.getElementById("green");
// 		const blue = document.getElementById("blue");

// 		switch (pilihan) {
// 			case sliderMerah:
// 				red.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
// 				break;
// 			case sliderHijau:
// 				green.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
// 				break;
// 			default:
// 				blue.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
// 				break;
// 		}
// 		document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
// 	});
// });
