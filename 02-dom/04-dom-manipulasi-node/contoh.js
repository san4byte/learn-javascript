// Penjelasan lengkap dapat dibaca pada README.md
// Membuat, menyisipkan, mengganti, dan menghapus node DOM

// 1. createElement & appendChild
const pBaru = document.createElement("p");
const textpBaru = document.createTextNode("Paragraf Baru");
pBaru.appendChild(textpBaru);

const sectionA = document.getElementById("a");
sectionA.appendChild(pBaru);

// 2. insertBefore
const liBaru = document.createElement("li");
const textLiBaru = document.createTextNode("Item Baru");
liBaru.appendChild(textLiBaru);

const ul = document.querySelector("#b ul");
const li2 = document.querySelector("#b ul li:nth-child(2)");
ul.insertBefore(liBaru, li2);

// 3. removeChild
const link = document.getElementsByTagName("a")[0];
sectionA.removeChild(link);

// 4. replaceChild
const sectionB = document.getElementById("b");
const p4 = sectionB.querySelector("p");
const h2Baru = document.createElement("h2");
const textH2Baru = document.createTextNode("Judul Baru!");
h2Baru.appendChild(textH2Baru);
sectionB.replaceChild(h2Baru, p4);
