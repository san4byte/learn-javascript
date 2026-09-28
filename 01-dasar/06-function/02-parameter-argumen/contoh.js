// Penjelasan lengkap dapat dibaca pada README.md
// Parameter, argumen, dan arguments object semu
function tambah1(a, b, c) {
  return a + b * c;
}
console.log(tambah1(10, 10, 10));

function tambah3() {
  let hasil = 0;
  for (let i = 0; i < arguments.length; i++) {
    hasil += arguments[i];
  }
  return hasil;
}
console.log(tambah3(1, 3, 5, 10, 82, 28));
