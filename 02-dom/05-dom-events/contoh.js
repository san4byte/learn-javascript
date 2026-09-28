// Penjelasan lengkap dapat dibaca pada README.md
// Penanganan event pada elemen DOM

const p3 = document.querySelector(".p3");
function ubahWarnap3() {
  p3.style.backgroundColor = "salmon";
}
p3.onclick = ubahWarnap3;

const p2 = document.querySelector(".p2");
function ubahWarnap2() {
  p2.style.backgroundColor = "lightblue";
}
p2.onclick = ubahWarnap2;

const p4 = document.querySelector("#b p");
p4.addEventListener("click", function () {
  const ul = document.querySelector("#b ul");
  const liBaru = document.createElement("li");
  const textLibaru = document.createTextNode("Item Baru");
  liBaru.appendChild(textLibaru);
  ul.appendChild(liBaru);
});
