let ulang = true;

while (ulang) {
	let p = prompt("silahkan pilih antara : \n- gajah\n- semut\n- orang");

	let comp = Math.random();
	if (comp < 0.34) {
		comp = "gajah";
	} else if (comp >= 0.34 && comp <= 0.67) {
		comp = "semut";
	} else {
		comp = "orang";
	}

	function rullers() {
		if (p == comp) {
			hasil = "SERI";
		} else if (p == "gajah") {
			hasil = comp == "semut" ? "KALAH" : "MENANG";
		} else if (p == "semut") {
			hasil = comp == "gajah" ? "MENANG" : "KALAH";
		} else if (p == "orang") {
			hasil = comp == "gajah" ? "KALAH" : "MENANG";
		} else {
			hasil = "memasukkan pilihan yang salah";
		}
		return alert(
			"kamu memilih : " +
				p +
				"\ncomputer memilih : " +
				comp +
				"\nmaka hasilnya kamu : " +
				hasil
		);
	}

	rullers();

	ulang = confirm("lagi???");
}

alert("terima kasih sudah bermain");
