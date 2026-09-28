// Penjelasan lengkap dapat dibaca pada README.md
// Seleksi elemen DOM menggunakan berbagai method

const judul = document.getElementById("judul");
judul.style.color = "salmon";
judul.style.backgroundColor = "#ccc";
judul.innerHTML = "Joko santoso";

const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++) {
  p[i].style.backgroundColor = "lightblue";
}

const h1 = document.getElementsByTagName("h1")[0];
h1.style.fontSize = "50px";

const p1 = document.getElementsByClassName("p1")[0];
p1.innerHTML = "ini paragraf 1 yang diubah di javascript";

const p4 = document.querySelector("#b p");
p4.style.backgroundColor = "salmon";

const li2 = document.querySelector("#b ul li:nth-child(2)");
li2.style.color = "green";

const pDua = document.querySelectorAll("p");
for (let j = 0; j < pDua.length; j++) {
  pDua[j].style.backgroundColor = "grey";
}
