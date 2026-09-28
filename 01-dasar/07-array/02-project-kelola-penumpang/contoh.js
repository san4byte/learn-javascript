// Penjelasan lengkap dapat dibaca pada README.md
// Project Pengelolaan Kursi Penumpang Angkot
let penumpang = [];

function tambahPenumpang(namaPenumpang, penumpang) {
  if (penumpang.length == 0) {
    penumpang.push(namaPenumpang);
    return penumpang;
  } else {
    if (penumpang.includes(namaPenumpang)) {
      console.log(namaPenumpang + " sudah ada di angkot");
      return penumpang;
    }
    for (let i = 0; i < penumpang.length; i++) {
      if (penumpang[i] == undefined) {
        penumpang[i] = namaPenumpang;
        return penumpang;
      } else if (i == penumpang.length - 1) {
        penumpang.push(namaPenumpang);
        return penumpang;
      }
    }
  }
}

function hapusPenumpang(namaPenumpang, penumpang) {
  if (penumpang.length == 0) {
    console.log("Angkot masih kosong.");
    return penumpang;
  } else {
    for (let i = 0; i < penumpang.length; i++) {
      if (penumpang[i] == namaPenumpang) {
        penumpang[i] = undefined;
        return penumpang;
      } else if (i == penumpang.length - 1) {
        console.log(namaPenumpang + " tidak ada di dalam angkot.");
        return penumpang;
      }
    }
  }
}

tambahPenumpang("Joko", penumpang);
tambahPenumpang("Samsul", penumpang);
console.log("Daftar penumpang:", penumpang);
hapusPenumpang("Joko", penumpang);
console.log("Setelah Joko turun:", penumpang);
