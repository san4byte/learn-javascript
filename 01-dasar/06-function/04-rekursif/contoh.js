// Penjelasan lengkap dapat dibaca pada README.md
// Fungsi rekursif dengan base case
function tampilAngka(n) {
  if (n === 0) return;
  console.log(n);
  return tampilAngka(n - 1);
}
tampilAngka(10);

function faktorial(n) {
  if (n === 0) return 1;
  return n * faktorial(n - 1);
}
console.log("Faktorial 5:", faktorial(5));
