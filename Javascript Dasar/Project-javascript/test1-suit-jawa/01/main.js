// looping
let lagi = true;
while (lagi) {
  //  menangkap pilihan player
  let p = prompt("Silahkan Pilih: GAJAH, SEMUT, ORANG");

  // menangkap pilihan komputer
  // membangkitkan bilangan random
  let comp = Math.random();

  if (comp < 0.34) {
    comp = "gajah";
  } else if (comp >= 0.34 && comp <= 0.67) {
    comp = "orang";
  } else {
    comp = "semut";
  }

  // menentukan rules
  let hasil = "";
  if (p == comp) {
    hasil = "SERI!";
  } else if (p == "gajah") {
    hasil = comp == "orang" ? "MENANG!" : "KALAH!";
  } else if (p == "semut") {
    hasil = comp == "gajah" ? "MENANG!" : "KALAH!";
  } else if (p == "orang") {
    hasil = comp == "semut" ? "MENANG!" : "KALAH!";
  } else {
    hasil = "Kamu memasukkan pilihan yang salah";
  }

  // tappilkan hasilnya
  alert(
    "kamu memilih : " +
      p +
      "\ndan komputer memilih : " +
      comp +
      "\nmaka hasilnya kamu : " +
      hasil
  );

  lagi = confirm("lagi?");
}
alert("terima kasih sudah bermain");
