// Penjelasan lengkap dapat dibaca pada README.md
// Struktur dasar Object Literal dan Method
let mahasiswa = {
  nama: "joko",
  lulus: true,
  ipSemester: [2.9, 3.1, 1.25, 2.88, 3.04],
  ipKumulatif: function () {
    let total = 0;
    let ips = this.ipSemester;
    for (let i = 0; i < ips.length; i++) {
      total += ips[i];
    }
    return total / ips.length;
  },
};

console.log("IP Kumulatif:", mahasiswa.ipKumulatif());
