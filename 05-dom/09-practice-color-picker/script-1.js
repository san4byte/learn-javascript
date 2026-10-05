// todo: Latihan-1
// merubah warna
const ubahWarna = document.getElementById("tombol-ubah-warna");
ubahWarna.addEventListener("click", function () {
	document.body.classList.toggle("warna");
	// document.body.style.backgroundColor = "salmon";
});

// todo: Latihan-2
// membuat button baru(ubah warna random)
const randomWarna = document.createElement("button");
const textButton = document.createTextNode("Acak Warna");
randomWarna.appendChild(textButton);

randomWarna.setAttribute("type", "button"); // nambah value tag

ubahWarna.after(randomWarna); // memunculkan tag baru

randomWarna.style.marginTop = "10px";

randomWarna.addEventListener("click", function () {
	const r = Math.round(Math.random() * 255 + 1);
	const g = Math.round(Math.random() * 255 + 1);
	const b = Math.round(Math.random() * 255 + 1);
	document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
});

// todo: Latihan-3
// membuat range warna
const sliderMerah = document.querySelector("input[name=slider-merah]");
const sliderHijau = document.querySelector("input[name=slider-hijau]");
const sliderBiru = document.querySelector("input[name=slider-biru]");

sliderMerah.addEventListener("input", function () {
	const r = sliderMerah.value;
	const g = sliderHijau.value;
	const b = sliderBiru.value;
	document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
});
sliderHijau.addEventListener("input", function () {
	const r = sliderMerah.value;
	const g = sliderHijau.value;
	const b = sliderBiru.value;
	document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
});
sliderBiru.addEventListener("input", function () {
	const r = sliderMerah.value;
	const g = sliderHijau.value;
	const b = sliderBiru.value;
	document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
});

// todo: latihan-4
// Merubah warna dengan menggerakkan cursor
document.body.addEventListener("mousemove", function (event) {
	const xPos = Math.round((event.clientX / window.innerWidth) * 255);
	const yPos = Math.round((event.clientY / window.innerHeight) * 255);
	document.body.style.backgroundColor = "rgb(" + xPos + "," + yPos + ",100)";
});
