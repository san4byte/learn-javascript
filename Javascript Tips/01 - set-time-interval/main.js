// setTimeout()
// setInterval()

// * setTimeout()
// const tes = setTimeout(() => {
// 	console.log("ok");
// }, 3000);

// const tombol = document.getElementById("tombol");
// tombol.addEventListener("click", () => {
// 	clearTimeout(tes);
// 	console.log("selesai");
// });

// * setinterval()
// let tes2 = setInterval(() => {
// 	console.log("ok");
// }, 500);

// const tombol2 = document.getElementById("tombol2");
// tombol2.addEventListener("click", () => {
// 	clearInterval(tes2);
// 	console.log("selesai");
// });

// progam hitung mundur
const tglTujuan = new Date("Oct 3, 2023 21:30:20").getTime();

const hitungMundur = setInterval(() => {
	const skr = new Date().getTime();
	const selisih = tglTujuan - skr;

	const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
	const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
	const detik = Math.floor((selisih % (1000 * 60)) / 1000);

	console.log(detik);

	const text = document.getElementById("text");
	text.innerHTML =
		"waktu anda tinggal : " +
		hari +
		" hari " +
		jam +
		" jam " +
		menit +
		" menit " +
		detik +
		" detik lagi!!";

	if (selisih <= 1) {
		clearInterval(hitungMundur);
		text.innerHTML = "Waktu Anda Habis";
	}
}, 1000);
