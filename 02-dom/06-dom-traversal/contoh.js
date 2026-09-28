// Penjelasan lengkap dapat dibaca pada README.md
// Penelusuran node (DOM Traversal) dan Event Delegation

const container = document.querySelector(".container");
container.addEventListener("click", (e) => {
  if (e.target.className == "close") {
    e.target.parentElement.classList.toggle("active");
    e.preventDefault();
  }
});
