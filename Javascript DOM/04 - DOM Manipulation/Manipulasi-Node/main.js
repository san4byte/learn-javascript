// DOM manipulation
// ! manipulasi node

// * test-1
// Membuat elemen baru
const pBaru = document.createElement("p"); // ! createElement
const textpBaru = document.createTextNode("Paragraf Baru"); // ! createTextnode
// simpan tulisan kedalam paragraf
pBaru.appendChild(textpBaru); // ! appendChild (menggabungakan)
// simpan p baru diakhir section A
const sectionA = document.getElementById("a");
sectionA.appendChild(pBaru);

// * test-2
const liBaru = document.createElement("li");
const textLiBaru = document.createTextNode("Item Baru");

liBaru.appendChild(textLiBaru);

const ul = document.querySelector("#b ul");
const li2 = document.querySelector("#b ul li:nth-child(2)");

ul.insertBefore(liBaru, li2); // ! insertBefore (menyelipkan sebelums)

// * test-3
//  menghapus
const link = document.getElementsByTagName("a")[0];
sectionA.removeChild(link); //! removeChild

// * test-4
// mengganti
const sectionB = document.getElementById("b");
const p4 = sectionB.querySelector("p");

// membuat tag baru ~ text didalamnnya
const h2Baru = document.createElement("h2");
const textH2Baru = document.createTextNode("Judul Baru");

// menggabunagkan tag dengan text
h2Baru.appendChild(textH2Baru);

// ! replaceChild
sectionB.replaceChild(h2Baru, p4);

// * melihat apa yang baru
pBaru.style.backgroundColor = "rgb(250, 128, 114)";
liBaru.style.backgroundColor = "rgb(250, 128, 114)";
h2Baru.style.backgroundColor = "rgb(250, 128, 114)";
