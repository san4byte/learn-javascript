// Penjelasan lengkap dapat dibaca pada README.md
// Manipulasi atribut dan isi elemen HTML

const judul = document.getElementById("judul");
judul.innerHTML = "Joko Santoso";
judul.style.color = "salmon";

const sectionA = document.querySelector("#a");
const a = document.querySelector("section#a a");
judul.setAttribute("name", "joko");

const p2 = document.querySelector(".p2");
p2.classList.add("label");
