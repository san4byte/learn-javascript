// Penjelasan lengkap dapat dibaca pada README.md
// Tiga cara membuat objek di JavaScript

// 1. Object Literal
let mhs1 = {
  nama: "joko santoso",
  prodi: "pai",
  sem: "lima",
  nirm: "1214.21.19184",
};
console.log("Object Literal:", mhs1);

// 2. Function Declaration
function buatObjectMhs(nama, prodi, sem, nirm) {
  let mhs = {};
  mhs.nama = nama;
  mhs.prodi = prodi;
  mhs.sem = sem;
  mhs.nirm = nirm;
  return mhs;
}
let mhs2 = buatObjectMhs("joko santoso", "pai", "lima", "1214.21.19184");
console.log("Function Declaration:", mhs2);

// 3. Constructor Function
function Mahasiswa(nama, prodi, sem, nirm) {
  this.nama = nama;
  this.prodi = prodi;
  this.sem = sem;
  this.nirm = nirm;
}
let mhs3 = new Mahasiswa("samsul", "informatika", "tiga", "1214.21.19185");
console.log("Constructor Function:", mhs3);
