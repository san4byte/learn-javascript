// Penjelasan lengkap dapat dibaca pada README.md
// Perilaku keyword 'this' pada berbagai konteks

// 1. Function Declaration (this = global/window)
function halo() {
  console.log("this pada function biasa:", this === globalThis);
}
halo();

// 2. Object Literal (this = objek pemilik)
let obj = {
  nama: "joko",
  halo: function () {
    console.log("this pada method objek:", this.nama);
  },
};
obj.halo();

// 3. Constructor Function (this = instance objek baru)
function HaloConstructor(nama) {
  this.nama = nama;
}
let objBaru = new HaloConstructor("budi");
console.log("this pada instance baru:", objBaru.nama);
