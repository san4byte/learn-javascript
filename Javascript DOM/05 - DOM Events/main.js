// todo: mengggunakan inline HTML (onclick="nama function")
const p3 = document.querySelector(".p3");

function ubahWarnap3() {
	p3.style.backgroundColor = "salmon";
}

// todo: menggunakan method (onclick)
const p2 = document.querySelector(".p2");

function ubahWarnap2() {
	p2.style.backgroundColor = "lightblue";
}
p2.onclick = ubahWarnap2;

// todo: pakai addEventListener()
// * membuat jika p4 diclick maka aka menambah paragraf baru
const p4 = document.querySelector("#b p");

p4.addEventListener("click", function () {
	const ul = document.querySelector("#b ul"); // tangkap parent yang ingin ditambah

	const liBaru = document.createElement("li"); // buat tag baru
	const textLibaru = document.createTextNode("Item Baru"); // buat text baru
	liBaru.appendChild(textLibaru); // gabungkan tag dan text

	ul.appendChild(liBaru); //tambah jika di click
});
