// Penjelasan lengkap dapat dibaca pada README.md
// Function Scope vs Global Scope
let a = 1;

function tes() {
  let b = 2;
  console.log("Di dalam fungsi, variabel a dapat diakses:", a);
  console.log("Variabel b (lokal):", b);
}

tes();
console.log("Di luar fungsi, variabel a:", a);
