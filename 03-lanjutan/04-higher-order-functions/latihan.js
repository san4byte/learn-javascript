// * algoritma
// ambil semua element vidio
// hanya pilih javascript lanjutan
// ambil durasi vidio
// ubah durasi menjadi int, ubah menit - detik
// jml semuanya detiknya
// ubah format menjadi jam menit detik
// simpan di dom

const allVidio = Array.from(document.querySelectorAll("ul li"));

let jsLanjut = allVidio
	.filter((e) => e.textContent.includes("JAVASCRIPT LANJUTAN"))
	.map((item) => item.dataset.duration)
	.map((waktu) => {
		const parts = waktu.split(":").map((part) => parseFloat(part));
		return parts[0] * 60 + parts[1];
	})
	.reduce((total, detik) => total + detik);

const jam = Math.floor(jsLanjut / 3600);
jsLanjut = jsLanjut - jam * 3600;
const menit = Math.floor(jsLanjut / 60);
const detik = jsLanjut - menit * 60;

const durasi = document.querySelector(".total-durasi");
durasi.textContent = `${jam} jam ${menit} menit ${detik} detik`;

const jmlVidio = allVidio.filter((e) => e.textContent.includes("JAVASCRIPT LANJUTAN")).length;
const vidio = document.querySelector(".jumlah-video");
vidio.textContent = `${jmlVidio} vidio`;
