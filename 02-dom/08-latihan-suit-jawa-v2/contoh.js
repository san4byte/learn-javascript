// function pilihan computer
function getPilihanComp() {
	const comp = Math.random();

	if (comp < 0.34) return "gajah";
	if (comp >= 0.34 && comp <= 0.67) return "orang";
	return "semut";
}

// function hasil
function getHasil(comp, player) {
	if (player == comp) return "SERI!";
	if (player == "gajah") return comp == "orang" ? "MENANG!" : "KALAH!";
	if (player == "semut") return comp == "gajah" ? "MENANG!" : "KALAH!";
	if (player == "orang") return comp == "semut" ? "MENANG!" : "KALAH!";
}

// function animasi putar
function putar() {
	const imgComputer = document.querySelector(".img-komputer");
	const gambar = ["gajah", "semut", "orang"];
	const waktuMulai = new Date().getTime();
	let i = 0;
	setInterval(function () {
		if (new Date().getTime() - waktuMulai > 1000) {
			clearInterval;
			return;
		}

		imgComputer.setAttribute(`src`, `./img/${gambar[i++]}.png`);
		if (i == gambar.length) i = 0;
	}, 100);
}

// pilihan player
// * lebih ringkas
const pilihan = document.querySelectorAll("li img");
pilihan.forEach(function (pil) {
	pil.addEventListener("click", function () {
		const pilihanComp = getPilihanComp();
		const pilihanPlayer = pil.className;
		const hasil = getHasil(pilihanComp, pilihanPlayer);

		putar();

		setTimeout(function () {
			// img pilihan comp
			const imgComputer = document.querySelector(".img-komputer");
			imgComputer.setAttribute(`src`, `./img/${pilihanComp}.png`);

			// hasil
			const info = document.querySelector(".info");
			info.innerHTML = hasil;
		}, 1000);
	});
});
