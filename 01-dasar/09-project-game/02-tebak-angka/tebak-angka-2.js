let ulang = true;

while (ulang) {
	let kesempatan = 3;
	let comp = Math.floor(Math.random() * 10) + 1;
	let hasil = "";

	// pemberitahuan awal game
	alert(
		"Selamat datang!!! \nSebelum mulai anda hasus menebak angka di pikiran saya \nAnda memiliki " +
			kesempatan +
			" kesempatan"
	);

	// looping kesempatan 2 & 3
	while (kesempatan > 1) {
		let p = prompt("Anda dapat memilih angka 1 ~ 10" + comp);

		if (p == comp) {
			hasil = "BENAR";
			alert("Anda " + hasil + " Angka yang anda tebak adalah " + p);
			break;
		} else if (p < comp) {
			hasil = "RENDAH";
			kesempatan -= 1;
			alert("Terlalu " + hasil + "\nTersisa " + kesempatan + " lagi...");
		} else if (p > comp) {
			hasil = "Tinggi";
			kesempatan -= 1;
			alert("Terlalu " + hasil + "\nTersisa " + kesempatan + " lagi...");
		} else if (p > 10) {
			kesempatan -= 1;
			alert("Harap tidak memasukkan angka lebih dari sepuluh!!");
		} else if (p == "") {
			kesempatan += 1;
			alert("opppss harus di isi...");
		} else {
			kesempatan -= 1;
			alert("Tolong masukkan angka yang benar!! \nTersisa " + kesempatan + " lagi...");
		}
		if (kesempatan === 1) {
			let p = prompt("Anda dapat memilih angka 1 ~ 10");

			if (p == comp) {
				hasil = "BENAR";
				alert("Anda " + hasil + " Angka yang anda tebak adalah " + p);
				break;
			} else if (p < comp) {
				hasil = "RENDAH";
				alert("Terlalu " + hasil + "\nMaaf kesempatan habis");
			} else if (p > comp) {
				hasil = "Tinggi";
				alert("Terlalu " + hasil + "\nMaaf kesempatan habis");
			} else if (p > 10) {
				alert("Maaf kesempatan habis...");
			} else if (p === "") {
				alert("Maaf kesempatan habis");
			} else {
				alert("Oopps kesempatan kamu habis...");
			}
		}
	}
	alert("Angka yang saya pikirkan adalah " + comp);

	ulang = confirm("Apakah anda ingin bermain lagi???");
}
alert("Terima kasih atas waktunya");
