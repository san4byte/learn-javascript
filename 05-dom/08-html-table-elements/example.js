// PZN DOM: Menggunakan insertRow() dan insertCell() pada HTMLTableElement
const btnTambah = document.getElementById("btn-tambah");
const tableBody = document.getElementById("tabel-body");

let nomor = 2;
const daftarNama = ["Siti Rahma", "Ahmad Fauzi", "Dewi Lestari", "Rian Hidayat"];

btnTambah.addEventListener("click", () => {
  if (daftarNama.length === 0) {
    alert("Semua data siswa contoh telah ditambahkan!");
    return;
  }

  // insertRow(-1) menambahkan baris baru di posisi paling bawah
  const newRow = tableBody.insertRow(-1);

  // insertCell(0), insertCell(1), insertCell(2)
  const cellNo = newRow.insertCell(0);
  const cellNama = newRow.insertCell(1);
  const cellNilai = newRow.insertCell(2);

  const nama = daftarNama.shift();
  const nilaiAcak = Math.floor(Math.random() * 20) + 80;

  cellNo.textContent = nomor++;
  cellNama.textContent = nama;
  cellNilai.textContent = nilaiAcak;
});
