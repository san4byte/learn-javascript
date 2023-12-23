// DOM Selection

// todo: document.getElementById() --> element
const judul = document.getElementById("judul");
judul.style.color = "salmon";
judul.style.backgroundColor = "#ccc";
judul.innerHTML = "Joko santoso";

// todo: document.getElementByTagName() --> HTMLColection
const p = document.getElementsByTagName("p");
const h1 = document.getElementsByTagName("h1")[0]; //[index]
// p
for (let i = 0; i < p.length; i++) {
	p[i].style.backgroundColor = "lightblue";
}
// h1
h1.style.fontSize = "50px";

// todo: document.getElementByClassName() --> HTMLColection
const p1 = document.getElementsByClassName("p1")[0]; // [index]
p1.innerHTML = "ini paragraf 1 yang diubah di javascript";

// todo: document.querySelector() --> element
const p4 = document.querySelector("#b p");
const li2 = document.querySelector("#b ul li:nth-child(2)");
// p4
p4.style.backgroundColor = "salmon";
// li(2)
li2.style.color = "green";

// todo: document.queryselectorAll() --> nodelist
const pDua = document.querySelectorAll("p");
for (let j = 0; j < pDua.length; j++) {
	pDua[j].style.backgroundColor = "grey";
}
