// looping start
let ulang = true;

while (ulang) {
	let kesempatan = 3; //Menetapkan kesempatan
	let comp = Math.floor(Math.random() * 10) + 1; //Menetapkan pilihan computer index 1 - 10
	let hasil = ""; //variabel hasil

	// pemberitahuan awal permainan
	alert(
		'"Jika Ingin Melanjutkan Anda Harus Menebak Angka Yang Sama Dengan Saya" \nAnda Memiliki ' +
			kesempatan +
			" Kesempatan"
	);

	// looping kesempatan 3 dan 2
	while (kesempatan > 1) {
		let p = prompt("Silahkan Tebak Angka Antara 1 ~ 10"); // menetapkan pilihan user

		// rullers permainan + hasilnya
		// if
		if (p == comp) {
			hasil = "BENAR";
			alert("Anda " + hasil + "\nAngka Yang Anda Tebak Adalah : " + p);
			break;
		} else if (p < comp) {
			hasil = "RENDAH";
			kesempatan -= 1;
			alert(
				"Terlalu " +
					hasil +
					"\nAngka Yang Anda Tebak Adalah : " +
					p +
					"\nTersisa " +
					kesempatan +
					" kesempatan Lagi!!"
			);
		} else if (p > comp) {
			hasil = "TINGGI";
			kesempatan -= 1;
			alert(
				"Terlalu " +
					hasil +
					"\nAngka Yang Anda tebak Adalah : " +
					p +
					"\nTersisa " +
					kesempatan +
					" Kesempatan Lagi!!!"
			);
		} else {
			alert("Tolong Masukkan Angka Yang Benar!!!");
		}
		// end
		// rullers kesempatan 1
		// di rullers ini tidak ada pengurangan variabel kesempatan
		if (kesempatan == 1) {
			let p = prompt("Silahkan Tebak Angka Antara 1 ~ 10");

			if (p == comp) {
				hasil = "BENAR";
				alert("Anda " + hasil + "\nAngka Yang Anda Tebak Adalah : " + p);
				break;
			} else if (p < comp) {
				hasil = "RENDAH";
				alert(
					"Terlalu " + hasil + "\nAngka Yang Anda Tebak Adalah : " + p + "\nKesempatan Habis"
				);
			} else if (p > comp) {
				hasil = "TINGGI";
				alert(
					"Terlalu " + hasil + "\nAngka Yang Anda tebak Adalah : " + p + "\nKesempatan habis"
				);
			} else {
				alert("Maaf Kesempatan Anda Habis");
			}
		}
	}
	alert("Angka Yang Dicari Adalah : " + comp); // pemberitauhuan angka computer

	ulang = confirm("Apakah Anda Ingin Bermain Lagi???"); // looping end
}
alert("Terima Kasih Atas Waktunya!!!"); // end of game
