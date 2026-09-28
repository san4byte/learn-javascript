// var penumpang
let penumpang = [];

// function tambah penumpang
function tambahPenumpang(namaPenumpang, penumpang) {
  // jika tidak ada penumpang
  if (penumpang.length == 0) {
    penumpang.push(namaPenumpang);
    return penumpang;
  } else {
    // agar logic benar nama penumpang yang sama harus dipisah dengan undifinrd
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

// function hapus penumpang
function hapusPenumpang(namaPenumpang, penumpang) {
  // cek isi angkot
  // jika kosong
  if (penumpang.length == 0) {
    console.log("maaf penumpang masih kosong");
    return penumpang;
  } else {
    for (let i = 0; i < penumpang.length; i++) {
      if (penumpang[i] == namaPenumpang) {
        penumpang[i] = undefined;
        return penumpang;
      } else if (i == penumpang.length - 1) {
        console.log("maaf " + namaPenumpang + " tidak ada diangkot");
        return penumpang;
      }
    }
  }
}
