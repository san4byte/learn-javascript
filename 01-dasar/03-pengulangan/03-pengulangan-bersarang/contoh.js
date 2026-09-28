// Penjelasan lengkap dapat dibaca pada README.md
// Pola bintang segitiga siku-siku bertingkat
let s = "";

for (let i = 0; i < 10; i++) {
  for (let b = 0; b <= i; b++) {
    s += "*";
  }
  s += "\n";
}
console.log(s);

// Looping array menggunakan forEach
const pacarSaya = ["agus", "samsul", "bambang", "jancok"];
pacarSaya.forEach((pacar, index) => {
  console.log(pacar, index + 1);
});
