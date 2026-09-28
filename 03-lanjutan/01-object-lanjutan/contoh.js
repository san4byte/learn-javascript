// Penjelasan lengkap dapat dibaca pada README.md
// Pembuatan objek tingkat lanjut: Prototype dan ES6 Class

class Mahasiswa {
  constructor(nama, energi) {
    this.nama = nama;
    this.energi = energi;
  }

  makan(porsi) {
    this.energi += porsi;
    return `hallo ${this.nama}, selamat makan`;
  }

  main(jam) {
    this.energi -= jam;
    return `hallo ${this.nama}, selamat main`;
  }
}

let samsul = new Mahasiswa("joko", 20);
console.log(samsul.makan(5));
console.log(samsul.main(2));
