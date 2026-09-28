// callbacks
// synchronus callbacks

function pesan(callback) {
	const nama = prompt(`Masukkan nama:`);
	callback(nama);
}
pesan((nama) => alert(`Hallo ${nama}`));
