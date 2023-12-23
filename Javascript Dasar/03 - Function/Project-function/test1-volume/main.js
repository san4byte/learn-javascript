// function
function volumeKubus(a, b) {
  let volumeA = a * a * a;
  let volumeB = b * b * b;

  let hasil = volumeA + volumeB;

  return hasil;
}
// panggil
console.log(volumeKubus(10, 5));

// refactoring (penyerdehana'an)
function volumeKubus(a, b) {
  return a * a * a + b * b * b;
}
console.log(volumeKubus(10, 5));
